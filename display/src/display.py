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
import traceback
from waveshare_OLED import OLED_1in51
from PIL import Image,ImageDraw,ImageFont
logging.basicConfig(level=logging.DEBUG)

try:
    disp = OLED_1in51.OLED_1in51()

    logging.info("\r1.51inch OLED ")
    # Initialize library.
    disp.Init()
    # Clear display.
    logging.info("clear display")
    disp.clear()

    # Create blank image for drawing.
    font = ImageFont.truetype(os.path.join(picdir, 'Font.ttc'), 12)
    
    fp = open("song.txt")
    for words in fp:
        line = ""
        for word in words:
            if len(line + word) >= 20:
                image = Image.new('1', (disp.width, disp.height), "WHITE")
                draw = ImageDraw.Draw(image)
                draw.text((20, 0), line, font=font, fill=0)
                line = ""

            line += f"{word} "

        disp.ShowImage(disp.getbuffer(image))
        time.sleep(2)
    disp.clear()

except IOError as e:
    logging.info(e)

except KeyboardInterrupt:    
    logging.info("ctrl + c:")
    disp.module_exit()
    exit()
