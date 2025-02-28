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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { generateUploadSignature } from "@/utils/generateUploadSignature";
import { createMainCategory } from "../actions";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  isActive: z.boolean().default(true),
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

const AddNewMainCategoryForm = () => {
  const [imagePreview, setImagePreview] = useState<ImagePreview | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Now create the category with structured data
      const response = await createMainCategory({
        name: data.name,
        isActive: data.isActive,
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
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Active </FormLabel>
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

export default AddNewMainCategoryForm;
