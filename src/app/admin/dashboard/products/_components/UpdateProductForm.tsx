"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X, Plus } from "lucide-react";
import { updateProduct } from "../actions";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FILES, MAX_FILE_SIZE } from "@/constants";
import { Switch } from "@/components/ui/switch";
import { getAllCategories } from "@/app/data/categories-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateUploadSignature } from "@/utils/generateUploadSignature";

const MAX_CHARS = 2000;

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  mark: z.string().min(1, "Mark is required"),
  isFeatured: z.boolean(),
  description: z.string().min(50).max(MAX_CHARS),
  images: z.array(z.any()).min(1).max(MAX_FILES),
  category: z.string().min(1, "Category is required"),
  mainCategory: z.string().optional(),
  specifications: z.array(
    z.object({
      name: z.string().min(1, "Specification name is required"),
      values: z.array(z.string().min(1, "Specification value is required")),
    })
  ),
});

type FormValues = z.infer<typeof formSchema>;

type ImagePreview = {
  id: string;
  url: string;
  file?: File;
  isExisting?: boolean;
  isMain?: boolean;
};

const UpdateProductForm = ({
  initialData,
  categories,
  mainCategories,
}: {
  initialData: Omit<FormValues, "category" | "mainCategory"> & {
    category: { name: string; id: string };
    mainCategory?: { name: string; id: string };
    specifications: Array<{ name: string; values: string[] }>;
  };
  categories: Awaited<ReturnType<typeof getAllCategories>>;
  mainCategories?: any[];
}) => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>(
    initialData.images.map((img) => ({
      ...img,
      isExisting: true,
    }))
  );
  const [clientLoaded, setClientLoaded] = useState(false);

  // Ensure component has mounted before rendering dynamic content
  useEffect(() => {
    setClientLoaded(true);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...initialData,
      category: initialData.category.id,
      mainCategory: initialData.mainCategory?.id,
      specifications: initialData.specifications || [],
    },
  });

  const { 
    fields: specFields, 
    append: appendSpec, 
    remove: removeSpec,
    update: updateSpec 
  } = useFieldArray({
    control: form.control,
    name: "specifications",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (imagePreviews.length + files.length > MAX_FILES) {
      toast(`Maximum ${MAX_FILES} images allowed`);
      return;
    }

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        toast(`${file.name} is not an image file`);
        return false;
      }

      if (file.size > MAX_FILE_SIZE) {
        toast(`${file.name} is larger than 10MB`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) return;

    const newPreviews = validFiles.map((file) => {
      return new Promise<ImagePreview>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: Math.random().toString(36).substring(7),
            url: reader.result as string,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(newPreviews).then((previews) => {
      setImagePreviews((prev) => [...prev, ...previews]);
      form.setValue("images", [...imagePreviews, ...previews]);
    });
  };

  const removeImage = (id: string) => {
    setImagePreviews((prev) => prev.filter((p) => p.id !== id));
    form.setValue(
      "images",
      imagePreviews.filter((p) => p.id !== id)
    );
  };

  const setMainImage = (id: string) => {
    setImagePreviews((previews) =>
      previews.map((preview) => ({
        ...preview,
        isMain: preview.id === id,
      }))
    );
  };

  const addValueToSpec = (specIndex: number) => {
    const currentSpec = form.getValues(`specifications.${specIndex}`);
    const updatedValues = [...currentSpec.values, ""];
    
    // Update the specific spec with new values array
    updateSpec(specIndex, {
      name: currentSpec.name,
      values: updatedValues
    });
  };

  const removeValueFromSpec = (specIndex: number, valueIndex: number) => {
    const currentSpec = form.getValues(`specifications.${specIndex}`);
    const updatedValues = [...currentSpec.values];
    updatedValues.splice(valueIndex, 1);
    
    // Update the specific spec with filtered values array
    updateSpec(specIndex, {
      name: currentSpec.name,
      values: updatedValues
    });
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
      const uploadPromises = imagePreviews
        .filter((preview) => !preview.isExisting && preview.file)
        .map((preview) => uploadToCloudinary(preview.file!));

      const uploadedImages = await Promise.all(uploadPromises);

      const allImages: { cloudId: string; url: string }[] = [
        ...imagePreviews
          .filter((preview) => preview.isExisting)
          .map((preview) => ({
            cloudId: preview.id,
            url: preview.url,
          })),
        ...uploadedImages,
      ];

      const response = await updateProduct({
        id: initialData.id,
        cloudIds: allImages.map((img) => img.cloudId),
        imageUrls: allImages.map((img) => img.url),
        description: data.description,
        name: data.name,
        isFeatured: data.isFeatured,
        category: data.category,
        mainCategory: data.mainCategory,
        mark: data.mark,
        specifications: data.specifications,
      });

      if (response?.data?.success) {
        toast("Product has been updated");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast(
         "Failed to update product",
      );
    }
  };

  // If client hasn't loaded yet (on server render), use an empty placeholder
  if (!clientLoaded) {
    return <div>Loading form...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand/Mark</FormLabel>
                <FormControl>
                  <Input placeholder="Product mark" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  className="resize-none"
                  placeholder="Product description"
                  {...field}
                />
              </FormControl>
              <div>
                <span className="text-gray-800 text-xs font-medium">
                  {form.getValues("description").length}/{MAX_CHARS}
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
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

          {mainCategories && (
            <FormField
              control={form.control}
              name="mainCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a main category" />
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
          )}
        </div>

        <div>
          <FormLabel>Product Specifications</FormLabel>
          <div className="mt-2 space-y-4">
            {specFields.map((field, index) => (
              <Card key={field.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <FormField
                    control={form.control}
                    name={`specifications.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1 mr-2">
                        <FormLabel>Specification Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Color, Size" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removeSpec(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="ml-4 mt-2">
                  <FormLabel>Values</FormLabel>
                  {field.values.map((_, valueIndex) => (
                    <div key={`${field.id}-value-${valueIndex}`} className="flex items-center mt-2">
                      <FormField
                        control={form.control}
                        name={`specifications.${index}.values.${valueIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="e.g. Red, XL" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeValueFromSpec(index, valueIndex)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => addValueToSpec(index)}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Value
                  </Button>
                </div>
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() => appendSpec({ name: "", values: [""] })}
            >
              <Plus className="h-4 w-4 mr-2" /> Add Specification
            </Button>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Featured Product
                  </FormLabel>
                  <FormDescription>
                    Show this product in featured sections
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
        </div>

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => {
            const { value, onChange, ...restField } = field;
            void value;
            void onChange;
            return (
              <FormItem>
                <FormLabel>Product Images</FormLabel>
                <FormControl>
                  <Card className="border-2 border-dashed">
                    <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                        {imagePreviews.map((preview) => (
                          <div 
                            key={preview.id} 
                            className={`relative ${
                              preview.isMain ? "ring-2 ring-blue-500" : ""
                            }`}
                          >
                            <img
                              src={preview.url ?? ""}
                              alt="Preview"
                              className="w-full h-32 object-cover rounded-md"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              {!preview.isMain && (
                                <Button
                                  type="button"
                                  variant="secondary"
                                  size="icon"
                                  className="h-6 w-6 bg-white"
                                  title="Set as main image"
                                  onClick={() => setMainImage(preview.id)}
                                >
                                  <span className="text-xs">★</span>
                                </Button>
                              )}
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => removeImage(preview.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                            {preview.isMain && (
                              <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-xs text-center py-1">
                                Main Image
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {imagePreviews.length < MAX_FILES && (
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
                              Choose Images
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500">
                            PNG, JPG up to 10MB (Maximum {MAX_FILES} images)
                          </p>
                        </>
                      )}

                      <Input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
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

        <div className="flex w-full justify-end">
          <Button
            type="submit"
            className="flex px-8 gap-2 active:scale-[95%] items-center"
            disabled={form.formState.isSubmitting}
          >
            <span>Update</span>
            {form.formState.isSubmitting && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProductForm;