import os
from PIL import Image

def make_transparent(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    pixels = img.load()
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # Grayscale brightness of pixel
            brightness = max(r, g, b)
            
            # Anti-aliased color keyer for black background
            if brightness == 0:
                new_alpha = 0
            elif brightness < 15:
                new_alpha = int(brightness * (255.0 / 15.0))
            else:
                new_alpha = 255
            
            pixels[x, y] = (r, g, b, new_alpha)
            
    img.save(output_path, "PNG")
    print(f"Success: Saved transparent image to {output_path}")

if __name__ == "__main__":
    src = r"C:\Users\adamp\.gemini\antigravity\brain\79713c09-4f61-422b-ba5b-360677746d86\peeled_dotted_lasik_icon.png"
    dst = r"C:\Users\adamp\.gemini\antigravity\brain\79713c09-4f61-422b-ba5b-360677746d86\peeled_dotted_lasik_icon_transparent.png"
    make_transparent(src, dst)
