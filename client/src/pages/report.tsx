import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCaseSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

// Fix for default marker icon in react-leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

//@ts-ignore
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function Report() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",  // Set a default category
      priority: "",   // Set a default priority
      location: "",
      latitude: "",
      longitude: "",
    },
  });
  

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition([position.coords.latitude, position.coords.longitude]);
          form.setValue("latitude", position.coords.latitude.toString());
          form.setValue("longitude", position.coords.longitude.toString());
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Could not get your current location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    }
  }, []);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formData: any) => {
    console.log("Validating form data...");
    console.log("Form Data:", formData); // Debugging
  
    const errors = form.formState.errors;
    console.log("Validation Errors:", errors); // Debugging
  
    if (Object.keys(errors).length > 0) {
      toast({
        title: "Error",
        description: "Please fix form errors before submitting.",
        variant: "destructive",
      });
      return;
    }
  
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("priority", formData.priority);
    data.append("latitude", formData.latitude);
    data.append("longitude", formData.longitude);
    data.append("location", formData.location);
  
    if (selectedFile) {
      data.append("image", selectedFile);
    }
  
    console.log("Submitting Form Data:", data); // Debugging
  
    mutation.mutate(data);
  };
  
  
  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      console.log("Sending data to API:", data); // Debugging
  
      const response = await apiRequest("POST", "/api/v1/cases", data);
  
      console.log("Response from API:", response); // Debugging
  
      if (!response.ok) {
        throw new Error("Failed to submit report");
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your report has been submitted successfully.",
      });
      console.log("Mutation Success"); // Debugging
      form.reset();
      setSelectedFile(null);
      setFilePreview(null);
    },
    onError: (error) => {
      console.error("Mutation Error:", error); // Debugging
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <Card>
        <CardContent className="p-4 sm:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
              {/* Make the grid responsive */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Image Upload - More responsive styling */}
                  <div className="border rounded-lg p-4">
                    <p className="mb-2 text-sm font-medium">Capture Image</p>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="mb-2 w-full"
                    />
                    {filePreview && (
                      <div className="relative w-full aspect-video">
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded absolute inset-0"
                        />
                      </div>
                    )}
                  </div>

                  {/* Form Fields - Add responsive spacing */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Title Field */}
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Title</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter title" className="w-full" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Issue Type - Improved mobile styling */}
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Type of Issue</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select an issue" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-full">
                              <SelectItem value="road">Road Issues</SelectItem>
                              <SelectItem value="lighting">Street Lighting</SelectItem>
                              <SelectItem value="garbage">Garbage Collection</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Severity - Improved mobile styling */}
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Severity</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select severity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description - Responsive textarea */}
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm sm:text-base">Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the issue..."
                              className="min-h-[100px] sm:min-h-[150px] w-full"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Map Section */}
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <p className="mb-2 text-sm font-medium sm:text-base">Location</p>
                    {/* Responsive map container */}
                    <div className="h-[250px] sm:h-[300px] md:h-[400px] rounded-lg overflow-hidden mb-4">
                      {typeof window !== "undefined" && (
                        <MapContainer
                          center={position || [23.2156, 72.6369]}
                          zoom={13}
                          className="h-full w-full"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <LocationMarker position={position} setPosition={setPosition} />
                        </MapContainer>
                      )}
                    </div>

                    {/* Coordinates - Responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Latitude</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm sm:text-base">Longitude</FormLabel>
                            <FormControl>
                              <Input {...field} className="w-full" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button - Responsive styling */}
              <Button 
                type="submit" 
                className="w-full sm:w-auto sm:min-w-[200px] mx-auto block"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}