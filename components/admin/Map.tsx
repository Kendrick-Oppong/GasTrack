"use client";
import { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { Station } from "@prisma/client";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const fuelIcon = L.icon({
  iconUrl: "/fuel.svg",
  iconSize: [40, 40],
  shadowSize: [50, 64],
});

interface StationProps {
  stations: Station[];
}

const TileLayers = {
  OpenStreetMap_DE: {
    url: "https://tile.openstreetmap.de/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  OpenStreetMap_Mapnik: {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },

  OpenStreetMap_France: {
    url: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
    attribution:
      '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
  OpenStreetMap_BZH: {
    url: "https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>',
  },
};

type TileLayerKey = keyof typeof TileLayers;

const StationsMap = ({ stations }: StationProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedTileLayer, setSelectedTileLayer] =
    useState<TileLayerKey>("OpenStreetMap_DE");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTileLayerChange = (value: TileLayerKey) => {
    setSelectedTileLayer(value);
  };

  return (
    isMounted && (
      <div>
        <div className="border border-gray-400 p-1 rounded-md">
          <MapContainer
            className="h-[35rem]"
            scrollWheelZoom={true}
            center={[6.671321824, -1.587319787]}
            zoom={6}
            maxZoom={18}
            zoomAnimation={true}
          >
            <TileLayer
              attribution={TileLayers[selectedTileLayer].attribution}
              url={TileLayers[selectedTileLayer].url}
            />
            <MarkerClusterGroup chunkedLoading animate zoomToBoundsOnClick>
              {stations.map((station) => (
                <Marker
                  key={station?.id}
                  position={[station?.longitude, station?.latitude]}
                  icon={fuelIcon}
                >
                  <Popup>
                    <div
                      key={station.id}
                      className="border space-y-2 p-2 border-primary rounded-md  [&>div]:grid [&>div]:grid-cols-3 [&>div]:items-center [&>div]:gap-4"
                    >
                      <div>
                        <p className="font-semibold">Name</p>
                        <p className="col-span-2">{station?.name}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Location</p>
                        <p className="col-span-2">{station?.location}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Contact</p>
                        <p className="col-span-2">{station?.contact}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Working Days</p>
                        <p className="col-span-2">{station?.workingDays}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Working Hours</p>
                        <p className="col-span-2">{station?.workingHours}</p>
                      </div>
                      <div className="relative h-[6rem] w-full">
                        <Image
                          src={station?.photo as string}
                          className="object-cover rounded-sm"
                          fill
                          alt=""
                        />
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            <div className="absolute z-[1000] top-2 right-2 p-3 rounded-md bg-secondary">
              <RadioGroup
                className="space-y-2"
                defaultValue="OpenStreetMap_DE"
                onValueChange={(value) =>
                  handleTileLayerChange(value as TileLayerKey)
                }
              >
                {Object.keys(TileLayers).map((key) => (
                  <div className="flex items-center space-x-2" key={key}>
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key}>{key}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </MapContainer>
        </div>
      </div>
    )
  );
};

export default StationsMap;
