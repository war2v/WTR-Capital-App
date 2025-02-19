"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, Formik } from "formik";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import FileUpload from "../_components/FileUpload";
import { FileWarning, Loader } from "lucide-react";
import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EditListing = () => {
  const params = useParams();
  const { user } = useUser();
  const router = useRouter();
  const formikRef = useRef();
  const [listing, setListing] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, isLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  let active = listing?.active;

  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);

  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("listing")
      .select("*,listingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress.emailAddress)
      .eq("id", params.id);
    if (data) {
      //console.log(data)
      setListing(data[0]);
    }

    if (data?.length <= 0) {
      router.replace("../dashboard");
    }
    console.log(listing);
  };

  const handlePublish = async () => {
    isLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update({ active: "true" })
      .eq("id", params?.id)
      .select();

    if (data) {
      console.log(data);
      router.replace("/");
      toast({
        title: "Listing Published!",
        description: "Your listing has been published.",
      });
    }

    isLoading(false);
  };

  const onSubmitHandler = async (formValue) => {
    console.log(formValue);
    isLoading(true);

    const { data, error } = await supabase
      .from("listing")
      .update(formValue)
      .eq("id", params.id)
      .select();

    if (error) {
      toast.error(error);
      return;
    }
    if (data) {
      //console.log(data);

      //router.replace('/');
      toast({
        title: `Listing Updated`,
        description: "Your listing has been updated.",
      });
    }

    for (const image of images) {
      const file = image;
      const filename = Date.now().toString();
      const fileExt = filename.split(".").pop();
      const { data, error } = await supabase.storage
        .from("listingImages")
        .upload(`${filename}`, file, {
          contentType: `image/${fileExt}`,
          upsert: false,
        });
      if (error) {
        toast.error("Error Uploading Images");
      } else {
        //console.log(data);
        const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + filename;
        const { date, error } = await supabase
          .from("listingImages")
          .insert([{ url: imageUrl, listing_id: params?.id }])
          .select();
      }
    }
    isLoading(false);
  };

  return (
    <div className="px-10 my-10 md:px-36">
      <h2 className="font-bold text-2xl text-slate-500 mx-2 mb-4">
        Enter Details More About Property
      </h2>
      <Formik
        innerRef={formikRef}
        initialValues={{
          type: "",
          propertyType: "",
          area: listing?.area,
          lotSize: listing?.lotSize,
          profileImage: user?.imageUrl,
          user_name: user?.user_name,
        }}
        onValueChange={(values) => {
          console.log(values);
        }}
        onSubmit={(values) => {
          //console.log(values);
          onSubmitHandler(values);
          setSaved(true);
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-lg flex flex-col gap-2">
              {/* First Row */}
              <div className="grid grids-col-1 md:grid-cols-3 gap-x-10 w-full m-5">
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Renting or Selling</Label>
                  <RadioGroup onValueChange={(v) => (values.type = v)} required>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label>Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label>Sell</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <h2 className="text-blue-500">Property Type</h2>
                  <Select
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing.propertyType
                            ? listing.propertyType
                            : "Select Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">
                        Single Family House
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grids-col-1 md:grid-cols-3 gap-x-10 w-full m-5">
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Bedrooms</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.bedroom}
                    step={0}
                    placeholder="ex: 5"
                    name="bedroom"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Bathrooms</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.bathroom}
                    placeholder="ex: 5"
                    step={0.01}
                    name="bathroom"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Year Built</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.builtIn}
                    placeholder="ex: 5"
                    name="builtIn"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grids-col-1 md:grid-cols-3 gap-x-10 w-full m-5">
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Parking</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.parking}
                    placeholder="ex: 5"
                    name="parking"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Lot Size (Acres)</Label>
                  <Field
                    type="number"
                    defaultValue={listing?.lotSize}
                    step={0.01}
                    placeholder="ex: 5"
                    name="lotSize"
                    onChange={(e) => {
                      setFieldValue("lotSize", e.target.value);
                      e.target.value = parseFloat(e.target.value) * 43560;
                      setFieldValue("area", e.target.value);
                    }}
                    value={values.lotSize}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Area (Sq. Ft)</Label>
                  <Field
                    type="number"
                    defaultValue={listing?.area}
                    step={0.01}
                    placeholder="ex: 5"
                    name="area"
                    onChange={(e) => {
                      setFieldValue("area", e.target.value);
                      e.target.value = Math.round(
                        parseFloat(e.target.value) / 43560
                      );
                      setFieldValue("lotSize", e.target.value);
                    }}
                    value={values.area}
                    required
                  />
                </div>
              </div>
              <div className="grid grids-col-1 md:grid-cols-3 gap-x-10 w-full m-5">
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">Price ($)</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.price}
                    placeholder="ex: 5"
                    name="price"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-y-4">
                  <Label className="text-blue-500">HOA (Per Month)($)</Label>
                  <Input
                    type="number"
                    defaultValue={listing?.hoa}
                    placeholder="100"
                    name="hoa"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="grid items-center gap-y-4">
                  <Label className="text-blue-500">Description</Label>
                  <Textarea
                    type="text"
                    placeholder="ex: Beautiful Spanish Villa"
                    name="description"
                    defaultValue={listing?.description}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <h2 className="p-2 font-semibold text-lg text-blue-500 font-sans">
                  Upload Property Images
                </h2>
                <FileUpload
                  setImages={(value) => setImages(value)}
                  imageList={listing.listingImages}
                />
              </div>
              <div className="flex font-extrabold justify-center items-center text-slate-600 p-2 m-1">
                <FileWarning></FileWarning>
                <h2>Save Before Publishing!</h2>
              </div>
              <div className="w-full flex justify-center gap-x-3">
                <Button
                  disabled={loading}
                  type="submit"
                  className="w-32 
                    bg-slate-100 
                    border
                    border-blue-300
                    text-blue-400
                    hover:bg-blue-200
                    hover:text-slate-100
                    "
                >
                  {loading ? <Loader className="animate-spin" /> : "Save"}
                </Button>
                <div className="relative flex ">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={loading || !saved}
                        type="button"
                        className="
                        -z-1 
                        w-32 
                        bg-blue-400 
                        text-slate-50
                        hover:bg-blue-200
                        "
                      >
                        {loading ? (
                          <Loader className="animate-spin" />
                        ) : (
                          <div>
                            <div className="z-0 absolute -top-0.5 -right-0.5 ">
                              <div className="relative">
                                <div className="bg-blue-300 top-0.5 right-0.5 animate-ping rounded-full w-2 h-2" />
                                <div className="absolute top-0 right-0 bg-blue-300 rounded-full w-2 h-2" />
                              </div>
                            </div>
                            <h3>Publish & Submit</h3>
                          </div>
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This Will Post Your Listing
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handlePublish}
                          className="bg-blue-400"
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default EditListing;
