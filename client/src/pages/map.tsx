import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";

// Mock data for the map markers
const mockMarkers = [
  { id: 1, lat: 23.2156, lng: 72.6369, title: "Pothole", status: "pending" },
  { id: 2, lat: 23.2256, lng: 72.6469, title: "Street Light", status: "completed" },
  { id: 3, lat: 23.2056, lng: 72.6269, title: "Garbage", status: "pending" },
];

export default function Map() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [status, setStatus] = useState<"pending" | "completed" | undefined>();

  const { data: markers = mockMarkers } = useQuery({
    queryKey: ["/api/cases/map", { date, status }],
  });

  return (
    <div className="p-6">
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Search location..." 
            className="w-full"
            prefix={<Search className="h-4 w-4" />}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Button 
          variant={status === "pending" ? "default" : "outline"}
          onClick={() => setStatus(s => s === "pending" ? undefined : "pending")}
        >
          Pending
        </Button>
        <Button 
          variant={status === "completed" ? "default" : "outline"}
          onClick={() => setStatus(s => s === "completed" ? undefined : "completed")}
        >
          Completed
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="h-[calc(100vh-12rem)]">
            <MapContainer
              center={[23.2156, 72.6369]}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markers.map((marker) => (
                <Marker
                  key={marker.id}
                  position={[marker.lat, marker.lng]}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold">{marker.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Status: {marker.status}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
