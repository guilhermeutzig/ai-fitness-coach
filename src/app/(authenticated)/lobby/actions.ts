"use server";

import { api } from "@/trpc/server";
import { type ExtendedRoom } from "@/types";
import { formatRooms } from "./utils";
import { type Room } from "@prisma/client";

export const getRooms = async (searchedRoom = ""): Promise<ExtendedRoom[]> => {
  const rooms = await api.room.getRooms({
    searchedRoom,
  });

  return formatRooms(rooms as Room[]);
};

export const createRoom = async (formData: FormData) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const maxMembers = formData.get("maxMembers");

  if (!name || !description || !maxMembers)
    return { error: "All fields are required" };

  const newRoom = await api.room.createRoom({
    name: String(name),
    description: String(description),
    maxMembers: Number(maxMembers),
  });

  return newRoom;
};

export const deleteRoom = async (id: string) => {
  await api.room.deleteRoom({ id });
};

export const joinRoom = async (roomId: string) => {
  const room = await api.room.joinRoom({ roomId });
  return room;
};

export const leaveRoom = async (roomId: string) => {
  const room = await api.room.leaveRoom({ roomId });
  return room;
};
