
import { baseURL } from "./axios";


export function previewFile(file: any, local?: boolean): string {
    
        
    if(file.type.split("/")[1] === "svg+xml") {
        return "/strategic/culturalCode/file.png"
    }
    
    if(file.type.split("/")[0] === "image") {
        if(local) {
            const preview: string = URL.createObjectURL(file);
            return preview;
        }

        return baseURL + "/files/preview-70x70-" + file.filename;
    }

    if(file.type.split("/")[1] === "pdf") {
        return "/strategic/culturalCode/pdf-icon.svg"
    }

    return "/strategic/culturalCode/file.png"

}