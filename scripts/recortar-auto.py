"""Recorta un auto de una foto: fondo transparente, ajustado al borde y con
las ruedas apoyadas abajo. Uso: python recortar.py foto.jpg salida.webp"""
import sys
import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

entrada, salida = sys.argv[1], sys.argv[2]
im = Image.open(entrada).convert("RGB")
if im.width > 2600:
    im = im.resize((2600, round(im.height * 2600 / im.width)), Image.LANCZOS)
sesion = new_session("isnet-general-use")
res = remove(im, session=sesion, alpha_matting=True,
             alpha_matting_foreground_threshold=240,
             alpha_matting_background_threshold=15,
             alpha_matting_erode_size=8)
a = np.array(res)
alpha = a[..., 3]
# quedarse con el trozo más grande (el auto) y descartar restos sueltos
bin_ = alpha > 40
lab, n = ndimage.label(bin_)
if n > 1:
    tam = ndimage.sum(bin_, lab, range(1, n + 1))
    grande = 1 + int(np.argmax(tam))
    mascara = ndimage.binary_dilation(lab == grande, iterations=6)
    alpha = np.where(mascara, alpha, 0)
a[..., 3] = alpha
out = Image.fromarray(a, "RGBA")
bbox = out.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
out = out.crop(bbox)
out.save(salida, "WEBP", quality=90, method=6)
print(salida, out.size)
