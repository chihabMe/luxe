"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { createProductCategory } from "../actions";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { generateUploadSignature } from "@/utils/generateUploadSignature";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isFeatured: z.boolean().default(false),
  mainCategoryId: z.string().min(1, "Main category is required"),
  image: z.instanceof(File).optional().nullable(),
});

type FormValues = z.infer<typeof formSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file: File;
};

type MainCategory = {
  id: string;
  name: string;
  slug: string;
};

interface AddNewCategoryFormProps {
  mainCategories: MainCategory[];
}

const AddNewCategoryForm = ({ mainCategories }: AddNewCategoryFormProps) => {
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isFeatured: false,
      mainCategoryId: "",
      image: null,
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast(`${file.name} is not an image file`);
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast(`${file.name} is larger than 10MB`);
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      const preview = {
        id: Math.random().toString(36).substring(7),
        url: reader.result as string,
        file: file,
      };
      setImagePreview(preview);
      form.setValue("image", file);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    form.setValue("image", null);
  };

  const uploadToCloudinary = async (file: File) => {
    try {
      const { signature, timestamp, apiKey, cloudName } =
        await generateUploadSignature();

      const formData = new FormData();
      formData.append("file", file);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp.toString());
      formData.append("api_key", apiKey.toString());
      formData.append("folder", "worldtech");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await uploadResponse.json();
      return {
        url: data.secure_url,
        cloudId: data.public_id,
      };
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // First, upload the image if present
      let imageUrl = "";
      let cloudId = "";

      if (imagePreview && imagePreview.file) {
        const uploadedImage = await uploadToCloudinary(imagePreview.file);
        imageUrl = uploadedImage?.url ?? "";
        cloudId = uploadedImage?.cloudId ?? "";
      }

      // Now create the category with structured data
      const response = await createProductCategory({
        name: data.name,
        isFeatured: data.isFeatured,
        imageUrl: imageUrl,
        cloudId: cloudId,
        mainCategoryId: data.mainCategoryId,
      });

      if (response?.data?.success) {
        toast("Category created successfully");
        form.reset();
        setImagePreview(null);
      } else {
        throw new Error("Failed to create category");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast(
        error instanceof Error ? error.message : "Failed to create category"
      );
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mainCategoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Main Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select main category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mainCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Featured Category</FormLabel>
                  <FormDescription>
                    Display this category prominently on the website
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => {
              const { value, onChange, ...restField } = field;
              void value;
              void onChange;
              return (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Card className="border-2 border-dashed">
                      <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                        {imagePreview ? (
                          <div className="relative">
                            <Image
                              width={800}
                              height={800}
                              src={imagePreview?.url ?? ""}
                              alt="image Preview"
                              className="w-full h-64 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6"
                              onClick={removeImage}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-gray-400" />
                            <div className="text-center">
                              <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                  document
                                    .getElementById("image-upload")
                                    ?.click();
                                }}
                              >
                                Choose Image
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                              PNG, JPG up to 10MB
                            </p>
                          </>
                        )}

                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                          {...restField}
                        />
                      </CardContent>
                    </Card>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex px-8 gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>Create</span>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddNewCategoryForm;
