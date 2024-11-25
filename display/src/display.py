#!/usr/bin/python
# -*- coding:utf-8 -*-

import sys
import os
picdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'pic')
libdir = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), 'lib')
if os.path.exists(libdir):
    sys.path.append(libdir)

import logging    
import time
from waveshare_OLED import OLED_1in51
from PIL import Image,ImageDraw,ImageFont
logging.basicConfig(level=logging.DEBUG)

def write_text(text, large=False, refreshRate=10):
    disp = OLED_1in51.OLED_1in51()
    disp.Init()

    font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 12)

    image = Image.new('1', (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image)
    line_count = 0

    line = ""
    for word in text.split():
        if len(line + word) >= 18:
            draw.text((20, 20 * line_count), line, font=font, fill=0)
            line = ""
            line_count += 1

        line += f"{word} "

    draw.text((20, 20 * line_count), line, font=font, fill=0)

    disp.ShowImage(disp.getbuffer(image))
    time.sleep(2)
    disp.clear()

write_text('testing testing tesitng')