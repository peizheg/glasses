# #!/usr/bin/python
# # -*- coding:utf-8 -*-

# import sys
# import os
# picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
# libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
# if os.path.exists(libdir):
#     sys.path.append(libdir)

# import logging    
# import time
# from waveshare_OLED import OLED_1in51
# from PIL import Image,ImageDraw,ImageFont
# logging.basicConfig(level=logging.DEBUG)

# def write_text(text, large=False, refreshRate=10):
#     disp = OLED_1in51.OLED_1in51()
#     disp.Init()

#     font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 12)

#     image = Image.new('1', (disp.width, disp.height), "WHITE")
#     draw = ImageDraw.Draw(image)
#     line_count = 0

#     line = ""
#     for word in text.split():
#         if len(line + word) >= 18:
#             draw.text((20, 20 * line_count), line, font=font, fill=0)
#             line = ""
#             line_count += 1

#         line += f"{word} "

#     draw.text((20, 20 * line_count), line, font=font, fill=0)

#     disp.ShowImage(disp.getbuffer(image))
#     time.sleep(2)
#     disp.clear()

# def write_song():
#     with open('lyrics.txt', 'r') as file:
#         data = file.read()
#         write_text(data)

# write_song()


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

def scroll_text(text, scroll_speed=1, font_size=12):
    """
    Scrolls the provided text vertically on the OLED display.
    
    :param text: The text to scroll.
    :param scroll_speed: Number of pixels to scroll per frame (higher = faster).
    :param font_size: Font size for the text.
    """
    # Initialize display
    disp = OLED_1in51.OLED_1in51()
    disp.Init()
    disp.clear()
    
    # Set font and image
    font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), font_size)
    image = Image.new('1', (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image)

    # Split text into lines that fit the screen width
    max_chars = disp.width // (font_size // 2)  # Approx chars per line based on font size
    lines = []
    line = ""
    for word in text.split():
        if len(line + word) <= max_chars:
            line += f"{word} "
        else:
            lines.append(line.strip())
            line = f"{word} "
    lines.append(line.strip())  # Append the last line

    # Create a scrolling effect
    text_height = len(lines) * font_size
    scroll_pos = 0  # Start at the top of the text

    while scroll_pos < text_height:
        # Clear the image
        draw.rectangle((0, 0, disp.width, disp.height), fill="WHITE")

        # Draw visible lines based on scroll position
        for i, line in enumerate(lines):
            y_pos = i * font_size - scroll_pos
            if 0 <= y_pos < disp.height:  # Only draw lines visible on the screen
                draw.text((0, y_pos), line, font=font, fill=0)

        # Update the display
        disp.ShowImage(disp.getbuffer(image))
        time.sleep(0.05)  # Adjust for frame rate

        # Scroll down by scroll_speed pixels
        scroll_pos += scroll_speed

    # Clear display after scrolling
    disp.clear()

def write_song():
    """
    Reads the lyrics from a file and scrolls them on the OLED display.
    """
    with open('lyrics.txt', 'r') as file:
        data = file.read()
        scroll_text(data)

write_song()
