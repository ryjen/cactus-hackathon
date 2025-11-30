
import { PhotoRepository as IPhotoRepository } from "@/lib/domain/types/repositories";
import * as ImageManipulator from 'expo-image-manipulator';
import { inject, injectable } from "tsyringe";
import { Photo } from "@/lib/core/types";
import { PhotoLocalSource } from "../datasources";

@injectable()
export class PhotoRepository implements IPhotoRepository {

    constructor(
        @inject(PhotoLocalSource) private photoLocalSource: PhotoLocalSource
    ) { }

    async fromFile(url: string): Promise<Photo> {
        try {
            // TODO: load from cache
            const photo = await this.createPhoto(url);
            return photo;
        } catch (error) {
            throw error;
        }
    }

    private async createPhoto(url: string): Promise<Photo> {
        const size = await this.photoLocalSource.getSize(url);
        const photo: Photo = {
            id: Date.now().toString(),
            originalUrl: url,
            width: size.width,
            height: size.height,
        };
        return photo;
    }

    async resizeLocalImage(uri: string, width: number = 244, height: number = 244): Promise<string> {
        const result = await ImageManipulator.manipulateAsync(
            uri,
            [{ resize: { width, height } }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        return result.uri;
    }
}
