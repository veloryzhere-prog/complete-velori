from pathlib import Path
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image, ImageDraw, ImageFont, ImageFilter
root=Path(__file__).resolve().parents[1]
out=root/'assets'/'img'
out.mkdir(exist_ok=True,parents=True)
app='https://download.veloryz.online/files/VELORI-Android.apk'
site='https://download.veloryz.online/'
for name,url in [('velori-download-qr.png',app),('velori-site-qr.png',site)]:
  qr=qrcode.QRCode(error_correction=ERROR_CORRECT_H,box_size=15,border=4)
  qr.add_data(url);qr.make(fit=True)
  im=qr.make_image(fill_color='#181327',back_color='white').convert('RGB')
  # Keep QR fully unobstructed for reliable scanning on lower quality cameras.
  im.save(out/name,optimize=True)
font_paths=['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf','/usr/share/fonts/truetype/liberation2/LiberationSans-Bold.ttf']
ft=next((p for p in font_paths if Path(p).exists()),None)
W,H=720,1100
im=Image.new('RGB',(W,H),(17,12,36));d=ImageDraw.Draw(im)
for y in range(H):
 t=y/H
 d.line((0,y,W,y),fill=(int(19+30*t),int(13+19*t),int(45+40*t)))
for rad,x,y in [(270,550,250),(230,40,860)]:
 glow=Image.new('RGBA',(W,H));gd=ImageDraw.Draw(glow)
 gd.ellipse((x-rad,y-rad,x+rad,y+rad),fill=(122,75,255,58))
 glow=glow.filter(ImageFilter.GaussianBlur(95))
 im=Image.alpha_composite(im.convert('RGBA'),glow)
d=ImageDraw.Draw(im)
d.rounded_rectangle((48,45,264,83),radius=19,fill=(111,66,220,100),outline=(179,150,247,140),width=2)
small=ImageFont.truetype(ft,21) if ft else ImageFont.load_default()
mid=ImageFont.truetype(ft,42) if ft else ImageFont.load_default()
big=ImageFont.truetype(ft,80) if ft else ImageFont.load_default()
d.text((65,52),'OFFICIAL GUIDE',font=small,fill='#eee6ff')
icon=Image.open(out/'velori-logo.png').convert('RGBA').resize((260,260))
im.alpha_composite(icon,(230,215));d=ImageDraw.Draw(im)
d.text((58,570),'INSTALL',font=big,fill='white')
d.text((58,667),'VELORI',font=big,fill='white')
d.text((62,790),'60-second Android walkthrough',font=mid,fill='#ded0ff')
d.text((62,862),'Simple steps. Safer downloads.',font=small,fill='#c1b1d9')
d.rounded_rectangle((59,948,660,1017),radius=25,fill='#7444ff')
d.polygon([(345,966),(345,1000),(374,983)],fill='white')
im.convert('RGB').save(out/'install-guide-poster.jpg',quality=87,optimize=True)
# consistent favicon
i=Image.open(out/'velori-logo.png').convert('RGB'); i.resize((96,96)).save(out/'favicon.png',optimize=True)
print('QR destination (active after domain setup):',app)
