import { Photo } from "@/lib/core/types";
import { IUseCase } from "@/lib/domain/types";
import { Image } from "react-native";


export class PhotoFromUrl implements IUseCase<string, Photo> {

    async execute(input: string): Promise<Photo> {
        try {
            const { width, height } = await Image.getSize(input);
            const photo: Photo = {
                id: Date.now().toString(),
                originalUrl: input,
                width,
                height,
            };
            return photo;
        } catch (error) {
            throw error;
        }
    }
}