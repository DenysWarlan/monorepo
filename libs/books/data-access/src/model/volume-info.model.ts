import {ImagesLinks} from './images-links.model';

export interface VolumeInfo {
    readonly title: string;
    readonly author: string[];
    readonly publisher: string;
    readonly description: string;
    readonly categories: string[];
    readonly imagesLinks: ImagesLinks;

}