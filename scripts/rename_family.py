import sys
from fonttools.ttLib import TTFont

new = sys.argv[1]
for fp in sys.argv[2:]:
    font = TTFont(fp)
    for rec in font["name"].names:
        if rec.nameID in (1, 16):          # 1=Family, 16=Typographic Family
            rec.string = new.encode(rec.getEncoding())
    font.save(fp)
    print(f"✓ {fp} → family set to “{new}”")
