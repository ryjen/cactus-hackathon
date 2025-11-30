import { Image, ImageSize } from 'react-native';

export class PhotoLocalSource {

    async getSize(uri: string): Promise<ImageSize> {
        return await Image.getSize(uri)
    }
}