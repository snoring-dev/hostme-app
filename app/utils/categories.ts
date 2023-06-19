import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCampingTent,
  GiCastle,
  GiCaveEntrance,
  GiCutDiamond,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { Category } from "../types";

export const categories: Category[] = [
  {
    label: "Beach",
    description: "Properties close to the beach!",
    icon: TbBeach,
  },
  {
    label: "Windmills",
    description: "Properties having Windmill",
    icon: GiWindmill,
  },
  {
    label: "Modern",
    description: "Properties with a modern architechture",
    icon: MdOutlineVilla,
  },
  {
    label: "Countryside",
    description: "Properties in the countryside",
    icon: TbMountain,
  },
  {
    label: "Pools",
    description: "Properties having a pool!",
    icon: TbPool,
  },
  {
    label: "Islands",
    description: "Properties in islands!",
    icon: GiIsland,
  },
  {
    label: "Lake",
    description: "Properties close to a lake!",
    icon: GiBoatFishing,
  },
  {
    label: "Skiing",
    description: "Properties with skiing activities",
    icon: FaSkiing,
  },
  {
    label: "Castles",
    description: "Castles properties",
    icon: GiCastle,
  },
  {
    label: "Camping",
    description: "Properties with camping activities",
    icon: GiCampingTent,
  },
  {
    label: "Arctic",
    description: "Properties in the arctic region",
    icon: BsSnow,
  },
  {
    label: "Cave",
    description: "Properties with caves",
    icon: GiCaveEntrance,
  },
  {
    label: "Desert",
    description: "Properties in the desert",
    icon: GiCactus,
  },
  {
    label: "Barns",
    description: "Properties in a barn",
    icon: GiBarn,
  },
  {
    label: "Lux",
    description: "Luxurious properties",
    icon: GiCutDiamond,
  },
];
