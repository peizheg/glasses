import sys
import os
picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging    
import time
from waveshare_OLED import OLED_1in51
from PIL import Image, ImageDraw, ImageFont

logging.basicConfig(level=logging.DEBUG)

def scroll_text(text, is_vertical, scroll_speed=1.5, font_size=14): #scroll speed was 1, font size was 12
    #scroll_speed 1, font size 14 --> ~95 wpm
    #scroll_speed 1.5, font size 14 --> ~130 wpm
    #scroll_speed 2, font size 14 --> ~160 wpm
    #scroll_speed 3, font size 14 --> ~250 wpm
    #scroll_speed 4, font size 14 --> ~300 wpm

    """
    Scrolls the provided text vertically on the OLED display.
    
    :param text: The text to scroll.
    :param scroll_speed: Number of pixels to scroll per frame (higher = faster).
    :param font_size: Font size for the text.
    """
    #Initialize display
    disp = OLED_1in51.OLED_1in51()
    disp.Init()
    disp.clear()

    if not is_vertical:
        width = disp.width
        height = disp.height
    else:
        width = disp.height
        height = disp.width
    
    #Set font and image
    font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), font_size)
    image = Image.new('1', (width, height), "WHITE")
    draw = ImageDraw.Draw(image)

    #Split text into lines that fit the screen width
    max_chars = width // (font_size // 2)  #chars per line based on font size
    lines = []
    line = ""
    for word in text.split():
        if len(line + word) <= max_chars: #add to line if it fits
            line += f"{word} "
        else: #start a new line
            lines.append(line.strip())
            line = f"{word} "
    lines.append(line.strip())  #add the last line

    #Scrolling effect
    text_height = len(lines) * font_size
    scroll_pos = 0  #start at the top

    while scroll_pos < text_height:
        # start blank
        draw.rectangle((0, 0, width, height), fill="WHITE")

        #Draw visible lines based on scroll position
        for i, line in enumerate(lines):
            y_pos = i * font_size - scroll_pos
            if 0 <= y_pos < height:  # only show the lines that are "on the screen"
                draw.text((0, y_pos), line, font=font, fill=0)

        # #Update the display
        if not is_vertical:
            disp.ShowImage(disp.getbuffer(image))
        else:
            rotated_image = image.rotate(90, expand=True)
            disp.ShowImage(disp.getbuffer(rotated_image))

        time.sleep(0.05) #frame rate was 0.05

        # Scroll down by scroll_speed pixels
        scroll_pos += scroll_speed

    disp.clear()

def write_song():
    """
    Reads the lyrics from a file and scrolls them on the OLED display.
    """
    with open('lyrics.txt', 'r') as file:
        data = file.read()
        scroll_text(data, True)

write_song()






# def scroll_text_vertical(text, scroll_speed=1.5, font_size=14): 
#     """
#     Scrolls the provided text vertically after a 90-degree counterclockwise rotation on the OLED display.
    
#     :param text: The text to scroll.
#     :param scroll_speed: Number of pixels to scroll per frame (higher = faster).
#     :param font_size: Font size for the text.
#     """
#     # Initialize display
#     disp = OLED_1in51.OLED_1in51()
#     disp.Init()
#     disp.clear()
    
#     # Set font and create an image
#     font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), font_size)
#     image = Image.new('1', (disp.height, disp.width), "WHITE")  # Swap dimensions for rotation
#     draw = ImageDraw.Draw(image)

#     # Split text into lines that fit the rotated screen width
#     max_chars = disp.height // (font_size // 2)  # Adjust for rotated display width
#     lines = []
#     line = ""
#     for word in text.split():
#         if len(line + word) <= max_chars:  # Add to line if it fits
#             line += f"{word} "
#         else:  # Start a new line
#             lines.append(line.strip())
#             line = f"{word} "
#     lines.append(line.strip())  # Add the last line

#     # Scrolling effect
#     text_height = len(lines) * font_size
#     scroll_pos = 0  # Start at the top

#     while scroll_pos < text_height:
#         # Start blank
#         draw.rectangle((0, 0, disp.height, disp.width), fill="WHITE")

#         # Draw visible lines based on scroll position
#         for i, line in enumerate(lines):
#             y_pos = i * font_size - scroll_pos
#             if 0 <= y_pos < disp.width:  # Only show the lines that are "on the screen"
#                 draw.text((0, y_pos), line, font=font, fill=0)

#         # Rotate the image 90 degrees counterclockwise
#         rotated_image = image.rotate(90, expand=True)

#         # Update the display with the rotated image
#         disp.ShowImage(disp.getbuffer(rotated_image))
#         time.sleep(0.05)  # Frame rate was 0.05

#         # Scroll down by scroll_speed pixels
#         scroll_pos += scroll_speed

#     disp.clear()

def write_song():
    """
    Reads the lyrics from a file and scrolls them on the OLED display.
    """
    try:
        with open('lyrics.txt', 'r') as file:
            data = file.read()
            scroll_text_vertical(data)
    except FileNotFoundError:
        logging.error("File 'lyrics.txt' not found.")
    except Exception as e:
        logging.error(f"An error occurred while reading the file: {e}")

write_song()



# # #!/usr/bin/python
# # # -*- coding:utf-8 -*-

# # import sys
# # import os
# # picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
# # libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
# # if os.path.exists(libdir):
# #     sys.path.append(libdir)

# # import logging    
# # import time
# # from waveshare_OLED import OLED_1in51
# # from PIL import Image,ImageDraw,ImageFont
# # logging.basicConfig(level=logging.DEBUG)

# # def write_text(text, large=False, refreshRate=10):
# #     disp = OLED_1in51.OLED_1in51()
# #     disp.Init()

# #     font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 12)

# #     image = Image.new('1', (disp.width, disp.height), "WHITE")
# #     draw = ImageDraw.Draw(image)
# #     line_count = 0

# #     line = ""
# #     for word in text.split():
# #         if len(line + word) >= 18:
# #             draw.text((20, 20 * line_count), line, font=font, fill=0)
# #             line = ""
# #             line_count += 1

# #         line += f"{word} "

# #     draw.text((20, 20 * line_count), line, font=font, fill=0)

# #     disp.ShowImage(disp.getbuffer(image))
# #     time.sleep(2)
# #     disp.clear()

# # def write_song():
# #     with open('lyrics.txt', 'r') as file:
# #         data = file.read()
# #         write_text(data)

# # write_song()

