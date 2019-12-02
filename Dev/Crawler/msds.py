import requests
from bs4 import BeautifulSoup

def search(chemi):
    raw = requests.get("https://en.wikipedia.org/wiki/" + chemi)

    html = BeautifulSoup(raw.text, "html.parser")

    info = html.select("table.infobox.bordered tr td")
    cas_num = 0
    acidity = 0
    constell = 0
    moral_mass = 0
    density = 0
    mp = [0]
    bp = [0]
    chemi_formula = ""

    explosive = False  # 폭발성
    flammability = False  # 인화성
    combustilbilty = False  # 연소성
    light_sensitive = False  # 빛반응성
    deliquescent = False  # 조해성
    efforescene = False  # 풍해성
    alkali_metal = False  # 알칼리 메탈
    alkaline_earth_metal = False  # 알칼리안 어스 메탈
    halogen = False  # 할로겐

    for i in range(len(info)):
        if 'CAS Number' in info[i].text:
            cas_num = info[i + 1].text
            cas_num = cas_num.split('Y')[0]
        elif 'Chemical formula' in info[i].text:
            try:
                chemi_formula = info[i + 1].select_one("span.chemf.nowrap").text
            except:
                try:
                    formula_or = info[i + 1]
                    formula_cal = formula_or.select('span')
                    formula_num = formula_or.select('sub')
                    chemi_formula = ""
                    for j in range(len(formula_cal)):
                        chemi_formula += formula_cal[j].text
                        if j <= (len(formula_num) - 1):
                            chemi_formula += formula_num[j].text
                except:
                    chemi_formula = formula_or.text
        elif 'Molar mass' in info[i].text:
            moral_mass_or = info[i + 1].text
            moral_mass = moral_mass_or.split('g')[0]
        elif 'Appearance' in info[i].text:
            constell = info[i + 1].text
        elif 'Density' in info[i].text:
            density_or = info[i + 1].text
            density = density_or.split('(')[0]
            density = density.split('g')[0]
        elif 'Melting point' in info[i].text:
            mp_or = info[i + 1].text
            mp = mp_or.split("°C")
        elif 'Boiling point' in info[i].text:
            bp_or = info[i + 1].text
            bp = bp_or.split("°C")
        elif 'Acidity' in info[i].text:
            acidity_or = info[i + 1].text
            acidity = acidity_or.split('(')[0]
            acidity = acidity.split('[')[0]
        elif 'pictograms' in info[i].text:
            ghs = info[i + 1].select('a.image')
            for one in ghs:
                if "01" in one.attrs['title']:
                    explosive = True
                if "02" in one.attrs['title']:
                    flammability = True
                if "03" in one.attrs['title']:
                    combustilbilty = True

    content = html.select("div#mw-normal-catlinks a")
    for x in range(len(content)):
        if 'Light sensitive' in content[x].text:
            light_sensitive = True
        if 'Deliquescent' in content[x].text:
            deliquescent = True
        if 'Efforescene' in content[x].text:
            efforescene = True
        if 'Halogens' in content[x].text:  # 할로겐
            halogen = True

    if cas_num == 0:
        danger = html.select("table.infobox tr")

        for one in danger:
            one = str(one)
            if "Element category" in one:
                if "Alkali metal" in one:
                    alkali_metal = True
                if "Alkaline earth metal" in one:
                    alkaline_earth_metal = True
            elif 'CAS Number' in one:
                pp = re.compile("\d*-\d*-\d*")
                cas_num = pp.findall(one)
                cas_num = cas_num[0]
            elif 'Molar mass' in one:
                p = re.compile("<td>(.*?)</td>")
                tmp = p.findall(one)
                moral_mass = tmp[0]
            elif 'Appearance' in one:
                p = re.compile("<td>(.*?)</td>")
                tmp = p.findall(one)
                constell = tmp[0]
                constell = constell.split("<")[0]
            elif 'Density' in one:
                p = re.compile("<td>(.*?)</td>")
                density = p.findall(one)[0]
                density = density.split("<")[0]
            elif 'Melting point' in one:
                p = re.compile("<td>(.*?)</td>")
                mp_or = p.findall(one)[0]
                mp = mp_or.split("°C")
                mp = mp[0].split("(")
                mp = mp[-1]
            elif 'Boiling point' in one:
                p = re.compile("<td>(.*?)</td>")
                bp_or = p.findall(one)[0]
                bp = bp_or.split("°C")
                bp = bp[0].split("(")
                bp = bp[-1]
            elif 'Acidity' in one:
                p = re.compile("<td>(.*?)</td>")
                acidity_or = p.findall(one)[0]
                acidity = acidity_or.split('(')[0]
                acidity = acidity.split('[')[0]
            elif 'pictograms' in one:
                if "GHS01" in one:
                    explosive = True
                if "GHS02" in one:
                    flammability = True
                if "GHS03" in one:
                    combustilbilty = True

    if explosive != 0:
        explosive = True
    if flammability != 0:
        flammability = True

    result = {'name': chemi, 'casNo': cas_num, 'formula': chemi_formula, 'status': constell, 'molecular': moral_mass,
              'density': density, 'meltingPoint': mp[0], 'boilingPoint': bp[0], 'ph': acidity,
              "explosive": explosive, 'flammability': flammability, 'combustibility': combustilbilty,
              'photoReaction': light_sensitive, 'deliquescent': deliquescent, 'efforescene': efforescene,
              'alkaliMetal': alkali_metal, 'alkalineEarthMetal': alkaline_earth_metal, 'halogen': halogen}

    return result

