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

def show_text(text, is_vertical, font_size=14):
    """
    Displays the provided text on the OLED display.
    
    :param text: The text to display.
    :param is_vertical: True for vertically-oriented screen, False for horizontally-oriented screen.
    :param font_size: Font size for the text.
    """
    #Initialize display
    disp = OLED_1in51.OLED_1in51()
    disp.Init()
    disp.clear()

    #Set width and height based on orientation
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

    #Display text
    for i, line in enumerate(lines):
        y_pos = i * font_size
        draw.text((0, y_pos), line, font=font, fill=0)
    
    #Update the display based on orientation
    if not is_vertical:
        disp.ShowImage(disp.getbuffer(image))
    else:
        rotated_image = image.rotate(90, expand=True)
        disp.ShowImage(disp.getbuffer(rotated_image))

    time.sleep(10)  #display time was 3 seconds

def scroll_text(text, is_vertical, scroll_speed=1.5, font_size=14): #scroll speed was 1, font size was 12
    #scroll_speed 1, font size 14 --> ~95 wpm
    #scroll_speed 1.5, font size 14 --> ~130 wpm
    #scroll_speed 2, font size 14 --> ~160 wpm
    #scroll_speed 3, font size 14 --> ~250 wpm
    #scroll_speed 4, font size 14 --> ~300 wpm

    """
    Scrolls the provided text vertically on the OLED display.
    
    :param text: The text to scroll.
    :param is_vertical: True for vertically-oriented screen, False for horizontally-oriented screen.
    :param scroll_speed: Number of pixels to scroll per frame (higher = faster).
    :param font_size: Font size for the text.
    """
    #Initialize display
    disp = OLED_1in51.OLED_1in51()
    disp.Init()
    disp.clear()

    #Set width and height based on orientation
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
        
        # Draw visible lines based on scroll position
        for i, line in enumerate(lines):
            y_pos = i * font_size - scroll_pos
            if 0 <= y_pos < height:  # only show the lines that are "on the screen"
                draw.text((0, y_pos), line, font=font, fill=0)

        #Update the display based on orientation
        if not is_vertical:
            disp.ShowImage(disp.getbuffer(image))
        else:
            rotated_image = image.rotate(90, expand=True)
            disp.ShowImage(disp.getbuffer(rotated_image))

        time.sleep(0.05) #frame rate was 0.05

        # Scroll down by scroll_speed pixels
        scroll_pos += scroll_speed

    disp.clear()

def write_song(lyrics):
    """
    Gracefully reads the lyrics from a file and scrolls them on the OLED display.
    """
    try:
        scroll_text(lyrics, True)
    except:
        print("No OLED display detected")
        print(f"lyrics: {lyrics}")
