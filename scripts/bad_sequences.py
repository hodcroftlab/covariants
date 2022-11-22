bad_seqs = {
    "Spain/VC-IBV-98006466/2020": "2020-03-07",  # There's one spanish seq with date of 7 March - we think this is wrong.
    # There are five sequences from UK with suspected bad dates: exclude
    "England/LIVE-1DD7AC/2020": "2020-03-10",
    "England/PORT-2D2111/2020": "2020-03-21",
    "England/CAMB-1BA110/2020": "2020-06-11",  # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
    "England/CAMB-1BA0F5/2020": "2020-05-11",  # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
    "England/CAMB-1BA0B9/2020": "2020-05-11",  # suspected that these ones have reversed dd-mm (are actually 5 and 6 Nov)
    "Denmark/DCGC-12020/2020": "2020-03-30",  # this sequence is identical to other Danish seqs with sample date of Oct/Nov..
    "Netherlands/NB-EMC-279/2020": "2020-05-08",  # seems to be date reversal of day/month
    "Italy/APU-IZSPB_321PT/2020": "2020-04-11",  # seems to be date reversal of day/month
    "Tunisia/4107/2020": "2020-03-18",  # date seems to be wrong based on divergence
    "Tunisia/3942/2020": "2020-03-16",  # date seems to be wrong based on divergence
    "Australia/QLD1278/2020": "2020-03-21",  # seems to be wrong date - far too diverged
    "Australia/QLD1276/2020": "2020-03-21",  # seems to be wrong date - far too diverged
    "Sweden/20-08979/2020": "2020-04-06",  # too divergent compared to date (seems to be day/month reversed)
    "Spain/IB-IBV-99010753/2020": "2020-04-21",  # temporarily excluded as early date doesn't match divergence - EU1
    "Spain/IB-IBV-99010754/2020": "2020-04-22",  # temporarily excluded as early date doesn't match divergence - EU1
    "Spain/IB-IBV-99010756/2020": "2020-05-11",  # temporarily excluded as early date doesn't match divergence - EU1
    "Spain/IB-IBV-99010769/2020": "2020-06-18",  # temporarily excluded as early date doesn't match divergence - EU2
    "Spain/IB-IBV-99010761/2020": "2020-05-29",  # temporarily excluded as early date doesn't match divergence - EU2
    "Italy/LAZ-INMI-92/2020": "2010-10-26",  # year given as 2010
    "Italy/LAZ-INMI-93/2020": "2010-10-26",  # year given as 2010
    "Italy/LAZ-INMI-94/2020": "2010-10-27",  # year given as 2010
    "Italy/LAZ-INMI-95/2020": "2010-10-27",  # year given as 2010
    "England/LIVE-DCA612/2020": "2020-03-07",  # far too diverged compared to sample date
    "Netherlands/ZE-EMC-74/2020": "2020-06-11",  # too diverged compared to date. Suspect is 6 Nov - date reversed
    "Spain/RI-IBV-99010966/2009": "2009-09-30",  # date typed wrong
    "Denmark/DCGC-16747/2020": "2020-04-20",  # overdiverged compared to date
    "Tunisia/19695/2020": "2020-07-12",  # overdivrged compared to date
    "Canada/ON-S1598/2020": "2020-04-09",  # confirmed day-month reversal
    "SouthKorea/KDCA0367/2020": "2020-04-04",  # too divergent given date (11)
    "Tunisia/4874/2020": "2020-03-24",  # overdivrged compared to date
    "Germany/SL-SU-10428507/2020": "2020-03-21",  # overdiverged compared to date (S98F)
    "USA/CA-CZB-13378/2020": "2020-05-11",  # overdiverged compared to date
    "USA/CA-LACPHL-AE00055/2020": "2020-07-07",  # overdiverged compared to date
    "USA/CA-LACPHL-AE00059/2020": "2020-07-14",  # overdiverged compared to date
    "USA/CA-LACPHL-AE00058/2020": "2020-07-13",  # overdiverged compared to date
    "Spain/MD-IBV-99007119/2020": "2020-07-28",  # overdiverged compared to date
    "Spain/RI-IBV-99010963/2020": "2020-11-01",  # super diverged - over 40 muts
    "Spain/IB-IBV-99010765/2020": "2020-06-18",  # overdiverged, known sequencing problem with this batch
    "Spain/IB-IBV-99010766/2020": "2020-06-18",  # overdiverged, known sequencing problem with this batch
    "Spain/IB-IBV-99010764/2020": "2020-06-16",  # overdiverged, known sequencing problem with this batch
    "USA/MI-MDHHS-SC23078/2021": "2021-02-15",  # future date
    "USA/MI-MDHHS-SC23104/2021": "2021-12-02",  # future date
    "Poland/Pomorskie_MWB_51/2021": "2022-01-24",  # future date
    "Romania/Bucuresti408383/2021": "2021-12-31",  # future date
    "Germany/SL-SU-10429159/2020": "2020-03-04",  # divergence 30+, date March! Overdiverged
    "USA/CA-LACPHL-AF00294/2020": "2020-01-18",  # suspect should be 2021 instead - overdiverged
    "Mexico/ROO-InDRE_243/2020": "2020-07-06",  # very overdiverged compared to date - fits in diversity of 452 cluster!
    "Spain/MD-IBV-97010024/2020": "2020-03-19",  # overdiveged compared to date - 19 muts, given date March
    "England/NOTT-246E8A/2020": "2020-06-01",  # over diverged compared to date - 1 June but nested deep in EU1 diversity
    "France/IDF_HB_112003050333/2020": "2020-03-13",  # over diverged compared to date - 20 muts, but 13 March
    "Spain/MD-IBV-99018532/2020": "2020-02-14",  # overdiverged compared to date - 19 muts but 14 Feb
    "Germany/SL-SU-10429159/2020": "2020-03-24",  # overdiverged: 33 muts, march 2020 date. EU2
    "Germany/BAV-PL-virotum_6ZA86/2020": "2020-05-22",  # very poor quality
    "Germany/BAV-PL-virotum_DN6S6/2020": "2020-05-20",  # very poor quality
    "Germany/BB-RKI-I-017293/2001": "2001-02-05",  # 2001 date impossible
    "Senegal/SN_MBO_201677/2021": "2012-01-02",  # 2012 date impossible (S69)
    "Netherlands/NB-EMC-748/2020": "2020-01-09",  # too divergenced to be from 9 Jan 2020...
    "SouthAfrica/KRISP-K010011/2020": "1905-07-12",  # impossible date
    "USA/CA-LACPHL-AF00662/2020": "2020-03-10",  # divergence of 20 with date March 2020 highly unlikely - prob year mixup
    "Netherlands/ZH-EMC-1944/2020": "2020-03-10",  # EU2 - too diverged for date
    "Italy/LAZ-TIGEM-6927/2021": "2017-11-21",  # impossible year of 2017
    "USA/TN-UT2050/2020" : "2020-06-04", #pelican - too diverged
    "USA/TN-UT2063/2020" : "2020-06-03", #pelican - too diverged
    "USA/NMDOH-2021083688/2020" : "2020-03-02", #S:452R - too diverged
    "Spain/VC-IBV-99028305/2020": "2020-03-15", #V1 - impossible given date
    "Italy/MAR-UnivPM30_45476/2020":  "2002-10-04", #impossible date
    "Italy/MAR-UnivPM31_45989/2020":  "2002-10-05", #impossible date
    "Italy/MAR-UnivPM32_47190/2020":  "2002-10-05", #impossible date
    # All these are European sequences, borderline, but divergence does not suggest they are real
    "England/NOTT-246E4E/2020":  "2020-06-02",
    "England/NOTT-246EF3/2020":  "2020-06-03",
    "England/NOTT-246FD2/2020":  "2020-06-03",
    "Wales/PHWC-49C25A/2020":  "2020-07-07",
    "Wales/PHWC-4BD059/2020":  "2020-06-17",
    "England/NOTT-246E11/2020":  "2020-06-03",
    "England/MILK-69DECC/2020":  "2020-07-02",
    "Netherlands/ZH-EMC-1863/2020":  "2020-07-12",
    "Germany/BAV-PL-virotum_DZBZW/2020":  "2020-06-19",
    "England/NOTT-246E3F/2020":  "2020-06-02",
    "England/NOTT-246F96/2020":  "2020-06-02",
    "England/NOTT-246F4B/2020":  "2020-06-03",
    "England/NOTT-246F3C/2020":  "2020-06-03",
    "England/NOTT-246E20/2020":  "2020-06-03",
    "Netherlands/ZH-EMC-1818/2020":  "2020-06-12",
    "Netherlands/ZH-EMC-1819/2020":  "2020-06-12",
    "France/IDF_HB_112007052326/2020":  "2020-07-15",
    "USA/ND-NDDH-02591/2021": "2021-09-28", #from the future
    "Mexico/AGU-InDRE_FB18599_S4467/2020": "2020-09-22", #delta
    "USA/MI-MDHHS-SC30215/2020" : "2020-04-19", # alpha
    "USA/MI-MDHHS-SC25865/2020" : "2020-04-15", # robin 1
    "Colombia/ANT-CWOHC-VG-SEC01275A/2020" : "2020-09-21", # bad quality
    "Ecuador/USFQ-1969/2021" : "2021-08-13", # divergence is 0-10 muts!
    "Ecuador/USFQ-1977/2021" : "2021-08-13", # divergence is 0-10 muts!
    "Ecuador/USFQ-1981/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1983/2021" : "2021-08-17", # divergence is 0-10 muts!
    "Ecuador/USFQ-1986/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1987/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1988/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1989/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1990/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1996/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1997/2021" : "2021-08-16", # divergence is 0-10 muts!
    "Ecuador/USFQ-1999/2021" : "2021-08-18", # divergence is 0-10 muts!
    "Ecuador/USFQ-2005/2021" : "2021-08-19", # divergence is 0-10 muts!
    "Ecuador/USFQ-2007/2021" : "2021-08-19", # divergence is 0-10 muts!
    "Ecuador/USFQ-2009/2021" : "2021-08-19", # divergence is 0-10 muts!
    #alpha, all below
    "USA/CA-SEARCH-101999/2020" : "2020-07-08",
    "USA/CA-SEARCH-101987/2020" : "2020-07-08",
    "USA/CA-SEARCH-102007/2020" : "2020-07-08",
    "USA/MI-MDHHS-SC30215/2020" : "2020-04-19",
    "USA/CA-SEARCH-101973/2020" : "2020-07-11",
    "USA/CA-SEARCH-102015/2020" : "2020-07-09",
    "USA/CA-SEARCH-101984/2020" : "2020-07-11",
    "USA/CA-SEARCH-101991/2020" : "2020-07-08",
    "Canada/QC-1nJWFTV-3641914/2020" : "2020-07-01",
    "Canada/QC-1nJWFTV-3642019/2020" : "2020-07-24",
    "Canada/QC-1nJWFTV-3643537/2020" : "2020-09-25",
    "USA/TX-HMH-MCoV-35256/2020" : "2020-08-10",
    "Slovenia/08-039382-MB/2020" : "2020-09-14",
    "Spain/MD-HRYC-71299296/2020" : "2020-08-26",
    "USA/AZ-TG808802/2020" : "2020-08-24",
    # These sequences are from EU1 - early dated but the divergence doesn't match the dates...
    "England/NOTT-246E3F/2020": "2020-06-02",
    "England/NOTT-246E11/2020": "2020-06-03",
    "England/NOTT-246E20/2020": "2020-06-03",
    "England/NOTT-246F3C/2020": "2020-06-03",
    "England/NOTT-246F4B/2020": "2020-06-03",
    "England/NOTT-246F96/2020": "2020-06-02",
    "England/NOTT-246E4E/2020": "2020-06-02",
    "England/NOTT-246EF3/2020": "2020-06-03",
    "England/NOTT-246FD2/2020": "2020-06-03",
    "England/NOTT-246E99/2020": "2020-06-02",
    "Germany/BAV-PL-virotum_DZBZW/2020": "2020-06-19",
    "Wales/PHWC-4BD059/2020": "2020-06-17",
    "Wales/PHWC-49C25A/2020": "2020-07-07",
    "Netherlands/NB-EMC-855/2020": "2020-01-11",
    "Netherlands/ZH-EMC-1916/2020": "2020-01-10",
    "Netherlands/ZH-EMC-1917/2020": "2020-01-10",
    "Netherlands/ZH-EMC-1918/2020": "2020-01-10",
    "Netherlands/ZH-EMC-1919/2020": "2020-03-10",
    "Netherlands/ZH-EMC-1925/2020": "2020-01-10",
    "Netherlands/ZH-EMC-2079/2020": "2020-02-15",
    "Netherlands/ZH-EMC-2080/2020": "2020-02-15",
    "Netherlands/NB-EMC-751/2020": "2020-04-09",
    "Netherlands/ZH-EMC-1816/2020": "2020-04-12",
    "Italy/CAM-CRGS-544/2020": "2020-03-14",
    "Spain/IB-HUSE-00001/2020": "2020-03-02",
    "Spain/VC-IBV-99028301/2020": "2020-03-17",
    "Belgium/MBLGc7385/2020":   "2020-05-20",
    "England/NOTT-246D8D/2020": "2020-06-02",
    "France/IDF-HB_112010014593/2020": "2020-03-10",
    "England/SHEF-10B2F49/2020" : "2020-05-21", 
    "Belgium/LHUB11590048/2020" : "2020-03-31",
    'bat/Yunnan/RaTG13/2013'    : "2013-07-24", #this is RatG13 - legit, but looks weird in table
    'bat/Yunnan/RmYN02/2019'    : "2019-06-25", # bat sequence - legit but looks weird
    "Morocco/INH-107/2020" : "2020-02-02", 
    "Morocco/INH-108/2020" : "2020-02-02", 
    "Morocco/INH-109/2020" : "2020-02-02", 
    "bat/Yunnan/RmYN01/2019" : "2019-06-25", 

    # these are all before expected cluster start date:
    "Canada/NS-NML-2284/2020" : "2020-05-14",
    "Germany/BY-MVP-000003914/2020" : "2020-05-19",
    "Germany/BY-MVP-000004014/2020" : "2020-05-19",
    "Spain/CL-IBV-98029694/2020" : "2020-05-19",
    "Spain/CL-IBV-98029695/2020" : "2020-05-19",
    "Spain/CL-IBV-98029696/2020" : "2020-05-19",
    "Spain/CL-IBV-98029697/2020" : "2020-05-19",
    "Switzerland/SO-UHB-42850063/2021" : "2020-05-11",
    "USA/KS-KHEL-1913/2020" : "2020-05-20",
    "USA/TX-HMH-MCoV-40892/2020" : "2020-07-22",
    "USA/TX-HMH-MCoV-40911/2020" : "2020-07-22",
    "USA/TX-HMH-MCoV-40977/2020" : "2020-07-21",
    "USA/TX-HMH-MCoV-41485/2020" : "2020-07-31",
    "Kenya/ICGEB-KEMRI-7_S23_S7_S21_S25/2021" : "2020-09-09",
    "Nigeria/S03/2020" : "2020-08-12",
    "Japan/PG-50814/2020" : "2020-04-24",
    "Japan/PG-50815/2020" : "2020-04-24",
    "Japan/PG-50816/2020" : "2020-04-24",
    "Japan/PG-50817/2020" : "2020-04-25",
    "Japan/PG-50818/2020" : "2020-04-25",
    "Japan/PG-50819/2020" : "2020-04-25",
    "Japan/PG-50820/2020" : "2020-04-25",
    "HongKong/HKPU-00083/2020" : "2020-02-25",
    "HongKong/HKPU-00084/2020" : "2020-02-25",
    "Italy/CAM-TIGEM-IZSM-COLLI-14397/2021" : "2020-03-16",
    "Poland/NIPH-NIH_ECDC-4488/2021" : "2020-04-22",
    "SouthKorea/KDCA4115/2020" : "2020-04-26",
    "Spain/CL-COV00781/2020" : "2020-02-07",
    "Spain/ML-ISCIII-214384/2020" : "2020-04-22",
    "Sweden/01_SE100_21CS503247/2020" : "2020-03-12",
    "Switzerland/SO-UHB-42850063/2021" : "2020-05-11",
    "Switzerland/VD-CHUV-GEN2474/2020" : "2020-03-09",
    "USA/CA-CZB-32337/2020" : "2020-04-12",
    "USA/DC-DFS-PHL-0666/2021" : "2020-01-19",
    "USA/IL-RIPHL_30044_G/2021" : "2020-04-17",
    "USA/IN-ISDHQ396/2020" : "2020-04-23",
    "USA/IN-ISDHQ401/2020" : "2020-04-23",
    "USA/IN-ISDHQ403/2020" : "2020-04-23",
    "USA/IN-ISDHQ404/2020" : "2020-04-23",
    "USA/IN-ISDHQ405/2020" : "2020-04-23",
    "USA/IN-ISDHQ407/2020" : "2020-04-23",
    "USA/MI-MDHHS-SC28884/2021" : "2020-04-07",
    "USA/MI-MDHHS-SC28909/2021" : "2020-04-12",
    "USA/NY-COV-1352/2020" : "2020-03-19",
    "USA/TX-HMH-MCoV-40892/2020" : "2020-07-22",
    "USA/TX-HMH-MCoV-40911/2020" : "2020-07-22",
    "USA/TX-HMH-MCoV-40977/2020" : "2020-07-21",
    "USA/TX-HMH-MCoV-41485/2020" : "2020-07-31",
    "USA/UT-UPHL-2104759182/2020" : "2020-04-10",
    "Qatar/QA.QU_18.10.B12/2020" : "2020-03-27",
    "Qatar/QA.QU_18.10.E12/2020" : "2020-04-05",
    "USA/SC-DHEC-1826/2020" : "2020-05-07",
    "Zimbabwe/CERI-KRISP-K011643/2020" : "2020-07-09",
    "Zimbabwe/CERI-KRISP-K011662/2020" : "2020-05-27",
    "Brazil/GO-2732R1/2021" : "2020-10-26",
    "Brazil/PB-BA1200-250009713/2020" : "2020-10-01",
    "Brazil/PR-L119-CD7789/2020" : "2020-10-26",
    "Brazil/SP-L112-CD4087/2020" : "2020-09-11",
    "USA/IL-RED-FUL-39828238/2020" : "2020-04-07",
    "USA/IN-ISDHQ409/2020" : "2020-04-23",
    "India/MP-NCDC-2509230/2020" : "2020-09-07",
    "India/un-IRSHA-CD210871/2020" : "2020-03-03",
    "India/un-IRSHA-CD210927/2020" : "2020-03-06",
    "India/un-IRSHA-CD210929/2020" : "2020-03-06",
    "USA/CA-LACPHL-AF00986/2020" : "2020-04-21",
    "USA/IN-ISDHQ400/2020" : "2020-04-23",
    "USA/CA-ACPHD-00310/2020" : "2020-04-11",
    "USA/NV-NSPHL-357909/2020" : "2020-04-15",
    "USA/OH-ODH-SC1040172/2020" : "2020-02-08",
    "Belgium/UZA-UA-CV0615326772/2020" : "2020-02-06",
    "France/IDF-HB_112010005538/2020" : "2020-01-10",
    "France/IDF-HB_112010012225/2020" : "2020-03-10",
    "France/IDF-HB_112010016707/2020" : "2020-05-10",
    "France/NOR-04525421/2020" : "2020-03-11",
    "Netherlands/NB-EMC-849/2020" : "2020-06-10",
    "bat/Cambodia/RShSTT182/2010" : "2010-12-06",
    "bat/Cambodia/RShSTT200/2010" : "2010-12-06",
    "Belgium/UZA-UA-CV2006969709/2020" : "2020-02-14",
    "Netherlands/NB-EMC-750/2020" : "2020-02-09",
    "Netherlands/NB-EMC-811/2020" : "2020-02-12",
    "Netherlands/NB-EMC-812/2020" : "2020-04-12",
    "Netherlands/NB-EMC-837/2020" : "2020-04-11",
    "Netherlands/ZH-EMC-1922/2020" : "2020-03-10",
    "Netherlands/ZH-EMC-1934/2020" : "2020-03-10",
    "Netherlands/ZH-EMC-2849/2020" : "2020-04-12",
    "Poland/KCZ_1.73/2020" : "2020-01-14",
    "Sweden/01_SE100_21CS101869/2020" : "2020-05-12",
    "Canada/QC-1nKGZ-Q8090981/2020" : "2020-04-09",
    "USA/MD-HP07440-PIDRGJGOUB/2020" : "2020-07-15",
    "USA/MD-HP07441-PIDNJPIZZN/2020" : "2020-07-22",
    "Mexico/YUC-NYGC-39037-20/2020" : "2020-08-28", # 20B/S.732
    "Belgium/MR81DY0537/2020" : "2020-05-01", #S98
    "Senegal/SC20-504/2020" : "2020-08-28", #Alpha, V1
    "Senegal/SC20-507/2020" : "2020-08-02", #Alpha, V1
    "Canada/QC-1nMCY-S1190638/2020" : "2020-05-19", #Alpha V1
    "Canada/QC-1nMCY-S1190677/2020" : "2020-05-19", #Alpha V1
    "India/DL-ILBS-17395/2020" : "2020-06-04", #delta
    "USA/CA-ALSR-105475/2020" : "2020-07-11", #alpha
    "USA/CT-CDC-2-4331901/2020" : "2020-04-14", #alpha
    "Brazil/PA-ITV-65/2020" : "2020-05-06", #gamma
    "Brazil/PA-ITV-69/2020" : "2020-05-06", #gamma
    "USA/NY-GEO-0231/2020" : "2020-01-28", # 20c/484K
    "USA/MA-UMASSMED-P006D11/2020" : "2020-04-30", #epsilon S452
    "Canada/QC-1nMCY-S1110667/2020" : "2020-05-11", #alpha
    "Indonesia/JK-FKUI-MKIM21/2020" : "2020-08-25", #delta
    "Indonesia/JK-FKUI-MKIM24/2020" : "2020-10-15", #delta
    "Indonesia/JK-FKUI-MKIM26/2020" : "2020-10-12", #delta
    "Indonesia/JK-FKUI-MKIM27/2020" : "2020-10-12", #delta
    "Indonesia/JK-FKUI-MKIM33/2020" : "2020-09-28", #delta
    "Indonesia/JK-FKUI-MKIM35/2020" : "2020-10-07", #delta
    "USA/AZ-TG968438/2020" : "2020-10-22", #delta
    "USA/AZ-TG968448/2020" : "2020-10-23", #delta
    "USA/AZ-TG968459/2020" : "2020-10-02", #delta
    "USA/AZ-TG968474/2020" : "2020-10-29", #delta
    "USA/AZ-TG968478/2020" : "2020-10-29", #delta
    "USA/AZ-TG968492/2020" : "2020-10-03", #delta
    "USA/AZ-TG968499/2020" : "2020-09-17", #delta
    "USA/AZ-TG968502/2020" : "2020-09-21", #delta
    "USA/AZ-TG968441/2020" : "2020-10-22", #iota
    "USA/CA-CDPH1224/2020" : "2020-03-11", #epsilon
    "Canada/QC-L00333784001/2020" : "2020-03-12", # 477
    "India/GJ-INSACOG-GBRC1538/2020" : "2020-03-19", #kappa
    "India/GJ-INSACOG-GBRC1539/2020" : "2020-03-17", #kappa
    "Brazil/PE-FIOCRUZ-IAM3285/2020" : "2020-09-22", # gamma - too divergent - not near base
    "France/PAC-IHU-3957-Nano1/2020" : "2020-09-03", #alpha
    "France/PAC-IHU-3957_Nano1/2020" : "2020-09-03", #alpha
    "France/PAC-IHU-5143-N1/2021" : "2020-05-24", #alpha
    "France/PAC-IHU-5148-N1/2021" : "2020-08-26", #alpha
    "Germany/SN-RKI-I-213505/2020" : "2020-08-21", #delta
    "England/PHEC-U303UC24/2021"  : "2020-03-20", #alpha
    "England/PHEC-U303UC33/2021"  : "2020-03-20", #alpha
    "Italy/VEN-IZSVe-21RS8085-7_TV/2020" : "2020-08-13", #delta
    "USA/DC-DFS-PHL-01331/2020" : "2020-08-10", #delta
    "India/GJ-INSACOG-GBRC2186/2020" : "2020-03-19", #delta
    "India/GJ-INSACOG-GBRC2187/2020" : "2020-03-17", #delta
    "Italy/CAM-TIGEM-IZSM-COLLI-14397/2020" : "2020-03-16", #alpha
    "Kenya/ICGEB-KEMRI-7_S23_S7_S21_S25/2020" : "2020-09-09", #alpha
    "Poland/NIPH-NIH_ECDC-4488/2020" : "2020-04-22", #alpha
    "Switzerland/SO-UHB-42850063/2020" : "2020-05-11", #alpha
    "USA/IL-RIPHL_30044_G/2020" : "2020-04-17", #alpha
    "USA/MI-MDHHS-SC28884/2020" : "2020-04-07", #alpha
    "USA/MI-MDHHS-SC28909/2020" : "2020-04-12", #alpha
    "BurkinaFaso/CV1920/2020" : "2020-09-16", #delta
    "BurkinaFaso/CV1921/2020" : "2020-09-18", #delta
    "BurkinaFaso/CV1728/2020" : "2020-03-28", # 20A.484
    "USA/MS-USAFSAM-S3006/2020" : "2020-10-05", #21H
    "Argentina/PAIS-A0964/2020" : "2020-07-22", #gamma
    "Argentina/PAIS-A0965/2020" : "2020-08-01", #gamma
    "Spain/UN-ORC01380/2020" : "2020-03-26", #alpha
    "USA/CA-ALSR-101973/2020" : "2020-07-11", #alpha
    "USA/CA-ALSR-101984/2020" : "2020-07-11", #alpha
    "USA/CA-ALSR-101987/2020" : "2020-07-08", #alpha
    "USA/CA-ALSR-101991/2020" : "2020-07-08", #alpha
    "USA/CA-ALSR-101999/2020" : "2020-07-08", #alpha
    "USA/CA-ALSR-102007/2020" : "2020-07-08", #alpha
    "USA/CA-ALSR-102015/2020" : "2020-07-09", #alpha
    "USA/MN-MDH-13426/2020" : "2020-08-07", #delta
    "USA/WI-WSLH-219155/2020" : "2020-08-12", #delta
    "USA/WY-WYPHL-21070660/2020" : "2020-09-02", #delta
    "USA/VI-Yale-10210/2020" : "2020-08-21", #delta
    "USA/VI-Yale-10211/2020" : "2020-08-21", #delta
    "USA/TX-HMH-MCoV-40926/2020" : "2020-07-22", #alpha
    "USA/TX-HMH-MCoV-40929/2020" : "2020-07-22", #alpha
    "Vanuatu/VAN003/2020" : "2020-04-17", #alpha
    "Rwanda/CV2217/2020" : "2020-06-04", #beta
    "England/MILK-1FF99A3/2020" : "2020-04-16", #delta
    "England/MILK-1FF99C1/2020" : "2020-04-16", #delta
    "England/MILK-1FF9A19/2020" : "2020-04-16", #delta
    "England/MILK-1FF9A37/2020" : "2020-04-16", #delta
    "England/MILK-1FF9A46/2020" : "2020-04-16", #delta
    "England/MILK-1FF9A64/2020" : "2020-04-16", #delta
    "England/MILK-1FF9A82/2020" : "2020-04-16", #delta
    "England/MILK-1FF9ABF/2020" : "2020-04-16", #delta
    "England/MILK-1FF9ADD/2020" : "2020-04-16", #delta
    "England/MILK-1FF9B43/2020" : "2020-04-19", #delta
    "England/MILK-1FF9B8F/2020" : "2020-04-16", #delta
    "England/MILK-1FF9BE9/2020" : "2020-04-16", #delta
    "England/MILK-1FF9D6B/2020" : "2020-04-16", #delta
    "England/MILK-1FF9DA7/2020" : "2020-04-16", #delta
    "England/MILK-1FF9DC5/2020" : "2020-04-18", #delta
    "England/MILK-1FF9DD4/2020" : "2020-04-16", #delta
    "England/MILK-1FF9DF2/2020" : "2020-04-16", #delta
    "England/MILK-1FF9FB0/2020" : "2020-04-16", #delta
    "England/MILK-1FF9FDE/2020" : "2020-04-16", #delta
    "England/MILK-1FF9FFC/2020" : "2020-04-16", #delta
    "England/MILK-1FFA034/2020" : "2020-04-16", #delta
    "England/MILK-1FFA061/2020" : "2020-04-16", #delta
    "England/MILK-1FFA0BC/2020" : "2020-04-16", #delta
    "England/MILK-1FFA131/2020" : "2020-04-16", #delta
    "England/MILK-1FFA17D/2020" : "2020-04-16", #delta
    "England/MILK-1FFA19B/2020" : "2020-04-16", #delta
    "England/MILK-1FFA1B9/2020" : "2020-04-16", #delta
    "England/MILK-1FFA1D7/2020" : "2020-04-16", #delta
    "England/MILK-1FFA25C/2020" : "2020-04-16", #delta
    "England/MILK-1FFA2A7/2020" : "2020-04-16", #delta
    "England/MILK-1FFA30E/2020" : "2020-04-16", #delta
    "England/MILK-1FFA359/2020" : "2020-04-16", #delta
    "England/MILK-1FFA438/2020" : "2020-04-16", #delta
    "England/MILK-1FFA492/2020" : "2020-04-16", #delta
    "England/MILK-1FFA4B0/2020" : "2020-04-16", #delta
    "England/MILK-1FFA4ED/2020" : "2020-04-16", #delta
    "England/MILK-1FFA4FC/2020" : "2020-04-16", #delta
    "England/MILK-1FFA508/2020" : "2020-04-16", #delta
    "England/MILK-1FFA526/2020" : "2020-04-16", #delta
    "Fiji/FJ493/2020" : "2020-08-25", #delta
    "Rwanda/CV2197/2020" : "2020-09-10", #delta
    "USA/ND-NDDH-4397/2020" : "2020-09-09", #delta
    "USA/WV-WVU-WV121217/2020" : "2020-07-21", #delta
    "Sudan/N6667/2020" : "2020-10-04", #eta
    "Colombia/DC-Mx263_sarscov2/2020" : "2020-09-19", #21H
    "Colombia/DC-Mx318_sarscov2/2020" : "2020-10-06", #21H
    "Morocco/INH-101/2020" : "2020-02-02", #S98
    "Morocco/INH-105/2020" : "2020-02-02", #S98
    "USA/IN-ISDHQ397/2020" : "2020-04-23", #alpha
    "USA/TX-HMH-MCoV-44272/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45474/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45482/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45578/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45753/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-47089/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-47116/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-47370/2020" : "2020-07-30", #alpha
    "USA/TX-HMH-MCoV-39835/2020" : "2020-08-06", #alpha
    "USA/TX-HMH-MCoV-44274/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45478/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45481/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45754/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45758/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45768/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-47118/2020" : "2020-07-31", #alpha
    "USA/NY-MSHSPSP-PV21126/2020" : "2020-10-11", # 20C/S484
    "USA/NY-MSHSPSP-PV21129/2020" : "2020-10-10", # 20C/S484
    "USA/NY-MSHSPSP-PV21166/2020" : "2020-10-09", # 20C/S484
    "USA/NY-MSHSPSP-PV21203/2020" : "2020-10-13", # 20C/S484
    "Pakistan/UOL-IMBB-KKU-25/2021" : "2021-10-22", #future date
    "Pakistan/UOL-IMBB-KKU-26/2021" : "2021-10-23", #future date
    "England/PHEP-YYBYUTJ/2020" : "2020-08-03", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0168/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0169/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0170/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0172/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0200/2020" : "2020-07-29", #delta
    "USA/CA-SEARCH-109796/2020" : "2020-08-31", #delta
    "USA/TX-HMH-MCoV-48794/2020" : "2020-07-15", #delta
    "USA/TX-HMH-MCoV-49501/2020" : "2020-07-13", #delta
    "Italy/VEN-UA-ORC00183/2020" : "2020-03-14", #alpha
    "Brazil/SP-IB_112782/2020" : "2020-08-07", #gamma
    "Japan/PG-149116/2020" : "2020-08-30", #Delta
    "Germany/NW-RKI-I-291769/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291770/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291771/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291772/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291773/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291774/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291775/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291776/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291777/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291778/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291779/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291780/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291781/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291782/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291783/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291784/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291786/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291788/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291789/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291790/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291791/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291792/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291793/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291794/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291795/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291796/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291797/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291798/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291799/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291800/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291801/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291802/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291803/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291804/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291805/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291806/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291808/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291809/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291810/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291811/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291812/2020" : "2020-10-16", #delta
    "Germany/SL-RKI-I-297962/2020" : "2020-10-17", #delta
    "USA/NY-COV-900/2020" : "2020-06-06", #Alpha
    "Peru/LIM-INS-8425/2020" : "2020-07-21", # lambda
    "Netherlands/ZH-EMC-3837/2020" : "2020-05-10", #S98
    "Netherlands/ZH-EMC-3838/2020" : "2020-03-12", #S98
    "Netherlands/ZH-EMC-3839/2020" : "2020-04-12", #S98
    "England/NORT-YYNW7P/2020" : "2020-10-27", #delta
    "USA/TX-HMH-MCoV-34911/2020" : "2020-08-13", #Alpha
    "Colombia/ANT-LDSP461/2020" : "2020-10-14", #Mu
    "India/DL-ILBS-22053/2020" : "2020-06-13", #21A Delta
    "Italy/LOM-TIGEM-IZSM-COLLI-14397/2020" : "2020-03-16", #alpha
    "Italy/SIC_ISS_7543/2020" : "2020-03-02", #alpha
    "Romania/SV_SJU_17854/2020" : "2020-08-16", #alpha
    "Romania/SV_SJU_18749/2020" : "2020-08-26", #alpha
    "Romania/SV_SJU_19042/2020" : "2020-08-28", #alpha
    "USA/TX-HMH-MCoV-40893/2020" : "2020-07-22", #alpha
    "USA/TX-HMH-MCoV-45566/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45752/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-45766/2020" : "2020-07-31", #alpha
    "SouthAfrica/NICD-N19828/2020" : "2020-06-26", #beta
    "SouthAfrica/NICD-N19829/2020" : "2020-06-26", #beta
    "Brazil/MS-HRMS_1490/2020" : "2020-08-24", #gamma
    "India/TG-CCMB-CIB1089/2020" : "2020-10-04", #delta
    "India/TG-CCMB-CIB1094/2020" : "2020-10-20", #delta
    "India/TG-CCMB-CIB1117/2020" : "2020-08-26", #delta
    "India/TG-CCMB-CIB1118/2020" : "2020-08-26", #delta
    "India/TG-CCMB-CIB1124/2020" : "2020-08-29", #delta
    "India/TG-CCMB-CIB1125/2020" : "2020-08-29", #delta
    "India/TG-CCMB-CIB1133/2020" : "2020-09-12", #delta
    "India/TG-CCMB-CIB1134/2020" : "2020-09-22", #delta
    "India/TG-RFCH00157_CIB1134/2020" : "2020-09-22", #delta
    "SouthAfrica/NICD-N19863/2020" : "2020-06-26", #delta
    "India/TG-CCMB-CIB1077/2020" : "2020-10-02", #delta
    "PapuaNewGuinea/PNG4040/2020" : "2020-08-01", #delta
    "SouthAfrica/NICD-N19840/2020" : "2020-07-07", #delta
    "USA/CA-CDPH-MC2409222/2020" : "2020-10-10", #delta
    "USA/NY-WMC2021-152/2020" : "2020-03-12", #delta
    "USA/CA-CZB-13785/2020" : "2020-09-22", #iota
    "USA/NY-MSHSPSP-PV22505/2020" : "2020-11-03", #iota
    "England/PHEP-YYBYUTJ/2020" : "2020-08-03", #delta
    "USA/TX-HMH-MCoV-49453/2020": "2020-07-12", #delta
    "USA/TX-HMH-MCoV-49803/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49806/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49808/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49809/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49814/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49815/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49816/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49817/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49827/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49831/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49836/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49838/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49840/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49851/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49852/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49854/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49855/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49859/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49862/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49866/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49873/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49874/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49876/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49878/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49880/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49881/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49883/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49888/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49889/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49892/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49894/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49896/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49898/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49899/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49901/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49905/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49911/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49913/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49915/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49917/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49919/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49920/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49922/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49923/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49924/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49925/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49928/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49930/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49933/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49935/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49937/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49938/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49939/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49946/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49948/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49951/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49953/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49958/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49959/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49963/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49966/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49969/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49973/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49975/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49976/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49978/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49982/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49984/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49985/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49988/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49989/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49994/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50010/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50013/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50024/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50028/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50034/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50045/2020" : "2020-07-15", #delta
    "USA/TX-HMH-MCoV-50046/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50067/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50486/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50501/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50545/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50566/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50048/2020" : "2020-07-20", #delta
    "USA/TX-HMH-MCoV-50050/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50068/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50082/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50084/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50493/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50519/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-49841/2020" : "2020-07-16", #delta

    # these are suspicious dates - seem unlikely when checked in Nextclade
    "England/PHEP-YYBYUTJ/2020" : "2020-08-03", #delta
    "Fiji/FJ493/2020" : "2020-08-25", #delta
    "BurkinaFaso/CV1920/2020" : "2020-09-16", #delta
    "BurkinaFaso/CV1921/2020" : "2020-09-18", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0168/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0169/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0170/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0172/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0200/2020" : "2020-07-29", #delta
    "Mexico/AGU-InDRE_FB18599_S4467/2020" : "2020-09-22", #delta
    "PapuaNewGuinea/PNG4040/2020" : "2020-08-01", #delta
    "Rwanda/CV2197/2020" : "2020-09-10", #delta
    "SouthAfrica/NICD-N19840/2020" : "2020-07-07", #delta
    "SouthAfrica/NICD-N19863/2020" : "2020-06-26", #delta
    "USA/CA-LACPHL-AF03229/2020" : "2020-08-12", #delta
    "USA/CA-SEARCH-109796/2020" : "2020-08-31", #delta
    "USA/ND-NDDH-4397/2020" : "2020-09-09", #delta
    "USA/NY-WMC2021-152/2020" : "2020-03-12", #delta
    "USA/TX-HMH-MCoV-48794/2020" : "2020-07-15", #delta
    "USA/TX-HMH-MCoV-49501/2020" : "2020-07-13", #delta
    "USA/VI-Yale-10210/2020" : "2020-08-21", #delta
    "USA/VI-Yale-10211/2020" : "2020-08-21", #delta
    "USA/WV-WVU-WV121217/2020" : "2020-07-21", #delta
    "USA/WY-WYPHL-21070660/2020" : "2020-09-02", #delta
    "Rwanda/CV2223/2020" : "2020-12-21", #delta
    "Scotland/CVR8617/2020" : "2020-12-27", #delta
    "Slovenia/17-047667-CE/2020" : "2020-11-13", #delta
    "Slovenia/17-073336-CE/2020" : "2020-12-31", #delta
    "Slovenia/251283/2020" : "2020-12-04", #delta
    "Spain/CT-HUGTiPM043JX9G11/2020" : "2020-11-03", #delta
    "Spain/MD-HRYC-1052050/2020" : "2020-11-18", #delta
    "Sweden/10097141/2020" : "2020-11-19", #delta
    "USA/CA-CDPH-MC2409222/2020" : "2020-10-10", #delta
    "USA/MD-HP20064-PIDZAEYGDO/2020" : "2020-11-03", #delta
    "USA/NY-NYCPHL-005674/2020" : "2020-11-20", #delta
    "USA/TX-HHD-210729KVI6183/2020" : "2020-12-26", #delta
    "USA/TX-Noblis-S709B19/2020" : "2020-12-03", #delta
    "USA/TX-Noblis-S710B20/2020" : "2020-12-03", #delta
    "USA/UT-UPHL-210729652440/2020" : "2020-12-16", #delta
    "USA/WY-WYPHL-20167074/2020" : "2020-12-16", #delta
    "BurkinaFaso/CV1847/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1908/2020" : "2020-12-07", #delta
    "BurkinaFaso/CV1909/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1910/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1911/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1922/2020" : "2020-12-21", #delta
    "BurkinaFaso/CV1923/2020" : "2020-12-21", #delta
    "BurkinaFaso/CV1943/2020" : "2020-12-08", #delta
    "BurkinaFaso/CV1944/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1945/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1946/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1947/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1955/2020" : "2020-12-27", #delta
    "BurkinaFaso/CV1956/2020" : "2020-12-27", #delta
    "BurkinaFaso/CV1957/2020" : "2020-12-17", #delta
    "England/MILK-18DD450/2020" : "2020-11-04", #delta
    "England/NORT-YYNW7P/2020" : "2020-10-27", #delta
    "England/NORW-30146BA/2020" : "2020-11-15", #delta

    #unlikely for beta from SA
    "SouthAfrica/CERI-KRISP-K026612/2021" : "2021-10-06", #deta
    "SouthAfrica/CERI-KRISP-K026946/2021" : "2021-10-15", #deta
    "SouthAfrica/CERI-KRISP-K027301/2021" : "2021-10-20", #deta
    "SouthAfrica/NICD-N18899/2021" : "2021-10-10", #deta
    "SouthAfrica/NICD-N18921/2021" : "2021-10-12", #deta
    "SouthAfrica/NICD-N20404/2021" : "2021-10-15", #deta
    "SouthAfrica/NICD-N20493/2021" : "2021-10-20", #deta
    "SouthAfrica/NICD-N20495/2021" : "2021-10-20", #deta
    "SouthAfrica/NICD-N20496/2021" : "2021-10-18", #deta
    "SouthAfrica/NICD-N20498/2021" : "2021-10-22", #deta
    "SouthAfrica/NICD-N20507/2021" : "2021-10-02", #deta
    "SouthAfrica/NICD-N20510/2021" : "2021-10-03", #deta
    "SouthAfrica/NICD-N20511/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20512/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20514/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20515/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20516/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20517/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20519/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20520/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20522/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20523/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20525/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20527/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20530/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20532/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20533/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20534/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20535/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20536/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20538/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20539/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20542/2021" : "2021-10-04", #deta
    "SouthAfrica/NICD-N20543/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20544/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20548/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20549/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20550/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20552/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20553/2021" : "2021-10-05", #deta
    "SouthAfrica/NICD-N20554/2021" : "2021-10-07", #deta
    "SouthAfrica/NICD-N20555/2021" : "2021-10-07", #deta
    "SouthAfrica/NICD-N20558/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20559/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20560/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20561/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20562/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20563/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20564/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20565/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20567/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20568/2021" : "2021-10-06", #deta
    "SouthAfrica/NICD-N20569/2021" : "2021-10-07", #deta
    "SouthAfrica/NICD-N20570/2021" : "2021-10-09", #deta
    "SouthAfrica/NICD-N20571/2021" : "2021-10-09", #deta
    "SouthAfrica/NICD-N20572/2021" : "2021-10-09", #deta
    "SouthAfrica/NICD-N20576/2021" : "2021-10-09", #deta
    "SouthAfrica/NICD-N20577/2021" : "2021-10-09", #deta
    "SouthAfrica/NICD-N20578/2021" : "2021-10-08", #deta
    "SouthAfrica/NICD-N20580/2021" : "2021-10-08", #deta
    "SouthAfrica/NICD-N20581/2021" : "2021-10-08", #deta
    "SouthAfrica/NICD-N20582/2021" : "2021-10-08", #deta
    "SouthAfrica/Tygerberg_2967/2021" : "2021-10-26", #deta

    # these have very unlikely dates for Delta
    "Australia/VIC18503/2021" : "2021-02-08", #delta
    "Belize/CML-101/2021" : "2021-01-07", #delta
    "Belize/CML-102/2021" : "2021-01-07", #delta
    "Belize/CML-92/2021" : "2021-02-07", #delta
    "Canada/QC-1nEAQ-0667616/2021" : "2021-01-26", #delta
    "CzechRepublic/CSQ1259/2021" : "2021-01-28", #delta
    "CzechRepublic/NRL_10092/2021" : "2021-02-12", #delta
    "CzechRepublic/NRL_13299/2021" : "2021-02-08", #delta
    "CzechRepublic/NRL_13887/2021" : "2021-02-24", #delta
    "CzechRepublic/NRL_9986/2021" : "2021-02-11", #delta
    "England/LOND-13670C5/2021" : "2021-02-17", #delta
    "England/LOND-13679CA/2021" : "2021-02-19", #delta
    "England/NEWC-2729532/2021" : "2021-01-09", #delta
    "England/NORT-1BF0F53/2021" : "2021-01-21", #delta
    "England/NORT-1BF4BE2/2021" : "2021-01-24", #delta
    "England/NORT-1BF6E50/2021" : "2021-01-27", #delta
    "England/NORT-1BF71A1/2021" : "2021-01-29", #delta
    "England/NORT-YYBGBS/2021" : "2021-01-26", #delta
    "England/NORT-YYBI4W/2021" : "2021-02-27", #delta
    "England/NORT-YYWTNN/2021" : "2021-01-01", #delta
    "England/NORW-13F3969/2021" : "2021-02-20", #delta
    "England/NORW-13F67E4/2021" : "2021-01-22", #delta
    "England/NORW-13F8560/2021" : "2021-02-27", #delta
    "England/NORW-306189D/2021" : "2021-02-09", #delta
    "England/NORW-3079BFC/2021" : "2021-01-14", #delta
    "England/NORW-30902CC/2021" : "2021-01-21", #delta
    "England/NORW-309F9F0/2021" : "2021-02-04", #delta
    "England/NORW-30A0375/2021" : "2021-02-04", #delta
    "England/PHEC-3504B7/2021" : "2021-01-27", #delta
    "England/PHEP-006474/2021" : "2021-02-06", #delta
    "England/PHEP-262264/2021" : "2021-01-11", #delta
    "Ethiopia/CERI-KRISP-K025808/2021" : "2021-02-11", #delta
    "France/BFC-HMN-21082040163/2021" : "2021-02-27", #delta
    "France/GES-HCL0211536735/2021" : "2021-01-16", #delta
    "Gambia/PF0203/2021" : "2021-02-08", #delta
    "Gambia/PF6266/2021" : "2021-02-08", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0203/2021" : "2021-02-01", #delta
    "Indonesia/JK-NIHRD-WGS00007/2021" : "2021-01-07", #delta
    "Indonesia/KS-NIHRD-WGS12290/2021" : "2021-01-09", #delta
    "Indonesia/KS-NIHRD-WGS12291/2021" : "2021-01-09", #delta
    "Indonesia/KS-NIHRD-WGS12292/2021" : "2021-02-09", #delta
    "Indonesia/SS-NIHRD-WGS002218/2021" : "2021-01-15", #delta
    "Indonesia/SS-NIHRD-WGS00441/2021" : "2021-01-08", #delta
    "Indonesia/SS-NIHRD-WGS00445/2021" : "2021-01-12", #delta
    "Israel/CVL-22307/2021" : "2021-01-30", #delta
    "Israel/CVL-22309/2021" : "2021-01-02", #delta
    "Israel/CVL-22311/2021" : "2021-01-07", #delta
    "Israel/CVL-22314/2021" : "2021-01-09", #delta
    "Israel/CVL-22316/2021" : "2021-01-08", #delta
    "Israel/CVL-22319/2021" : "2021-01-03", #delta
    "Italy/SIC_CQRC_2726144/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2726239/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2726263/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727245/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727475/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727482/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727983/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2728951/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2729676/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2731727/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2736383/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2737746/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2737781/2021" : "2021-01-11", #delta
    "Italy/TUS-AOUC-40/2021" : "2021-01-24", #delta
    "Kenya/ILRI_COVM01044/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01048/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01050/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01069/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01233/2021" : "2021-01-21", #delta
    "Kenya/ILRI_COVM01347/2021" : "2021-01-09", #delta
    "Kenya/SS1398/2021" : "2021-02-08", #delta
    "Kenya/SS1399/2021" : "2021-02-08", #delta
    "Malaysia/UNIMAS-GHML323/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML324/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML325/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML326/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML327/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML328/2021" : "2021-02-09", #delta
    "Mexico/AGU_InDRE_FB29455_S6243/2021" : "2021-01-27", #delta
    "Mexico/BCN-SEARCH-104131/2021" : "2021-02-04", #delta
    "Mexico/CMX-InDRE_FD78180_S4428/2021" : "2021-02-26", #delta
    "Mexico/MOR_IBT_SSMor_11/2021" : "2021-01-21", #delta
    "Mexico/MOR_IBT_SSMor_12/2021" : "2021-01-21", #delta
    "Monaco/IPP14905/2021" : "2021-02-22", #delta
    "Norway/24584/2021" : "2021-01-21", #delta
    "Norway/26496/2021" : "2021-01-11", #delta
    "Oman/rega-OM-232/2021" : "2021-02-06", #delta
    "Oman/rega-OM-89/2021" : "2021-01-06", #delta
    "Oman/rega-OM-90/2021" : "2021-01-06", #delta
    "Oman/rega-OM-91/2021" : "2021-01-06", #delta
    "Poland/WSSEGorzow-21S0298/2021" : "2021-01-09", #delta
    "Russia/MOS-CRIE-L106A0093ubh/2021" : "2021-02-28", #delta
    "Rwanda/CV2199/2021" : "2021-02-24", #delta
    "Rwanda/CV2200/2021" : "2021-01-29", #delta
    "Rwanda/CV2226/2021" : "2021-01-27", #delta
    "Scotland/CVR7911/2021" : "2021-02-18", #delta
    "Singapore/1444nan/2021" : "2021-02-06", #delta
    "Slovakia/UVZ_PL36_A4_17796/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_A5_17804/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_A6_17812/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B10_17961/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B11_17969/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B3_17789/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_B4_17797/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B6_17813/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B7_17907/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_C3_17790/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_C5_17806/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_C6_17814/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_C7_17910/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D11_17986/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D3_17791/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D4_17799/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D5_17807/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D6_17815/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D7_17911/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D9_17955/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E11_17987/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E2_17784/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E3_17792/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E4_17800/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E5_17808/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E7_17913/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E9_17956/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F11_17988/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F2_17785/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F3_17793/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F4_17801/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F5_17809/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F6_17903/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F7_17921/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F9_17957/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G10_17966/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G11_17989/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G2_17786/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G3_17794/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G4_17802/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G5_17810/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G6_17904/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G9_17958/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H2_17787/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_H3_17795/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H4_17803/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_H5_17811/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H6_17905/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H9_17959/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_A2_18007/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_A8_18061/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_B8_18062/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_C8_18063/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_D8_18064/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_E1_18003/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_E8_18065/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_F1_18004/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_F7_18058/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_F8_18066/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_G1_18005/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_G7_18059/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_G8_18067/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_H7_18060/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_H8_18068/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL40_A3_19181/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_B3_19182/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_C4_18365/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_E11_18455/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_F11_18456/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_F8_18400/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL40_F9_18440/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_G2_19179/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_G4_18369/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_H2_19180/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL46_A11_19348/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL46_C11_19350/2021" : "2021-01-09", #delta
    "Slovenia/08-006923-MB/2021" : "2021-01-07", #delta
    "SouthAfrica/NICD-N15251/2021" : "2021-01-19", #delta
    "SouthAfrica/NICD-N16641/2021" : "2021-02-26", #delta
    "SouthAfrica/NICD-N9212/2021" : "2021-01-12", #delta
    "SouthAfrica/NICD-R11251/2021" : "2021-01-28", #delta
    "Spain/CT-LabRefCat-751420/2021" : "2021-01-29", #delta
    "Spain/MD-HGUGM-5702992/2021" : "2021-02-09", #delta
    "Switzerland/AG-UHB-43144757/2021" : "2021-01-02", #delta
    "Switzerland/BE-IFIK-210906_os-89/2021" : "2021-01-08", #delta
    "Switzerland/BE-UHB-43000628/2021" : "2021-02-13", #delta
    "Switzerland/GE-HUG-35467598/2021" : "2021-02-11", #delta
    "Switzerland/LU-UHB-43144767/2021" : "2021-01-02", #delta
    "Thailand/DMSc-02063/2021" : "2021-01-09", #delta
    "Thailand/DMSc-02065/2021" : "2021-01-09", #delta
    "Thailand/DMSc-02067/2021" : "2021-01-09", #delta
    "Timor-Leste/TL1011/2021" : "2021-01-08", #delta
    "Timor-Leste/TL1013/2021" : "2021-02-08", #delta
    "Timor-Leste/TL1015/2021" : "2021-02-08", #delta
    "Timor-Leste/TL1017/2021" : "2021-02-08", #delta
    "Timor-Leste/TL979/2021" : "2021-01-08", #delta
    "Timor-Leste/TL981/2021" : "2021-01-08", #delta
    "Timor-Leste/TL983/2021" : "2021-01-08", #delta
    "Timor-Leste/TL985/2021" : "2021-01-08", #delta
    "Timor-Leste/TL987/2021" : "2021-01-08", #delta
    "USA/AZ-ASU10204/2021" : "2021-01-30", #delta
    "USA/AZ-ASU19232/2021" : "2021-02-01", #delta
    "USA/AZ-ASU7883/2021" : "2021-02-09", #delta
    "USA/AZ-ASU7899/2021" : "2021-02-10", #delta
    "USA/CA-ACPHD-00570/2021" : "2021-01-24", #delta
    "USA/CA-CDPH-UCSF-CC100/2021" : "2021-02-04", #delta
    "USA/FL-BPHL-8934/2021" : "2021-01-14", #delta
    "USA/IA-SHL-1780926/2021" : "2021-02-08", #delta
    "USA/ID-IBL-759328/2021" : "2021-01-02", #delta
    "USA/ID-IBL-760105/2021" : "2021-02-23", #delta
    "USA/ID-IBL-760128/2021" : "2021-01-02", #delta
    "USA/ID-IBL-771950/2021" : "2021-01-10", #delta
    "USA/IL-S21WGS5409/2021" : "2021-01-10", #delta
    "USA/KS-KHEL-6411/2021" : "2021-01-15", #delta
    "USA/NV-NSPHL-392347/2021" : "2021-02-03", #delta
    "USA/TN-SPHL-0094/2021" : "2021-01-19", #delta
    "USA/TN-SPHL-0261/2021" : "2021-02-24", #delta
    "USA/TN-SPHL-0517/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0539/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0587/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0588/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0606/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0610/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0617/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0622/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0749/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0750/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0788/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0800/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0805/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0861/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0953/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0961/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0964/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0967/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0979/2021" : "2021-01-14", #delta
    "USA/UT-UPHL-210624251315/2021" : "2021-01-04", #delta
    "USA/UT-UPHL-210624490751/2021" : "2021-01-04", #delta
    "USA/UT-UPHL-210723256386/2021" : "2021-01-05", #delta
    "USA/WA-PHL-006485/2021" : "2021-01-06", #delta
    "env/Austria/CeMM18535/2021" : "2021-01-17", #delta
    "BurkinaFaso/CV1847/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1908/2020" : "2020-12-07", #delta
    "BurkinaFaso/CV1909/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1910/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1911/2020" : "2020-12-03", #delta
    "BurkinaFaso/CV1920/2020" : "2020-09-16", #delta
    "BurkinaFaso/CV1921/2020" : "2020-09-18", #delta
    "BurkinaFaso/CV1922/2020" : "2020-12-21", #delta
    "BurkinaFaso/CV1923/2020" : "2020-12-21", #delta
    "BurkinaFaso/CV1943/2020" : "2020-12-08", #delta
    "BurkinaFaso/CV1944/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1945/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1946/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1947/2020" : "2020-12-18", #delta
    "BurkinaFaso/CV1955/2020" : "2020-12-27", #delta
    "BurkinaFaso/CV1956/2020" : "2020-12-27", #delta
    "BurkinaFaso/CV1957/2020" : "2020-12-17", #delta
    "Canada/QC-1nMCY-S6293264/2020" : "2020-10-29", #delta
    "England/MILK-18DD450/2020" : "2020-11-04", #delta
    "England/NORT-YYNW7P/2020" : "2020-10-27", #delta
    "England/NORW-30146BA/2020" : "2020-11-15", #delta
    "England/PHEP-YYBYUTJ/2020" : "2020-08-03", #delta
    "Fiji/FJ493/2020" : "2020-08-25", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0168/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0169/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0170/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0172/2020" : "2020-07-29", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0200/2020" : "2020-07-29", #delta
    "Mexico/AGU-InDRE_FB18599_S4467/2020" : "2020-09-22", #delta
    "PapuaNewGuinea/PNG4040/2020" : "2020-08-01", #delta
    "Rwanda/CV2197/2020" : "2020-09-10", #delta
    "Rwanda/CV2223/2020" : "2020-12-21", #delta
    "Scotland/CVR8617/2020" : "2020-12-27", #delta
    "Slovenia/08-082640-MB/2020" : "2020-11-02", #delta
    "Slovenia/08-113788-MB/2020" : "2020-11-23", #delta
    "Slovenia/08-134502-MB/2020" : "2020-12-04", #delta
    "Slovenia/17-047667-CE/2020" : "2020-11-13", #delta
    "Slovenia/17-073336-CE/2020" : "2020-12-31", #delta
    "Slovenia/251283/2020" : "2020-12-04", #delta
    "SouthAfrica/NICD-N19840/2020" : "2020-07-07", #delta
    "SouthAfrica/NICD-N19863/2020" : "2020-06-26", #delta
    "Spain/CT-HUGTiPM043JX9G11/2020" : "2020-11-03", #delta
    "Spain/MD-HRYC-1052050/2020" : "2020-11-18", #delta
    "Sweden/10097141/2020" : "2020-11-19", #delta
    "USA/CA-CDPH-MC2409222/2020" : "2020-10-10", #delta
    "USA/CA-LACPHL-AF03229/2020" : "2020-08-12", #delta
    "USA/CA-SEARCH-109796/2020" : "2020-08-31", #delta
    "USA/MD-HP20064-PIDZAEYGDO/2020" : "2020-11-03", #delta
    "USA/ND-NDDH-4397/2020" : "2020-09-09", #delta
    "USA/NY-NYCPHL-005674/2020" : "2020-11-20", #delta
    "USA/NY-WMC2021-152/2020" : "2020-03-12", #delta
    "USA/TX-HHD-210729KVI6183/2020" : "2020-12-26", #delta
    "USA/TX-HMH-MCoV-48794/2020" : "2020-07-15", #delta
    "USA/TX-HMH-MCoV-49501/2020" : "2020-07-13", #delta
    "USA/TX-HMH-MCoV-49803/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49806/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49808/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49809/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49814/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49815/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49816/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49817/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49827/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49831/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49836/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49838/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49840/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49841/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49851/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49852/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49854/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49855/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49859/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49862/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49866/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49873/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49874/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49876/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49878/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49880/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49881/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49883/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49888/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49889/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49892/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49894/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49896/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49898/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49899/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49901/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49905/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49911/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49913/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49915/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49917/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49919/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49920/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49922/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49923/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49924/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49925/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49928/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49930/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49933/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49935/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49937/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49938/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49939/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49946/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49948/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49951/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49953/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49958/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49959/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49963/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49966/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49969/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49973/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49975/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49976/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49978/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49982/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49984/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49985/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49988/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49989/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49994/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50010/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50013/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50024/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50028/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50034/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50045/2020" : "2020-07-15", #delta
    "USA/TX-HMH-MCoV-50046/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50048/2020" : "2020-07-20", #delta
    "USA/TX-HMH-MCoV-50050/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50067/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50068/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50082/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50084/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50486/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50493/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50501/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50519/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50545/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50566/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-49945/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49931/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49934/2020" : "2020-07-16", #delta
    "USA/TX-Noblis-S709B19/2020" : "2020-12-03", #delta
    "USA/TX-Noblis-S710B20/2020" : "2020-12-03", #delta
    "USA/TX-HMH-MCoV-48613/2020" : "2020-07-14", #delta
    "USA/NM-UNM-TC222973/2020" : "2020-08-20", #delta
    "Slovenia/147626/2020" : "2020-10-21", #delta
    "USA/UT-UPHL-210729652440/2020" : "2020-12-16", #delta
    "USA/VI-Yale-10210/2020" : "2020-08-21", #delta
    "USA/VI-Yale-10211/2020" : "2020-08-21", #delta
    "USA/WV-WVU-WV121217/2020" : "2020-07-21", #delta
    "USA/WY-WYPHL-20167074/2020" : "2020-12-16", #delta
    "USA/WY-WYPHL-21070660/2020" : "2020-09-02", #delta
    "Australia/NSW-R0499/2021" : "2021-02-07", #delta
    "Australia/NSW-R0501/2021" : "2021-02-07", #delta
    "Australia/NSW-R0503/2021" : "2021-02-07", #delta
    "Australia/NSW-R0504/2021" : "2021-02-07", #delta
    "Australia/NSW-R0509/2021" : "2021-02-07", #delta
    "Australia/VIC18503/2021" : "2021-02-08", #delta
    "Belize/CML-101/2021" : "2021-01-07", #delta
    "Belize/CML-102/2021" : "2021-01-07", #delta
    "Belize/CML-92/2021" : "2021-02-07", #delta
    "Canada/QC-1nEAQ-0667616/2021" : "2021-01-26", #delta
    "CzechRepublic/CSQ1259/2021" : "2021-01-28", #delta
    "CzechRepublic/NRL_10092/2021" : "2021-02-12", #delta
    "CzechRepublic/NRL_13299/2021" : "2021-02-08", #delta
    "CzechRepublic/NRL_13887/2021" : "2021-02-24", #delta
    "CzechRepublic/NRL_9986/2021" : "2021-02-11", #delta
    "England/LOND-13670C5/2021" : "2021-02-17", #delta
    "England/LOND-13679CA/2021" : "2021-02-19", #delta
    "England/NEWC-2729532/2021" : "2021-01-09", #delta
    "England/NORT-1BF0F53/2021" : "2021-01-21", #delta
    "England/NORT-1BF4BE2/2021" : "2021-01-24", #delta
    "England/NORT-1BF6E50/2021" : "2021-01-27", #delta
    "England/NORT-1BF71A1/2021" : "2021-01-29", #delta
    "England/NORT-YYBGBS/2021" : "2021-01-26", #delta
    "England/NORT-YYBI4W/2021" : "2021-02-27", #delta
    "England/NORW-13F3969/2021" : "2021-02-20", #delta
    "England/NORW-13F67E4/2021" : "2021-01-22", #delta
    "England/NORW-13F8560/2021" : "2021-02-27", #delta
    "England/NORW-306189D/2021" : "2021-02-09", #delta
    "England/NORW-3079BFC/2021" : "2021-01-14", #delta
    "England/NORW-30902CC/2021" : "2021-01-21", #delta
    "England/NORW-309F9F0/2021" : "2021-02-04", #delta
    "England/NORW-30A0375/2021" : "2021-02-04", #delta
    "England/PHEC-3504B7/2021" : "2021-01-27", #delta
    "England/PHEP-006474/2021" : "2021-02-06", #delta
    "England/PHEP-262264/2021" : "2021-01-11", #delta
    "Ethiopia/CERI-KRISP-K025808/2021" : "2021-02-11", #delta
    "France/BFC-HMN-21082040163/2021" : "2021-02-27", #delta
    "France/GES-HCL0211536735/2021" : "2021-01-16", #delta
    "Gambia/PF0203/2021" : "2021-02-08", #delta
    "Gambia/PF6266/2021" : "2021-02-08", #delta
    "Germany/BW-RKI-I-184553/2021" : "2021-02-07", #delta
    "Germany/BW-RKI-I-268125/2021" : "2021-02-21", #delta
    "Germany/BY-MVP-000008310/2021" : "2021-01-16", #delta
    "Germany/BY-MVP-000008357/2021" : "2021-01-18", #delta
    "Germany/BY-MVP-000008382/2021" : "2021-01-24", #delta
    "Germany/BY-MVP-000008450/2021" : "2021-01-24", #delta
    "Germany/BY-MVP-000008452/2021" : "2021-01-23", #delta
    "Indonesia/JA-GS-EIJK-RSRM-0203/2021" : "2021-02-01", #delta
    "Indonesia/JK-NIHRD-WGS00007/2021" : "2021-01-07", #delta
    "Indonesia/SS-NIHRD-WGS002218/2021" : "2021-01-15", #delta
    "Indonesia/SS-NIHRD-WGS00441/2021" : "2021-01-08", #delta
    "Indonesia/SS-NIHRD-WGS00445/2021" : "2021-01-12", #delta
    "Israel/CVL-22307/2021" : "2021-01-30", #delta
    "Israel/CVL-22309/2021" : "2021-01-02", #delta
    "Israel/CVL-22311/2021" : "2021-01-07", #delta
    "Israel/CVL-22314/2021" : "2021-01-09", #delta
    "Israel/CVL-22316/2021" : "2021-01-08", #delta
    "Israel/CVL-22319/2021" : "2021-01-03", #delta
    "Italy/SIC_CQRC_2726144/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2726239/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2726263/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727245/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727475/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727482/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2727983/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2728951/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2729676/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2731727/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2736383/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2737746/2021" : "2021-01-11", #delta
    "Italy/SIC_CQRC_2737781/2021" : "2021-01-11", #delta
    "Italy/TUS-AOUC-40/2021" : "2021-01-24", #delta
    "Kenya/ILRI_COVM01044/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01048/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01050/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01069/2021" : "2021-01-07", #delta
    "Kenya/ILRI_COVM01233/2021" : "2021-01-21", #delta
    "Kenya/ILRI_COVM01347/2021" : "2021-01-09", #delta
    "Kenya/SS1398/2021" : "2021-02-08", #delta
    "Kenya/SS1399/2021" : "2021-02-08", #delta
    "Malaysia/UNIMAS-GHML323/2021" : "2021-02-09", #delta
    "Malaysia/UNIMAS-GHML325/2021" : "2021-02-09", #delta
    "Mexico/AGU_InDRE_FB29455_S6243/2021" : "2021-01-27", #delta
    "Mexico/BCN-SEARCH-104131/2021" : "2021-02-04", #delta
    "Mexico/CMX-InDRE_FD78180_S4428/2021" : "2021-02-26", #delta
    "Mexico/MOR_IBT_SSMor_11/2021" : "2021-01-21", #delta
    "Mexico/MOR_IBT_SSMor_12/2021" : "2021-01-21", #delta
    "Monaco/IPP14905/2021" : "2021-02-22", #delta
    "Norway/24584/2021" : "2021-01-21", #delta
    "Poland/WSSEGorzow-21S0298/2021" : "2021-01-09", #delta
    "Russia/MOS-CRIE-L106A0093ubh/2021" : "2021-02-28", #delta
    "Rwanda/CV2199/2021" : "2021-02-24", #delta
    "Rwanda/CV2200/2021" : "2021-01-29", #delta
    "Rwanda/CV2226/2021" : "2021-01-27", #delta
    "Scotland/CVR7911/2021" : "2021-02-18", #delta
    "Singapore/1444nan/2021" : "2021-02-06", #delta
    "Slovakia/UVZ_PL36_A4_17796/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_A5_17804/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_A6_17812/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B10_17961/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B11_17969/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B3_17789/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_B4_17797/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B6_17813/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_B7_17907/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_C3_17790/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_C5_17806/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_C6_17814/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_C7_17910/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D11_17986/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D3_17791/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D4_17799/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D5_17807/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D6_17815/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_D7_17911/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_D9_17955/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E11_17987/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E2_17784/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E3_17792/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E4_17800/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_E5_17808/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E7_17913/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_E9_17956/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F11_17988/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F2_17785/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F3_17793/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F4_17801/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F5_17809/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F6_17903/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_F7_17921/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_F9_17957/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G10_17966/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G11_17989/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G2_17786/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G3_17794/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G4_17802/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G5_17810/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_G6_17904/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_G9_17958/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H2_17787/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_H3_17795/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H4_17803/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL36_H5_17811/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H6_17905/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL36_H9_17959/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_A2_18007/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_A8_18061/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_B8_18062/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_C8_18063/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_D8_18064/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_E1_18003/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_E8_18065/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_F1_18004/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_F7_18058/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_F8_18066/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_G1_18005/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL37_G7_18059/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_G8_18067/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_H7_18060/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL37_H8_18068/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL40_A3_19181/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_B3_19182/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_C4_18365/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_E11_18455/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_F11_18456/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_F8_18400/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL40_F9_18440/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_G2_19179/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_G4_18369/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL40_H2_19180/2021" : "2021-02-09", #delta
    "Slovakia/UVZ_PL46_A11_19348/2021" : "2021-01-09", #delta
    "Slovakia/UVZ_PL46_C11_19350/2021" : "2021-01-09", #delta
    "Spain/CT-LabRefCat-751420/2021" : "2021-01-29", #delta
    "Spain/MD-HGUGM-5702992/2021" : "2021-02-09", #delta
    "Switzerland/AG-UHB-43144757/2021" : "2021-01-02", #delta
    "Switzerland/BE-IFIK-210906_os-89/2021" : "2021-01-08", #delta
    "Switzerland/BE-UHB-43000628/2021" : "2021-02-13", #delta
    "Switzerland/GE-HUG-35467598/2021" : "2021-02-11", #delta
    "Switzerland/LU-UHB-43144767/2021" : "2021-01-02", #delta
    "Thailand/DMSc-02063/2021" : "2021-01-09", #delta
    "Thailand/DMSc-02065/2021" : "2021-01-09", #delta
    "Thailand/DMSc-02067/2021" : "2021-01-09", #delta
    "Timor-Leste/TL1011/2021" : "2021-01-08", #delta
    "Timor-Leste/TL1013/2021" : "2021-02-08", #delta
    "Timor-Leste/TL1015/2021" : "2021-02-08", #delta
    "Timor-Leste/TL1017/2021" : "2021-02-08", #delta
    "Timor-Leste/TL979/2021" : "2021-01-08", #delta
    "Timor-Leste/TL981/2021" : "2021-01-08", #delta
    "Timor-Leste/TL983/2021" : "2021-01-08", #delta
    "Timor-Leste/TL985/2021" : "2021-01-08", #delta
    "Timor-Leste/TL987/2021" : "2021-01-08", #delta
    "USA/AZ-ASU10204/2021" : "2021-01-30", #delta
    "USA/AZ-ASU19232/2021" : "2021-02-01", #delta
    "USA/AZ-ASU7883/2021" : "2021-02-09", #delta
    "USA/AZ-ASU7899/2021" : "2021-02-10", #delta
    "USA/CA-ACPHD-00570/2021" : "2021-01-24", #delta
    "USA/CA-CDPH-UCSF-CC100/2021" : "2021-02-04", #delta
    "USA/FL-BPHL-8934/2021" : "2021-01-14", #delta
    "USA/IA-SHL-1780926/2021" : "2021-02-08", #delta
    "USA/ID-IBL-759328/2021" : "2021-01-02", #delta
    "USA/ID-IBL-760105/2021" : "2021-02-23", #delta
    "USA/ID-IBL-760128/2021" : "2021-01-02", #delta
    "USA/ID-IBL-771950/2021" : "2021-01-10", #delta
    "USA/IL-S21WGS5409/2021" : "2021-01-10", #delta
    "USA/KS-KHEL-6411/2021" : "2021-01-15", #delta
    "USA/NV-NSPHL-392347/2021" : "2021-02-03", #delta
    "USA/TN-SPHL-0094/2021" : "2021-01-19", #delta
    "USA/TN-SPHL-0261/2021" : "2021-02-24", #delta
    "USA/TN-SPHL-0517/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0539/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0587/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0588/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0606/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0610/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0617/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0622/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0749/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0750/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0788/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0800/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0805/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0861/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0953/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0961/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0964/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0967/2021" : "2021-01-14", #delta
    "USA/TN-SPHL-0979/2021" : "2021-01-14", #delta
    "USA/UT-UPHL-210624251315/2021" : "2021-01-04", #delta
    "USA/UT-UPHL-210624490751/2021" : "2021-01-04", #delta
    "USA/UT-UPHL-210723256386/2021" : "2021-01-05", #delta
    "env/Austria/CeMM18535/2021" : "2021-01-17", #delta
    "USA/TX-HMH-MCoV-40891/2020" : "2020-07-22", #alpha
    "USA/TX-HMH-MCoV-40953/2020" : "2020-07-22", #alpha
    "USA/TX-HMH-MCoV-50516/2020" : "2020-07-18", #delta
    "USA/TX-HMH-MCoV-49926/2020" : "2020-07-16", #delta
    "SouthAfrica/NHLS-UCT-GP-M115/2021" : "2021-06-17", #omicron
    "SouthAfrica/NHLS-UCT-GP-M140/2021" : "2021-06-18", #omicron
    "Kenya/K15865/2020" : "2020-06-23", #kappa
    "USA/WY-WYPHL-20125142/2020" : "2020-11-07", #delta
    "USA/WY-WYPHL-20133773/2020" : "2020-11-12", #delta
    "USA/TX-HMH-MCoV-50548/2020" : "2020-07-17", #delta
    "Canada/QC-1nIEOQ-15782162/2020" : "2020-06-02", #alpha
    "Canada/QC-1nIUM-T5101165/2020" : "2020-07-10", #alpha
    "Canada/QC-1nMCY-S1130690/2020" : "2020-05-13", #alpha
    "Canada/QC-1nMCY-S1142592/2020" : "2020-05-14", #alpha
    "Canada/QC-1nMCY-S1180495/2020" : "2020-05-18", #alpha
    "Canada/QC-1nIOU-98053431/2020" : "2020-06-05", #EU2
    "USA/TX-HMH-MCoV-44786/2020" : "2020-07-27", #alpha
    "USA/TX-HMH-MCoV-45577/2020" : "2020-07-30", #alpha
    "USA/TX-HMH-MCoV-50489/2020" : "2020-07-18", #delta
    "USA/TX-HMH-MCoV-49627/2020" : "2020-07-13", #delta
    "USA/TX-HMH-MCoV-50577/2020" : "2020-07-17", #delta
    "Belgium/rega-0912938/2020" : "2020-09-12", #delta
    "USA/LA-FUS0021A33/2020" : "2020-05-12", #delta
    "USA/CA-SEARCH-58495/2020" : "2020-10-06", #delta
    "USA/CA-SEARCH-58338/2020" : "2020-01-26", #epsilon
    "USA/TX-HMH-MCoV-50023/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-41511/2020" : "2020-07-31", #alpha
    "USA/TX-HMH-MCoV-42600/2020" : "2020-07-19",  #alpha
    "USA/TX-HMH-MCoV-50503/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-49683/2020" : "2020-07-13", #delta
    "USA/TX-HMH-MCoV-49670/2020" : "2020-07-13", #delta
    "USA/TX-HMH-MCoV-49454/2020" : "2020-07-12", #delta
    "USA/TX-HMH-MCoV-49677/2020" : "2020-07-13", #delta
    "USA/WY-WYPHL-20098102/2020" : "2020-10-14", #delta
    "USA/TX-HMH-MCoV-49743/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49967/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50500/2020" : "2020-07-17", #delta
    "USA/TX-HMH-MCoV-50040/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50526/2020" : "2020-07-17", #delta
    "Oman/205029065/2020" : "2020-04-13", #alpha
    "USA/AZ-TG1047402/2020" : "2020-08-29", #delta
    "USA/AZ-TG816882/2020" : "2020-03-26", #S677PPelican
    "Indonesia/JB-GS-WJHL-ITB-WGS092/2020" : "2020-10-02", #delta
    "USA/TX-HMH-MCoV-50521/2020" : "2020-07-17", #delta
    "USA/NY-MSHSPSP-PV17752/2020" : "2020-09-07", #iota
    "Germany/BAV-PL-virotum_ZKJ74/2020" : "2020-03-22", #EU1
    "Senegal/1185/2020" : "2020-03-26", #EU1
    "Senegal/1187/2020" : "2020-03-26", #EU1
    "USA/TX-Retrobiotech-ACSQ1-19/2020" : "2020-08-01", #21J delta
    "USA/TX-Retrobiotech-ACSQ1-20/2020" : "2020-08-01", #21J delta
    "USA/TX-Retrobiotech-ACSQ1-21/2020" : "2020-08-01", #21J delta
    "India/DL-ILBS-21724/2020" : "2020-06-13", #21JDelta
    "Senegal/27609/2020" : "2020-05-21", #21JDelta
    "Senegal/1787/2020" : "2020-03-31", #21JDelta
    "Senegal/27963/2020" : "2020-05-23", #alpha
    "Senegal/SC20-507/2020" : "2020-08-02", #alpha
    "USA/TX-HMH-MCoV-45769/2020" : "2020-07-31", #alpha
    "SouthAfrica/NICD-N01348/2020" : "2020-12-31", #omicron
    "Slovenia/17-033034-CE/2020" : "2020-10-20", #delta
    "Slovenia/17-034120-CE/2020" : "2020-10-21", #delta
    "Switzerland/AG-UHB-301226-1010/2020" : "2020-01-05", #alpha
    "Switzerland/BE-UHB-40388277501/2020" : "2020-01-10", #alpha
    "Switzerland/BE-UHB-40388300901/2020" : "2020-01-10", #alpha
    "Switzerland/BE-UHB-40388385501/2020" : "2020-01-10", #alpha
    "USA/HI-BL030/2020" : "2020-05-28", #alpha
    "USA/HI-BL031/2020" : "2020-07-22", #alpha
    "USA/HI-BL034/2020" : "2020-06-29", #alpha
    "USA/HI-BL038/2020" : "2020-06-24", #alpha
    "USA/HI-BL041/2020" : "2020-06-25", #alpha
    "USA/HI-BL047/2020" : "2020-06-26", #alpha
    "USA/HI-BL051/2020" : "2020-06-28", #alpha
    "USA/HI-BL054/2020" : "2020-06-28", #alpha
    "TrinidadandTobago/25889M/2020" : "2020-08-22", #gamma
    "USA/HI-BL043/2020" : "2020-06-25", #gamma
    "USA/HI-BL050/2020" : "2020-06-27", #gamma
    "Gabon/11046/2020" : "2020-07-12", #delta
    "USA/HI-BL092/2020" : "2020-07-31", #delta
    "USA/HI-BL106/2020" : "2020-07-30", #delta
    "USA/HI-BL036/2020" : "2020-06-30", #delta
    "USA/HI-BL044/2020" : "2020-06-25", #delta
    "USA/HI-BL063/2020" : "2020-08-10", #delta
    "USA/HI-BL081/2020" : "2020-07-30", #delta
    "USA/HI-BL086/2020" : "2020-07-30", #delta
    "USA/HI-BL088/2020" : "2020-07-30", #delta
    "USA/HI-BL032/2020" : "2020-06-29", #delta
    "USA/HI-BL035/2020" : "2020-06-30", #delta
    "USA/HI-BL037/2020" : "2020-06-23", #delta
    "USA/HI-BL039/2020" : "2020-06-24", #delta
    "USA/HI-BL040/2020" : "2020-06-24", #delta
    "USA/HI-BL042/2020" : "2020-06-25", #delta
    "USA/HI-BL045/2020" : "2020-06-25", #delta
    "USA/HI-BL048/2020" : "2020-06-26", #delta
    "USA/HI-BL049/2020" : "2020-06-27", #delta
    "USA/HI-BL052/2020" : "2020-06-28", #delta
    "USA/HI-BL057/2020" : "2020-07-11", #delta
    "USA/HI-BL059/2020" : "2020-07-23", #delta
    "USA/HI-BL060/2020" : "2020-07-30", #delta
    "USA/HI-BL065/2020" : "2020-08-04", #delta
    "USA/HI-BL066/2020" : "2020-07-29", #delta
    "USA/HI-BL067/2020" : "2020-07-29", #delta
    "USA/HI-BL068/2020" : "2020-07-29", #delta
    "USA/HI-BL070/2020" : "2020-07-29", #delta
    "USA/HI-BL075/2020" : "2020-07-30", #delta
    "USA/HI-BL076/2020" : "2020-07-30", #delta
    "USA/HI-BL077/2020" : "2020-07-30", #delta
    "USA/HI-BL078/2020" : "2020-07-30", #delta
    "USA/HI-BL079/2020" : "2020-07-30", #delta
    "USA/HI-BL080/2020" : "2020-07-30", #delta
    "USA/HI-BL082/2020" : "2020-07-30", #delta
    "USA/HI-BL084/2020" : "2020-07-30", #delta
    "USA/HI-BL085/2020" : "2020-07-30", #delta
    "USA/HI-BL087/2020" : "2020-07-30", #delta
    "USA/HI-BL093/2020" : "2020-07-21", #delta
    "USA/HI-BL094/2020" : "2020-07-21", #delta
    "USA/HI-BL095/2020" : "2020-07-21", #delta
    "USA/HI-BL096/2020" : "2020-07-23", #delta
    "USA/HI-BL097/2020" : "2020-07-27", #delta
    "USA/HI-BL098/2020" : "2020-07-28", #delta
    "USA/HI-BL101/2020" : "2020-07-28", #delta
    "USA/HI-BL104/2020" : "2020-07-29", #delta
    "USA/HI-BL105/2020" : "2020-07-30", #delta
    "USA/HI-BL108/2020" : "2020-07-31", #delta
    "USA/HI-BL109/2020" : "2020-07-31", #delta
    "USA/HI-BL110/2020" : "2020-08-03", #delta
    "USA/HI-BL112/2020" : "2020-07-27", #delta
    "USA/HI-BL115/2020" : "2020-07-28", #delta
    "USA/HI-BL118/2020" : "2020-08-17", #delta
    "USA/HI-BL120/2020" : "2020-08-18", #delta
    "USA/HI-BL121/2020" : "2020-08-12", #delta
    "USA/HI-BL065/2020" : "2020-08-04", #delta
    "USA/HI-BL093/2020" : "2020-07-21", #delta
    "USA/HI-BL095/2020" : "2020-07-21", #delta
    "USA/HI-BL112/2020" : "2020-07-27", #delta
    "USA/HI-BL115/2020" : "2020-07-28", #delta
    "USA/HI-BL029/2020" : "2020-05-28", #alpha
    "USA/HI-BL053/2020" : "2020-06-28", #gamma
    "USA/HI-BL033/2020" : "2020-06-29", #21H
    "India/TN-CLRI-CIC0568/2020" : "2020-09-05", #delta
    "India/TN-CLRI-CIC0604/2020" : "2020-09-03", #delta
    "India/TN-CLRI-CIC0648/2020" : "2020-08-25", #delta
    "India/TN-CLRI-CIC0643/2020" : "2020-07-11", #delta
    "India/TN-CLRI-CIC0646/2020" : "2020-08-25", #delta
    "India/TN-CLRI-CIC0647/2020" : "2020-08-10", #delta
    "India/TN-CLRI-CIC0651/2020" : "2020-08-25", #delta
    "India/TN-CLRI-CIC0654/2020" : "2020-09-14", #delta
    "USA/HI-BL062/2020" : "2020-08-09", #delta
    "USA/HI-BL064/2020" : "2020-07-03", #delta
    "USA/HI-BL069/2020" : "2020-07-29", #delta
    "USA/HI-BL071/2020" : "2020-07-29", #delta
    "USA/HI-BL072/2020" : "2020-07-29", #delta
    "USA/HI-BL090/2020" : "2020-07-30", #delta
    "USA/HI-BL091/2020" : "2020-07-31", #delta
    "USA/HI-BL099/2020" : "2020-07-28", #delta
    "USA/HI-BL103/2020" : "2020-07-19", #delta
    "USA/HI-BL107/2020" : "2020-07-30", #delta
    "USA/HI-BL111/2020" : "2020-07-27", #delta
    "USA/HI-BL117/2020" : "2020-08-13", #delta
    "USA/NM-UNM-TC222973/2020" : "2020-08-20", #delta
    "India/TN-CLRI-CIC0592/2020" : "2020-09-16", #delta
    "USA/TX-HMH-MCoV-49849/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-49914/2020" : "2020-07-16", #delta
    "USA/TX-HMH-MCoV-50058/2020" : "2020-07-16", #delta
    "Tunisia/X-3240/2020" : "2020-08-29", #delta
    "Serbia/348B17-09/2020" : "2020-09-02",  #delta

    #Omicron with possibly bad dates (very early)
    "England/NORW-31059C2/2021" : "2021-09-13", #omicron
    "USA/CO-CDPHE-2102465572/2021" : "2021-10-15", #omicron
    # Omicron with maybe? bad date:
    "SouthAfrica/NICD-N01333/2021" : "2021-01-05", #omicron (gone as of 4Jan)
    "SouthAfrica/NICD-N22599/2021" : "2021-09-04", #omicron (gone as of 4Jan)
    "SouthAfrica/NICD-N22601/2021" : "2021-08-16", #omicron (gone as of 4Jan)
    "SouthAfrica/NICD-N22603/2021" : "2021-08-16", #omicron (gone as of 4Jan)
    "SouthAfrica/NICD-N22621/2021" : "2021-09-30", #omicron (gone as of 4Jan)
    "SouthAfrica/NICD-N22894/2021" : "2021-10-12", #omicron (gone as of 4Jan)
    "Brazil/PA-L193-cd26806/2021" : "2021-09-10", #omicron
    "Netherlands/ZH-EMC-4332/2021" : "2021-08-12", #omicron
    "Scotland/QEUH-1DB485E/2021" : "2021-09-05", #21L omicron
    #Omicron with very suspicous dates - month-day mixup or year mix up?
    "Brazil/SP-IAL-7587/2021" : "2021-10-12", #omicron #updated to 2021-12 as of 21 Jan
    "USA/MD-HP22984-PIDCAGBGJL/2021" : "2021-02-23", #omicron, suspect should be '12-23'
    "USA/LA-Tech2/2020" : "2020-12-27", #omicron, fixed to 2021 on GISAID 11Jan
    "USA/LA-Tech3/2020" : "2020-12-28", #omicron, fixed to 2021 on GISAID 11Jan
    "USA/LA-Tech4/2020" : "2020-12-28", #omicron, fixed to 2021 on GISAID 11Jan
    "Denmark/DCGC-302444/2020" : "2020-10-30", #omicron 21L - not available GISAID 13Jan
    "CzechRepublic/CSQ4233/2021" : "2021-07-30", #omicron - bad as of 13Jan - gone as of 17
    "CzechRepublic/CSQ4569/2020" : "2020-10-23", #omicron - bad as of 13Jan - gone as of 17
    "Italy/EMR_AUSLRomagna_C003-22-33/2020" : "2020-12-30", #omicron - bad as of 17Jan
    "SouthAfrica/NICD-N01364/2020" : "2020-12-30", #omicron - bad as of 13Jan - gone as of 17 
    "USA/NJ-PHEL-V22000805/2021" : "2021-01-04", #omicron - bad as of 21Jan
    "USA/NJ-PHEL-V22000812/2021" : "2021-01-03", #omicron - bad as of 21Jan
    #17 jan
    "Colombia/DC-LSPSDS-VG-585/2021" : "2021-01-02", #omicron -  EPI_ISL_8633813 -corrected to 2022 21 Jan
    "Belgium/IPG-1120/2020" : "2020-01-03",  #omicron - EPI_ISL_8782907 #already corrected 19 Jan
    "Botswana/R63B94_BHP_AAC51601/2021" : "2021-01-04", #omicron -  EPI_ISL_8608121 - bad 21 jan
    "Denmark/DCGC-308314/2021" : "2021-01-08", #omicron -  EPI_ISL_8654495 - bad 21 Jan
    "England/PHEP-YYDBAEU/2021" : "2021-03-20", #omicron -  EPI_ISL_8739344 - bad 21 Jan
    "England/PHEP-YYDBYMF/2021" : "2021-01-12", #omicron -  EPI_ISL_8740466 - bad 21 Jan
    "England/PHEP-YYDNQXP/2021" : "2021-01-27", #omicron -  EPI_ISL_8742366 - bad 21 Jan
    "England/PHEP-YYDNX1F/2021" : "2021-07-10", #omicron -  EPI_ISL_8742630 - bad 21 Jan
    "France/BFC-HMN-21122300847/2021" : "2021-04-16", #omicron -  EPI_ISL_8712774 - bad 21 Jan
    "Italy/CAM-IZSM-RD00387701-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605091 - bad 21 ajn
    "Italy/CAM-IZSM-RD00397677-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605094 - bad 21 ajn
    "Italy/CAM-IZSM-RD00397685-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605096 - bad 21 ajn
    "Italy/CAM-IZSM-RD00397686-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605095 - bad 21 ajn
    "Italy/CAM-IZSM-RD050789D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605086 - bad 21 ajn
    "Italy/CAM-IZSM-RD050885D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605087 - bad 21 ajn
    "Italy/CAM-IZSM-RD051066D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605088 - bad 21 ajn
    "Italy/CAM-IZSM-RD051108D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605085 - bad 21 ajn
    "Italy/CAM-IZSM-RD051641D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605093 - bad 21 ajn
    "Italy/CAM-IZSM-RD051800D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605092 - bad 21 ajn
    "Italy/CAM-IZSM-RD054078D56-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605090 - bad 21 ajn
    "Italy/CAM-IZSM-RD056893D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605084 - bad 21 ajn
    "Italy/CAM-IZSM-RD056963D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605072 - bad 21 ajn
    "Italy/CAM-IZSM-RD057057D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605082 - bad 21 ajn
    "Italy/CAM-IZSM-RD057160D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605078 - bad 21 ajn
    "Italy/CAM-IZSM-RD057230D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605077 - bad 21 ajn
    "Italy/CAM-IZSM-RD057363D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605076 - bad 21 ajn
    "Italy/CAM-IZSM-RD057685D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605075 - bad 21 ajn
    "Italy/CAM-IZSM-RD058705D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605079 - bad 21 ajn
    "Italy/CAM-IZSM-RD058831D57-IZSM-COLLI-TIGEM/2021" : "2021-01-03", #omicron -  EPI_ISL_8605080 - bad 21 ajn
    "Switzerland/BE-SRO-500006_5564/2021" : "2021-01-01", #omicron -  EPI_ISL_8682997 -still bad 21 Jan
    "Switzerland/BE-SRO-500006_5615/2021" : "2021-01-01", #omicron -  EPI_ISL_8683006 -still bad 21 Jan
    "USA/CA-LACPHL-AF05847/2020" : "2020-12-22", #omicron -  EPI_ISL_8749301 -still bad 21 Jan
    "USA/CA-LACPHL-AF05848/2020" : "2020-12-22", #omicron -  EPI_ISL_8749302 -still bad 21 Jan
    "USA/CA-LACPHL-AF05859/2021" : "2021-02-28", #omicron -  EPI_ISL_8749341 -still bad 21 Jan
    "USA/CA-SCPHL-22WGS00055/2021" : "2021-01-06", #omicron -  EPI_ISL_8693648 -still bad 21 Jan
    "USA/CO-CDPHE-2102497606/2021" : "2021-10-16", #omicron -  EPI_ISL_8594550 -still bad 21 Jan
    "USA/CO-CDPHE-2102497611/2021" : "2021-10-17", #omicron -  EPI_ISL_8594773 -still bad 21 Jan
    "USA/ID-IBL-781835/2021" : "2021-01-04", #omicron -  EPI_ISL_8750832 -still bad 21 Jan
    "CzechRepublic/FNHK-Ps-002360/2021" : "2021-01-27", #Omicron -  EPI_ISL_8754081 -still bad 21 Jan
    "CzechRepublic/FNHK-Ps-002387/2021" : "2021-01-30", #Omicron -  EPI_ISL_8754108 -still bad 21 Jan
    "England/NORW-3121DB6/2021" : "2021-01-31", #Omicron -  EPI_ISL_8780855 -still bad 21 Jan
    "France/ARA-HCL022001382101/2021" : "2021-09-18", #Omicron -  EPI_ISL_8787158 -still bad 21 Jan
    "USA/NJ-PHEL-V22001459/2021" : "2021-01-05", #Omicron -  EPI_ISL_8751733 -still bad 21 Jan
    "USA/NJ-PHEL-V22001802/2021" : "2021-01-05", #Omicron -  EPI_ISL_8751771 -still bad 21 Jan
    "Wales/PHWC-PGWTHP/2021" : "2021-02-21", #Omicron -  EPI_ISL_8785818 -still bad 21 Jan
    #21 jan
    "Canada/SK-RRPL-297384/2021" : "2021-08-31",  #omicron - EPI_ISL_8796646
    "CzechRepublic/CSQ4732/2021" : "2021-07-20",  #omicron - EPI_ISL_8800893
    "USA/NJ-PHEL-V22000870/2021" : "2021-01-03",  #omicron - EPI_ISL_8817265
    # 24 jan
    "Belgium/ULG-23678/2021" : "2021-01-28",  # omicron - EPI_ISL_8893774
    "Belgium/ULG-23679/2021" : "2021-01-28",  # omicron - EPI_ISL_8893775
    "Belgium/ULG-23680/2021" : "2021-01-28",  # omicron - EPI_ISL_8893776
    "England/PHEP-YYDKEHE/2021" : "2021-03-21",  # omicron - EPI_ISL_8884877
    "Italy/APU-IZSPB-PT5669/2021" : "2021-10-07",  # omicron - EPI_ISL_8920739
    "Poland/PZH-UMB-6862/2021" : "2021-01-03",  # omicron - EPI_ISL_8975569
    "Poland/PZH-UMB-6863/2021" : "2021-01-03",  # omicron - EPI_ISL_8975882
    "Poland/PZH-UMB-6926/2021" : "2021-01-07",  # omicron - EPI_ISL_8975670
    "SouthAfrica/NHLS-UCT-GS-E463/2021" : "2021-07-21",  # omicron - EPI_ISL_8975087
    "USA/CA-Curative-595174224035/2021" : "2021-01-07",  # omicron - EPI_ISL_8977069
    "USA/CA-Curative-828963186251/2021" : "2021-01-07",  # omicron - EPI_ISL_8977019
    "USA/TN-IVY-ZZXACKAU/2021" : "2021-01-05",  # omicron - EPI_ISL_8898157
    "USA/TN-IVY-ZZXACKAZ/2021" : "2021-01-05",  # omicron - EPI_ISL_8898158
    "USA/TN-IVY-ZZXACKBE/2021" : "2021-01-05",  # omicron - EPI_ISL_8898159
    "USA/TN-IVY-ZZXACKBY/2021" : "2021-01-06",  # omicron - EPI_ISL_8898161
    "USA/TN-IVY-ZZXACKC3/2021" : "2021-01-06",  # omicron - EPI_ISL_8898162
    # 26 jan
    "CzechRepublic/CSQ5216/2021" : "2021-01-12", #omicron -  EPI_ISL_9018586
    "England/LOND-YYBY9H8/2020" : "2020-09-15", #omicron -  EPI_ISL_8989562
    "Denmark/DCGC-313876/2021" : "2021-01-11", #21L omicron
    #28 jan
    "Australia/NSW-RPAH-2375/2021" : "2021-01-18", #21K Omicron -- EPI_ISL_9059113
    "Bermuda/WR-NYGC-DEC-6121-EYDE033/2021" : "2021-09-12", #21K Omicron -- EPI_ISL_9121167
    "Bermuda/WR-NYGC-DEC-6122-FFRF784/2021" : "2021-09-12", #21K Omicron -- EPI_ISL_9121153
    "Bermuda/WR-NYGC-DEC-6126-GNOP644/2021" : "2021-10-12", #21K Omicron -- EPI_ISL_9121170
    "Italy/PUG_UNIBA_APU-BA419/2021" : "2021-01-17", #21K Omicron -- EPI_ISL_9012689
    "USA/LA-EVTL11053/2021" : "2021-01-04", #21K Omicron -- EPI_ISL_9090449
    "USA/NJ-PHEL-V22002856/2020" : "2020-12-31", #21K Omicron -- EPI_ISL_9060723
    "India/KA-RFNB-2760/2021" :  "2021-01-04", #21L Omicron -- EPI_ISL_9092511
    #31 jan
    "Croatia/21065/2021" : "2021-01-03", #omicron -  EPI_ISL_9148694
    "Croatia/21066/2021" : "2021-01-03", #omicron -  EPI_ISL_9148695
    "England/NORT-YBU1G4/2021" : "2021-10-07", #omicron -  EPI_ISL_9226081
    "England/NORT-YBUZR3/2021" : "2021-02-05", #omicron -  EPI_ISL_9227884
    "France/PDL-IPP02231/2021" : "2021-01-09", #omicron -  EPI_ISL_9245864
    "France/PDL-IPP02232/2021" : "2021-01-09", #omicron -  EPI_ISL_9245865
    "France/PDL-IPP02235/2021" : "2021-01-10", #omicron -  EPI_ISL_9245867
    "France/PDL-IPP02236/2021" : "2021-01-10", #omicron -  EPI_ISL_9245868
    "France/PDL-IPP02237/2021" : "2021-01-10", #omicron -  EPI_ISL_9245925
    "France/PDL-IPP02238/2021" : "2021-01-10", #omicron -  EPI_ISL_9245869
    "France/PDL-IPP02239/2021" : "2021-01-10", #omicron -  EPI_ISL_9245870
    "France/PDL-IPP02241/2021" : "2021-01-10", #omicron -  EPI_ISL_9245871
    "Japan/PG-179772/2021" : "2021-01-07", #omicron -  EPI_ISL_9209138
    "Japan/PG-179953/2021" : "2021-01-06", #omicron -  EPI_ISL_9209712
    "Japan/PG-179964/2021" : "2021-01-06", #omicron -  EPI_ISL_9209750
    "Japan/PG-179973/2021" : "2021-01-06", #omicron -  EPI_ISL_9209773
    "Japan/PG-180032/2021" : "2021-01-07", #omicron -  EPI_ISL_9209943
    "Japan/PG-180052/2021" : "2021-01-07", #omicron -  EPI_ISL_9210006
    "Poland/PZH-UMB-7844/2021" : "2021-01-14", #omicron -  EPI_ISL_9154371
    "Slovakia/UKBA-8595/2021" : "2021-01-20", #omicron -  EPI_ISL_9206118
    "USA/CT-DPH-1060794001/2021" : "2021-01-12", #omicron -  EPI_ISL_9261945
    "USA/ME-HETL-J11431/2021" : "2021-01-27", #omicron -  EPI_ISL_9263961
    "Zimbabwe/S_2910_B23/2021" : "2021-10-12", #omicron -  EPI_ISL_9184696
    #2 Feb
    "Brazil/MG-FIOCRUZ-550/2021" : "2021-01-03", #omicron -  EPI_ISL_9274902
    "Canada/ON-PHL-22-04025/2021" : "2021-01-13", #omicron -  EPI_ISL_9341303
    "CzechRepublic/CSQ5299/2021" : "2021-07-08", #omicron -  EPI_ISL_9342977
    "France/ARA-HCL022007644301/2021" : "2021-01-04", #omicron -  EPI_ISL_9315313
    "PuertoRico/PR-CDC-2-5441294/2021" : "2021-01-04", #omicron -  EPI_ISL_9329089
    "PuertoRico/PR-CDC-2-5441298/2021" : "2021-01-03", #omicron -  EPI_ISL_9329080
    "PuertoRico/PR-CDC-2-5441299/2021" : "2021-01-03", #omicron -  EPI_ISL_9329079
    "PuertoRico/PR-CDC-2-5441363/2021" : "2021-01-04", #omicron -  EPI_ISL_9329086
    "PuertoRico/PR-CDC-2-5441364/2021" : "2021-01-04", #omicron -  EPI_ISL_9329084
    "PuertoRico/PR-CDC-2-5441369/2021" : "2021-01-03", #omicron -  EPI_ISL_9329081
    "PuertoRico/PR-CDC-2-5441370/2021" : "2021-01-03", #omicron -  EPI_ISL_9329077
    "PuertoRico/PR-CDC-2-5441375/2021" : "2021-01-03", #omicron -  EPI_ISL_9329076
    "PuertoRico/PR-CDC-2-5441376/2021" : "2021-01-03", #omicron -  EPI_ISL_9329073
    "PuertoRico/PR-CDC-2-5441396/2021" : "2021-01-04", #omicron -  EPI_ISL_9329090
    "PuertoRico/PR-CDC-2-5441397/2021" : "2021-01-03", #omicron -  EPI_ISL_9329078
    "PuertoRico/PR-CDC-2-5441461/2021" : "2021-01-03", #omicron -  EPI_ISL_9329072
    "PuertoRico/PR-CDC-2-5441463/2021" : "2021-01-04", #omicron -  EPI_ISL_9329087
    "PuertoRico/PR-CDC-2-5441469/2021" : "2021-01-03", #omicron -  EPI_ISL_9329075
    "PuertoRico/PR-CDC-2-5441470/2021" : "2021-01-04", #omicron -  EPI_ISL_9329088
    "PuertoRico/PR-CDC-2-5441474/2021" : "2021-01-03", #omicron -  EPI_ISL_9329083
    "PuertoRico/PR-CDC-2-5441475/2021" : "2021-01-03", #omicron -  EPI_ISL_9329074
    "PuertoRico/PR-CDC-2-5441479/2021" : "2021-01-03", #omicron -  EPI_ISL_9329082
    "PuertoRico/PR-CDC-2-5441482/2021" : "2021-01-04", #omicron -  EPI_ISL_9329085
    "USA/TX-DSHS-14288/2021" : "2021-09-30", #omicron -  EPI_ISL_9196631
    "USA/TX-DSHS-14289/2021" : "2021-09-30", #omicron -  EPI_ISL_9196633
    "USA/TX-DSHS-14290/2021" : "2021-09-30", #omicron -  EPI_ISL_9196634
    "USA/TX-DSHS-14291/2021" : "2021-09-30", #omicron -  EPI_ISL_9196636
    "USA/TX-DSHS-14292/2021" : "2021-10-01", #omicron -  EPI_ISL_9196639
    "USA/TX-DSHS-14293/2021" : "2021-10-01", #omicron -  EPI_ISL_9196641
    "USA/TX-DSHS-14294/2021" : "2021-10-01", #omicron -  EPI_ISL_9196644
    "USA/TX-DSHS-14295/2021" : "2021-10-01", #omicron -  EPI_ISL_9196646
    "USA/TX-DSHS-14296/2021" : "2021-10-01", #omicron -  EPI_ISL_9196649
    "USA/TX-DSHS-14297/2021" : "2021-10-01", #omicron -  EPI_ISL_9196651
    "USA/TX-DSHS-14298/2021" : "2021-10-02", #omicron -  EPI_ISL_9196653
    "USA/TX-DSHS-14299/2021" : "2021-10-02", #omicron -  EPI_ISL_9196655
    "USA/TX-DSHS-14300/2021" : "2021-10-02", #omicron -  EPI_ISL_9196657
    "USA/TX-DSHS-14301/2021" : "2021-10-02", #omicron -  EPI_ISL_9196659
    "USA/TX-DSHS-14302/2021" : "2021-10-02", #omicron -  EPI_ISL_9196661
    "USA/TX-DSHS-14303/2021" : "2021-10-03", #omicron -  EPI_ISL_9196663
    "USA/TX-DSHS-14304/2021" : "2021-10-03", #omicron -  EPI_ISL_9196665
    "USA/TX-DSHS-14305/2021" : "2021-10-03", #omicron -  EPI_ISL_9196667
    "USA/TX-DSHS-14306/2021" : "2021-10-03", #omicron -  EPI_ISL_9196739
    # 7 Feb
    "Argentina/PAIS-G0778/2021" : "2021-01-06", #omicron - EPI_ISL_9507680
    "Australia/NSW-RPAH-2427/2021" : "2021-01-01", #omicron - EPI_ISL_9396384
    "Australia/NSW-RPAH-2428/2021" : "2021-01-02", #omicron - EPI_ISL_9396385
    "Canada/QC-L00430089001/2021" : "2021-01-03", #omicron - EPI_ISL_9508771
    "Ecuador/USFQ-2568/2021" : "2021-01-10", #omicron - EPI_ISL_9489291
    "Ecuador/USFQ-2570/2021" : "2021-01-10", #omicron - EPI_ISL_9489292
    "France/HDF-IPP03813/2021" : "2021-01-17", #omicron - EPI_ISL_9388575
    "France/HDF-IPP03814/2021" : "2021-01-17", #omicron - EPI_ISL_9388576
    "France/HDF-IPP03835/2021" : "2021-01-17", #omicron - EPI_ISL_9474888
    "France/HDF-IPP03836/2021" : "2021-01-17", #omicron - EPI_ISL_9474889
    "France/HDF-IPP03838/2021" : "2021-01-17", #omicron - EPI_ISL_9474891
    "France/HDF-IPP03845/2021" : "2021-01-17", #omicron - EPI_ISL_9474898
    "France/HDF-IPP03848/2021" : "2021-01-17", #omicron - EPI_ISL_9474900
    "France/HDF-IPP3837/2021" : "2021-01-17", #omicron - EPI_ISL_9474890
    "France/HDF-IPP3839/2021" : "2021-01-17", #omicron - EPI_ISL_9474892
    "France/HDF-IPP3841/2021" : "2021-01-17", #omicron - EPI_ISL_9474894
    "France/HDF-IPP3843/2021" : "2021-01-17", #omicron - EPI_ISL_9474896
    "France/HDF-IPP3844/2021" : "2021-01-17", #omicron - EPI_ISL_9474897
    "France/HDF-IPP3847/2021" : "2021-01-17", #omicron - EPI_ISL_9474899
    "France/IDF-IPP03138/2021" : "2021-01-09", #omicron - EPI_ISL_9429418
    "India/KA-SEQ_9654/2021" : "2021-01-01", #omicron - EPI_ISL_9510126
    "India/MH-ICMR-NIV-INSACOG-GSEQ-6794/2021" : "2021-10-07", #omicron - EPI_ISL_9503459
    "Japan/SZ-NIG-216126/2021" : "2021-01-06", #omicron - EPI_ISL_9415115
    "Japan/SZ-NIG-Y212358/2021" : "2021-01-08", #omicron - EPI_ISL_9415116
    "Japan/SZ-NIG-Y212359/2021" : "2021-01-08", #omicron - EPI_ISL_9415117
    "SouthAfrica/NCV477/2020" : "2020-11-26", #omicron - EPI_ISL_9413698
    "SouthAfrica/NCV488/2020" : "2020-11-26", #omicron - EPI_ISL_9413705
    "Thailand/64130096/2021" : "2021-09-12", #omicron - EPI_ISL_9396148
    "USA/AZ-TG1191512/2021" : "2021-09-26", #omicron - EPI_ISL_9483870
    "USA/ND-NDDH-10407/2021" : "2021-08-23", #omicron - EPI_ISL_9349208
    "USA/ND-NDDH-10646/2021" : "2021-01-18", #omicron - EPI_ISL_9390440
    "USA/NY-PRL-2022_0108_08B08/2021" : "2021-01-02", #omicron - EPI_ISL_9348229
    "France/IDF-HMN-22012240364/2021" : "2021-01-16", #omicron - EPI_ISL_9518264
    "DRC/INRB-RDC-791/2021" : "2021-10-26", #omicron
    "Italy/VEN-IRCCS-SCDC-134/2021" : "2021-10-20", #omicron
    "USA/AZ-TG1170254/2021" : "2021-10-28", #omicron
    "USA/MN-MDH-20528/2021" : "2021-10-28", #omicron
    # 9 feb
    "Norway/35622/2021" : "2021-01-06", #omicron - EPI_ISL_9626450
    "Thailand/DMSc-07080/2021" : "2021-01-14", #omicron - EPI_ISL_9593100
    "Belgium/ULG-24323/2021" : "2021-01-31", #omicron - EPI_ISL_9611028
    "England/PHEP-YYD4GXR/2021" : "2021-05-10", #omicron - EPI_ISL_9589414
    "Malaysia/UiTM1049/2021" : "2021-01-20", #omicron - EPI_ISL_9579118
    "Suriname/SR-913/2021" : "2021-01-01", #omicron - EPI_ISL_9628807
    "Suriname/SR-914/2021" : "2021-01-02", #omicron - EPI_ISL_9628808
    "Suriname/SR-915/2021" : "2021-01-03", #omicron - EPI_ISL_9628809
    "Suriname/SR-916/2021" : "2021-01-03", #omicron - EPI_ISL_9628810
    "Suriname/SR-917/2021" : "2021-01-04", #omicron - EPI_ISL_9628811
    "Suriname/SR-918/2021" : "2021-01-04", #omicron - EPI_ISL_9628812
    "Suriname/SR-919/2021" : "2021-01-05", #omicron - EPI_ISL_9628813
    "Suriname/SR-920/2021" : "2021-01-05", #omicron - EPI_ISL_9628814
    "Suriname/SR-921/2021" : "2021-01-06", #omicron - EPI_ISL_9628815
    "Suriname/SR-922/2021" : "2021-01-06", #omicron - EPI_ISL_9628816
    "Suriname/SR-923/2021" : "2021-01-09", #omicron - EPI_ISL_9628817
    "Suriname/SR-924/2021" : "2021-01-09", #omicron - EPI_ISL_9628818
    "Suriname/SR-925/2021" : "2021-01-09", #omicron - EPI_ISL_9628819
    "Suriname/SR-926/2021" : "2021-01-10", #omicron - EPI_ISL_9628820
    "Suriname/SR-927/2021" : "2021-01-10", #omicron - EPI_ISL_9628821
    "Suriname/SR-928/2021" : "2021-01-10", #omicron - EPI_ISL_9628822
    "Suriname/SR-929/2021" : "2021-01-13", #omicron - EPI_ISL_9628823
    "Suriname/SR-930/2021" : "2021-01-13", #omicron - EPI_ISL_9628824
    "Suriname/SR-931/2021" : "2021-01-15", #omicron - EPI_ISL_9628825
    "Suriname/SR-933/2021" : "2021-01-19", #omicron - EPI_ISL_9628827
    "Suriname/SR-934/2021" : "2021-01-19", #omicron - EPI_ISL_9628828
    "Suriname/SR-935/2021" : "2021-01-19", #omicron - EPI_ISL_9628829
    "Suriname/SR-936/2021" : "2021-01-18", #omicron - EPI_ISL_9628830
    "Suriname/SR-937/2021" : "2021-01-20", #omicron - EPI_ISL_9628831
    "Suriname/SR-938/2021" : "2021-01-20", #omicron - EPI_ISL_9628832
    "Suriname/SR-939/2021" : "2021-01-20", #omicron - EPI_ISL_9628833
    "Suriname/SR-940/2021" : "2021-01-20", #omicron - EPI_ISL_9628834
    "Suriname/SR-941/2021" : "2021-01-14", #omicron - EPI_ISL_9628835
    "Suriname/SR-942/2021" : "2021-01-14", #omicron - EPI_ISL_9628836
    "Suriname/SR-943/2021" : "2021-01-19", #omicron - EPI_ISL_9628837
    "Suriname/SR-944/2021" : "2021-01-19", #omicron - EPI_ISL_9628838
    "Suriname/SR-945/2021" : "2021-01-19", #omicron - EPI_ISL_9628839
    "Suriname/SR-946/2021" : "2021-01-19", #omicron - EPI_ISL_9628840
    "Suriname/SR-947/2021" : "2021-01-14", #omicron - EPI_ISL_9628841
    "Suriname/SR-948/2021" : "2021-01-19", #omicron - EPI_ISL_9628842
    "Suriname/SR-949/2021" : "2021-01-19", #omicron - EPI_ISL_9628843
    "Suriname/SR-950/2021" : "2021-01-19", #omicron - EPI_ISL_9628844
    "Suriname/SR-951/2021" : "2021-01-19", #omicron - EPI_ISL_9628845
    "Suriname/SR-952/2021" : "2021-01-19", #omicron - EPI_ISL_9628846
    "Suriname/SR-953/2021" : "2021-01-19", #omicron - EPI_ISL_9628847
    "Suriname/SR-954/2021" : "2021-01-19", #omicron - EPI_ISL_9628848
    "Suriname/SR-955/2021" : "2021-01-19", #omicron - EPI_ISL_9628849
    "Suriname/SR-956/2021" : "2021-01-08", #omicron - EPI_ISL_9628850
    "Suriname/SR-957/2021" : "2021-01-14", #omicron - EPI_ISL_9628851
    "Thailand/DMSc-06972/2021" : "2021-01-13", #omicron - EPI_ISL_9592995
    "Thailand/DMSc-06973/2021" : "2021-01-13", #omicron - EPI_ISL_9592996
    "Thailand/DMSc-06974/2021" : "2021-01-13", #omicron - EPI_ISL_9592997
    "Thailand/DMSc-06975/2021" : "2021-01-13", #omicron - EPI_ISL_9592998
    "Thailand/DMSc-06977/2021" : "2021-01-12", #omicron - EPI_ISL_9592999
    "Thailand/DMSc-06978/2021" : "2021-01-13", #omicron - EPI_ISL_9593000
    "Thailand/DMSc-06980/2021" : "2021-01-13", #omicron - EPI_ISL_9593002
    "Thailand/DMSc-06981/2021" : "2021-01-13", #omicron - EPI_ISL_9593003
    "Thailand/DMSc-06982/2021" : "2021-01-13", #omicron - EPI_ISL_9593004
    "Thailand/DMSc-06983/2021" : "2021-01-13", #omicron - EPI_ISL_9593005
    "Thailand/DMSc-06984/2021" : "2021-01-12", #omicron - EPI_ISL_9593006
    "Thailand/DMSc-06985/2021" : "2021-01-13", #omicron - EPI_ISL_9593007
    "Thailand/DMSc-06986/2021" : "2021-01-13", #omicron - EPI_ISL_9593008
    "Thailand/DMSc-06988/2021" : "2021-01-13", #omicron - EPI_ISL_9593010
    "Thailand/DMSc-06989/2021" : "2021-01-13", #omicron - EPI_ISL_9593011
    "Thailand/DMSc-06990/2021" : "2021-01-13", #omicron - EPI_ISL_9593012
    "Thailand/DMSc-06991/2021" : "2021-01-13", #omicron - EPI_ISL_9593013
    "Thailand/DMSc-06992/2021" : "2021-01-12", #omicron - EPI_ISL_9593014
    "Thailand/DMSc-06993/2021" : "2021-01-13", #omicron - EPI_ISL_9593015
    "Thailand/DMSc-06994/2021" : "2021-01-13", #omicron - EPI_ISL_9593016
    "Thailand/DMSc-06996/2021" : "2021-01-13", #omicron - EPI_ISL_9593018
    "Thailand/DMSc-06997/2021" : "2021-01-13", #omicron - EPI_ISL_9593019
    "Thailand/DMSc-06998/2021" : "2021-01-13", #omicron - EPI_ISL_9593020
    "Thailand/DMSc-06999/2021" : "2021-01-13", #omicron - EPI_ISL_9593021
    "Thailand/DMSc-07001/2021" : "2021-01-13", #omicron - EPI_ISL_9593023
    "Thailand/DMSc-07002/2021" : "2021-01-13", #omicron - EPI_ISL_9593024
    "Thailand/DMSc-07004/2021" : "2021-01-13", #omicron - EPI_ISL_9593026
    "Thailand/DMSc-07005/2021" : "2021-01-13", #omicron - EPI_ISL_9593027
    "Thailand/DMSc-07006/2021" : "2021-01-13", #omicron - EPI_ISL_9593028
    "Thailand/DMSc-07007/2021" : "2021-01-13", #omicron - EPI_ISL_9593029
    "Thailand/DMSc-07009/2021" : "2021-01-13", #omicron - EPI_ISL_9593031
    "Thailand/DMSc-07010/2021" : "2021-01-13", #omicron - EPI_ISL_9593032
    "Thailand/DMSc-07012/2021" : "2021-01-13", #omicron - EPI_ISL_9593034
    "Thailand/DMSc-07013/2021" : "2021-01-13", #omicron - EPI_ISL_9593035
    "Thailand/DMSc-07014/2021" : "2021-01-13", #omicron - EPI_ISL_9593036
    "Thailand/DMSc-07015/2021" : "2021-01-13", #omicron - EPI_ISL_9593037
    "Thailand/DMSc-07016/2021" : "2021-01-12", #omicron - EPI_ISL_9593038
    "Thailand/DMSc-07017/2021" : "2021-01-13", #omicron - EPI_ISL_9593039
    "Thailand/DMSc-07018/2021" : "2021-01-14", #omicron - EPI_ISL_9593040
    "Thailand/DMSc-07020/2021" : "2021-01-13", #omicron - EPI_ISL_9593042
    "Thailand/DMSc-07021/2021" : "2021-01-13", #omicron - EPI_ISL_9593043
    "Thailand/DMSc-07022/2021" : "2021-01-13", #omicron - EPI_ISL_9593044
    "Thailand/DMSc-07024/2021" : "2021-01-12", #omicron - EPI_ISL_9593046
    "Thailand/DMSc-07025/2021" : "2021-01-13", #omicron - EPI_ISL_9593047
    "Thailand/DMSc-07026/2021" : "2021-01-14", #omicron - EPI_ISL_9593048
    "Thailand/DMSc-07028/2021" : "2021-01-13", #omicron - EPI_ISL_9593050
    "Thailand/DMSc-07029/2021" : "2021-01-13", #omicron - EPI_ISL_9593051
    "Thailand/DMSc-07030/2021" : "2021-01-13", #omicron - EPI_ISL_9593052
    "Thailand/DMSc-07031/2021" : "2021-01-13", #omicron - EPI_ISL_9593053
    "Thailand/DMSc-07033/2021" : "2021-01-13", #omicron - EPI_ISL_9593055
    "Thailand/DMSc-07034/2021" : "2021-01-14", #omicron - EPI_ISL_9593056
    "Thailand/DMSc-07036/2021" : "2021-01-13", #omicron - EPI_ISL_9593058
    "Thailand/DMSc-07037/2021" : "2021-01-13", #omicron - EPI_ISL_9593059
    "Thailand/DMSc-07038/2021" : "2021-01-13", #omicron - EPI_ISL_9593060
    "Thailand/DMSc-07039/2021" : "2021-01-13", #omicron - EPI_ISL_9593061
    "Thailand/DMSc-07040/2021" : "2021-01-12", #omicron - EPI_ISL_9593062
    "Thailand/DMSc-07041/2021" : "2021-01-13", #omicron - EPI_ISL_9593063
    "Thailand/DMSc-07044/2021" : "2021-01-13", #omicron - EPI_ISL_9593065
    "Thailand/DMSc-07045/2021" : "2021-01-13", #omicron - EPI_ISL_9593066
    "Thailand/DMSc-07046/2021" : "2021-01-13", #omicron - EPI_ISL_9593067
    "Thailand/DMSc-07047/2021" : "2021-01-13", #omicron - EPI_ISL_9593068
    "Thailand/DMSc-07048/2021" : "2021-01-12", #omicron - EPI_ISL_9593069
    "Thailand/DMSc-07049/2021" : "2021-01-13", #omicron - EPI_ISL_9593070
    "Thailand/DMSc-07050/2021" : "2021-01-14", #omicron - EPI_ISL_9593071
    "Thailand/DMSc-07052/2021" : "2021-01-13", #omicron - EPI_ISL_9593073
    "Thailand/DMSc-07053/2021" : "2021-01-13", #omicron - EPI_ISL_9593074
    "Thailand/DMSc-07057/2021" : "2021-01-13", #omicron - EPI_ISL_9593078
    "Thailand/DMSc-07058/2021" : "2021-01-13", #omicron - EPI_ISL_9593079
    "Thailand/DMSc-07059/2021" : "2021-01-13", #omicron - EPI_ISL_9593080
    "Thailand/DMSc-07060/2021" : "2021-01-13", #omicron - EPI_ISL_9593081
    "Thailand/DMSc-07062/2021" : "2021-01-12", #omicron - EPI_ISL_9593083
    "Thailand/DMSc-07063/2021" : "2021-01-13", #omicron - EPI_ISL_9593084
    "Thailand/DMSc-07064/2021" : "2021-01-14", #omicron - EPI_ISL_9593085
    "Thailand/DMSc-07065/2021" : "2021-01-14", #omicron - EPI_ISL_9593086
    "Thailand/DMSc-07072/2021" : "2021-01-14", #omicron - EPI_ISL_9593093
    "Thailand/DMSc-07073/2021" : "2021-01-14", #omicron - EPI_ISL_9593094
    "Thailand/DMSc-07081/2021" : "2021-01-14", #omicron - EPI_ISL_9593101
    "Thailand/DMSc-07087/2021" : "2021-01-14", #omicron - EPI_ISL_9593107
    "Thailand/DMSc-07088/2021" : "2021-01-14", #omicron - EPI_ISL_9593108
    "Thailand/DMSc-07096/2021" : "2021-01-14", #omicron - EPI_ISL_9593116
    "Thailand/DMSc-07110/2021" : "2021-01-14", #omicron - EPI_ISL_9593130
    "Thailand/DMSc-07111/2021" : "2021-01-14", #omicron - EPI_ISL_9593131
    "Thailand/DMSc-07119/2021" : "2021-01-14", #omicron - EPI_ISL_9593138
    "Thailand/DMSc-07126/2021" : "2021-01-14", #omicron - EPI_ISL_9593145
    "Thailand/DMSc-07127/2021" : "2021-01-14", #omicron - EPI_ISL_9593146
    "Thailand/DMSc-07134/2021" : "2021-01-14", #omicron - EPI_ISL_9593153
    "Thailand/DMSc-07149/2021" : "2021-01-14", #omicron - EPI_ISL_9593167
    "USA/CA-SCPHL-22WGS00318/2021" : "2021-01-29", #omicron - EPI_ISL_9595018
    #11 Feb
    "Nigeria/NCDC-NR1188/2021" : "2021-10-12", #omicron - EPI_ISL_9673555
    "Nigeria/NCDC-NR1219/2021" : "2021-10-04", #omicron - EPI_ISL_9673560
    "USA/MT-UMGC-01822/2020" : "2020-11-10", #omicron - EPI_ISL_9637197
    "USA/MT-UMGC-01826/2020" : "2020-11-09", #omicron - EPI_ISL_9637200
    "USA/MT-UMGC-01828/2020" : "2020-11-10", #omicron - EPI_ISL_9637202
    "USA/MT-UMGC-01829/2020" : "2020-11-10", #omicron - EPI_ISL_9637203
    "USA/MT-UMGC-01830/2020" : "2020-11-10", #omicron - EPI_ISL_9637204
    "USA/MT-UMGC-01831/2020" : "2020-11-09", #omicron - EPI_ISL_9637205
    "USA/MT-UMGC-01838/2020" : "2020-11-10", #omicron - EPI_ISL_9637210
    "USA/MT-UMGC-01847/2020" : "2020-11-10", #omicron - EPI_ISL_9637218
    "USA/MT-UMGC-01848/2020" : "2020-11-10", #omicron - EPI_ISL_9637219
    "USA/MT-UMGC-01850/2020" : "2020-11-10", #omicron - EPI_ISL_9637221
    "USA/MT-UMGC-01852/2020" : "2020-11-10", #omicron - EPI_ISL_9637223
    "USA/MT-UMGC-01857/2020" : "2020-11-10", #omicron - EPI_ISL_9637227
    "USA/MT-UMGC-01858/2020" : "2020-11-10", #omicron - EPI_ISL_9637228
    "USA/MT-UMGC-01859/2020" : "2020-11-10", #omicron - EPI_ISL_9637229
    "USA/MT-UMGC-01860/2020" : "2020-11-10", #omicron - EPI_ISL_9637230
    "USA/MT-UMGC-01862/2020" : "2020-11-10", #omicron - EPI_ISL_9637232
    "USA/MT-UMGC-01864/2020" : "2020-11-10", #omicron - EPI_ISL_9637234
    "USA/MT-UMGC-01865/2020" : "2020-11-10", #omicron - EPI_ISL_9637235
    "USA/MT-UMGC-01866/2020" : "2020-11-09", #omicron - EPI_ISL_9637236
    "USA/MT-UMGC-01867/2020" : "2020-11-10", #omicron - EPI_ISL_9637237
    "USA/MT-UMGC-01869/2020" : "2020-11-10", #omicron - EPI_ISL_9637239
    "USA/MT-UMGC-01870/2020" : "2020-11-10", #omicron - EPI_ISL_9637240
    "USA/NJ-PHEL-V22006124/2021" : "2021-01-19", #omicron - EPI_ISL_9701643
    #14 feb
    "France/NAQ-HCL722000142101/2021" : "2021-01-24", #omicron -  EPI_ISL_9798310
    "France/NAQ-HCL722000142201/2021" : "2021-01-24", #omicron -  EPI_ISL_9798311
    "France/NAQ-HCL722000142301/2021" : "2021-01-24", #omicron -  EPI_ISL_9798312
    "France/NAQ-HCL722000142401/2021" : "2021-01-24", #omicron -  EPI_ISL_9798313
    "France/NAQ-HCL722000142501/2021" : "2021-01-24", #omicron -  EPI_ISL_9798314
    "France/NAQ-HCL722000142601/2021" : "2021-01-24", #omicron -  EPI_ISL_9798315
    "France/NAQ-HCL722000142701/2021" : "2021-01-24", #omicron -  EPI_ISL_9798316
    "France/NAQ-HCL722000142801/2021" : "2021-01-24", #omicron -  EPI_ISL_9798317
    "France/NAQ-HCL722000142901/2021" : "2021-01-24", #omicron -  EPI_ISL_9798318
    "France/NAQ-HCL722000143101/2021" : "2021-01-24", #omicron -  EPI_ISL_9798320
    "France/NAQ-HCL722000143501/2021" : "2021-01-24", #omicron -  EPI_ISL_9798324
    "France/NAQ-HCL722000143601/2021" : "2021-01-24", #omicron -  EPI_ISL_9798325
    "France/NAQ-HCL722000143701/2021" : "2021-01-24", #omicron -  EPI_ISL_9798326
    "France/NAQ-HCL722000144001/2021" : "2021-01-24", #omicron -  EPI_ISL_9798329
    "France/NAQ-HCL722000144101/2021" : "2021-01-24", #omicron -  EPI_ISL_9798330
    "France/NAQ-HCL722000219401/2021" : "2021-01-31", #omicron -  EPI_ISL_9798957
    "France/NAQ-HCL722000219501/2021" : "2021-01-31", #omicron -  EPI_ISL_9798958
    "France/NAQ-HCL722000219601/2021" : "2021-01-31", #omicron -  EPI_ISL_9798959
    "France/NAQ-HCL722000219701/2021" : "2021-01-31", #omicron -  EPI_ISL_9798960
    "France/NAQ-HCL722000219801/2021" : "2021-01-31", #omicron -  EPI_ISL_9798961
    "France/NAQ-HCL722000219901/2021" : "2021-01-31", #omicron -  EPI_ISL_9798962
    "France/NAQ-HCL722000220001/2021" : "2021-01-31", #omicron -  EPI_ISL_9798963
    "France/NAQ-HCL722000220101/2021" : "2021-01-31", #omicron -  EPI_ISL_9798964
    "France/NAQ-HCL722000220201/2021" : "2021-01-31", #omicron -  EPI_ISL_9798965
    "France/NAQ-HCL722000220301/2021" : "2021-01-31", #omicron -  EPI_ISL_9798966
    "France/NAQ-HCL722000220401/2021" : "2021-01-31", #omicron -  EPI_ISL_9798967
    "France/NAQ-HCL722000220501/2021" : "2021-01-31", #omicron -  EPI_ISL_9798968
    "France/NAQ-HCL722000220601/2021" : "2021-01-31", #omicron -  EPI_ISL_9798969
    "France/NAQ-HCL722000220701/2021" : "2021-01-31", #omicron -  EPI_ISL_9798970
    "France/NAQ-HCL722000220801/2021" : "2021-01-31", #omicron -  EPI_ISL_9798971
    "France/NAQ-HCL722000220901/2021" : "2021-01-31", #omicron -  EPI_ISL_9798972
    "France/NAQ-HCL722000221001/2021" : "2021-01-31", #omicron -  EPI_ISL_9798973
    "France/NAQ-HCL722000221101/2021" : "2021-01-31", #omicron -  EPI_ISL_9798974
    "France/NAQ-HCL722000221201/2021" : "2021-01-31", #omicron -  EPI_ISL_9798975
    "France/NAQ-HCL722000221301/2021" : "2021-01-31", #omicron -  EPI_ISL_9798976
    "France/NAQ-HCL722000221501/2021" : "2021-01-31", #omicron -  EPI_ISL_9798977
    "France/NAQ-HCL722000221601/2021" : "2021-01-31", #omicron -  EPI_ISL_9798978
    "France/NAQ-HCL722000221701/2021" : "2021-01-31", #omicron -  EPI_ISL_9798979
    "France/NAQ-HCL722000221801/2021" : "2021-01-31", #omicron -  EPI_ISL_9798980
    "France/NAQ-HCL722000221901/2021" : "2021-01-31", #omicron -  EPI_ISL_9798981
    "France/NAQ-HCL722000222001/2021" : "2021-01-31", #omicron -  EPI_ISL_9798982
    "France/NAQ-HCL722000222101/2021" : "2021-01-31", #omicron -  EPI_ISL_9798983
    "France/NAQ-HCL722000222301/2021" : "2021-01-31", #omicron -  EPI_ISL_9798985
    "France/NAQ-HCL722000222401/2021" : "2021-01-31", #omicron -  EPI_ISL_9798986
    "France/NAQ-HCL722000222501/2021" : "2021-01-31", #omicron -  EPI_ISL_9798987
    "France/NAQ-HCL722000222601/2021" : "2021-01-31", #omicron -  EPI_ISL_9798988
    "France/NAQ-HCL722000222701/2021" : "2021-01-31", #omicron -  EPI_ISL_9798989
    "France/NAQ-HCL722000222801/2021" : "2021-01-31", #omicron -  EPI_ISL_9798990
    "France/NAQ-HCL722000223101/2021" : "2021-01-31", #omicron -  EPI_ISL_9798991
    "France/NAQ-HCL722000223201/2021" : "2021-01-31", #omicron -  EPI_ISL_9798992
    "France/NAQ-HCL722000223301/2021" : "2021-01-31", #omicron -  EPI_ISL_9798993
    "France/NAQ-HCL722000223401/2021" : "2021-01-31", #omicron -  EPI_ISL_9798994
    "France/NAQ-HCL722000223501/2021" : "2021-01-31", #omicron -  EPI_ISL_9798995
    "France/NAQ-HCL722000223701/2021" : "2021-01-31", #omicron -  EPI_ISL_9798996
    "France/NAQ-HCL722000223801/2021" : "2021-01-31", #omicron -  EPI_ISL_9798997
    "France/NAQ-HCL722000223901/2021" : "2021-01-31", #omicron -  EPI_ISL_9798998
    "France/NAQ-HCL722000224001/2021" : "2021-01-31", #omicron -  EPI_ISL_9798999
    "France/NAQ-HCL722000224101/2021" : "2021-01-31", #omicron -  EPI_ISL_9799000
    "France/NAQ-HCL722000224201/2021" : "2021-01-31", #omicron -  EPI_ISL_9799001
    "France/NAQ-HCL722000224301/2021" : "2021-01-31", #omicron -  EPI_ISL_9799002
    "France/NAQ-HCL722000224401/2021" : "2021-01-31", #omicron -  EPI_ISL_9799003
    "France/NAQ-HCL722000224501/2021" : "2021-01-31", #omicron -  EPI_ISL_9799004
    "France/NAQ-HCL722000224601/2021" : "2021-01-31", #omicron -  EPI_ISL_9799005
    "France/NAQ-HCL722000224701/2021" : "2021-01-31", #omicron -  EPI_ISL_9799006
    "France/NAQ-HCL722000224801/2021" : "2021-01-31", #omicron -  EPI_ISL_9799007
    "France/NAQ-HCL722000225001/2021" : "2021-01-31", #omicron -  EPI_ISL_9799008
    "France/NAQ-HCL722000225101/2021" : "2021-01-31", #omicron -  EPI_ISL_9799009
    "France/NAQ-HCL722000225201/2021" : "2021-01-31", #omicron -  EPI_ISL_9799010
    "France/NAQ-HCL722000225301/2021" : "2021-01-31", #omicron -  EPI_ISL_9799011
    "France/NAQ-HCL722000225401/2021" : "2021-01-31", #omicron -  EPI_ISL_9799012
    "France/NAQ-HCL722000225501/2021" : "2021-01-31", #omicron -  EPI_ISL_9799013
    "France/NAQ-HCL722000225601/2021" : "2021-01-31", #omicron -  EPI_ISL_9799015
    "France/NAQ-HCL722000225701/2021" : "2021-01-31", #omicron -  EPI_ISL_9799016
    "France/NAQ-HCL722000225801/2021" : "2021-01-31", #omicron -  EPI_ISL_9799017
    "France/OCC-HCL722000143301/2021" : "2021-01-24", #omicron -  EPI_ISL_9798322
    "Gambia/99215/2021" : "2021-06-06", #omicron -  EPI_ISL_9712010
    "Italy/PUG_UNIBA_APU-BA485/2021" : "2021-01-31", #omicron -  EPI_ISL_9775699
    "Slovakia/run220208_RUVZ_BB-22-0375/2021" : "2021-01-24", #omicron -  EPI_ISL_9829723
    "USA/MA-CDCBI-CRSP_NRDHXYXTJJQAVYA6/2021" : "2021-01-31", #omicron -  EPI_ISL_9810655
    "USA/RI-CDCBI-RIDOH_D7KNKRLYISMFHSJW/2021" : "2021-01-26", #omicron -  EPI_ISL_9811041
    "USA/WI-WSLH-2203474/2021" : "2021-01-03", #omicron -  EPI_ISL_9755623
    "USA/WI-WSLH-2203617/2021" : "2021-01-07", #omicron -  EPI_ISL_9755701
    "France/NAQ-HCL722000143001/2021" : "2021-01-24", #omicron -  EPI_ISL_9798319
    "France/NAQ-HCL722000143401/2021" : "2021-01-24", #omicron -  EPI_ISL_9798323
    "France/NAQ-HCL722000143801/2021" : "2021-01-24", #omicron -  EPI_ISL_9798327
    "France/NAQ-HCL722000143901/2021" : "2021-01-24", #omicron -  EPI_ISL_9798328
    "France/NAQ-HCL722000222201/2021" : "2021-01-31", #omicron -  EPI_ISL_9798984
    "France/OCC-HCL722000143201/2021" : "2021-01-24", #omicron -  EPI_ISL_9798321
    #18 feb
    "Gambia/99215/2021" : "2021-06-06", #omicron
    "Honduras/26998-ICGES/2021" : "2021-09-01", #omicron
    "Italy/PUG_UNIBA_APU-BA485/2021" : "2021-01-31", #omicron
    "Norway/2122/2021" : "2021-01-10", #omicron
    "Slovakia/run220208_RUVZ_BB-22-0375/2021" : "2021-01-24", #omicron
    "SouthAfrica/NCV575/2020" : "2020-12-19", #omicron
    "SouthAfrica/NCV577/2020" : "2020-12-18", #omicron
    "Spain/CL-COV24171/2021" : "2021-01-26", #omicron
    "Spain/CL-COV24172/2021" : "2021-01-26", #omicron
    "Thailand/NIC_SRI_SEQ01603/2021" : "2021-01-24", #omicron
    "Thailand/NIC_SRI_SEQ01604/2021" : "2021-01-27", #omicron
    "USA/CA-LACPHL-AF06398/2021" : "2021-09-07", #omicron
    "USA/MA-CDCBI-CRSP_NRDHXYXTJJQAVYA6/2021" : "2021-01-31", #omicron
    "USA/NY-Wadsworth-22006856-01/2021" : "2021-01-26", #omicron
    "USA/RI-CDCBI-RIDOH_D7KNKRLYISMFHSJW/2021" : "2021-01-26", #omicron
    "USA/TX-DSHS-15313/2021" : "2021-01-06", #omicron
    "USA/WI-WSLH-2203474/2021" : "2021-01-03", #omicron
    "USA/WI-WSLH-2203617/2021" : "2021-01-07", #omicron
    #21 Feb
    "DemocraticRepublicoftheCongo/RC-356/2021" : "2021-08-12", #omicron
    "DemocraticRepublicoftheCongo/RC-396/2021" : "2021-06-12", #omicron
    "DemocraticRepublicoftheCongo/RC-405/2021" : "2021-08-12", #omicron
    "DemocraticRepublicoftheCongo/RC-409/2021" : "2021-08-12", #omicron
    "DemocraticRepublicoftheCongo/RC-412/2021" : "2021-10-12", #omicron
    "DemocraticRepublicoftheCongo/RC-413/2021" : "2021-08-12", #omicron
    "DemocraticRepublicoftheCongo/RC-415/2021" : "2021-09-12", #omicron
    "USA/LA-EVTL11612/2021" : "2021-07-29", #omicron
    #23 feb
    "DemocraticRepublicoftheCongo/RC-356/2021" : "2021-08-12", #omicron  EPI_ISL_10023502
    "DemocraticRepublicoftheCongo/RC-396/2021" : "2021-06-12", #omicron  EPI_ISL_10023518
    "DemocraticRepublicoftheCongo/RC-405/2021" : "2021-08-12", #omicron  EPI_ISL_10023523
    "DemocraticRepublicoftheCongo/RC-409/2021" : "2021-08-12", #omicron  EPI_ISL_10023526
    "DemocraticRepublicoftheCongo/RC-412/2021" : "2021-10-12", #omicron  EPI_ISL_10023527
    "DemocraticRepublicoftheCongo/RC-413/2021" : "2021-08-12", #omicron  EPI_ISL_10023528
    "DemocraticRepublicoftheCongo/RC-415/2021" : "2021-09-12", #omicron  EPI_ISL_10023530
    "Honduras/26998-ICGES/2021" : "2021-09-01", #omicron   EPI_ISL_9983950
    "Norway/2122/2021" : "2021-01-10", #omicron   EPI_ISL_9984342
    "Oman/72210/2021" : "2021-01-02", #omicron  EPI_ISL_10104936
    "Oman/722143/2021" : "2021-01-03", #omicron  EPI_ISL_10104934
    "Oman/72293/2021" : "2021-01-03", #omicron  EPI_ISL_10104935
    "Rwanda/NRLNAT4311/2021" : "2021-01-27", #omicron  EPI_ISL_10114824
    "Rwanda/NRLNAT4335/2021" : "2021-01-04", #omicron  EPI_ISL_10114823
    "SouthAfrica/NCV575/2020" : "2020-12-19", #omicron   EPI_ISL_9877975
    "SouthAfrica/NCV577/2020" : "2020-12-18", #omicron   EPI_ISL_9877973
    "Spain/CL-COV24171/2021" : "2021-01-26", #omicron   EPI_ISL_9909915
    "Spain/CL-COV24172/2021" : "2021-01-26", #omicron   EPI_ISL_9909913
    "Thailand/NIC_SRI_SEQ01603/2021" : "2021-01-24", #omicron   EPI_ISL_9872444
    "Thailand/NIC_SRI_SEQ01604/2021" : "2021-01-27", #omicron   EPI_ISL_9872445
    "USA/CA-LACPHL-AF06398/2021" : "2021-09-07", #omicron   EPI_ISL_9843366
    "USA/CA-LACPHL-AF06814/2021" : "2021-01-11", #omicron  EPI_ISL_10116082
    "USA/CA-LACPHL-AF06817/2021" : "2021-01-11", #omicron  EPI_ISL_10116085
    "USA/LA-EVTL11612/2021" : "2021-07-29", #omicron   EPI_ISL_9396281
    "USA/TX-DSHS-15313/2021" : "2021-01-06", #omicron   EPI_ISL_9862688
    "USA/WA-PHL-014485/2021" : "2021-10-12", #omicron  EPI_ISL_10117310
    "USA/WA-PHL-014487/2021" : "2021-10-12", #omicron  EPI_ISL_10117312
    "USA/WA-PHL-014495/2021" : "2021-09-29", #omicron  EPI_ISL_10117320
    "USA/WA-PHL-014498/2021" : "2021-09-29", #omicron  EPI_ISL_10117322
    #25 Feb
    "Austria/AGES-619882/2021" : "2021-08-21", #omicron  EPI_ISL_10258336
    "Austria/AGES-619892/2021" : "2021-08-21", #omicron  EPI_ISL_10258642
    "Austria/AGES-619894/2021" : "2021-08-21", #omicron  EPI_ISL_10258334
    "Austria/AGES-619898/2021" : "2021-08-21", #omicron  EPI_ISL_10258465
    "France/IDF-IPP11015/2021" : "2021-02-14", #omicron  EPI_ISL_10187078
    "Palau/PW-CDC-2-5546529/2021" : "2021-09-18", #omicron  EPI_ISL_10218064
    "Palau/PW-CDC-2-5546533/2021" : "2021-09-14", #omicron  EPI_ISL_10218061
    "Palau/PW-CDC-2-5546609/2021" : "2021-09-11", #omicron  EPI_ISL_10218059
    "Palau/PW-CDC-2-5546611/2021" : "2021-09-20", #omicron  EPI_ISL_10218066
    "Palau/PW-CDC-2-5546612/2021" : "2021-09-13", #omicron  EPI_ISL_10218060
    "Palau/PW-CDC-2-5546614/2021" : "2021-09-17", #omicron  EPI_ISL_10218063
    "Palau/PW-CDC-2-5546615/2021" : "2021-09-22", #omicron  EPI_ISL_10218067
    "Palau/PW-CDC-2-5546620/2021" : "2021-09-19", #omicron  EPI_ISL_10218065
    "Palau/PW-CDC-2-5546629/2021" : "2021-09-15", #omicron  EPI_ISL_10218062
    "Palau/PW-CDC-2-5546708/2021" : "2021-09-23", #omicron  EPI_ISL_10218068
    "USA/SD-CDC-2-5594711/2021" : "2021-01-02", #omicron  EPI_ISL_10226533
    "USA/SD-CDC-2-5594844/2021" : "2021-01-02", #omicron  EPI_ISL_10226534
    # 1 march
    "Canada/SK-RRPL-354439/2021" : "2021-06-16", #omicron  EPI_ISL_10362289
    "Congo/RC-356/2021" : "2021-08-12", #omicron  EPI_ISL_10023502 -- think these should be DECEMBER as month
    "Congo/RC-396/2021" : "2021-06-12", #omicron  EPI_ISL_10023518 -- think these should be DECEMBER as month
    "Congo/RC-405/2021" : "2021-08-12", #omicron  EPI_ISL_10023523 -- think these should be DECEMBER as month
    "Congo/RC-409/2021" : "2021-08-12", #omicron  EPI_ISL_10023526 -- think these should be DECEMBER as month
    "Congo/RC-412/2021" : "2021-10-12", #omicron  EPI_ISL_10023527 -- think these should be DECEMBER as month
    "Congo/RC-413/2021" : "2021-08-12", #omicron  EPI_ISL_10023528 -- think these should be DECEMBER as month
    "Congo/RC-415/2021" : "2021-09-12", #omicron  EPI_ISL_10023530 -- think these should be DECEMBER as month
    "France/HDF-IPP10662/2021" : "2021-02-07", #omicron  EPI_ISL_10352660
    "India/KA-NIMH-SEQ-4177/2021" : "2021-02-12", #omicron  EPI_ISL_10397492
    "Japan/GK2749/2021" : "2021-01-13", #omicron  EPI_ISL_10343846
    "Japan/GK2751/2021" : "2021-01-13", #omicron  EPI_ISL_10343847
    "Japan/GK2764/2021" : "2021-01-13", #omicron  EPI_ISL_10343848
    "Japan/GK2768/2021" : "2021-01-13", #omicron  EPI_ISL_10343849
    "Japan/GK2769/2021" : "2021-01-13", #omicron  EPI_ISL_10343850
    "Japan/GK2773/2021" : "2021-01-13", #omicron  EPI_ISL_10343851
    "Malaysia/IMR_CV03377/2021" : "2021-01-01", #omicron  EPI_ISL_10297348
    "USA/NJ-GBW-EWR000070/2021" : "2021-01-03", #omicron  EPI_ISL_10272635
    "USA/NJ-GBW-EWR000071/2021" : "2021-01-03", #omicron  EPI_ISL_10272636
    "USA/NJ-GBW-EWR000072/2021" : "2021-01-03", #omicron  EPI_ISL_10272637
    #3 Mar
    "Chile/RM-Culture_MSJ_6476/2021" : "2021-08-12", #omicron  EPI_ISL_10487167
    "England/DHSC-CYB1MIA/2021" : "2021-01-01", #omicron  EPI_ISL_10437253
    "England/DHSC-CYB5B7Y/2021" : "2021-01-01", #omicron  EPI_ISL_10437721
    "England/DHSC-CYB5ZR7/2021" : "2021-01-01", #omicron  EPI_ISL_10437924
    "England/DHSC-CYB6XG5/2021" : "2021-01-01", #omicron  EPI_ISL_10438151
    "England/DHSC-CYB7QWB/2021" : "2021-01-01", #omicron  EPI_ISL_10438657
    "England/DHSC-CYBDJBN/2021" : "2021-01-01", #omicron  EPI_ISL_10439721
    "England/DHSC-CYBGKZQ/2021" : "2021-01-01", #omicron  EPI_ISL_10440258
    "England/DHSC-CYBMXGN/2021" : "2021-01-01", #omicron  EPI_ISL_10441799
    "England/DHSC-CYBR5QW/2021" : "2021-01-01", #omicron  EPI_ISL_10442556
    "England/DHSC-CYBUB6Q/2021" : "2021-01-01", #omicron  EPI_ISL_10443055
    "England/DHSC-CYBWXX7/2021" : "2021-01-01", #omicron  EPI_ISL_10443745
    "England/DHSC-CYBY3DW/2021" : "2021-01-01", #omicron  EPI_ISL_10445073
    "England/DHSC-CYD5WR6/2021" : "2021-01-01", #omicron  EPI_ISL_10446547
    "England/DHSC-CYDFHCU/2021" : "2021-04-14", #omicron  EPI_ISL_10448467
    "England/DHSC-CYDWFBB/2021" : "2021-01-01", #omicron  EPI_ISL_10451346
    "England/DHSC-CYN3OSN/2021" : "2021-01-01", #omicron  EPI_ISL_10453162
    "England/DHSC-CYN5T7X/2021" : "2021-01-01", #omicron  EPI_ISL_10454024
    "England/DHSC-CYN7E9O/2021" : "2021-01-01", #omicron  EPI_ISL_10454905
    "England/DHSC-CYNET4H/2021" : "2021-01-01", #omicron  EPI_ISL_10456395
    "England/DHSC-CYNNUEM/2021" : "2021-01-01", #omicron  EPI_ISL_10457369
    "England/DHSC-CYNTYUE/2021" : "2021-01-01", #omicron  EPI_ISL_10458285
    "England/DHSC-CYNWA54/2021" : "2021-01-01", #omicron  EPI_ISL_10458494
    "England/DHSC-CYNYFHW/2021" : "2021-01-01", #omicron  EPI_ISL_10458850
    "England/DHSC-CYY1T13/2021" : "2021-01-01", #omicron  EPI_ISL_10459323
    "England/DHSC-CYY3TA9/2021" : "2021-01-01", #omicron  EPI_ISL_10459465
    "England/DHSC-CYY9MKS/2021" : "2021-01-01", #omicron  EPI_ISL_10460591
    "England/DHSC-CYYASJ5/2021" : "2021-01-01", #omicron  EPI_ISL_10461245
    "England/DHSC-CYYQWNY/2021" : "2021-01-01", #omicron  EPI_ISL_10469051
    "England/DHSC-CYYRS3D/2021" : "2021-01-01", #omicron  EPI_ISL_10469484
    "England/DHSC-CYYSXNW/2021" : "2021-01-01", #omicron  EPI_ISL_10470113
    "England/DHSC-CYYUQY9/2021" : "2021-01-01", #omicron  EPI_ISL_10471157
    "Spain/MC-HCUVA-16185980/2020" : "2020-10-29", #omicron  EPI_ISL_10503257
    "USA/MT-WL-1302/2020" : "2020-12-23", #omicron  EPI_ISL_10493876
    "England/DHSC-CYYOH7H/2021" : "2021-01-01", #omicron  EPI_ISL_10467862
    #8 mar
    "Colombia/DC-CSB-1130622121/2021" : "2021-05-20", #omicron  EPI_ISL_10594793
    "Colombia/VAC-CSB-1017128204/2021" : "2021-04-08", #omicron  EPI_ISL_10594778
    "Colombia/VAC-CSB-1107517302/2021" : "2021-07-01", #omicron  EPI_ISL_10594763
    "Colombia/VAC-CSB-1113651029/2021" : "2021-03-15", #omicron  EPI_ISL_10594727
    "Colombia/VAC-CSB-1144079554/2021" : "2021-03-26", #omicron  EPI_ISL_10594748
    "Colombia/VAC-CSB-1144160693/2021" : "2021-04-26", #omicron  EPI_ISL_10594733
    "Colombia/VAC-CSB-1234193441/2021" : "2021-06-24", #omicron  EPI_ISL_10594744
    "Colombia/VAC-CSB-31947468/2021" : "2021-03-26", #omicron  EPI_ISL_10594750
    "Colombia/VAC-CSB-66862023/2021" : "2021-09-10", #omicron  EPI_ISL_10594798
    "Colombia/VAC-CSB-94318427/2021" : "2021-01-13", #omicron  EPI_ISL_10594728
    "France/ARA-HCL722000841701/2021" : "2021-01-24", #omicron  EPI_ISL_10718500
    "France/ARA-HCL722000841801/2021" : "2021-01-24", #omicron  EPI_ISL_10718501
    "France/ARA-HCL722000841901/2021" : "2021-01-24", #omicron  EPI_ISL_10718502
    "France/ARA-HCL722000842001/2021" : "2021-01-24", #omicron  EPI_ISL_10718503
    "France/ARA-HCL722000842101/2021" : "2021-01-24", #omicron  EPI_ISL_10718504
    "France/ARA-HCL722000842201/2021" : "2021-01-24", #omicron  EPI_ISL_10718505
    "France/ARA-HCL722000842301/2021" : "2021-01-24", #omicron  EPI_ISL_10718506
    "France/ARA-HCL722000942601/2021" : "2021-01-10", #omicron  EPI_ISL_10719324
    "France/ARA-HCL722000946601/2021" : "2021-01-17", #omicron  EPI_ISL_10719360
    "France/NAQ-HCL722000879701/2021" : "2021-02-21", #omicron  EPI_ISL_10718830
    "France/NAQ-HCL722000879801/2021" : "2021-02-21", #omicron  EPI_ISL_10718831
    "Italy/VEN-IZSVe-22RS8068-5_VI/2021" : "2021-02-13", #omicron  EPI_ISL_10626936
    "Italy/VEN-IZSVe-22RS8068-6_VI/2021" : "2021-02-13", #omicron  EPI_ISL_10626937
    "Slovakia/BA_22_00004773/2020" : "2020-12-31", #omicron  EPI_ISL_10699545
    "Spain/CT-HUGTiPM081UY6B1/2021" : "2021-02-15", #omicron  EPI_ISL_10497567
    "Spain/CT-HUGTiPM081UY6C1/2021" : "2021-02-15", #omicron  EPI_ISL_10497579
    "Spain/CT-HUGTiPM081UY6E1/2021" : "2021-02-15", #omicron  EPI_ISL_10497602
    "Spain/CT-HUGTiPM081UY6F1/2021" : "2021-02-15", #omicron  EPI_ISL_10497614
    "Spain/CT-HUGTiPM081UY6H1/2021" : "2021-02-15", #omicron  EPI_ISL_10497637
    "USA/CA-SCPHL-22WGS00457/2021" : "2021-01-05", #omicron  EPI_ISL_10570648
    "USA/MI-UM-10043952723/2020" : "2020-02-08", #omicron  EPI_ISL_10640614
    "USA/MI-UM-10043953420/2020" : "2020-02-08", #omicron  EPI_ISL_10640615
    "USA/MI-UM-10043956501/2020" : "2020-02-08", #omicron  EPI_ISL_10640616
    "USA/MI-UM-10043957326/2020" : "2020-02-08", #omicron  EPI_ISL_10640617
    "USA/MI-UM-10043957900/2020" : "2020-02-08", #omicron  EPI_ISL_10640618
    "USA/MI-UM-10043958005/2020" : "2020-02-08", #omicron  EPI_ISL_10640619
    "USA/MI-UM-10043958144/2020" : "2020-02-08", #omicron  EPI_ISL_10640620
    "USA/MI-UM-10043961308/2020" : "2020-02-08", #omicron  EPI_ISL_10640621
    "USA/MI-UM-10043963333/2020" : "2020-02-08", #omicron  EPI_ISL_10640622
    "USA/MI-UM-10043963337/2020" : "2020-02-08", #omicron  EPI_ISL_10640623
    "USA/MI-UM-10043963641/2020" : "2020-02-08", #omicron  EPI_ISL_10640624
    "USA/MI-UM-10043964665/2020" : "2020-02-08", #omicron  EPI_ISL_10640625
    "USA/MI-UM-10043966952/2020" : "2020-02-08", #omicron  EPI_ISL_10640626
    "USA/MI-UM-10043967000/2020" : "2020-02-08", #omicron  EPI_ISL_10640627
    "USA/MI-UM-10043975423/2020" : "2020-02-09", #omicron  EPI_ISL_10640628
    "USA/MI-UM-10043975705/2020" : "2020-02-09", #omicron  EPI_ISL_10640629
    "USA/MI-UM-10043976010/2020" : "2020-02-09", #omicron  EPI_ISL_10640630
    "USA/MI-UM-10043977230/2020" : "2020-02-09", #omicron  EPI_ISL_10640631
    "USA/MI-UM-10043982911/2020" : "2020-02-08", #omicron  EPI_ISL_10640632
    "USA/MI-UM-10043984027/2020" : "2020-02-09", #omicron  EPI_ISL_10640633
    "USA/MI-UM-10043998614/2020" : "2020-02-10", #omicron  EPI_ISL_10640634
    "USA/MI-UM-10044001570/2020" : "2020-02-10", #omicron  EPI_ISL_10640635
    "USA/MI-UM-10044006725/2020" : "2020-02-10", #omicron  EPI_ISL_10640636
    "USA/MI-UM-10044006967/2020" : "2020-02-10", #omicron  EPI_ISL_10640637
    "USA/MI-UM-10044008229/2020" : "2020-02-10", #omicron  EPI_ISL_10640638
    "USA/MI-UM-10044016821/2020" : "2020-02-10", #omicron  EPI_ISL_10640639
    "USA/NJ-PHEL-V22011240/2021" : "2021-02-20", #omicron  EPI_ISL_10686508
    "USA/NY-NYULH5825/2021" : "2021-10-13", #omicron  EPI_ISL_10650980
    "France/NAQ-HCL722000879401/2021" : "2021-02-21", #omicron  EPI_ISL_10718828
    "France/NAQ-HCL722000879901/2021" : "2021-02-21", #omicron  EPI_ISL_10718832
    "India/MH-KasturbaMCGM-ICMR-INSACOG-WG3084/2021" : "2021-05-19", #omicron  EPI_ISL_10638860
    "Spain/CT-HUGTiPM081UY6D1/2021" : "2021-02-15", #omicron  EPI_ISL_10497591
    "Sweden/10336331/2021" : "2021-03-25", #omicron  EPI_ISL_10610556
    #10 mar
    "Austria/AGES-636780/2021" : "2021-09-25", #omicron  EPI_ISL_10741494
    "CzechRepublic/CSQ6538/2021" : "2021-02-15", #omicron  EPI_ISL_10754172
    "France/OCC-IPP12318/2021" : "2021-02-14", #omicron  EPI_ISL_10757277
    "France/OCC-IPP12325/2021" : "2021-02-14", #omicron  EPI_ISL_10757269
    "France/OCC-IPP12329/2021" : "2021-02-14", #omicron  EPI_ISL_10757294
    "France/OCC-IPP12334/2021" : "2021-02-14", #omicron  EPI_ISL_10757291
    "France/OCC-IPP12338/2021" : "2021-02-14", #omicron  EPI_ISL_10757267
    "France/OCC-IPP12339/2021" : "2021-02-14", #omicron  EPI_ISL_10757263
    "France/OCC-IPP12340/2021" : "2021-02-14", #omicron  EPI_ISL_10757303
    "France/OCC-IPP12341/2021" : "2021-02-14", #omicron  EPI_ISL_10757297
    "France/OCC-IPP12343/2021" : "2021-02-14", #omicron  EPI_ISL_10757260
    "France/OCC-IPP12344/2021" : "2021-02-14", #omicron  EPI_ISL_10757273
    "France/OCC-IPP12346/2021" : "2021-02-14", #omicron  EPI_ISL_10757306
    "France/OCC-IPP12347/2021" : "2021-02-14", #omicron  EPI_ISL_10757382
    "France/OCC-IPP12349/2021" : "2021-02-14", #omicron  EPI_ISL_10757274
    "France/OCC-IPP12350/2021" : "2021-02-14", #omicron  EPI_ISL_10757309
    "France/OCC-IPP12352/2021" : "2021-02-14", #omicron  EPI_ISL_10757383
    "France/OCC-IPP12355/2021" : "2021-02-14", #omicron  EPI_ISL_10757316
    "Germany/BY-MVP-000012525/2021" : "2021-02-22", #omicron  EPI_ISL_10815473
    "Slovakia/BA_22_00009226/2021" : "2021-08-11", #omicron  EPI_ISL_10765798
    "France/OCC-IPP12322/2021" : "2021-02-14", #omicron  EPI_ISL_10757265
    "France/OCC-IPP12326/2021" : "2021-02-14", #omicron  EPI_ISL_10757307
    "France/OCC-IPP12332/2021" : "2021-02-14", #omicron  EPI_ISL_10757305
    "France/OCC-IPP12333/2021" : "2021-02-14", #omicron  EPI_ISL_10757404
    "France/OCC-IPP12335/2021" : "2021-02-14", #omicron  EPI_ISL_10757304
    #15 mar
    "Japan/4VA-647/2021" : "2021-01-21", #omicron  EPI_ISL_10842406
    "Spain/CL-COV26027/2021" : "2021-01-19", #omicron  EPI_ISL_10856019
    "Spain/CL-COV26094/2021" : "2021-01-22", #omicron  EPI_ISL_10856302
    "Spain/CL-COV26102/2021" : "2021-01-20", #omicron  EPI_ISL_10856672
    "Spain/CL-COV26105/2021" : "2021-01-10", #omicron  EPI_ISL_10856282
    "Spain/CL-COV26106/2021" : "2021-01-10", #omicron  EPI_ISL_10856526
    "Spain/CL-COV26107/2021" : "2021-01-14", #omicron  EPI_ISL_10856283
    "Spain/CL-COV26108/2021" : "2021-01-14", #omicron  EPI_ISL_10856284
    "Spain/CL-COV26109/2021" : "2021-01-14", #omicron  EPI_ISL_10856285
    "Spain/CL-COV26110/2021" : "2021-01-14", #omicron  EPI_ISL_10856286
    "Spain/CL-COV26111/2021" : "2021-01-19", #omicron  EPI_ISL_10855832
    "Spain/CL-COV26112/2021" : "2021-01-19", #omicron  EPI_ISL_10856287
    "Spain/CL-COV26113/2021" : "2021-01-19", #omicron  EPI_ISL_10855544
    "Spain/CL-COV26114/2021" : "2021-01-19", #omicron  EPI_ISL_10856062
    "Spain/CL-COV26115/2021" : "2021-01-19", #omicron  EPI_ISL_10856288
    "Thailand/NIC_SNI_FRS254/2021" : "2021-01-29", #omicron  EPI_ISL_10890915
    "USA/CO-CDPHE-2103012145/2021" : "2021-01-03", #omicron  EPI_ISL_10956610
    "India/AS-CSIR-NEIST-INSACOG-NEIST3-CIDIN0213/2020" : "2020-09-06", #delta  EPI_ISL_10955237
    #17 mar
    "Zambia/MH21_105_5506/2020" : "2020-02-24", #beta  EPI_ISL_10980370
    "Zambia/MH23_107_4328/2020" : "2020-02-18", #beta  EPI_ISL_10980369
    "India/TG-RFCH04367_CIC4099/2021" : "2021-05-10", #omicron  EPI_ISL_10989864
    "India/TG-RFCH04371_CIC4103/2021" : "2021-05-01", #omicron  EPI_ISL_10989600
    "India/TG-RFCH04372_CIC4104/2021" : "2021-05-10", #omicron  EPI_ISL_10989833
    "India/TG-RFCH04378_CIC4110/2021" : "2021-05-10", #omicron  EPI_ISL_10989894
    "India/TG-RFCH04379_CIC4111/2021" : "2021-03-13", #omicron  EPI_ISL_10989470
    "India/TG-RFCH04381_CIC4114/2021" : "2021-05-17", #omicron  EPI_ISL_10989632
    "India/TG-RFCH04385_CIC4118/2021" : "2021-05-07", #omicron  EPI_ISL_10989532
    "India/TG-RFCH04386_CIC4119/2021" : "2021-05-02", #omicron  EPI_ISL_10989743
    "India/TG-RFCH04387_CIC4120/2021" : "2021-05-10", #omicron  EPI_ISL_10989501
    "India/TG-RFCH04393_CIC4126/2021" : "2021-05-10", #omicron  EPI_ISL_10989865
    "India/TG-RFCH04394_CIC4127/2021" : "2021-05-07", #omicron  EPI_ISL_10989440
    "India/TG-RFCH04396_CIC4130/2021" : "2021-05-10", #omicron  EPI_ISL_10989601
    "India/TG-RFCH04401_CIC4135/2021" : "2021-05-10", #omicron  EPI_ISL_10989585
    "India/TG-RFCH04403_CIC4138/2021" : "2021-05-07", #omicron  EPI_ISL_10989471
    "India/TG-RFCH04404_CIC4139/2021" : "2021-05-10", #omicron  EPI_ISL_10989826
    "India/TG-RFCH04406_CIC4141/2021" : "2021-02-28", #omicron  EPI_ISL_10989633
    "India/TG-RFCH04408_CIC4143/2021" : "2021-05-10", #omicron  EPI_ISL_10989533
    "India/TG-RFCH04411_CIC4146/2021" : "2021-05-10", #omicron  EPI_ISL_10989744
    "India/TG-RFCH04414_CIC4149/2021" : "2021-05-10", #omicron  EPI_ISL_10989674
    "India/TG-RFCH04415_CIC4150/2021" : "2021-05-10", #omicron  EPI_ISL_10989642
    "India/TG-RFCH04416_CIC4151/2021" : "2021-02-27", #omicron  EPI_ISL_10989594
    "India/TG-RFCH04417_CIC4152/2021" : "2021-05-11", #omicron  EPI_ISL_10989683
    "India/TG-RFCH04420_CIC4155/2021" : "2021-05-07", #omicron  EPI_ISL_10989441
    "India/TG-RFCH04421_CIC4156/2021" : "2021-05-10", #omicron  EPI_ISL_10989602
    "India/TG-RFCH04424_CIC4159/2021" : "2021-05-10", #omicron  EPI_ISL_10989714
    "India/TG-RFCH04425_CIC4160/2021" : "2021-05-10", #omicron  EPI_ISL_10989586
    "India/TG-RFCH04426_CIC4161/2021" : "2021-05-10", #omicron  EPI_ISL_10989896
    "India/TG-RFCH04429_CIC4164/2021" : "2021-05-07", #omicron  EPI_ISL_10989472
    "India/TG-RFCH04430_CIC4165/2021" : "2021-05-07", #omicron  EPI_ISL_10989827
    "India/TG-RFCH04433_CIC4168/2021" : "2021-05-07", #omicron  EPI_ISL_10989775
    "India/TG-RFCH04434_CIC4169/2021" : "2021-05-10", #omicron  EPI_ISL_10989534
    "India/TG-RFCH04437_CIC4172/2021" : "2021-05-11", #omicron  EPI_ISL_10989503
    "India/TG-RFCH04440_CIC4175/2021" : "2021-05-10", #omicron  EPI_ISL_10989643
    "India/TG-RFCH04442_CIC4177/2021" : "2021-05-10", #omicron  EPI_ISL_10989595
    "India/TG-RFCH04443_CIC4178/2021" : "2021-05-07", #omicron  EPI_ISL_10989684
    "India/TG-RFCH04445_CIC4180/2021" : "2021-05-07", #omicron  EPI_ISL_10989442
    "India/TG-RFCH04448_CIC4183/2021" : "2021-05-10", #omicron  EPI_ISL_10989836
    "India/TG-RFCH04449_CIC4184/2021" : "2021-05-10", #omicron  EPI_ISL_10989715
    "India/TG-RFCH04450_CIC4185/2021" : "2021-05-07", #omicron  EPI_ISL_10989587
    "India/TG-RFCH04451_CIC4186/2021" : "2021-05-10", #omicron  EPI_ISL_10989897
    "India/TG-RFCH04453_CIC4188/2021" : "2021-05-10", #omicron  EPI_ISL_10989828
    # 22 Mar
    "India/TN-CLRI-CIC0645/2020" : "2020-08-15", # delta EPI_ISL_9232386
    "England/PHEC-YYDRP3I/2021" : "2021-05-22", # omicron EPI_ISL_11059035
    "England/PHEC-YYDRP5T/2021" : "2021-01-27", # omicron EPI_ISL_11059036
    "England/PHEC-YYDRP9J/2021" : "2021-01-26", # omicron EPI_ISL_11059039
    "England/PHEC-YYDRPHX/2021" : "2021-02-01", # omicron EPI_ISL_11059045
    "England/PHEC-YYDRPI7/2021" : "2021-02-02", # omicron EPI_ISL_11059046
    "England/PHEC-YYDRPW9/2021" : "2021-02-01", # omicron EPI_ISL_11059054
    "England/PHEC-YYDRQDB/2021" : "2021-02-28", # omicron EPI_ISL_11059058
    "England/PHEC-YYDRQJI/2021" : "2021-03-08", # omicron EPI_ISL_11059060
    "England/PHEC-YYDRQKU/2021" : "2021-03-12", # omicron EPI_ISL_11059061
    "England/PHEC-YYDRQND/2021" : "2021-02-27", # omicron EPI_ISL_11059063
    "England/PHEC-YYDRQR9/2021" : "2021-03-02", # omicron EPI_ISL_11059065
    "England/PHEC-YYDRQY8/2021" : "2021-03-14", # omicron EPI_ISL_11059068
    "India/TN-CCMB_CLRI-CIC6038/2021" : "2021-04-21", # omicron EPI_ISL_11058065
    "India/TN-CCMB_CLRI-CIC6053/2021" : "2021-04-26", # omicron EPI_ISL_11058073
    "India/TN-CCMB_CLRI-CIC6060/2021" : "2021-04-28", # omicron EPI_ISL_11058078
    "Italy/EMR_AUSLRomagna_C027-22-38/2021" : "2021-03-06", # omicron EPI_ISL_11113753
    "Italy/EMR_AUSLRomagna_C028-22-01/2021" : "2021-03-06", # omicron EPI_ISL_11191125
    "Italy/EMR_AUSLRomagna_C028-22-02/2021" : "2021-03-06", # omicron EPI_ISL_11191124
    "Italy/EMR_AUSLRomagna_C028-22-03/2021" : "2021-03-06", # omicron EPI_ISL_11191126
    "Italy/EMR_AUSLRomagna_C028-22-08/2021" : "2021-03-06", # omicron EPI_ISL_11191118
    "Italy/EMR_AUSLRomagna_C028-22-12/2021" : "2021-03-08", # omicron EPI_ISL_11191114
    "Italy/EMR_AUSLRomagna_C028-22-16/2021" : "2021-03-08", # omicron EPI_ISL_11191110
    "Italy/EMR_AUSLRomagna_C028-22-17/2021" : "2021-03-08", # omicron EPI_ISL_11191109
    "Italy/EMR_AUSLRomagna_C028-22-19/2021" : "2021-03-08", # omicron EPI_ISL_11191106
    "Italy/EMR_AUSLRomagna_C028-22-21/2021" : "2021-03-08", # omicron EPI_ISL_11191104
    "Italy/MAR_UNIVPM_Marche_78394-21-02-22_WG/2021" : "2021-02-21", # omicron EPI_ISL_11162187
    "Norway/36375/2021" : "2021-02-21", # omicron EPI_ISL_11069117
    "PuertoRico/PR-011421-S-1878/2021" : "2021-01-14", # omicron EPI_ISL_11190692
    "Russia/PRI-RII-MH58565S/2021" : "2021-01-19", # omicron EPI_ISL_10542482
    "USA/AZ-ASU53797/2021" : "2021-08-02", # omicron EPI_ISL_11192930
    "USA/AZ-ASU53799/2021" : "2021-08-03", # omicron EPI_ISL_11192934
    "USA/AZ-ASU53892/2021" : "2021-09-04", # omicron EPI_ISL_11192939
    "USA/CO-CDPHE-2103007273/2021" : "2021-01-06", # omicron EPI_ISL_11104251
    "USA/CO-CDPHE-2103012520/2021" : "2021-01-17", # omicron EPI_ISL_11104151
    "USA/NE-NPHL22-3296/2021" : "2021-01-10", # omicron EPI_ISL_11075824
    "USA/SD-UMGC-35497/2020" : "2020-01-05", # omicron EPI_ISL_11144995
    "India/TN-CCMB_CLRI-CIC6034/2021" : "2021-04-19", #omicron EPI_ISL_11058064
    "India/TN-CCMB_CLRI-CIC6040/2021" : "2021-04-22", #omicron EPI_ISL_11058066
    "India/TN-CCMB_CLRI-CIC6042/2021" : "2021-04-22", #omicron EPI_ISL_11058067
    "India/TN-CCMB_CLRI-CIC6048/2021" : "2021-04-23", #omicron EPI_ISL_11058068
    "India/TN-CCMB_CLRI-CIC6049/2021" : "2021-04-23", #omicron EPI_ISL_11058069
    "India/TN-CCMB_CLRI-CIC6050/2021" : "2021-04-23", #omicron EPI_ISL_11058070
    "India/TN-CCMB_CLRI-CIC6051/2021" : "2021-04-23", #omicron EPI_ISL_11058071
    "India/TN-CCMB_CLRI-CIC6052/2021" : "2021-04-23", #omicron EPI_ISL_11058072
    "India/TN-CCMB_CLRI-CIC6055/2021" : "2021-04-27", #omicron EPI_ISL_11058074
    "India/TN-CCMB_CLRI-CIC6056/2021" : "2021-04-28", #omicron EPI_ISL_11058075 
    "India/TN-CCMB_CLRI-CIC6057/2021" : "2021-04-28", #omicron EPI_ISL_11058076
    "India/TN-CCMB_CLRI-CIC6059/2021" : "2021-04-28", #omicron EPI_ISL_11058077
    "India/TN-CCMB_CLRI-CIC6061/2021" : "2021-04-28", #omicron EPI_ISL_11058079
    "India/TN-CCMB_CLRI-CIC6062/2021" : "2021-04-30", #omicron EPI_ISL_11058080
    "India/TN-CCMB_CLRI-CIC6063/2021" : "2021-04-30", #omicron EPI_ISL_11058081
    "India/TN-CCMB_CLRI-CIC6064/2021" : "2021-04-30", #omicron EPI_ISL_11058082
    "India/TN-CCMB_CLRI-CIC6065/2021" : "2021-04-30", #omicron EPI_ISL_11058083
    "India/TN-CCMB_CLRI-CIC6066/2021" : "2021-04-30", #omicron EPI_ISL_11058084
    "India/TN-CCMB_CLRI-CIC6067/2021" : "2021-04-30", #omicron EPI_ISL_11058085
    "India/TN-CCMB_CLRI-CIC6068/2021" : "2021-05-03", #omicron EPI_ISL_11058086
    "India/TN-CCMB_CLRI-CIC6069/2021" : "2021-05-03", #omicron EPI_ISL_11058087
    "India/TN-CCMB_CLRI-CIC6070/2021" : "2021-05-03", #omicron EPI_ISL_11058088
    "India/TN-CCMB_CLRI-CIC6071/2021" : "2021-05-03", #omicron EPI_ISL_11058089
    "India/TN-CCMB_CLRI-CIC6072/2021" : "2021-05-03", #omicron EPI_ISL_11058090
    "India/TN-CCMB_CLRI-CIC6073/2021" : "2021-05-03", #omicron EPI_ISL_11058091
    "India/TN-CCMB_CLRI-CIC6074/2021" : "2021-05-03", #omicron EPI_ISL_11058092
    "India/TN-CCMB_CLRI-CIC6075/2021" : "2021-05-03", #omicron EPI_ISL_11058093
    "India/TN-CCMB_CLRI-CIC6077/2021" : "2021-05-03", #omicron EPI_ISL_11058094
    "India/TN-CCMB_CLRI-CIC6078/2021" : "2021-05-03", #omicron EPI_ISL_11058095
    "India/TN-CCMB_CLRI-CIC6079/2021" : "2021-05-03", #omicron EPI_ISL_11058096
    "India/TN-CCMB_CLRI-CIC6080/2021" : "2021-05-03", #omicron EPI_ISL_11058097
    "India/TN-CCMB_CLRI-CIC6086/2021" : "2021-05-05", #omicron EPI_ISL_11058098
    "India/TN-CCMB_CLRI-CIC6089/2021" : "2021-05-04", #omicron EPI_ISL_11058099
    "India/TN-CCMB_CLRI-CIC6092/2021" : "2021-05-02", #omicron EPI_ISL_11058100
    "India/TN-CCMB_CLRI-CIC6098/2021" : "2021-05-05", #omicron EPI_ISL_11058101
    "India/TN-CCMB_CLRI-CIC6105/2021" : "2021-05-04", #omicron EPI_ISL_11058102
    "India/TN-CCMB_CLRI-CIC6109/2021" : "2021-05-06", #omicron EPI_ISL_11058103
    "Italy/EMR_AUSLRomagna_C027-22-39/2021" : "2021-03-06", #omicron EPI_ISL_11113749
    "Italy/EMR_AUSLRomagna_C028-22-04/2021" : "2021-03-06", #omicron EPI_ISL_11191123
    "Italy/EMR_AUSLRomagna_C028-22-05/2021" : "2021-03-06", #omicron EPI_ISL_11191122
    "Italy/EMR_AUSLRomagna_C028-22-06/2021" : "2021-03-06", #omicron EPI_ISL_11191121
    "Italy/EMR_AUSLRomagna_C028-22-07/2021" : "2021-03-06", #omicron EPI_ISL_11191119
    "Italy/EMR_AUSLRomagna_C028-22-09/2021" : "2021-03-08", #omicron EPI_ISL_11191117
    "Italy/EMR_AUSLRomagna_C028-22-10/2021" : "2021-03-08", #omicron EPI_ISL_11191116
    "Italy/EMR_AUSLRomagna_C028-22-11/2021" : "2021-03-08", #omicron EPI_ISL_11191120
    "Italy/EMR_AUSLRomagna_C028-22-13/2021" : "2021-03-08", #omicron EPI_ISL_11191113
    "Italy/EMR_AUSLRomagna_C028-22-14/2021" : "2021-03-08", #omicron EPI_ISL_11191115
    "Italy/EMR_AUSLRomagna_C028-22-15/2021" : "2021-03-08", #omicron EPI_ISL_11191111
    "Italy/EMR_AUSLRomagna_C028-22-18/2021" : "2021-03-08", #omicron EPI_ISL_11191112
    "Italy/EMR_AUSLRomagna_C028-22-20/2021" : "2021-03-08", #omicron EPI_ISL_11191108
    "Italy/EMR_AUSLRomagna_C028-22-22/2021" : "2021-03-08", #omicron EPI_ISL_11191107
    "Italy/EMR_AUSLRomagna_C028-22-23/2021" : "2021-03-08", #omicron EPI_ISL_11191103
    "SouthAfrica/1056910/2021" : "2021-08-27", #omicron EPI_ISL_11160398
    "Kenya/K15832/2020" : "2020-06-23", # kappa  EPI_ISL_5797443
    #28 Mar
    "Senegal/51052/2020" : "2020-06-02",  #alpha EPI_ISL_8525730
    "USA/TX-HMH-MCoV-35058/2020" : "2020-08-11",  #alpha EPI_ISL_2219553
    "USA/TX-HMH-MCoV-41497/2020" : "2020-07-31",  #alpha EPI_ISL_2223062
    "USA/TX-HMH-MCoV-41508/2020" : "2020-07-31",  #alpha EPI_ISL_2223073
    "USA/TX-HMH-MCoV-41509/2020" : "2020-07-31",  #alpha EPI_ISL_2223074
    "env/Austria/CeMM1441/2020" : "2020-09-20",  #delta EPI_ISL_11229007
    "Brazil/CE-REDE-L2BC67LACE/2021" : "2021-03-16",  #omicron EPI_ISL_11298163
    "Canada/ON-PHL-22-11852/2021" : "2021-01-19",  #omicron EPI_ISL_11249519
    "India/KA-8366/2021" : "2021-10-12",  #omicron EPI_ISL_11427550
    "Israel/SMC-7043736/2021" : "2021-02-03",  #omicron EPI_ISL_11296030
    "Israel/SMC-7043915/2021" : "2021-02-23",  #omicron EPI_ISL_11296060
    "Kenya/ILRI_COVM02985/2021" : "2021-08-18",  #omicron EPI_ISL_11290868
    "Kenya/SS6711/2021" : "2021-01-07",  #omicron EPI_ISL_11220543
    "Nigeria/GEL/09-21/0176/2021" : "2021-09-03",  #omicron EPI_ISL_11297515
    "Nigeria/GEL/09-21/0513/2021" : "2021-09-07",  #omicron EPI_ISL_11297516
    "Nigeria/GEL/09-21/0548/2021" : "2021-09-07",  #omicron EPI_ISL_11297517
    "Nigeria/GEL/09-21/0668/2021" : "2021-09-09",  #omicron EPI_ISL_11297519
    "Nigeria/GEL/09-21/0723/2021" : "2021-09-09",  #omicron EPI_ISL_11297520
    "Nigeria/GEL/09-21/1095/2021" : "2021-09-14",  #omicron EPI_ISL_11297523
    "Nigeria/GEL/09-21/1848/2021" : "2021-09-26",  #omicron EPI_ISL_11297524
    "Nigeria/GEL/09-21/1975/2021" : "2021-09-28",  #omicron EPI_ISL_11297525
    "Nigeria/GEL/10-21/0493/2021" : "2021-10-08",  #omicron EPI_ISL_11297527
    "Nigeria/NM-22-90209/2021" : "2021-08-13",  #omicron EPI_ISL_11297766
    "Nigeria/NM-22-96030/2021" : "2021-08-13",  #omicron EPI_ISL_11297794
    "Nigeria/NM-22-98355/2021" : "2021-09-27",  #omicron EPI_ISL_11297841
    "Scotland/CVR14236/2021" : "2021-02-20",  #omicron EPI_ISL_11221139
    "Slovakia/KE_22_00000393/2020" : "2020-11-09",  #omicron EPI_ISL_11311397
    "USA/AZ-ASU53871/2021" : "2021-07-24",  #omicron EPI_ISL_11247065
    "USA/AZ-TG1276258/2021" : "2021-10-03",  #omicron EPI_ISL_11404687
    "USA/AZ-TG1276263/2021" : "2021-10-03",  #omicron EPI_ISL_11404692
    "USA/CA-Curative-GRND-705726637453/2021" : "2021-03-14",  #omicron EPI_ISL_11369877
    "USA/CA-Curative-GRND-946926962441/2021" : "2021-03-14",  #omicron EPI_ISL_11369886
    "USA/CT-DPH-1062318001/2020" : "2020-01-18",  #omicron EPI_ISL_11297999
    "USA/DE-DHSS-B1175863/2021" : "2021-01-07",  #omicron EPI_ISL_11315889
    "USA/NE-NPHL22-1251/2021" : "2021-01-04",  #omicron EPI_ISL_11403341
    "USA/TX-HMH-MCoV-95778/2021" : "2021-03-10",  #omicron EPI_ISL_11236169
    "France/HDF-IPP17161/2021" : "2021-03-07",  #omicron EPI_ISL_11248617
    "Slovakia/BA_22_00016381/2021" : "2021-01-19",  #omicron EPI_ISL_11310487
    #30 mar
    "India/NL-IBSD-DMP-P13-110/2021" : "2021-10-07", #omicron  EPI_ISL_11465686
    #4 apr
    "Brazil/RN-IMT-2.12/2020" : "2020-08-06",  #gamma EPI_ISL_11681288
    "Guatemala/4583-GMI/2021" : "2021-08-26",  #omicron EPI_ISL_11629493
    "USA/LA-EVTL13675/2021" : "2021-08-27",  #omicron EPI_ISL_11571647
    "USA/MA-UMASSMED-202145120/2021" : "2021-07-05",  #omicron EPI_ISL_11574200
    "USA/VA-VTVAS3-GSC29550/2021" : "2021-01-05",  #omicron EPI_ISL_11532377
    "NorthernIreland/NIRE-01b062/2021" : "2021-04-30",  #omicron EPI_ISL_11460017
    #6 Apr
    "France/HDF-IPP20854/2021" : "2021-03-14", #omicron  EPI_ISL_11759954
    "France/HDF-IPP20856/2021" : "2021-03-14", #omicron  EPI_ISL_11759955
    "France/HDF-IPP20857/2021" : "2021-03-14", #omicron  EPI_ISL_11759956
    "France/HDF-IPP20860/2021" : "2021-03-14", #omicron  EPI_ISL_11759959
    "France/HDF-IPP20862/2021" : "2021-03-14", #omicron  EPI_ISL_11759961
    "France/HDF-IPP20863/2021" : "2021-03-14", #omicron  EPI_ISL_11759962
    "France/HDF-IPP20866/2021" : "2021-03-14", #omicron  EPI_ISL_11759965
    "Japan/PG-202036/2021" : "2021-02-18", #omicron  EPI_ISL_11711479
    "Malaysia/A483/2021" : "2021-01-03", #omicron  EPI_ISL_11754756
    "France/HDF-IPP20849/2021" : "2021-03-14", #omicron  EPI_ISL_11759949
    "France/HDF-IPP20850/2021" : "2021-03-14", #omicron  EPI_ISL_11759950
    "France/HDF-IPP20851/2021" : "2021-03-14", #omicron  EPI_ISL_11759951
    "France/HDF-IPP20852/2021" : "2021-03-14", #omicron  EPI_ISL_11759952
    "France/HDF-IPP20853/2021" : "2021-03-14", #omicron  EPI_ISL_11759953
    "France/HDF-IPP20858/2021" : "2021-03-14", #omicron  EPI_ISL_11759957
    "France/HDF-IPP20859/2021" : "2021-03-14", #omicron  EPI_ISL_11759958
    "France/HDF-IPP20861/2021" : "2021-03-14", #omicron  EPI_ISL_11759960
    "France/HDF-IPP20864/2021" : "2021-03-14", #omicron  EPI_ISL_11759963
    "France/HDF-IPP20865/2021" : "2021-03-14", #omicron  EPI_ISL_11759964
    "France/HDF-IPP20867/2021" : "2021-03-14", #omicron  EPI_ISL_11759966
    "Germany/NW-RKI-I-323118/2020" : "2020-09-11", #delta EPI_ISL_6463130
    "Guatemala/4583-GMI/2021" : "2021-08-26", #omicron 21K (too divergent!)
    "Slovakia/BA_22_00010686/2021" : "2021-10-22", #omicron 21K (too divergent)
    "Austria/AGES-655623/2021" : "2021-11-04", #omicron 21K (too divergent)
    "England/DHSC-CYDW4E6/2021" : "2021-10-27", #omicron 21K (too divergent)
    "England/DHSC-CYY9NFJ/2021" : "2021-10-16", #omicron 21K (too divergent)
    "England/DHSC-CYNSUZD/2021" : "2021-10-20", #omicron 21K (too divergent)
    "Germany/NW-RKI-I-323126/2020" : "2020-08-11", #delta EPI_ISL_6463172
    "USA/CA-CDPH-6000005630/2021" : "2021-01-11", #delta
    "DominicanRepublic/1421092/2021" : "2021-01-11", #delta
    "USA/AZ-ASU10204/2021" : "2021-01-30", #delta
    "Slovenia/17-007616-CE/2021" : "2021-01-20", #delta
    "Turkey/HSGM-E3272/2021" : "2021-03-09", #delta
    "Turkey/HSGM-E3082/2021" : "2021-03-09", #delta
    "CzechRepublic/NRL_19346/2021" : "2021-11-11", #omicron
    "Turkey/HSGM-G2195/2022" : "2022-02-17", #21M -- severely underdiverged
    "Austria/LB-R00067-S240/2022": "2022-03-23", #21M severely underdiverged
    "Ireland/LH-NVRL-gS21IRL00545589/2021" : "2021-01-07", #delta overdiverged
    "England/DHSC-CYN7A9Y/2021" : "2021-01-01", #delta overdiverged
    "Slovakia/uvzsr-A08-BA_22_00000344/2021" : "2021-01-02", #delta overdiverged
    "USA/ID-IVREF-697981/2020" : "2020-12-30", #delta
    "Canada/QC-L00381548001/2021" : "2021-01-01", #delta
    "DominicanRepublic/1423927/2021" : "2021-01-11", #delta
    "USA/ID-IVREF-696562/2020" : "2020-12-27", #delta
    "USA/UT-UPHL-220109420824/2021" : "2021-01-01", #delta
    "Netherlands/ZH-MZ-1037/2021" : "2021-02-11", #delta
    "Netherlands/ZH-MZ-1044/2021" : "2021-02-11", #delta
    "Netherlands/ZH-MZ-1024/2021" : "2021-01-11", #delta
    "Slovenia/17-007616-CE/2021" : "2021-01-20", #delta
    "Slovenia/17-009523-CE/2021" : "2021-01-25", #delta
    #8 Apr
    "SouthAfrica/NHLS-UCT-GS-3679/2020": "2020-06-19", #21I.Delta, EPI_ISL_11789806
    "France/HDF-IPP19891/2021": "2021-03-14", #21L.Omicron, EPI_ISL_11811198
    "France/HDF-IPP19893/2021": "2021-03-14", #21L.Omicron, EPI_ISL_11811199
    #12 Apr
    "Angola/CERI-KRISP-K037086/2021": "2021-01-30",
    "Belgium/UGent-14601/2021": "2021-01-04",
    "Nigeria/BCVL_GHRU_32940_S21/2021": "2021-09-03",
    "USA/KS-KHEL-10341/2021": "2021-01-18",
    "USA/UT-UPHL-220407118460/2021": "2021-01-02",
    "France/ARA-HCL722001572801/2021": "2021-03-21",
    "France/ARA-HCL722001572901/2021": "2021-03-21",
    "France/ARA-HCL722001573001/2021": "2021-03-21",
    "France/NAQ-HCL722001602101/2021": "2021-03-21",
    "France/NAQ-HCL722001602201/2021": "2021-03-21",
    "France/NAQ-HCL722001602301/2021": "2021-03-21",
    "France/NAQ-HCL722001602501/2021": "2021-03-21",
    "France/NAQ-HCL722001603201/2021": "2021-03-21",
    "France/NAQ-HCL722001603301/2021": "2021-03-21",
    "France/NAQ-HCL722001603401/2021": "2021-03-21",
    "France/NAQ-HCL722001603501/2021": "2021-03-21",
    "France/NAQ-HCL722001603601/2021": "2021-03-21",
    "France/NAQ-HCL722001603701/2021": "2021-03-21",
    "France/NAQ-HCL722001604001/2021": "2021-03-21",
    "France/NAQ-HCL722001604101/2021": "2021-03-21",
    "France/NAQ-HCL722001604301/2021": "2021-03-21",
    "France/NAQ-HCL722001604401/2021": "2021-03-21",
    "France/NAQ-HCL722001604501/2021": "2021-03-21",
    "Israel/ICH-741204376/2021": "2021-09-29",
    "Pakistan/AKU-HEC-13/2021": "2021-03-22",
    "Slovakia/BA_22_00021142/2021": "2021-03-20",
    #14 Apr
    "England/DHSC-CYYOQZS/2021": "2021-01-10", #21K.Omicron, 2021-10-16
    "France/ARA-HCL722001838201/2021": "2021-03-28", #21K.Omicron, 2021-10-16
    "Italy/CAM-TIGEM-IZSM-COLLI-28881/2021": "2021-10-11", #21K.Omicron, 2021-10-16
    "Malaysia/UiTM1369/2021": "2021-01-04", #21K.Omicron, 2021-10-16
    "USA/CA-CDPH-6000008940/2021": "2021-01-03", #21K.Omicron, 2021-10-16
    "USA/CA-LACPHL-AF08038/2021": "2021-03-05", #21K.Omicron, 2021-10-16
    "USA/CA-LACPHL-AF08039/2021": "2021-03-05", #21K.Omicron, 2021-10-16
    "USA/CA-LACPHL-AF08069/2021": "2021-01-22", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14027/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14028/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14030/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14035/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14036/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14037/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14039/2021": "2021-10-03", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14040/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14041/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14052/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14057/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14190/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14191/2021": "2021-10-02", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14192/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14193/2021": "2021-10-03", #21K.Omicron, 2021-10-16
    "USA/ME-HETL-J14204/2021": "2021-10-01", #21K.Omicron, 2021-10-16
    "France/ARA-HCL722001838101/2021": "2021-03-28", #21L.Omicron, 2021-10-16
    "Israel/ICH-741211805/2020": "2020-11-26", #21L.Omicron, 2021-10-16
    "SouthAfrica/NHLS-UCT-GS-E555/2021": "2021-07-22", #21L.Omicron, 2021-10-16
    # 19 Apr
    "Belgium/UGent-14783/2021": "2021-10-11", #21K.Omicron
    "USA/CA-LACPHL-AF08307/2021": "2021-01-27", #21K.Omicron
    "USA/CA-LACPHL-AF08507/2021": "2021-01-22", #21K.Omicron
    "USA/CO-CDPHE-2103101340/2021": "2021-09-30", #21K.Omicron
    "USA/NJ-PHEL-V22016862/2020": "2020-04-03", #21L.Omicron
    # 21 Apr
    "USA/VA-VTVAS3-GSC31172/2021" : "2021-01-04",  # omicron - EPI_ISL_12125110
    "USA/VA-VTVAS3-GSC31185/2021" : "2021-01-04",  # omicron - EPI_ISL_12125124
    # 26 Apr
    "USA/NC-NCSU-090121R32C5/2021": "2021-09-01", # 21K.Omicron
    "USA/CA-LACPHL-AF08650/2021": "2021-02-23", # 21L.Omicron
    # 2 may
    "USA/TX-Retrobiotech-ACSQ1-19/2020": "2020-08-01", #delta
    "DRC/ILRI_COVM00368/2020" : "2020-06-01", #delta  EPI_ISL_12257122"
    "Nigeria/ISTH-E0043/2021" : "2021-01-11", #omicron  EPI_ISL_12420470
    "USA/AZ-ASU65919/2021" : "2021-03-21", #omicron  EPI_ISL_12429283
    "USA/AZ-ASU65833/2021" : "2021-05-27", #omicron  EPI_ISL_12429296
    "USA/AZ-ASU65835/2021" : "2021-03-15", #omicron  EPI_ISL_12429279
    "USA/AZ-ASU65837/2021" : "2021-03-18", #omicron  EPI_ISL_12429281
    "USA/AZ-ASU65841/2021" : "2021-03-29", #omicron  EPI_ISL_12429289
    "USA/AZ-ASU65845/2021" : "2021-05-28", #omicron  EPI_ISL_12429297
    "USA/AZ-ASU65849/2021" : "2021-06-11", #omicron  EPI_ISL_12429300
    "USA/AZ-ASU65851/2021" : "2021-03-13", #omicron  EPI_ISL_12429277
    "USA/AZ-ASU65855/2021" : "2021-05-19", #omicron  EPI_ISL_12429294
    "USA/AZ-ASU65857/2021" : "2021-03-22", #omicron  EPI_ISL_12429284
    "USA/AZ-ASU65861/2021" : "2021-06-13", #omicron  EPI_ISL_12429302
    "USA/AZ-ASU65863/2021" : "2021-03-08", #omicron  EPI_ISL_12429276
    "USA/AZ-ASU65867/2021" : "2021-06-03", #omicron  EPI_ISL_12429299
    "USA/AZ-ASU65871/2021" : "2021-03-19", #omicron  EPI_ISL_12429282
    "USA/AZ-ASU65873/2021" : "2021-03-29", #omicron  EPI_ISL_12429288
    "USA/AZ-ASU65875/2021" : "2021-05-15", #omicron  EPI_ISL_12429292
    "USA/AZ-ASU65877/2021" : "2021-06-16", #omicron  EPI_ISL_12429304
    "USA/AZ-ASU65879/2021" : "2021-03-15", #omicron  EPI_ISL_12429278
    "USA/AZ-ASU65881/2021" : "2021-06-14", #omicron  EPI_ISL_12429303
    "USA/AZ-ASU65891/2021" : "2021-05-19", #omicron  EPI_ISL_12429293
    "USA/AZ-ASU65892/2021" : "2021-03-16", #omicron  EPI_ISL_12429280
    "USA/AZ-ASU65893/2021" : "2021-05-31", #omicron  EPI_ISL_12429298
    "USA/AZ-ASU65897/2021" : "2021-06-20", #omicron  EPI_ISL_12429306
    "USA/AZ-ASU65901/2021" : "2021-03-30", #omicron  EPI_ISL_12429290
    "USA/AZ-ASU65905/2021" : "2021-05-25", #omicron  EPI_ISL_12429295
    "USA/AZ-ASU65909/2021" : "2021-06-13", #omicron  EPI_ISL_12429301
    "USA/AZ-ASU65915/2021" : "2021-03-29", #omicron  EPI_ISL_12429287
    "USA/AZ-ASU65917/2021" : "2021-03-25", #omicron  EPI_ISL_12429286
    "USA/AZ-ASU65921/2021" : "2021-03-23", #omicron  EPI_ISL_12429285
    "USA/AZ-ASU65923/2021" : "2021-06-20", #omicron  EPI_ISL_12429305
    "Australia/VIC51922/2021" : "2021-10-09", #omicron  EPI_ISL_12276184
    "France/GES-HMN-22042070708/2020" : "2020-03-28", #omicron  EPI_ISL_12269393
    "England/DHSC-CYNNUEM/2021" : "2021-01-01", #omicron 21K
    "England/DHSC-CYYQWNY/2021" : "2021-01-01", #omicron 21K
    "England/DHSC-CYYUQY9/2021" : "2021-01-01", #omicron 21K
    "England/DHSC-CYYRS3D/2021" : "2021-01-01", #omicron 21K
    "India/RJ-SMS-ICMR-INSACOG-TS-377/2021" : "2021-02-12", #omicron  EPI_ISL_12493255
    "India/RJ-SMS-ICMR-INSACOG-TS-453/2021" : "2021-03-12", #omicron  EPI_ISL_12493257
    "Italy/TAA-PAB_SABES_1900913394/2021" : "2021-04-07", #omicron  EPI_ISL_12471703
    "Italy/TAA-PAB_SABES_1900916795/2021" : "2021-04-22", #omicron  EPI_ISL_12489872
    #11 may
    "USA/CO-CDPHE-2103139245/2021" : "2021-01-04", # omicron  EPI_ISL_12575541
    "USA/CO-CDPHE-2103139260/2021" : "2021-01-03", # omicron  EPI_ISL_12575356
    "USA/CO-CDPHE-2103149012/2020" : "2020-12-30", # omicron  EPI_ISL_12571247
    "USA/CO-CDPHE-2103149017/2020" : "2020-12-29", # omicron  EPI_ISL_12571400
    #16 may
    "India/NL-IBSD-DMP-P13-133/2021" : "2021-10-27",
    "USA/UT-CDC-2-5847434/2021" : "2021-12-14",
    "Venezuela/Suc746/2021" : "2021-01-07",
    "Germany/NW-RKI-I-323137/2020" : "2020-10-11",  #delta
    "Norway/35841/2021" : "2021-01-27", #omicron  EPI_ISL_12649544
    "USA/NE-TESTNE_ABJ3CRJ/2021" : "2021-03-05", #omicron  EPI_ISL_12622431
    "Australia/NSW-SAVID-11556/2021" : "2021-04-25", #omicron  EPI_ISL_12666328
    "Canada/BC-BCCDC-422751/2020" : "2020-04-14", #omicron  EPI_ISL_12663852
    "Israel/ICH-741222178/2020" : "2020-09-24", #omicron  EPI_ISL_12635843
    "Israel/ICH-741223215/2020" : "2020-09-24", #omicron  EPI_ISL_12633157
    "SouthAfrica/NHLS-UCT-GS-C479/2021" : "2021-06-17", #omicron  EPI_ISL_12644863
    "SouthAfrica/NHLS-UCT-GS-F745/2021" : "2021-08-03", #omicron  EPI_ISL_12644876
    "Austria/CeMM28774/2020" : "2020-04-15", #delta EPI_ISL_12650256"
    "India/HR-618342786/2021" : "2021-09-07", #omicron
    "Scotland/EDB57666/2021" : "2021-10-22", #omicron 21L - seems too early
    "India/NL-IBSD-DMP-P13-125/2021" : "2021-10-27", #omicron
    "India/NL-IBSD-DMP-P13-102/2021" : "2021-10-23", #omicron
    "Kosovo/CO-00795_XXK000_8669_03_Niph_2022/2022" : "2022-04-04", #omicron 21L - very divergent
    "Kosovo/CO-00795_XXK000_8343_03_Niph_2022/2022" : "2022-03-28", #omicron 21L - very divergent
    "Kosovo/CO-00795_XXK000_8148_03_Niph_2022/2022" : "2022-03-23", #omicron 21L - very divergent
    "Kosovo/CO-00795_XXK000_8316_03_Niph_2022/2022" : "2022-03-26", #same but 21K
    "Kosovo/CO-00795_XXK000_7096_03_Niph_2022/2022" : "2022-03-01", #same but 21K
    #24 may
    "Colombia/SAN-13INS/2021" : "2021-01-06",  #21K.Omicron
    "USA/OH-ODH-SC2040052/2021" : "2021-01-03",  #21K.Omicron
    "USA/OH-ODH-SC2040057/2021" : "2021-01-03",  #21K.Omicron
    "USA/OH-ODH-SC2041169/2021" : "2021-01-12",  #21K.Omicron
    "USA/AZ-TG1332009/2021" : "2021-10-11",  #21L.Omicron
    "USA/CT-DPH-1079649001/2021" : "2021-04-22",  #21L.Omicron
    "Brazil/RJ-FIOCRUZ-PVM100348/2021" : "2021-07-14", #21K omicron EPI_ISL_12883411
    "Colombia/DC-I507/2021" : "2021-01-07", #21K omicron EPI_ISL_12876783
    "Colombia/DC-I508/2020" : "2020-08-07", #21K omicron EPI_ISL_12876784
    "Colombia/TOL-I436/2020" : "2020-10-27", #21K omicron EPI_ISL_12876789
    "Colombia/TOL-I451/2020" : "2020-12-22", #21K omicron EPI_ISL_12876753
    "Colombia/TOL-I453/2020" : "2020-11-18", #21K omicron EPI_ISL_12876759
    "Colombia/TOL-I458/2020" : "2020-08-11", #21K omicron EPI_ISL_12876781
    "Colombia/TOL-I470/2020" : "2020-11-13", #21K omicron EPI_ISL_12876774
    "USA/CO-CDPHE-2103204851/2021" : "2021-04-16", #21K omicron EPI_ISL_12913570
    #3 June
    "Eswatini/N22721/2021": "2021-08-02", #omicron 21K - may actually be ok!  EPI_ISL_12954196"
    #4 June
    "Israel/ICH-741226590/2020" : "2020-09-24", #omicron  EPI_ISL_13073645
    "Israel/ICH-741226592/2020" : "2020-09-23", #omicron  EPI_ISL_13073927
    "Israel/ICH-741237350/2020" : "2020-09-24", #omicron  EPI_ISL_13077034
    "Israel/ICH-741237353/2020" : "2020-10-11", #omicron  EPI_ISL_13077035
    # 9 june
    "Colombia/ATL-UNINORTE-UN-368/2021" : "2021-06-14",  #omicron  EPI_ISL_13131652
    "Colombia/ATL-UNINORTE-UN-384/2021" : "2021-06-28",  #omicron  EPI_ISL_13131664
    "Panama/2421-GMI/2020" : "2020-06-20",  #omicron  EPI_ISL_13104952
    "Panama/3837-GMI/2020" : "2020-07-27",  #omicron  EPI_ISL_13105039
    "Panama/3915-GMI/2020" : "2020-07-31",  #omicron  EPI_ISL_13105045
    "Panama/4054-GMI/2020" : "2020-08-13",  #omicron  EPI_ISL_13105050
    "Panama/4059-GMI/2020" : "2020-08-13",  #omicron  EPI_ISL_13105051
    "Panama/4140-GMI/2020" : "2020-08-15",  #omicron  EPI_ISL_13105061
    "Panama/4145-GMI/2020" : "2020-08-15",  #omicron  EPI_ISL_13105062
    "Panama/501080-GMI/2020" : "2020-09-27",  #omicron  EPI_ISL_13105124
    "Israel/ICH-741237331/2020" : "2020-10-13", #delta417  EPI_ISL_13077038
    #14 june
    "Brazil/RJ-FIOCRUZ-202211567/2021" : "2021-06-08",  #omicron EPI_ISL_13228879
    "USA/AZ-ASU79726/2021" : "2021-06-20",  #omicron EPI_ISL_13197585
    "USA/AZ-ASU79730/2021" : "2021-03-30",  #omicron EPI_ISL_13197586
    "USA/AZ-ASU79739/2021" : "2021-06-13",  #omicron EPI_ISL_13197588
    "USA/AZ-ASU79746/2021" : "2021-03-25",  #omicron EPI_ISL_13197590
    "USA/AZ-ASU79748/2021" : "2021-03-21",  #omicron EPI_ISL_13197591
    "USA/AZ-ASU79750/2021" : "2021-03-23",  #omicron EPI_ISL_13197592
    "USA/AZ-ASU79752/2021" : "2021-06-20",  #omicron EPI_ISL_13197593
    "USA/AZ-ASU79756/2021" : "2021-05-27",  #omicron EPI_ISL_13197594
    "USA/AZ-ASU79758/2021" : "2021-03-15",  #omicron EPI_ISL_13197595
    "USA/AZ-ASU79768/2021" : "2021-05-28",  #omicron EPI_ISL_13197599
    "USA/AZ-ASU79774/2021" : "2021-03-13",  #omicron EPI_ISL_13197601
    "USA/AZ-ASU79780/2021" : "2021-03-22",  #omicron EPI_ISL_13197602
    "USA/AZ-ASU79790/2021" : "2021-06-03",  #omicron EPI_ISL_13197605
    "USA/AZ-ASU79794/2021" : "2021-03-19",  #omicron EPI_ISL_13197606
    "USA/AZ-ASU79798/2021" : "2021-05-15",  #omicron EPI_ISL_13197607
    "USA/AZ-ASU79800/2021" : "2021-06-16",  #omicron EPI_ISL_13197608
    "USA/AZ-ASU79812/2021" : "2021-06-05",  #omicron EPI_ISL_13197611
    "USA/AZ-ASU79814/2021" : "2021-05-19",  #omicron EPI_ISL_13197612
    "Philippines/PH-PGC-103689/2021" : "2021-02-01", #omicron  EPI_ISL_13175169
    "Philippines/PH-PGC-103696/2021" : "2021-01-02", #omicron  EPI_ISL_13175177
    "Philippines/PH-PGC-103719/2021" : "2021-01-01", #omicron  EPI_ISL_13175178
    "Philippines/PH-PGC-103720/2021" : "2021-01-01", #omicron  EPI_ISL_13175179
    "Philippines/PH-PGC-104461/2021" : "2021-01-06", #omicron  EPI_ISL_13175175
    "Philippines/PH-PGC-104474/2021" : "2021-01-06", #omicron  EPI_ISL_13175173
    "Philippines/PH-PGC-104476/2021" : "2021-01-06", #omicron  EPI_ISL_13175176
    "Philippines/PH-PGC-104477/2021" : "2021-01-06", #omicron  EPI_ISL_13175172
    "Philippines/PH-PGC-104481/2021" : "2021-01-07", #omicron  EPI_ISL_13175171
    "Philippines/PH-PGC-104482/2021" : "2021-01-06", #omicron  EPI_ISL_13175174
    "Philippines/PH-PGC-105006/2021" : "2021-01-10", #omicron  EPI_ISL_13175170
    "Philippines/PH-PGC-51070/2021" : "2021-05-19", #omicron  EPI_ISL_13175152
    "Philippines/PH-PGC-51073/2021" : "2021-05-19", #omicron  EPI_ISL_13175151
    "Philippines/PH-PGC-51082/2021" : "2021-05-21", #omicron  EPI_ISL_13175149
    "Philippines/PH-PGC-51330/2021" : "2021-05-26", #omicron  EPI_ISL_13175139
    "Philippines/PH-PGC-51500/2021" : "2021-05-28", #omicron  EPI_ISL_13175133
    "Philippines/PH-PGC-51507/2021" : "2021-05-31", #omicron  EPI_ISL_13175130
    #18 june
    "Kyrgyzstan/NRL-52392/2020": "2020-05-06", #beta EPI_ISL_13283875
    "Israel/SMC-7072941/2020": "2020-10-04", #omicron EPI_ISL_13316741
    #1 july
    "USA/AZ-ASU83363/2020" : "2020-07-08",  #delta EPI_ISL_13497598
    "USA/AZ-ASU83351/2020" : "2020-07-04",  #delta EPI_ISL_13497590
    "USA/AZ-ASU83361/2020" : "2020-07-06",  #delta EPI_ISL_13497591
    "USA/AZ-ASU83362/2020" : "2020-07-22",  #delta EPI_ISL_13497596
    "USA/AZ-ASU83355/2020" : "2020-07-25",  #omicron EPI_ISL_13497629
    "USA/AZ-ASU83357/2020" : "2020-06-24",  #omicron EPI_ISL_13497630
    "USA/AZ-ASU83358/2020" : "2020-06-29",  #omicron EPI_ISL_13497644
    "USA/AZ-ASU83367/2020" : "2020-07-23",  #omicron EPI_ISL_13497645
    # 4 july
    "Israel/ICH-741237329/2020" : "2020-10-18", #omicron  EPI_ISL_13077036
    "Israel/ICH-741237345/2020" : "2020-10-14", #omicron  EPI_ISL_13077037
    "Israel/ICH-741238457/2020" : "2020-10-20", #omicron  EPI_ISL_13324056
    #4 july -minnesota mostly
    "USA/MN-Mayo-1000/2020" : "2020-08-07",  #alpha EPI_ISL_13593568
    "USA/MN-Mayo-1001/2020" : "2020-08-07",  #alpha EPI_ISL_13593579
    "USA/MN-Mayo-1002/2020" : "2020-08-07",  #alpha EPI_ISL_13593590
    "USA/MN-Mayo-1003/2020" : "2020-08-10",  #alpha EPI_ISL_13593601
    "USA/MN-Mayo-1005/2020" : "2020-08-11",  #alpha EPI_ISL_13593623
    "USA/MN-Mayo-1007/2020" : "2020-08-13",  #alpha EPI_ISL_13593645
    "USA/MN-Mayo-1008/2020" : "2020-08-13",  #alpha EPI_ISL_13593656
    "USA/MN-Mayo-1009/2020" : "2020-08-13",  #alpha EPI_ISL_13593667
    "USA/MN-Mayo-1010/2020" : "2020-08-13",  #alpha EPI_ISL_13593679
    "USA/MN-Mayo-1012/2020" : "2020-08-14",  #alpha EPI_ISL_13593701
    "USA/MN-Mayo-1013/2020" : "2020-08-14",  #alpha EPI_ISL_13593712
    "USA/MN-Mayo-1014/2020" : "2020-08-14",  #alpha EPI_ISL_13593723
    "USA/MN-Mayo-1015/2020" : "2020-08-13",  #alpha EPI_ISL_13593734
    "USA/MN-Mayo-129/2020" : "2020-09-09",  #alpha EPI_ISL_13596788
    "USA/MN-Mayo-1299/2020" : "2020-05-06",  #alpha EPI_ISL_13596888
    "USA/MN-Mayo-1313/2020" : "2020-07-29",  #alpha EPI_ISL_13597045
    "USA/MN-Mayo-15/2020" : "2020-06-03",  #alpha EPI_ISL_13599121
    "USA/MN-Mayo-150/2020" : "2020-09-16",  #alpha EPI_ISL_13599122
    "USA/MN-Mayo-1500/2020" : "2020-05-23",  #alpha EPI_ISL_13599123
    "USA/MN-Mayo-1501/2020" : "2020-05-13",  #alpha EPI_ISL_13599134
    "USA/MN-Mayo-1502/2020" : "2020-05-26",  #alpha EPI_ISL_13599145
    "USA/MN-Mayo-1504/2020" : "2020-06-03",  #alpha EPI_ISL_13599167
    "USA/MN-Mayo-1533/2020" : "2020-09-01",  #alpha EPI_ISL_13599489
    "USA/MN-Mayo-1563/2020" : "2020-09-12",  #alpha EPI_ISL_13599822
    "USA/MN-Mayo-1674/2020" : "2020-07-31",  #alpha EPI_ISL_13601055
    "USA/MN-Mayo-18/2020" : "2020-06-04",  #alpha EPI_ISL_13602454
    "USA/MN-Mayo-101/2020" : "2020-08-24",  #delta EPI_ISL_13593678
    "USA/MN-Mayo-1017/2020" : "2020-08-20",  #delta EPI_ISL_13593756
    "USA/MN-Mayo-1026/2020" : "2020-08-20",  #delta EPI_ISL_13593856
    "USA/MN-Mayo-1029/2020" : "2020-08-21",  #delta EPI_ISL_13593889
    "USA/MN-Mayo-1042/2020" : "2020-09-19",  #delta EPI_ISL_13594034
    "USA/MN-Mayo-1048/2020" : "2020-09-21",  #delta EPI_ISL_13594100
    "USA/MN-Mayo-1320/2020" : "2020-05-25",  #delta EPI_ISL_13597123
    "USA/MN-Mayo-133/2020" : "2020-09-10",  #delta EPI_ISL_13597233
    "USA/MN-Mayo-1338/2020" : "2020-05-27",  #delta EPI_ISL_13597322
    "USA/MN-Mayo-1339/2020" : "2020-09-01",  #delta EPI_ISL_13597333
    "USA/MN-Mayo-1340/2020" : "2020-07-31",  #delta EPI_ISL_13597345
    "USA/MN-Mayo-1374/2020" : "2020-09-19",  #delta EPI_ISL_13597722
    "USA/MN-Mayo-1664/2020" : "2020-10-10",  #delta EPI_ISL_13600944
    "USA/MN-Mayo-1668/2020" : "2020-09-21",  #delta EPI_ISL_13600988
    "USA/MN-Mayo-1673/2020" : "2020-10-04",  #delta EPI_ISL_13601044
    "USA/MN-Mayo-1717/2020" : "2020-05-21",  #delta EPI_ISL_13601533
    "USA/AZ-ASU83350/2020" : "2020-07-20", #delta  EPI_ISL_13526597
    "USA/AZ-TG1369785/2020" : "2020-10-12", #delta  EPI_ISL_13530855
    "USA/AZ-TG1372920/2020" : "2020-10-05", #delta  EPI_ISL_13530520
    "USA/AZ-TG1372929/2020" : "2020-10-12", #delta  EPI_ISL_13530527
    "USA/AZ-TG1372946/2020" : "2020-10-12", #delta  EPI_ISL_13530533
    "USA/KY-DC-DW077_E08/2020" : "2020-05-06", #delta  EPI_ISL_13526198
    "USA/KY-DC-DW084_A10/2020" : "2020-05-14", #delta  EPI_ISL_13526205
    "USA/KY-DC-DW084_F10/2020" : "2020-05-14", #delta  EPI_ISL_13526208
    "USA/MN-Mayo-10/2020" : "2020-10-07", #delta  EPI_ISL_13593566
    "USA/MN-Mayo-100/2020" : "2020-08-23", #delta  EPI_ISL_13593567
    "USA/MN-Mayo-1004/2020" : "2020-08-11", #delta  EPI_ISL_13593612
    "USA/MN-Mayo-1016/2020" : "2020-08-19", #delta  EPI_ISL_13593745
    "USA/MN-Mayo-1018/2020" : "2020-08-20", #delta  EPI_ISL_13593767
    "USA/MN-Mayo-1019/2020" : "2020-08-19", #delta  EPI_ISL_13593778
    "USA/MN-Mayo-102/2020" : "2020-08-24", #delta  EPI_ISL_13593789
    "USA/MN-Mayo-1020/2020" : "2020-08-19", #delta  EPI_ISL_13593790
    "USA/MN-Mayo-1021/2020" : "2020-08-20", #delta  EPI_ISL_13593801
    "USA/MN-Mayo-1022/2020" : "2020-08-21", #delta  EPI_ISL_13593812
    "USA/MN-Mayo-1023/2020" : "2020-08-21", #delta  EPI_ISL_13593823
    "USA/MN-Mayo-1024/2020" : "2020-08-21", #delta  EPI_ISL_13593834
    "USA/MN-Mayo-1025/2020" : "2020-08-21", #delta  EPI_ISL_13593845
    "USA/MN-Mayo-1027/2020" : "2020-08-20", #delta  EPI_ISL_13593867
    "USA/MN-Mayo-1028/2020" : "2020-08-21", #delta  EPI_ISL_13593878
    "USA/MN-Mayo-103/2020" : "2020-08-25", #delta  EPI_ISL_13593900
    "USA/MN-Mayo-1030/2020" : "2020-08-21", #delta  EPI_ISL_13593901
    "USA/MN-Mayo-1031/2020" : "2020-08-21", #delta  EPI_ISL_13593912
    "USA/MN-Mayo-1032/2020" : "2020-08-21", #delta  EPI_ISL_13593923
    "USA/MN-Mayo-1033/2020" : "2020-08-22", #delta  EPI_ISL_13593934
    "USA/MN-Mayo-1034/2020" : "2020-08-22", #delta  EPI_ISL_13593945
    "USA/MN-Mayo-1035/2020" : "2020-08-22", #delta  EPI_ISL_13593956
    "USA/MN-Mayo-1036/2020" : "2020-08-23", #delta  EPI_ISL_13593967
    "USA/MN-Mayo-1037/2020" : "2020-08-24", #delta  EPI_ISL_13593978
    "USA/MN-Mayo-1038/2020" : "2020-08-24", #delta  EPI_ISL_13593989
    "USA/MN-Mayo-1039/2020" : "2020-08-24", #delta  EPI_ISL_13594000
    "USA/MN-Mayo-104/2020" : "2020-08-26", #delta  EPI_ISL_13594011
    "USA/MN-Mayo-1040/2020" : "2020-09-13", #delta  EPI_ISL_13594012
    "USA/MN-Mayo-1041/2020" : "2020-09-18", #delta  EPI_ISL_13594023
    "USA/MN-Mayo-1043/2020" : "2020-09-18", #delta  EPI_ISL_13594045
    "USA/MN-Mayo-1044/2020" : "2020-09-18", #delta  EPI_ISL_13594056
    "USA/MN-Mayo-1045/2020" : "2020-09-18", #delta  EPI_ISL_13594067
    "USA/MN-Mayo-1046/2020" : "2020-09-20", #delta  EPI_ISL_13594078
    "USA/MN-Mayo-1047/2020" : "2020-09-19", #delta  EPI_ISL_13594089
    "USA/MN-Mayo-1314/2020" : "2020-08-26", #delta  EPI_ISL_13597056
    "USA/MN-Mayo-1315/2020" : "2020-05-20", #delta  EPI_ISL_13597067
    "USA/MN-Mayo-1316/2020" : "2020-07-29", #delta  EPI_ISL_13597078
    "USA/MN-Mayo-1317/2020" : "2020-07-30", #delta  EPI_ISL_13597089
    "USA/MN-Mayo-1318/2020" : "2020-05-24", #delta  EPI_ISL_13597100
    "USA/MN-Mayo-1319/2020" : "2020-06-09", #delta  EPI_ISL_13597111
    "USA/MN-Mayo-1321/2020" : "2020-07-30", #delta  EPI_ISL_13597134
    "USA/MN-Mayo-1322/2020" : "2020-05-15", #delta  EPI_ISL_13597145
    "USA/MN-Mayo-1323/2020" : "2020-05-28", #delta  EPI_ISL_13597156
    "USA/MN-Mayo-1324/2020" : "2020-07-28", #delta  EPI_ISL_13597167
    "USA/MN-Mayo-1325/2020" : "2020-05-24", #delta  EPI_ISL_13597178
    "USA/MN-Mayo-1333/2020" : "2020-05-22", #delta  EPI_ISL_13597267
    "USA/MN-Mayo-1334/2020" : "2020-07-31", #delta  EPI_ISL_13597278
    "USA/MN-Mayo-1335/2020" : "2020-05-15", #delta  EPI_ISL_13597289
    "USA/MN-Mayo-1336/2020" : "2020-08-25", #delta  EPI_ISL_13597300
    "USA/MN-Mayo-1337/2020" : "2020-05-26", #delta  EPI_ISL_13597311
    "USA/MN-Mayo-134/2020" : "2020-09-10", #delta  EPI_ISL_13597344
    "USA/MN-Mayo-1342/2020" : "2020-07-30", #delta  EPI_ISL_13597367
    "USA/MN-Mayo-1343/2020" : "2020-05-23", #delta  EPI_ISL_13597378
    "USA/MN-Mayo-1344/2020" : "2020-08-02", #delta  EPI_ISL_13597389
    "USA/MN-Mayo-1346/2020" : "2020-05-27", #delta  EPI_ISL_13597411
    "USA/MN-Mayo-1347/2020" : "2020-05-24", #delta  EPI_ISL_13597422
    "USA/MN-Mayo-1348/2020" : "2020-05-28", #delta  EPI_ISL_13597433
    "USA/MN-Mayo-1349/2020" : "2020-05-28", #delta  EPI_ISL_13597444
    "USA/MN-Mayo-1350/2020" : "2020-05-25", #delta  EPI_ISL_13597456
    "USA/MN-Mayo-1352/2020" : "2020-05-27", #delta  EPI_ISL_13597478
    "USA/MN-Mayo-1353/2020" : "2020-06-08", #delta  EPI_ISL_13597489
    "USA/MN-Mayo-1354/2020" : "2020-07-28", #delta  EPI_ISL_13597500
    "USA/MN-Mayo-1355/2020" : "2020-08-28", #delta  EPI_ISL_13597511
    "USA/MN-Mayo-1356/2020" : "2020-09-16", #delta  EPI_ISL_13597522
    "USA/MN-Mayo-1357/2020" : "2020-09-18", #delta  EPI_ISL_13597533
    "USA/MN-Mayo-1358/2020" : "2020-09-18", #delta  EPI_ISL_13597544
    "USA/MN-Mayo-136/2020" : "2020-09-10", #delta  EPI_ISL_13597566
    "USA/MN-Mayo-1360/2020" : "2020-09-17", #delta  EPI_ISL_13597567
    "USA/MN-Mayo-1361/2020" : "2020-09-16", #delta  EPI_ISL_13597578
    "USA/MN-Mayo-1362/2020" : "2020-09-18", #delta  EPI_ISL_13597589
    "USA/MN-Mayo-1363/2020" : "2020-09-17", #delta  EPI_ISL_13597600
    "USA/MN-Mayo-1364/2020" : "2020-09-14", #delta  EPI_ISL_13597611
    "USA/MN-Mayo-1365/2020" : "2020-09-19", #delta  EPI_ISL_13597622
    "USA/MN-Mayo-1367/2020" : "2020-09-18", #delta  EPI_ISL_13597644
    "USA/MN-Mayo-1368/2020" : "2020-09-16", #delta  EPI_ISL_13597655
    "USA/MN-Mayo-1369/2020" : "2020-09-14", #delta  EPI_ISL_13597666
    "USA/MN-Mayo-1370/2020" : "2020-09-17", #delta  EPI_ISL_13597678
    "USA/MN-Mayo-1371/2020" : "2020-09-18", #delta  EPI_ISL_13597689
    "USA/MN-Mayo-1372/2020" : "2020-09-17", #delta  EPI_ISL_13597700
    "USA/MN-Mayo-1373/2020" : "2020-09-17", #delta  EPI_ISL_13597711
    "USA/MN-Mayo-1376/2020" : "2020-09-17", #delta  EPI_ISL_13597744
    "USA/MN-Mayo-1377/2020" : "2020-09-14", #delta  EPI_ISL_13597755
    "USA/MN-Mayo-138/2020" : "2020-09-11", #delta  EPI_ISL_13597788
    "USA/MN-Mayo-1383/2020" : "2020-09-18", #delta  EPI_ISL_13597822
    "USA/MN-Mayo-1394/2020" : "2020-09-18", #delta  EPI_ISL_13597944
    "USA/MN-Mayo-1396/2020" : "2020-09-20", #delta  EPI_ISL_13597966
    "USA/MN-Mayo-1398/2020" : "2020-09-17", #delta  EPI_ISL_13597988
    "USA/MN-Mayo-1399/2020" : "2020-09-18", #delta  EPI_ISL_13597999
    "USA/MN-Mayo-140/2020" : "2020-09-11", #delta  EPI_ISL_13598011
    "USA/MN-Mayo-1400/2020" : "2020-09-17", #delta  EPI_ISL_13598012
    "USA/MN-Mayo-1401/2020" : "2020-09-13", #delta  EPI_ISL_13598023
    "USA/MN-Mayo-1404/2020" : "2020-09-17", #delta  EPI_ISL_13598056
    "USA/MN-Mayo-1406/2020" : "2020-09-14", #delta  EPI_ISL_13598078
    "USA/MN-Mayo-1407/2020" : "2020-09-18", #delta  EPI_ISL_13598089
    "USA/MN-Mayo-1408/2020" : "2020-08-18", #delta  EPI_ISL_13598100
    "USA/MN-Mayo-1409/2020" : "2020-09-21", #delta  EPI_ISL_13598111
    "USA/MN-Mayo-141/2020" : "2020-09-11", #delta  EPI_ISL_13598122
    "USA/MN-Mayo-1410/2020" : "2020-08-20", #delta  EPI_ISL_13598123
    "USA/MN-Mayo-1411/2020" : "2020-08-23", #delta  EPI_ISL_13598134
    "USA/MN-Mayo-1412/2020" : "2020-09-15", #delta  EPI_ISL_13598145
    "USA/MN-Mayo-1413/2020" : "2020-09-16", #delta  EPI_ISL_13598156
    "USA/MN-Mayo-1414/2020" : "2020-08-21", #delta  EPI_ISL_13598167
    "USA/MN-Mayo-1415/2020" : "2020-08-20", #delta  EPI_ISL_13598178
    "USA/MN-Mayo-1514/2020" : "2020-09-11", #delta  EPI_ISL_13599278
    "USA/MN-Mayo-160/2020" : "2020-09-27", #delta  EPI_ISL_13600233
    "USA/MN-Mayo-163/2020" : "2020-10-02", #delta  EPI_ISL_13600566
    "USA/MN-Mayo-1650/2020" : "2020-10-09", #delta  EPI_ISL_13600789
    "USA/MN-Mayo-1651/2020" : "2020-10-09", #delta  EPI_ISL_13600800
    "USA/MN-Mayo-1652/2020" : "2020-10-09", #delta  EPI_ISL_13600811
    "USA/MN-Mayo-1653/2020" : "2020-10-09", #delta  EPI_ISL_13600822
    "USA/MN-Mayo-1655/2020" : "2020-10-09", #delta  EPI_ISL_13600844
    "USA/MN-Mayo-1656/2020" : "2020-04-28", #delta  EPI_ISL_13600855
    "USA/MN-Mayo-1658/2020" : "2020-10-09", #delta  EPI_ISL_13600877
    "USA/MN-Mayo-1660/2020" : "2020-10-11", #delta  EPI_ISL_13600900
    "USA/MN-Mayo-1665/2020" : "2020-10-10", #delta  EPI_ISL_13600955
    "USA/MN-Mayo-1666/2020" : "2020-10-11", #delta  EPI_ISL_13600966
    "USA/MN-Mayo-1667/2020" : "2020-09-21", #delta  EPI_ISL_13600977
    "USA/MN-Mayo-1669/2020" : "2020-09-21", #delta  EPI_ISL_13600999
    "USA/MN-Mayo-167/2020" : "2020-10-04", #delta  EPI_ISL_13601010
    "USA/MN-Mayo-1670/2020" : "2020-09-21", #delta  EPI_ISL_13601011
    "USA/MN-Mayo-1671/2020" : "2020-09-21", #delta  EPI_ISL_13601022
    "USA/MN-Mayo-1672/2020" : "2020-09-21", #delta  EPI_ISL_13601033
    "USA/MN-Mayo-1675/2020" : "2020-08-05", #delta  EPI_ISL_13601066
    "USA/MN-Mayo-1676/2020" : "2020-08-11", #delta  EPI_ISL_13601077
    "USA/MN-Mayo-1677/2020" : "2020-08-11", #delta  EPI_ISL_13601088
    "USA/MN-Mayo-1678/2020" : "2020-08-12", #delta  EPI_ISL_13601099
    "USA/MN-Mayo-1679/2020" : "2020-08-13", #delta  EPI_ISL_13601110
    "USA/MN-Mayo-1681/2020" : "2020-08-14", #delta  EPI_ISL_13601133
    "USA/MN-Mayo-1682/2020" : "2020-08-19", #delta  EPI_ISL_13601144
    "USA/MN-Mayo-1684/2020" : "2020-08-21", #delta  EPI_ISL_13601166
    "USA/MN-Mayo-1685/2020" : "2020-08-21", #delta  EPI_ISL_13601177
    "USA/MN-Mayo-1686/2020" : "2020-08-23", #delta  EPI_ISL_13601188
    "USA/MN-Mayo-1687/2020" : "2020-10-06", #delta  EPI_ISL_13601199
    "USA/MN-Mayo-1688/2020" : "2020-10-06", #delta  EPI_ISL_13601210
    "USA/MN-Mayo-171/2020" : "2020-10-05", #delta  EPI_ISL_13601455
    "USA/MN-Mayo-1718/2020" : "2020-06-04", #delta  EPI_ISL_13601544
    "USA/MN-Mayo-1726/2020" : "2020-06-06", #delta  EPI_ISL_13601633
    "USA/MN-Mayo-1727/2020" : "2020-06-04", #delta  EPI_ISL_13601644
    "USA/MN-Mayo-1728/2020" : "2020-05-07", #delta  EPI_ISL_13601655
    "USA/MN-Mayo-1729/2020" : "2020-05-07", #delta  EPI_ISL_13601666
    "USA/MN-Mayo-1730/2020" : "2020-05-07", #delta  EPI_ISL_13601678
    "USA/MN-Mayo-175/2020" : "2020-10-07", #delta  EPI_ISL_13601899
    "USA/MN-Mayo-1754/2020" : "2020-09-22", #delta  EPI_ISL_13601944
    "USA/MN-Mayo-1755/2020" : "2020-09-22", #delta  EPI_ISL_13601955
    "USA/MN-Mayo-1756/2020" : "2020-09-22", #delta  EPI_ISL_13601966
    "USA/MN-Mayo-1758/2020" : "2020-09-22", #delta  EPI_ISL_13601988
    "USA/MN-Mayo-1759/2020" : "2020-08-15", #delta  EPI_ISL_13601999
    "USA/MN-Mayo-176/2020" : "2020-10-07", #delta  EPI_ISL_13602010
    "USA/MN-Mayo-1760/2020" : "2020-09-22", #delta  EPI_ISL_13602011
    "USA/MN-Mayo-1761/2020" : "2020-08-17", #delta  EPI_ISL_13602022
    "USA/MN-Mayo-1762/2020" : "2020-09-22", #delta  EPI_ISL_13602033
    "USA/MN-Mayo-1763/2020" : "2020-09-23", #delta  EPI_ISL_13602044
    "Mexico/CMX-UGA_HRAEI_SSA_0376/2021" : "2021-02-08", #omicron  EPI_ISL_13560202
    "Mexico/MEX-UGA_HRAEI_SSA_0027/2021" : "2021-01-12", #omicron  EPI_ISL_13559858
    "Mexico/MEX-UGA_HRAEI_SSA_0028/2021" : "2021-01-12", #omicron  EPI_ISL_13559859
    "Mexico/MEX-UGA_HRAEI_SSA_0029/2021" : "2021-01-12", #omicron  EPI_ISL_13559860
    "Mexico/MEX-UGA_HRAEI_SSA_0114/2021" : "2021-01-05", #omicron  EPI_ISL_13559928
    "Mexico/MEX-UGA_HRAEI_SSA_0115/2021" : "2021-01-05", #omicron  EPI_ISL_13559929
    "Mexico/MEX-UGA_HRAEI_SSA_0116/2021" : "2021-01-05", #omicron  EPI_ISL_13559930
    "Mexico/MEX-UGA_HRAEI_SSA_0117/2021" : "2021-01-05", #omicron  EPI_ISL_13559931
    "Mexico/MEX-UGA_HRAEI_SSA_0122/2021" : "2021-01-07", #omicron  EPI_ISL_13559934
    "Mexico/MEX-UGA_HRAEI_SSA_0123/2021" : "2021-01-07", #omicron  EPI_ISL_13559935
    "Mexico/MEX-UGA_HRAEI_SSA_0124/2021" : "2021-01-07", #omicron  EPI_ISL_13559936
    "Mexico/MEX-UGA_HRAEI_SSA_0125/2021" : "2021-01-07", #omicron  EPI_ISL_13559937
    "Mexico/MEX-UGA_HRAEI_SSA_0371/2021" : "2021-02-08", #omicron  EPI_ISL_13560113
    "Mexico/MEX-UGA_HRAEI_SSA_0372/2021" : "2021-02-08", #omicron  EPI_ISL_13560114
    "Mexico/MEX-UGA_HRAEI_SSA_0373/2021" : "2021-02-08", #omicron  EPI_ISL_13560115
    "Mexico/MEX-UGA_HRAEI_SSA_0375/2021" : "2021-02-08", #omicron  EPI_ISL_13560116
    "Mexico/MEX-UGA_HRAEI_SSA_0377/2021" : "2021-02-08", #omicron  EPI_ISL_13560117
    "Mexico/MEX-UGA_HRAEI_SSA_0378/2021" : "2021-02-09", #omicron  EPI_ISL_13560118
    "Mexico/MEX-UGA_HRAEI_SSA_0380/2021" : "2021-02-09", #omicron  EPI_ISL_13560119
    "Mexico/MEX-UGA_HRAEI_SSA_0382/2021" : "2021-02-09", #omicron  EPI_ISL_13560120
    "USA/MN-Mayo-135/2020" : "2020-09-11", #omicron  EPI_ISL_13597455
    "USA/MN-Mayo-1351/2020" : "2020-05-30", #omicron  EPI_ISL_13597467
    "USA/MN-Mayo-137/2020" : "2020-09-10", #omicron  EPI_ISL_13597677
    "USA/MN-Mayo-1378/2020" : "2020-09-14", #omicron  EPI_ISL_13597766
    "USA/MN-Mayo-1379/2020" : "2020-09-17", #omicron  EPI_ISL_13597777
    "USA/MN-Mayo-1380/2020" : "2020-09-14", #omicron  EPI_ISL_13597789
    "USA/MN-Mayo-1381/2020" : "2020-09-18", #omicron  EPI_ISL_13597800
    "USA/MN-Mayo-1382/2020" : "2020-09-18", #omicron  EPI_ISL_13597811
    "USA/MN-Mayo-1384/2020" : "2020-09-17", #omicron  EPI_ISL_13597833
    "USA/MN-Mayo-1385/2020" : "2020-09-16", #omicron  EPI_ISL_13597844
    "USA/MN-Mayo-1386/2020" : "2020-09-13", #omicron  EPI_ISL_13597855
    "USA/MN-Mayo-1387/2020" : "2020-09-18", #omicron  EPI_ISL_13597866
    "USA/MN-Mayo-1388/2020" : "2020-09-14", #omicron  EPI_ISL_13597877
    "USA/MN-Mayo-1390/2020" : "2020-09-18", #omicron  EPI_ISL_13597900
    "USA/MN-Mayo-1391/2020" : "2020-09-19", #omicron  EPI_ISL_13597911
    "USA/MN-Mayo-1393/2020" : "2020-09-14", #omicron  EPI_ISL_13597933
    "USA/MN-Mayo-1395/2020" : "2020-09-19", #omicron  EPI_ISL_13597955
    "USA/MN-Mayo-1397/2020" : "2020-09-16", #omicron  EPI_ISL_13597977
    "USA/MN-Mayo-1402/2020" : "2020-09-16", #omicron  EPI_ISL_13598034
    "USA/MN-Mayo-1403/2020" : "2020-09-19", #omicron  EPI_ISL_13598045
    "USA/MN-Mayo-1405/2020" : "2020-09-18", #omicron  EPI_ISL_13598067
    "USA/MN-Mayo-1416/2020" : "2020-08-20", #omicron  EPI_ISL_13598189
    "USA/MN-Mayo-143/2020" : "2020-09-12", #omicron  EPI_ISL_13598344
    "India/WB-INSACOG-2032701957796/2021" : "2021-10-02", #omicron  EPI_ISL_13536457
    "USA/AZ-TG1369544/2020" : "2020-10-13", #omicron  EPI_ISL_13530718
    "USA/MN-Mayo-1305/2020" : "2020-05-07", #iota  EPI_ISL_13596956
    "USA/MN-Mayo-1503/2020" : "2020-05-11", #epsilon EPI_ISL_13599156
    # 11 jul
    "U.S.VirginIslands/VI-Yale-10210/2020" : "2020-08-21", #delta  EPI_ISL_4577392
    "U.S.VirginIslands/VI-Yale-10211/2020" : "2020-08-21", #delta  EPI_ISL_4577393
    "USA/AZ-TG1379646/2020" : "2020-10-12",  #delta EPI_ISL_13689575
    "Brazil/AM-IEC-182322/2021" : "2021-01-18", #omicron EPI_ISL_13726319
    "env/Austria/CeMM31016/2021" : "2021-06-14", #omicron 21L
    "Eswatini/N22721/2021"   : "2021-08-02",  #omicron 21K
    "USA/NJ-PHEL-V22024328/2021" : "2021-05-20",  #omicron 22C
    "Brazil/AM-IEC-182317/2021"  : "2021-04-29",  #omicron 21K
    "USA/NV-NSPHL-22-00059178/2021" : "2021-10-20", #omicron 22B
    "USA/UT-CDC-2-6137379/2021"  : "2021-12-14",  #omicron 22B
    "USA/UT-CDC-2-6092846/2021"  : "2021-12-14",  #omicron 22B
    #14 jul
    "Cyprus/CING_02_2401_Ma/2021" : "2021-01-24", # omicron EPI_ISL_13773707
    "Reunion/CHU722060096601/2021" : "2021-06-30", # omicron EPI_ISL_13767727
    "Reunion/CHU722060097101/2021" : "2021-06-30", # omicron EPI_ISL_13767723
    "Reunion/CHU722060101401/2021" : "2021-06-30", # omicron EPI_ISL_13767724
    "Reunion/CHU722060101501/2021" : "2021-06-30", # omicron EPI_ISL_13767725
    "Reunion/CHU722060105201/2021" : "2021-06-30", # omicron EPI_ISL_13767722
    "Reunion/CHU722060105901/2021" : "2021-06-30", # omicron EPI_ISL_13767728
    "Reunion/CHU722060322601/2021" : "2021-06-27", # omicron EPI_ISL_13767731
    "Reunion/CHU722060322801/2021" : "2021-06-27", # omicron EPI_ISL_13767730
    "Reunion/CHU722060322901/2021" : "2021-06-27", # omicron EPI_ISL_13767729
    #18 jul
    "USA/OR-TRACE-LINN-081921-1407/2021" : "2021-08-19", #omicron 	EPI_ISL_12934173
    "USA/AZ-ASU83465/2022" : "2022-01-06", # omicron EPI_ISL_13497727
    "USA/AZ-ASU83488/2022" : "2022-01-06", #omicron EPI_ISL_13497728
    "USA/UT-CDC-2-6092912/2021" : "2021-12-14", #omicron EPI_ISL_13654331
    "USA/UT-CDC-2-6092903/2021" : "2021-12-14",  #omicron EPI_ISL_13654336
    "Spain/MD-HULP-2006040/2022" : "2022-01-13", #omicron EPI_ISL_13661886
    "England/PHEC-YYFXIJS/2022" : "2022-01-17", #omicron EPI_ISL_13399807
    "Austria/Medilab_347/2022" : "2022-01-05", #omicron EPI_ISL_12688263
    #20 Jul
    "India/TN-CDFD-E130377/2022" : "2022-01-07", # 2.75, far too early EPI_ISL_13804325
    "India/MH-ICMR-MCL-20-1587_1-4153/2020" : "2020-07-23",  #delta EPI_ISL_13857976
    "Uganda/008/2020" : "2020-11-09", #omicron  EPI_ISL_13860433
    "Uganda/018/2020" : "2020-11-10", #omicron  EPI_ISL_13860440
    "Uganda/019/2020" : "2020-11-14", #omicron  EPI_ISL_13860441
    "Uganda/027/2020" : "2020-11-16", #omicron  EPI_ISL_13860447
    "Uganda/035/2020" : "2020-12-07", #omicron  EPI_ISL_13860454
    "Uganda/045/2020" : "2020-12-09", #omicron  EPI_ISL_13860462
    "Uganda/081/2021" : "2021-07-08", #omicron  EPI_ISL_13860470
    "Uganda/082/2021" : "2021-07-09", #omicron  EPI_ISL_13860471
    "Uganda/093/2021" : "2021-07-23", #omicron  EPI_ISL_13860478
    "Uganda/094/2021" : "2021-06-10", #omicron  EPI_ISL_13860479
    #26 jul
    "France/IDF-LBZCentre-C1111550105/2021" : "2021-05-15", #omicron  EPI_ISL_13304875
    "France/IDF-LBZCentre-YU2111150148/2021" : "2021-01-15", #omicron  EPI_ISL_13304951
    "Reunion/ChuReu-722060096601/2021" : "2021-06-30", #omicron  EPI_ISL_13910556
    "Reunion/ChuReu-722060097101/2021" : "2021-06-30", #omicron  EPI_ISL_13909422
    "Reunion/ChuReu-722060101401/2021" : "2021-06-30", #omicron  EPI_ISL_13909167
    "Reunion/ChuReu-722060101501/2021" : "2021-06-30", #omicron  EPI_ISL_13909209
    "Reunion/ChuReu-722060105201/2021" : "2021-06-30", #omicron  EPI_ISL_13910576
    "Reunion/ChuReu-722060105901/2021" : "2021-06-30", #omicron  EPI_ISL_13909216
    "Reunion/ChuReu-722060322601/2021" : "2021-06-27", #omicron  EPI_ISL_13909510
    "Reunion/ChuReu-722060322801/2021" : "2021-06-27", #omicron  EPI_ISL_13909237
    "Reunion/ChuReu-722060322901/2021" : "2021-06-27", #omicron  EPI_ISL_13910610
    #27 jul
    "Uganda/094/2021" : "2021-06-10", #omicron 	EPI_ISL_13860479
    "Uganda/081/2021" : "2021-07-08", #omicron EPI_ISL_13860470
    "Uganda/082/2021" : "2021-07-09", #omicron EPI_ISL_13860471
    "Uganda/093/2021" : "2021-07-23", #omicron EPI_ISL_13860478
    "Uganda/035/2020" : "2020-12-07", #omicron EPI_ISL_13860454
    "Italy/PUG_UNIBA_APU-BA737/2021" : "2021-07-05", # omicron EPI_ISL_13876414
    "Slovakia/BB_22_00000588/2021" : "2021-11-09", #omicron  EPI_ISL_10764821
    "Guadeloupe/IPP42838/2021" : "2021-11-02", #omicron  EPI_ISL_13873803
    #29 july
    "Argentina/PAIS-F0342/2021" : "2021-09-08", #omicron 21K EPI_ISL_14050436
    "Argentina/PAIS-F0349/2021" : "2021-09-14", #omicron 21K EPI_ISL_14050437
    "Argentina/PAIS-F0350/2021" : "2021-09-15", #omicron 21K EPI_ISL_14050438
    "Argentina/PAIS-F0353/2021" : "2021-09-18", #omicron 21K EPI_ISL_14050439
    #31 jul
    "Brazil/RN-LACENRN-240786017/2021" : "2021-11-17", #omicron EPI_ISL_13301405
    "USA/CA-CDPH-6000008930/2021" : "2021-10-30", #omicron EPI_ISL_11972997
    "Chile/ML-198016/2021" : "2021-10-26", #omicron EPI_ISL_9184489
    "Argentina/PAIS-F0400/2021" : "2021-10-27", #omicron EPI_ISL_12958296
    "England/DHSC-CYDFT9Z/2021" : "2021-10-31", #omicron EPI_ISL_10448522
    "Canada/ON-KHS-21-08090-v1/2021" : "2021-10-29", #omicron EPI_ISL_13495688
    "Argentina/PAIS-F0420/2021" : "2021-11-06", #omicron EPI_ISL_12958304
    "USA/UT-UPHL-220207170277/2021" : "2021-10-27", #omicron EPI_ISL_9677117
    "Canada/ON-KHS-21-08089-v1/2021" : "2021-10-29", #omicron EPI_ISL_13495687
    #3 Aug
    "Slovakia/BA_22_00034464/2021" : "2021-11-09", #omicron EPI_ISL_14156317
    #8 aug 
    "USA/AZ-TG1397837/2020" : "2020-10-12", #delta
    "Cameroon/CAF004/2021" : "2021-01-09", #omicron  EPI_ISL_14196249
    "Cameroon/DRS306/2021" : "2021-01-10", #omicron  EPI_ISL_14196267
    "Cameroon/MED024/2021" : "2021-01-09", #omicron  EPI_ISL_14196360
    "USA/FL-BPHL-20618/2021" : "2021-09-17", #omicron  EPI_ISL_14240414
    "Italy/EMR_AUSLRomagna_C072-22-26/2020" : "2020-07-21", #omicron  EPI_ISL_14182010
    "Italy/EMR_AUSLRomagna_C072-22-33/2020" : "2020-07-22", #omicron  EPI_ISL_14182003
    "USA/AZ-TG1386766/2020" : "2020-09-02", #omicron  EPI_ISL_14157879
    # 8 aug -date check
    "Italy/EMR_AUSLRomagna_C072-22-10/2020" : "2020-07-20", #omicron  EPI_ISL_14182029
    "Italy/EMR_AUSLRomagna_C072-22-11/2020" : "2020-07-20", #omicron  EPI_ISL_14182025
    "Italy/EMR_AUSLRomagna_C072-22-12/2020" : "2020-07-20", #omicron  EPI_ISL_14182024
    "Italy/EMR_AUSLRomagna_C072-22-14/2020" : "2020-07-20", #omicron  EPI_ISL_14182021
    "Italy/EMR_AUSLRomagna_C073-22-17/2020" : "2020-07-25", #omicron  EPI_ISL_14181996
    "Italy/EMR_AUSLRomagna_C073-22-19/2020" : "2020-07-25", #omicron  EPI_ISL_14181987
    "Mauritius/CERI-KRISP-K045566/2020" : "2020-07-02", #omicron  EPI_ISL_14218675
    "Mauritius/CERI-KRISP-K045567/2020" : "2020-07-02", #omicron  EPI_ISL_14218676
    "Mauritius/CERI-KRISP-K045590/2020" : "2020-07-04", #omicron  EPI_ISL_14218680
    "Reunion/CHU722060102201/2021" : "2021-06-30", #omicron  EPI_ISL_13767726
    "Reunion/ChuReu-722060102201/2021" : "2021-06-30", #omicron  EPI_ISL_13909215
    "USA/AZ-TG1386612/2020" : "2020-09-02", #omicron  EPI_ISL_14157749
    "USA/AZ-TG1386699/2020" : "2020-08-18", # omicron  EPI_ISL_14157820
    "USA/AZ-TG1386704/2020" : "2020-08-22", # omicron  EPI_ISL_14157824
    "USA/AZ-TG1386772/2020" : "2020-09-03", # omicron  EPI_ISL_14157884
    "USA/ND-CDC-2-6210015/2021" : "2021-09-28", # omicron  EPI_ISL_14262613
    "Belgium/MBLG-CTMAOT07251464/2021" : "2021-10-24", #omicron  EPI_ISL_14145879
    "Italy/EMR_AUSLRomagna_C072-22-13/2020" : "2020-07-20", #omicron  EPI_ISL_14182023
    "Italy/EMR_AUSLRomagna_C072-22-15/2020" : "2020-07-20", #omicron  EPI_ISL_14182022
    "Italy/EMR_AUSLRomagna_C072-22-16/2020" : "2020-07-20", #omicron  EPI_ISL_14182019
    "Italy/EMR_AUSLRomagna_C072-22-17/2020" : "2020-07-20", #omicron  EPI_ISL_14182020
    "Italy/EMR_AUSLRomagna_C072-22-18/2020" : "2020-07-20", #omicron  EPI_ISL_14182018
    "Italy/EMR_AUSLRomagna_C072-22-19/2020" : "2020-07-20", #omicron  EPI_ISL_14182017
    "Italy/EMR_AUSLRomagna_C072-22-20/2020" : "2020-07-21", #omicron  EPI_ISL_14182016
    "Italy/EMR_AUSLRomagna_C072-22-21/2020" : "2020-07-21", #omicron  EPI_ISL_14182013
    "Italy/EMR_AUSLRomagna_C072-22-22/2020" : "2020-07-21", #omicron  EPI_ISL_14182014
    "Italy/EMR_AUSLRomagna_C072-22-23/2020" : "2020-07-21", #omicron  EPI_ISL_14182015
    "Italy/EMR_AUSLRomagna_C072-22-24/2020" : "2020-07-21", #omicron  EPI_ISL_14182011
    "Italy/EMR_AUSLRomagna_C072-22-25/2020" : "2020-07-21", #omicron  EPI_ISL_14182012
    "Italy/EMR_AUSLRomagna_C072-22-27/2020" : "2020-07-21", #omicron  EPI_ISL_14182009
    "Italy/EMR_AUSLRomagna_C072-22-28/2020" : "2020-07-22", #omicron  EPI_ISL_14182008
    "Italy/EMR_AUSLRomagna_C072-22-29/2020" : "2020-07-22", #omicron  EPI_ISL_14182005
    "Italy/EMR_AUSLRomagna_C072-22-30/2020" : "2020-07-22", #omicron  EPI_ISL_14182007
    "Italy/EMR_AUSLRomagna_C072-22-31/2020" : "2020-07-22", #omicron  EPI_ISL_14182006
    "Italy/EMR_AUSLRomagna_C072-22-32/2020" : "2020-07-22", #omicron  EPI_ISL_14182004
    "Italy/EMR_AUSLRomagna_C072-22-34/2020" : "2020-07-22", #omicron  EPI_ISL_14182002
    "Italy/EMR_AUSLRomagna_C072-22-35/2020" : "2020-07-22", #omicron  EPI_ISL_14182001
    "Italy/EMR_AUSLRomagna_C072-22-36/2020" : "2020-07-22", #omicron  EPI_ISL_14182000
    "Italy/EMR_AUSLRomagna_C072-22-37/2020" : "2020-07-22", #omicron  EPI_ISL_14181999
    "Italy/EMR_AUSLRomagna_C073-22-01/2020" : "2020-07-23", #omicron  EPI_ISL_14181967
    "Italy/EMR_AUSLRomagna_C073-22-02/2020" : "2020-07-23", #omicron  EPI_ISL_14181968
    "Italy/EMR_AUSLRomagna_C073-22-03/2020" : "2020-07-23", #omicron  EPI_ISL_14181962
    "Italy/EMR_AUSLRomagna_C073-22-04/2020" : "2020-07-23", #omicron  EPI_ISL_14181963
    "Italy/EMR_AUSLRomagna_C073-22-05/2020" : "2020-07-24", #omicron  EPI_ISL_14181961
    "Italy/EMR_AUSLRomagna_C073-22-06/2020" : "2020-07-24", #omicron  EPI_ISL_14181965
    "Italy/EMR_AUSLRomagna_C073-22-07/2020" : "2020-07-24", #omicron  EPI_ISL_14181966
    "Italy/EMR_AUSLRomagna_C073-22-08/2020" : "2020-07-24", #omicron  EPI_ISL_14181964
    "Italy/EMR_AUSLRomagna_C073-22-11/2020" : "2020-07-25", #omicron  EPI_ISL_14181992
    "Italy/EMR_AUSLRomagna_C073-22-12/2020" : "2020-07-25", #omicron  EPI_ISL_14181997
    "Italy/EMR_AUSLRomagna_C073-22-13/2020" : "2020-07-25", #omicron  EPI_ISL_14181994
    "Italy/EMR_AUSLRomagna_C073-22-14/2020" : "2020-07-25", #omicron  EPI_ISL_14181990
    "Italy/EMR_AUSLRomagna_C073-22-15/2020" : "2020-07-25", #omicron  EPI_ISL_14181993
    "Italy/EMR_AUSLRomagna_C073-22-16/2020" : "2020-07-25", #omicron  EPI_ISL_14181991
    "Italy/EMR_AUSLRomagna_C073-22-18/2020" : "2020-07-25", #omicron  EPI_ISL_14181989
    "Mauritius/CERI-KRISP-K045525/2020" : "2020-06-30", #omicron  EPI_ISL_14218658
    "Mauritius/CERI-KRISP-K045528/2020" : "2020-06-30", #omicron  EPI_ISL_14218659
    "Mauritius/CERI-KRISP-K045535/2020" : "2020-07-01", #omicron  EPI_ISL_14218663
    "Mauritius/CERI-KRISP-K045541/2020" : "2020-07-01", #omicron  EPI_ISL_14218666
    "Mauritius/CERI-KRISP-K045559/2020" : "2020-07-02", #omicron  EPI_ISL_14218673
    "Mauritius/CERI-KRISP-K045562/2020" : "2020-07-02", #omicron  EPI_ISL_14218674
    "Mauritius/CERI-KRISP-K045568/2020" : "2020-07-02", #omicron  EPI_ISL_14218677
    "Spain/CT-HUGTiPM107KU8G7/2021" : "2021-07-19", #omicron  EPI_ISL_14200562
    "USA/MN-MDH-28325/2021" : "2021-07-30", #omicron  EPI_ISL_14287537
    "Austria/Medilab_352/2022" : "2022-01-05", #omicron  EPI_ISL_12703374
    "CzechRepublic/NRL_s4061/2022" : "2022-01-22", #omicron  EPI_ISL_14240390
    "CzechRepublic/NRL_s4125/2022" : "2022-01-19", #omicron  EPI_ISL_14240383
    "England/PHEC-YYF4J5G/2022" : "2022-02-03", #omicron  EPI_ISL_13841402
    "England/PHEC-YYFOWYG/2022" : "2022-02-01", #omicron  EPI_ISL_13443892
    "England/PHEC-YYGKEUZ/2022" : "2022-02-22", #omicron  EPI_ISL_14258841
    "England/PHEP-YYFCS1E/2022" : "2022-02-08", #omicron  EPI_ISL_14025044
    "England/PHEP-YYFGKSA/2022" : "2022-02-22", #omicron  EPI_ISL_13694394
    "England/PHEP-YYFXUFY/2022" : "2022-02-17", #omicron  EPI_ISL_14173926
    "Eswatini/ILRI_M03303/2022" : "2022-02-28", #omicron  EPI_ISL_13149308
    "Eswatini/N40393/2022" : "2022-02-14", #omicron  EPI_ISL_12954177
    "Eswatini/N40406/2022" : "2022-02-27", #omicron  EPI_ISL_12954170
    "France/ARA-HMN-22042190356/2022" : "2022-01-31", #omicron  EPI_ISL_13719081
    "France/PDL-CHUN-221511638/2022" : "2022-01-29", #omicron  EPI_ISL_13264369
    "Gambia/PF6331/2022" : "2022-02-22", #omicron  EPI_ISL_14243867
    "Germany/BW-RKI-I-888447/2022" : "2022-02-24", #omicron  EPI_ISL_13920321
    "Israel/CVL-8008061/2022" : "2022-02-09", #omicron  EPI_ISL_13111336
    "Israel/ICH-741232867/2022" : "2022-02-27", #omicron  EPI_ISL_13461050
    "Israel/ICH-741248151/2022" : "2022-01-10", #omicron  EPI_ISL_13889425
    "Israel/SMC-7072916/2022" : "2022-01-30", #omicron  EPI_ISL_13316764
    "Italy/VEN-AOUIVR-7225401001_VR/2022" : "2022-02-23", #omicron  EPI_ISL_13950849
    "Luxembourg/LNS0058085/2022" : "2022-02-21", #omicron  EPI_ISL_13661484
    "Mexico/CMX-INMEGEN-81-324/2022" : "2022-01-07", #omicron  EPI_ISL_13963720
    "Netherlands/GE-RIVM-107697/2022" : "2022-02-24", #omicron  EPI_ISL_14240086
    "Philippines/PH-RITM-1939/2022" : "2022-01-07", #omicron  EPI_ISL_13876285
    "Romania/211935/2022" : "2022-02-19", #omicron  EPI_ISL_14026096
    "Romania/211937/2022" : "2022-02-19", #omicron  EPI_ISL_14026113
    "Romania/211942/2022" : "2022-02-27", #omicron  EPI_ISL_14026061
    "Romania/211943/2022" : "2022-02-19", #omicron  EPI_ISL_14026121
    "Romania/211946/2022" : "2022-02-19", #omicron  EPI_ISL_14026084
    "Romania/211959/2022" : "2022-02-24", #omicron  EPI_ISL_14026087
    "Romania/211961/2022" : "2022-02-26", #omicron  EPI_ISL_14026077
    "Romania/211963/2022" : "2022-02-26", #omicron  EPI_ISL_14026066
    "Romania/211999/2022" : "2022-02-19", #omicron  EPI_ISL_14026134
    "Romania/212001/2022" : "2022-02-26", #omicron  EPI_ISL_14026126
    "Romania/212043/2022" : "2022-02-27", #omicron  EPI_ISL_14026091
    "Romania/212047/2022" : "2022-02-24", #omicron  EPI_ISL_14026136
    "Romania/212054/2022" : "2022-02-25", #omicron  EPI_ISL_14026076
    "Romania/212057/2022" : "2022-02-27", #omicron  EPI_ISL_14026080
    "Romania/212058/2022" : "2022-02-26", #omicron  EPI_ISL_14026055
    "Romania/212059/2022" : "2022-02-27", #omicron  EPI_ISL_14026118
    "Romania/212060/2022" : "2022-02-27", #omicron  EPI_ISL_14026131
    "Romania/212061/2022" : "2022-02-19", #omicron  EPI_ISL_14026068
    "Romania/212063/2022" : "2022-02-19", #omicron  EPI_ISL_14026056
    "Romania/212064/2022" : "2022-02-26", #omicron  EPI_ISL_14026063
    "Romania/212065/2022" : "2022-02-27", #omicron  EPI_ISL_14026130
    "Romania/212068/2022" : "2022-02-19", #omicron  EPI_ISL_14026137
    "Romania/212115/2022" : "2022-02-19", #omicron  EPI_ISL_14026090
    "Romania/212116/2022" : "2022-02-20", #omicron  EPI_ISL_14026081
    "Romania/212125/2022" : "2022-02-27", #omicron  EPI_ISL_14026120
    "Romania/212126/2022" : "2022-02-24", #omicron  EPI_ISL_14026116
    "Romania/212127/2022" : "2022-02-26", #omicron  EPI_ISL_14026067
    "Romania/212130/2022" : "2022-02-27", #omicron  EPI_ISL_14026141
    "Romania/212131/2022" : "2022-02-19", #omicron  EPI_ISL_14026122
    "Romania/212133/2022" : "2022-02-26", #omicron  EPI_ISL_14026125
    "Romania/212134/2022" : "2022-02-27", #omicron  EPI_ISL_14026057
    "Romania/212135/2022" : "2022-02-27", #omicron  EPI_ISL_14026129
    "Romania/212136/2022" : "2022-02-20", #omicron  EPI_ISL_14026099
    "Romania/212139/2022" : "2022-02-26", #omicron  EPI_ISL_14026135
    "Romania/212146/2022" : "2022-02-26", #omicron  EPI_ISL_14026101
    "Romania/212150/2022" : "2022-02-26", #omicron  EPI_ISL_14026075
    "Romania/212152/2022" : "2022-02-26", #omicron  EPI_ISL_14026107
    "Romania/212153/2022" : "2022-02-19", #omicron  EPI_ISL_14026082
    "Romania/212157/2022" : "2022-02-26", #omicron  EPI_ISL_14026095
    "Romania/212158/2022" : "2022-02-26", #omicron  EPI_ISL_14026108
    "Romania/212159/2022" : "2022-02-26", #omicron  EPI_ISL_14026132
    "Romania/212161/2022" : "2022-02-20", #omicron  EPI_ISL_14026083
    "Romania/212175/2022" : "2022-02-22", #omicron  EPI_ISL_14026071
    "Romania/212240/2022" : "2022-02-26", #omicron  EPI_ISL_14026112
    "Romania/212243/2022" : "2022-02-26", #omicron  EPI_ISL_14026073
    "Romania/212248/2022" : "2022-02-20", #omicron  EPI_ISL_14026059
    "Romania/212249/2022" : "2022-02-24", #omicron  EPI_ISL_14026086
    "SouthAfrica/CERI-KRISP-K036980/2022" : "2022-02-25", #omicron  EPI_ISL_11017528
    "Sweden/CSF477598030/2022" : "2022-01-31", #omicron  EPI_ISL_14227532
    "USA/AZ-ASPHL-1174/2022" : "2022-02-26", #omicron  EPI_ISL_13431267
    "USA/AZ-ASPHL-1260/2022" : "2022-02-26", #omicron  EPI_ISL_13672141
    "USA/AZ-ASPHL-1357/2022" : "2022-02-26", #omicron  EPI_ISL_14082458
    "USA/AZ-ASPHL-1412/2022" : "2022-02-26", #omicron  EPI_ISL_14082441
    "USA/AZ-ASPHL-1450/2022" : "2022-02-26", #omicron  EPI_ISL_14156977
    "USA/FL-BPHL-10740/2022" : "2022-01-05", #omicron  EPI_ISL_13956892
    "USA/FL-BPHL-10741/2022" : "2022-01-05", #omicron  EPI_ISL_13956893
    "USA/FL-BPHL-9743/2022" : "2022-01-19", #omicron  EPI_ISL_13522019
    "USA/FL-BPHL-9747/2022" : "2022-01-19", #omicron  EPI_ISL_13522023
    "USA/FL-BPHL-9750/2022" : "2022-01-19", #omicron  EPI_ISL_13522026
    "USA/FL-BPHL-9757/2022" : "2022-01-19", #omicron  EPI_ISL_13522032
    "USA/GA-EHC-4839C/2022" : "2022-01-10", #omicron  EPI_ISL_13728944
    "USA/ND-NDDH-17541/2022" : "2022-01-16", #omicron  EPI_ISL_14056409
    "USA/TN-SPHL-3238/2022" : "2022-01-12", #omicron  EPI_ISL_13578958
    # 15 aug
    "USA/MT-UMGC-02647/2020" : "2020-11-23",  #omicron EPI_ISL_14320426
    "France/HDF-biopath-6607960900/2021" : "2021-04-06",  #omicron EPI_ISL_12249596
    "France/HDF-biopath-7748823502/2020" : "2020-03-29",  #omicron EPI_ISL_12154385
    "USA/FL-BPHL-20695/2021" : "2021-07-05",  #omicron EPI_ISL_14438700
    "USA/AZ-ASPHL-1508/2022" : "2022-02-26",  #omicron EPI_ISL_14333421 
    "Malaysia/C19UMB2210/2022" : "2022-01-07",  #omicron EPI_ISL_14314280 
    "India/AS-ICMR-NIV-INSACOG-G-12102/2022" : "2022-01-01", #omicron EPI_ISL_14402515 - far too diverged for date
    "Belgium/LHUB-ULB_STR074/2020" : "2020-03-14",  #omicron EPI_ISL_14445224
    #22 aug
    "Colombia/QUI-UTP-VG-702/2021" : "2021-07-27", #omicron EPI_ISL_14536694 
    "Colombia/QUI-UTP-VG-864/2021" : "2021-01-25", #omicron EPI_ISL_14536727 
    "Colombia/QUI-UTP-VG-881/2021" : "2021-01-17", #omicron EPI_ISL_14536728 
    "Colombia/QUI-UTP-VG-883/2021" : "2021-01-15", #omicron EPI_ISL_14536729 
    "USA/MT-UMGC-05450/2021" : "2021-04-27", #omicron EPI_ISL_14488915 
    "Colombia/ANT-LDSP3455/2022" : "2022-01-07", #omicron EPI_ISL_14489858 
    "Colombia/ANT-LDSP3456/2022" : "2022-01-07", #omicron EPI_ISL_14489859 
    "Germany/ST-MD9545/2021" : "2021-12-20", #omicron EPI_ISL_14463155 
    "Germany/ST-MD9753/2022" : "2022-01-31", #omicron EPI_ISL_14463164 
    "Mexico/GRO-INMEGEN-88-118/2022" : "2022-01-08", #omicron EPI_ISL_14504597 
    "Slovakia/KE_22_00001561/2020" : "2020-03-31", #omicron EPI_ISL_14471084 
    "USA/MT-MTPHL-3965241/2022" : "2022-01-13", #omicron EPI_ISL_14497446 
    "USA/MT-MTPHL-3965245/2022" : "2022-01-13", #omicron EPI_ISL_14497450 
    "USA/TX-DSHS-21944/2022" : "2022-01-19", #omicron EPI_ISL_14463514 
    "Pakistan/PPHRL-PACP-59/2021" : "2021-08-21", #omicron
    "Mauritius/CERI-KRISP-K045542/2020" : "2020-07-01", # omicron EPI_ISL_14218667
    "England/PHEP-YYF1UHK/2022" : "2022-01-12", # omicron EPI_ISL_14572429
    #30 aug
    "France/BRE-IPP48578/2022" : "2022-01-08", #omicron  EPI_ISL_14673785
    "Japan/PG-332426/2022" : "2022-01-18", #omicron  EPI_ISL_14644507
    "Brazil/SP-112233/2020" : "2020-08-15", #omicron  EPI_ISL_14710805
    "Portugal/APO-9378/2021" : "2021-02-02", #omicron  EPI_ISL_14710812
    "Belgium/rega-44642/2022" : "2022-01-04", #omicron  EPI_ISL_14732379
    "Belgium/rega-44672/2022" : "2022-01-04", #omicron  EPI_ISL_14732408
    #5 sept
    "USA/TX-DSHS-22452/2022" : "2022-01-01", # omicron EPI_ISL_14775980
    #8 sept
    "Chile/AP-102862/2022" : "2022-01-18", #omicron EPI_ISL_14817829
    #14 Sept
    "CzechRepublic/NRL_s4893/2022" : "2022-01-27", #omicron  EPI_ISL_14893004
    "Japan/PG-340095/2020" : "2020-08-15", #omicron  EPI_ISL_14876743
    "Japan/PG-340096/2020" : "2020-08-15", #omicron  EPI_ISL_14876744
    "Japan/PG-341553/2020" : "2020-08-15", #omicron  EPI_ISL_14879022
    "Japan/PG-341554/2020" : "2020-08-15", #omicron  EPI_ISL_14879023
    "Japan/PG-344758/2020" : "2020-08-23", #omicron  EPI_ISL_14881852
    #21 Sept
    "France/ARA-009-0053/2021" : "2021-05-15", #omicron  EPI_ISL_14949212
    "France/CVL-039-0089/2021" : "2021-09-03", #omicron  EPI_ISL_14949213
    "France/CVL-054-0015/2021" : "2021-06-02", #omicron  EPI_ISL_14949214
    "France/OCC-026-0032/2021" : "2021-07-12", #omicron  EPI_ISL_14949216
    #27 Sept
    "Djibouti/NAMRU3_SOTF_EA_36/2022": "2022-01-20", # 22B, 2022-02-01
    "France/IDF-HB-112207023809/2020": "2020-07-06", # 22B, 2022-02-01
    "Italy/EMR_AUSLRomagna_C073-22-10/2020": "2020-07-25", # 22B, 2022-02-01
    "Reunion/ChuReu-722090410801/2021": "2021-08-26", # 22B, 2022-02-01
    "Reunion/ChuReu-722090411801/2021": "2021-08-26", # 22B, 2022-02-01
    "Reunion/ChuReu-722090413801/2021": "2021-09-26", # 22B, 2022-02-01
    "Reunion/ChuReu-722090414201/2021": "2021-09-24", # 22B, 2022-02-01
    "Reunion/ChuReu-722090415201/2021": "2021-08-26", # 22B, 2022-02-01
    "Russia/NVS-RII-MH79368S/2022": "2022-01-08", # 22B, 2022-02-01
    "France/CVL-039-0083/2021": "2021-05-01", # 21K.Omicron, 2021-10-16
    "France/IDF-HB-112201040385/2021": "2021-01-09", # 21K.Omicron, 2021-10-16
    "France/IDF-HB-112201051796/2021": "2021-01-12", # 21K.Omicron, 2021-10-16
    "France/IDF-HB-112202016945/2021": "2021-02-03", # 21K.Omicron, 2021-10-16
    "Netherlands/ZH-EMC-6779/2021": "2021-02-18", # 21K.Omicron, 2021-10-16
    "USA/SD-SDAIHG-0829/2021": "2021-02-18", # 21K.Omicron, 2021-10-16
    "Italy/EMR_AUSLRomagna_C073-22-10/2020": "2020-07-25", # Delta417, 2020-10-30
    #30 Sept
    "Indonesia/KI-FKUNMUL-1765/2020": "2020-10-15", # 21J.Delta, 2020-10-22
    "Pakistan/NIH-B92-S14/2022": "2022-01-27", # 22B, 2022-02-01
    #4 Oct
    "India/HR-768578963/2022" : "2022-04-08", #22D  EPI_ISL_15192532
    "Pakistan/KRISS0432/2020" : "2020-07-10", #Delta  EPI_ISL_15171917
    "Venezuela/Zul183/2020" : "2020-04-26", #Gamma  EPI_ISL_15165686
    "France/IDF-HMN-22092080153/2022" : "2022-03-05", #omicron 22E EPI_ISL_15115256
    "Nigeria/NCDC-NR-GL-005840/2022" : "2022-07-10", # 22e EPI_ISL_14711977
    "Nigeria/NCDC-NR-GL-005835/2022" : "2022-07-10", #22e EPI_ISL_14711972
    #7 Oct
    "Slovakia/BA_22_00038608/2021" : "2021-02-26", #22B  EPI_ISL_15214166
    "India/HR-767087152/2022" : "2022-05-08", #22D EPI_ISL_15192533
    "India/KA-15741_S95_R1_001/2022" : "2022-05-20", #22D EPI_ISL_15203427
    #11 Oct
    "Kenya/KEM-21-9-105112/2021": "2021-09-28", # 21K.Omicron, 2021-10-16
    "USA/OR-OHSU-222590261/2022": "2022-06-21", # 22E, 2022-07-01
    #13 Oct
    "England/PHEC-YYG9FIM/2022": "2022-04-23", # 22E, 2022-07-01
    "India/MH-ICMR-INSACOG-WG4901/2022": "2022-01-04", # 22D, 2022-05-01
    "India/MH-ICMR-INSACOG-WG4961/2022": "2022-01-01", # 22D, 2022-05-01
    "India/MH-ICMR-INSACOG-WG5033/2022": "2022-01-03", # 22D, 2022-05-01
    "India/MH-ICMR-INSACOG-WG5078/2022": "2022-01-01", # 22D, 2022-05-01
    "India/MH-ICMR-INSACOG-WG5143/2022": "2022-01-01", # 22D, 2022-05-01
    "India/MH-ICMR-INSACOG-WG5163/2022": "2022-03-19", # 22D, 2022-05-01
    "Mali/168043/2021": "2021-05-14", # 21K.Omicron, 2021-10-16
    "Mali/168057/2021": "2021-05-14", # 21K.Omicron, 2021-10-16
    "Mali/168092/2021": "2021-05-14", # 21K.Omicron, 2021-10-16
    "Mali/168093/2021": "2021-05-14", # 21K.Omicron, 2021-10-16
    "Poland/2210-010_wsselodz/2021": "2021-09-21", # 22B, 2022-02-01
    "Poland/2210-011_wsselodz/2021": "2021-09-21", # 22B, 2022-02-01
    #17 oct
    "Slovakia/BB_22_00002692/2021" : "2021-09-17",  # 22B, EPI_ISL_15358521
    "USA/FL-BPHL-14050/2022" : "2022-01-05",  # 22B, EPI_ISL_15360971
    "USA/FL-BPHL-14051/2022" : "2022-01-05",  # 22B, EPI_ISL_15360972
    "USA/FL-BPHL-14052/2022" : "2022-01-05",  # 22B, EPI_ISL_15360973
    "USA/FL-BPHL-14053/2022" : "2022-01-05",  # 22B, EPI_ISL_15360974
    "USA/FL-BPHL-14055/2022" : "2022-01-05",  # 22B, EPI_ISL_15360976
    "USA/FL-BPHL-14056/2022" : "2022-01-05",  # 22B, EPI_ISL_15360977
    "USA/FL-BPHL-14057/2022" : "2022-01-05",  # 22B, EPI_ISL_15360978
    "USA/FL-BPHL-14058/2022" : "2022-01-05",  # 22B, EPI_ISL_15360979
    "USA/FL-BPHL-14060/2022" : "2022-01-05",  # 22B, EPI_ISL_15360981
    "USA/FL-BPHL-14061/2022" : "2022-01-05",  # 22B, EPI_ISL_15360982
    "USA/FL-BPHL-14062/2022" : "2022-01-05",  # 22B, EPI_ISL_15360983
    "USA/FL-BPHL-14064/2022" : "2022-01-05",  # 22B, EPI_ISL_15360985
    "USA/FL-BPHL-14065/2022" : "2022-01-05",  # 22B, EPI_ISL_15360986
    "USA/FL-BPHL-14067/2022" : "2022-01-05",  # 22B, EPI_ISL_15360988
    "USA/FL-BPHL-14069/2022" : "2022-01-05",  # 22B, EPI_ISL_15360990
    "USA/FL-BPHL-14072/2022" : "2022-01-14",  # 22B, EPI_ISL_15360993
    #20 oct
    "USA/SC-REDDI-AD76C5238R8/2021" : "2021-10-04", # 22B EPI_ISL_15393565
    #24 Oct
    "Brazil/SP-FIOCRUZ-20210/2022" : "2022-01-18", #22B  EPI_ISL_15442743
    #27 oct
    "Brazil/RO-LVM-FIOCRUZ-96/2021"  :"2021-01-12",  # 21K EPI_ISL_15457734
    "France/IDF-IPP52712/2020"  :"2020-10-10",  # 22E EPI_ISL_15476515
    "France/IDF-IPP52712/2020"  :"2020-10-10",  # Delta417 EPI_ISL_15476515
    "Slovakia/TN_22_00002225/2021"  :"2021-10-11",  # 22B EPI_ISL_15472282
    #1 Nov
    "Belgium/Sciensano-LS-S1236/2022" : "2022-02-07", # 22B EPI_ISL_14551229
    "Mexico/TAB-INMEGEN-88-183/2022" : "2022-02-08", # 22B EPI_ISL_14504613
    "Malaysia/IMR_CV04870/2022" : "2022-02-12", # 22B EPI_ISL_14368233
    "Gambia/34672U/2022" : "2022-02-08", # 22B EPI_ISL_14426809
    "Australia/VIC69086/2022" : "2022-02-18", # 22B EPI_ISL_14642691
    "USA/FL-BPHL-13135/2022" : "2022-02-08", # 22B EPI_ISL_14865532
    "Brazil/RO-LVM-FIOCRUZ-220315000127/2022" : "2022-02-01", # 22B EPI_ISL_15464422
    "Belgium/Sciensano-LS-S1234/2022" : "2022-02-12", # 22B EPI_ISL_14551228
    "Ghana/WACCBIP-GS3356/2022" : "2022-01-04", # 22B EPI_ISL_15187102
    "Netherlands/GE-RIVM-110131/2022" : "2022-02-01", # 22B EPI_ISL_14774029
    "USA/GA-GPHL-2431/2022" : "2022-07-31", # 22E EPI_ISL_14333750
    "USA/TX-HMH-MCoV-112921/2022" : "2022-08-07", # 22E EPI_ISL_14753714
    "Nigeria/NCDC-NR-GL-005838/2022" : "2022-07-10", # 22E EPI_ISL_14711975
    "Greece/36580/2022" : "2022-08-09", # 22E EPI_ISL_14888641
    "USA/PA-CDC-LC0802000/2022" : "2022-07-25", # 22E EPI_ISL_14294806
    "Spain/CT-HUB06720/2022" : "2022-07-11", # 22E EPI_ISL_15421427
    "USA/GA-GPHL-2435/2022" : "2022-07-29", # 22E EPI_ISL_14333754
    "Belgium/rega-44650/2022" : "2022-01-07", #22A EPI_ISL_14732387
    "USA/FL-BPHL-9742/2022" : "2022-01-19", # 22A EPI_ISL_13522018
    "SouthAfrica/NICD-N35236/2022" : "2022-01-22", # 22A EPI_ISL_11542287
    "USA/GA-EHC-4835Y/2022" : "2022-02-02", # 22A EPI_ISL_13728940
    "Israel/ICH-741226626/2022" : "2022-01-15", # 22A EPI_ISL_13073961
    "Botswana/R138B71_BHP_1059543/2022" : "2022-01-06", # 22A EPI_ISL_13460343
    "Zambia/CHAZ-CHS2232/2021" : "2021-12-22", # 22A EPI_ISL_14005170
    "Zambia/CHAZ-CHS2261/2022" : "2022-01-13", # 22A EPI_ISL_14005186
    "Colombia/DC-IAVH-VG-21228/2022" : "2022-01-01", # 22A EPI_ISL_14579297
    "Israel/ICH-741241243/2022" : "2022-01-17", # 22A EPI_ISL_13732237
    "Mexico/CMX-INMEGEN-81-322/2022" : "2022-01-07", # 22A EPI_ISL_13963718
    "Zambia/CHAZ-CHS2255/2022" : "2022-02-01", # 22A EPI_ISL_14005183
    "Ghana/WACCBIP-GS3355/2022" : "2022-01-05", # 22A EPI_ISL_15187050
    "SouthAfrica/NICD-N35944/2022" : "2022-02-14", # 22A EPI_ISL_11270160
    "India/WB-INSACOG-1931503325023/2022" : "2022-08-26", #22F EPI_ISL_15172943
    "India/WB-1931503333762/2022" : "2022-09-05", #22F EPI_ISL_15465659
    "India/WB-INSACOG-1932000430704/2022" : "2022-08-25", #22F EPI_ISL_15172965
    "India/WB-1930900432766/2022" : "2022-08-22", #22F EPI_ISL_15465728
    # 3 Nov
    "Brazil/PE-FIOCRUZ-IAM12277/2020" : "2020-08-14", # 22B EPI_ISL_15500788
    "Indonesia/SA-LBMUNSRAT-WGSLBM-051/2022" : "2022-01-09", # 22B EPI_ISL_15507599
    "Indonesia/SA-LBMUNSRAT-WGSLBM-052/2022" : "2022-01-09", # 22B EPI_ISL_15507600
    "Indonesia/SA-LBMUNSRAT-WGSLBM-086/2022" : "2022-01-10", # 22B EPI_ISL_15508541
    "Indonesia/SA-LBMUNSRAT-WGSLBM-087/2022" : "2022-01-10", # 22B EPI_ISL_15508542
    "PuertoRico/PR-UPRRP-1171/2021" : "2021-01-26",  # 21K EPI_ISL_15592199
    "PuertoRico/PR-UPRRP-1182/2021" : "2021-01-29",  # 21K EPI_ISL_15592210
    "PuertoRico/PR-UPRRP-1183/2021" : "2021-01-30",  # 21K EPI_ISL_15592211
    "PuertoRico/PR-UPRRP-1192/2021" : "2021-01-29",  # 21K EPI_ISL_15592219
    "PuertoRico/PR-UPRRP-1193/2021" : "2021-01-28",  # 21K EPI_ISL_15592220
    "PuertoRico/PR-UPRRP-1202/2021" : "2021-01-29",  # 21K EPI_ISL_15592229
    "PuertoRico/PR-UPRRP-1211/2021" : "2021-02-01",  # 21K EPI_ISL_15592238
    "PuertoRico/PR-UPRRP-1219/2021" : "2021-01-29",  # 21K EPI_ISL_15592246
    "PuertoRico/PR-UPRRP-1225/2021" : "2021-01-30",  # 21K EPI_ISL_15592252
    "PuertoRico/PR-UPRRP-3635/2021" : "2021-08-04",  # 21K EPI_ISL_15592391
    "PuertoRico/PR-UPRRP-477/2020" : "2020-12-10",  # 21K EPI_ISL_15592404
    "PuertoRico/PR-UPRRP-483/2020" : "2020-12-08",  # 21K EPI_ISL_15592410
    "PuertoRico/PR-UPRRP-484/2020" : "2020-12-08",  # 21K EPI_ISL_15592413
    "PuertoRico/PR-UPRRP-485/2020" : "2020-12-07",  # 21K EPI_ISL_15592415
    "PuertoRico/PR-UPRRP-492/2020" : "2020-12-11",  # 21K EPI_ISL_15592419
    "PuertoRico/PR-UPRRP-493/2020" : "2020-12-14",  # 21K EPI_ISL_15592420
    "PuertoRico/PR-UPRRP-499/2020" : "2020-12-14",  # 21K EPI_ISL_15592426
    "PuertoRico/PR-UPRRP-500/2020" : "2020-12-14",  # 21K EPI_ISL_15592427
    "PuertoRico/PR-UPRRP-501/2020" : "2020-12-12",  # 21K EPI_ISL_15592428
    "PuertoRico/PR-UPRRP-507/2020" : "2020-12-14",  # 21K EPI_ISL_15592434
    "PuertoRico/PR-UPRRP-508/2020" : "2020-12-14",  # 21K EPI_ISL_15592435
    "PuertoRico/PR-UPRRP-509/2020" : "2020-12-15",  # 21K EPI_ISL_15592436
    "PuertoRico/PR-UPRRP-515/2020" : "2020-12-16",  # 21K EPI_ISL_15592443
    "PuertoRico/PR-UPRRP-516/2020" : "2020-12-11",  # 21K EPI_ISL_15592444
    "PuertoRico/PR-UPRRP-517/2020" : "2020-12-14",  # 21K EPI_ISL_15592445
    "PuertoRico/PR-UPRRP-524/2020" : "2020-12-12",  # 21K EPI_ISL_15592451
    "PuertoRico/PR-UPRRP-525/2020" : "2020-12-12",  # 21K EPI_ISL_15592452
    "PuertoRico/PR-UPRRP-531/2020" : "2020-12-14",  # 21K EPI_ISL_15592458
    "PuertoRico/PR-UPRRP-532/2020" : "2020-12-15",  # 21K EPI_ISL_15592459
    "USA/CA-CDPH-1002011856/2021" : "2021-01-09",  # 21K EPI_ISL_13818484
    "USA/OK-OKPHLCOV0010900/2021" : "2021-01-20",  # 21K EPI_ISL_15561497
    "USA/TN-2-94563-4/2020" : "2020-08-10",  # 21K EPI_ISL_15585973
    "PuertoRico/PR-UPRRP-278/2020" : "2020-11-09",  # 21L EPI_ISL_15592366
    "PuertoRico/PR-UPRRP-3632/2021" : "2021-08-03",  # 21L EPI_ISL_15592389
    "PuertoRico/PR-UPRRP-574/2020" : "2020-12-15",  # 21L EPI_ISL_15592517
    "PuertoRico/PR-UPRRP-575/2020" : "2020-12-15",  # 21L EPI_ISL_15592525
    "PuertoRico/PR-UPRRP-576/2020" : "2020-12-15",  # 21L EPI_ISL_15592534
    "PuertoRico/PR-UPRRP-579/2020" : "2020-12-15",  # 21L EPI_ISL_15592558
    "PuertoRico/PR-UPRRP-580/2020" : "2020-12-15",  # 21L EPI_ISL_15592569
    "PuertoRico/PR-UPRRP-581/2020" : "2020-12-15",  # 21L EPI_ISL_15592580
    "PuertoRico/PR-UPRRP-583/2020" : "2020-12-11",  # 21L EPI_ISL_15592601
    "PuertoRico/PR-UPRRP-584/2020" : "2020-12-14",  # 21L EPI_ISL_15592609
    "PuertoRico/PR-UPRRP-588/2020" : "2020-12-11",  # 21L EPI_ISL_15592618
    "PuertoRico/PR-UPRRP-589/2020" : "2020-12-11",  # 21L EPI_ISL_15592619
    "PuertoRico/PR-UPRRP-590/2020" : "2020-12-11",  # 21L EPI_ISL_15592620
    "PuertoRico/PR-UPRRP-591/2020" : "2020-12-11",  # 21L EPI_ISL_15592621
    "PuertoRico/PR-UPRRP-592/2020" : "2020-12-11",  # 21L EPI_ISL_15592622
    "PuertoRico/PR-UPRRP-626/2021" : "2021-01-02",  # 21L EPI_ISL_15592654
    #8 nov
    "Brazil/CE-L56_GATES-CD32549/2022" : "2022-01-06",  #22B EPI_ISL_15652282
    "USA/DE-DHSS-B1233929/2022" : "2022-01-05",  #22B EPI_ISL_15639663
    "USA/DE-DHSS-B1240937/2022" : "2022-01-02",  #22B EPI_ISL_15639760
    "USA/NJ-PHEL-V22046565/2021" : "2021-10-20",  #22B EPI_ISL_15623046
    "USA/WI-MHDL-100546/2022" : "2022-01-03",  #22B EPI_ISL_15622391
    "USA/WI-MHDL-100558/2022" : "2022-01-05",  #22B EPI_ISL_15622403
    "Israel/CVL-9007963/2022" : "2022-01-11",  #22E EPI_ISL_15616116
    "USA/NY-NYGC-3615-VTM1-VCOS170/2022" : "2022-02-18",  #22E EPI_ISL_15611842
    "Spain/AN-CBA-02806/2020" : "2020-03-25",  #Alpha EPI_ISL_15635981
    "Spain/AN-CBA-02819/2020" : "2020-05-05",  #Alpha EPI_ISL_15635991
    "Spain/AN-CBA-02835/2020" : "2020-07-26",  #Alpha EPI_ISL_15636174
    #13 Nov
    "France/GES-HMN-22102310147/2022" : "2022-01-24",  #22B EPI_ISL_15729850
    "France/GES-HMN-22102310153/2022" : "2022-01-24",  #22B EPI_ISL_15729849
    "France/GES-HMN-22102310156/2022" : "2022-01-24",  #22B EPI_ISL_15729846
    "France/GES-HMN-22102310162/2022" : "2022-01-24",  #22B EPI_ISL_15729852
    "Indonesia/SU-MFMUSU-WGS-22-0174-H/2022" : "2022-01-29",  #22B EPI_ISL_15668648
    "Italy/LOM_Policlinico_Milano_25851472/2021" : "2021-10-30",  #22B EPI_ISL_15682910
    "USA/CA-LACPHL-AF15620/2021" : "2021-11-11",  #22B EPI_ISL_15711290
    "USA/CA-LACPHL-AF15621/2021" : "2021-11-10",  #22B EPI_ISL_15711291
    "USA/CA-LACPHL-AF15622/2021" : "2021-11-17",  #22B EPI_ISL_15711292
    "USA/CA-LACPHL-AF15708/2021" : "2021-11-17",  #22B EPI_ISL_15711297
    "USA/CA-LACPHL-AF15710/2021" : "2021-11-12",  #22B EPI_ISL_15711299
    "France/GES-HMN-22102310151/2022" : "2022-01-24",  #22E EPI_ISL_15729851
    "France/GES-HMN-22102310155/2022" : "2022-01-24",  #22E EPI_ISL_15729853
    "France/GES-HMN-22102310163/2022" : "2022-01-24",  #22E EPI_ISL_15729848
    "France/NOR-HMN-22102190294/2020" : "2020-10-15",  #22E EPI_ISL_15717246
    "USA/CA-LACPHL-AF15619/2021" : "2021-11-13",  #22E EPI_ISL_15711289
    "France/GES-HMN-22102310172/2022" : "2022-01-24",  #22D EPI_ISL_15729847
    "France/NOR-HMN-22102190294/2020" : "2020-10-15",  #Delta417 EPI_ISL_15717246
    "Indonesia/SU-MFMUSU-WGS-22-0170-J/2022" : "2022-01-29",  #22F EPI_ISL_15668644
    "USA/CA-LACPHL-AF15709/2021" : "2021-11-04",  #22C EPI_ISL_15711298 
    #14 Nov
    "Israel/CVL-9007782/2022" : "2022-08-24", #22F EPI_ISL_15615941 really diverged by mutations compared to time
    "USA/CA-CCPHL-3563/2022" : "2022-08-27", #22F EPI_ISL_15075814
    "Israel/CVL-9007782/2022" : "2022-08-24", #22F EPI_ISL_15615941
    "India/KA-SLS-SEQ-46254/2022" : "2022-08-29", #22F EPI_ISL_15363298
    "France/PDL-CHUN-222801323/2022" : "2022-01-07", #22A EPI_ISL_15507626
    "USA/OK-OKPHL0017869/2022" : "2022-01-08", #22A EPI_ISL_15556153
    "SouthAfrica/CERI-KRISP-K036186/2022" : "2022-01-26", #22A EPI_ISL_10860989
    "France/BRE-IPP48315/2022" : "2022-08-08", #22E EPI_ISL_14726834
    "England/PHEC-YYGIB6T/2022" : "2022-08-12", #22E EPI_ISL_14650602
    "USA/GA-GPHL-2657/2022" : "2022-08-08", #22E EPI_ISL_14675347
    #16 Nov
    "Malaysia/IMR_LF00171/2022" : "2022-03-11",  #22E EPI_ISL_15738302
    #22 Nov
    "France/GES-HMN-22102310144/2022" : "2022-01-24",  #22E EPI_ISL_15780360
    "France/GES-HMN-22102310158/2022" : "2022-01-24",  #22E EPI_ISL_15780369
    "France/GES-HMN-22102310164/2022" : "2022-01-24",  #22E EPI_ISL_15780364
    "France/GES-HMN-22102310167/2022" : "2022-01-24",  #22E EPI_ISL_15780351
    "France/GES-HMN-22102310169/2022" : "2022-01-24",  #22E EPI_ISL_15780354
    "Italy/CAM-TIGEM-COLLI-40263/2022" : "2022-01-11",  #22E EPI_ISL_15764643
    "Italy/CAM-TIGEM-COLLI-40264/2022" : "2022-02-11",  #22E EPI_ISL_15764644
    "Italy/CAM-TIGEM-COLLI-40265/2022" : "2022-02-11",  #22E EPI_ISL_15764645
    "Italy/CAM-TIGEM-COLLI-40266/2022" : "2022-02-11",  #22E EPI_ISL_15764646
    "Italy/CAM-TIGEM-COLLI-40267/2022" : "2022-02-11",  #22E EPI_ISL_15764647
    "Italy/CAM-TIGEM-COLLI-40268/2022" : "2022-02-11",  #22E EPI_ISL_15764648
    "Italy/CAM-TIGEM-COLLI-40271/2022" : "2022-03-11",  #22E EPI_ISL_15764650
    "Italy/CAM-TIGEM-COLLI-40275/2022" : "2022-04-11",  #22E EPI_ISL_15764654
    "Reunion/ChuReu-722100184101/2021" : "2021-10-26",  #22E EPI_ISL_15777830
    "Spain/CT-HUJ23-51269/2022" : "2022-03-11",  #22E EPI_ISL_15762520
    "France/GES-HMN-22102310145/2022" : "2022-01-24",  #22B EPI_ISL_15780358
    "France/GES-HMN-22102310152/2022" : "2022-01-24",  #22B EPI_ISL_15780353
    "France/GES-HMN-22102310160/2022" : "2022-01-24",  #22B EPI_ISL_15780362
    "France/GES-HMN-22102310161/2022" : "2022-01-24",  #22B EPI_ISL_15780368
    "France/GES-HMN-22102310165/2022" : "2022-01-24",  #22B EPI_ISL_15780361
    "France/GES-HMN-22102310166/2022" : "2022-01-24",  #22B EPI_ISL_15780366
    "France/GES-HMN-22102310168/2022" : "2022-01-24",  #22B EPI_ISL_15780355
    "France/GES-HMN-22102310171/2022" : "2022-01-24",  #22B EPI_ISL_15780365
    "France/GES-HMN-22102310173/2022" : "2022-01-24",  #22B EPI_ISL_15780363
    "France/GES-HMN-22102310174/2022" : "2022-01-24",  #22B EPI_ISL_15780357
    "France/GES-HMN-22102310176/2022" : "2022-01-24",  #22B EPI_ISL_15780370
    "France/GES-HMN-22102310179/2022" : "2022-01-24",  #22B EPI_ISL_15780359
    "Ghana/NMIMR-NUR-22-1030/2022" : "2022-01-18",  #22B EPI_ISL_15781111
    "Reunion/ChuReu-722100184401/2021" : "2021-10-26",  #22B EPI_ISL_15777818
    "SouthAfrica/NHLS-UCT-GS-H981/2021" : "2021-08-30",  #22B EPI_ISL_15808868
    "USA/WI-WSLH-2207022/2020" : "2020-10-05",  #22B EPI_ISL_15803554
    "France/GES-HMN-22102310148/2022" : "2022-01-24",  #22D EPI_ISL_15780367
    "France/GES-HMN-22102310157/2022" : "2022-01-24",  #22D EPI_ISL_15780352
    "Italy/CAM-TIGEM-COLLI-40272/2022" : "2022-03-11",  #22D EPI_ISL_15764651
    "Italy/CAM-TIGEM-COLLI-40274/2022" : "2022-03-11",  #22D EPI_ISL_15764653
    "India/GJ-INSACOG-GBRC9622/2022" : "2022-06-29",  #22F EPI_ISL_15762414
    "India/MH-KasturbaMCGM-ICMR-INSACOG-WG5295/2022" : "2022-05-30",  #22F EPI_ISL_15760036
    "India/MH-KasturbaMCGM-ICMR-INSACOG-WG5300/2022" : "2022-01-08",  #22F EPI_ISL_15760041
    "India/MH-KasturbaMCGM-ICMR-INSACOG-WG5309/2022" : "2022-01-12",  #22F EPI_ISL_15760048
    "India/MH-KasturbaMCGM-ICMR-INSACOG-WG5383/2022" : "2022-01-08",  #22F EPI_ISL_15760110
    "USA/WI-WSLH-2207022/2020" : "2020-10-05",  #Delta417 EPI_ISL_15803554

    #bad french Omicron with 15 Nov dates 2021-11-15 france
    "France/IDF-LBZCentre-C2111150081/2021" : "2021-11-15", # omicron EPI_ISL_13304960
    "France/IDF-LBZCentre-ZA2111150022/2021" : "2021-11-15", # omicron EPI_ISL_13304900
    "France/IDF-LBZCentre-R2111150162/2021" : "2021-11-15", # omicron EPI_ISL_13304952
    "France/HDF-LBZCentre-1111526146/2021" : "2021-11-15", # omicron EPI_ISL_13304902
    "France/HDF-LBZCentre-W2111150078/2021" : "2021-11-15", # omicron EPI_ISL_13304943
    "France/IDF-LBZCentre-C1111550259/2021" : "2021-11-15", # omicron EPI_ISL_13304932
    "France/IDF-LBZCentre-C11115W0099/2021" : "2021-11-15", # omicron EPI_ISL_13304915
    "France/IDF-LBZCentre-B2111150082/2021" : "2021-11-15", # omicron EPI_ISL_13304898
    "France/IDF-LBZCentre-CI2111150154/2021" : "2021-11-15", # omicron EPI_ISL_13304890
    "France/IDF-LBZCentre-YY2111150076/2021" : "2021-11-15", # omicron EPI_ISL_13304914
    "France/IDF-LBZCentre-C11115K0640/2021" : "2021-11-15", # omicron EPI_ISL_13304917
    "France/IDF-LBZCentre-C11115Z0093/2021" : "2021-11-15", # omicron EPI_ISL_13304911
    "France/IDF-LBZCentre-YU2111150142/2021" : "2021-11-15", # omicron EPI_ISL_13304903
    "France/IDF-LBZCentre-ZA2111150064/2021" : "2021-11-15", # omicron EPI_ISL_13304916
    "France/IDF-LBZCentre-C11115k0421/2021" : "2021-11-15", # omicron EPI_ISL_13304897
    "France/IDF-LBZCentre-S2111150103/2021" : "2021-11-15", # omicron EPI_ISL_13304909
    "France/IDF-LBZCentre-YZ2111150106/2021" : "2021-11-15", # omicron EPI_ISL_13304930
    "France/IDF-LBZCentre-AR111150053/2021" : "2021-11-15", # omicron EPI_ISL_13304938
    "France/HDF-LBZCentre-1111510153/2021" : "2021-11-15", # omicron EPI_ISL_13304879
    "France/IDF-LBZCentre-YU2111150151/2021" : "2021-11-15", # omicron EPI_ISL_13304891
    "France/IDF-LBZCentre-C11115k0364/2021" : "2021-11-15", # omicron EPI_ISL_13304888
    "France/IDF-LBZCentre-YW2111150235/2021" : "2021-11-15", # omicron EPI_ISL_13304895
    "France/IDF-LBZCentre-YU2111150153/2021" : "2021-11-15", # omicron EPI_ISL_13304946
    "France/IDF-LBZCentre-YN2111150091/2021" : "2021-11-15", # omicron EPI_ISL_13304878
    "France/IDF-LBZCentre-YX2111150083/2021" : "2021-11-15", # omicron EPI_ISL_13304933
    "France/IDF-LBZCentre-C11115P0152/2021" : "2021-11-15", # omicron EPI_ISL_13304921
    "France/HDF-LBZCentre-1111501299/2021" : "2021-11-15", # omicron EPI_ISL_13304934
    "France/IDF-LBZCentre-AC111150080/2021" : "2021-11-15", # omicron EPI_ISL_13304923
    "France/IDF-LBZCentre-1111530063/2021" : "2021-11-15", # omicron EPI_ISL_13304926
    "France/IDF-LBZCentre-C11115K0077/2021" : "2021-11-15", # omicron EPI_ISL_13304953
    "France/IDF-LBZCentre-C11115K0686/2021" : "2021-11-15", # omicron EPI_ISL_13304912
    "France/IDF-LBZCentre-C2111150216/2021" : "2021-11-15", #omicron EPI_ISL_13304944
    "France/IDF-LBZCentre-C11115W0099/2021" : "2021-11-15", #omicron EPI_ISL_13304915
    "France/IDF-LBZCentre-B2111150082/2021" : "2021-11-15", #omicron EPI_ISL_13304898
    "France/IDF-LBZCentre-C11115K0361/2021" : "2021-11-15", #omicron EPI_ISL_13304954
    "France/IDF-LBZCentre-B2111150351/2021" : "2021-11-15", #omicron EPI_ISL_13304924
    "France/IDF-LBZCentre-W2111150033/2021" : "2021-11-15", #omicron EPI_ISL_13304927
    "France/IDF-LBZCentre-AP2111150193/2021" : "2021-11-15", #omicron EPI_ISL_13304896
    "France/IDF-LBZCentre-R2111150162/2021" : "2021-11-15", #omicron EPI_ISL_13304952
    "France/IDF-LBZCentre-C11115K0984/2021" : "2021-11-15", #omicron EPI_ISL_13304958

    #bad utah sequences from 14 Dec 2021 - 2021-12-14 Utah CDC dec
    "USA/UT-CDC-2-6168040/2021"  : "2021-12-14",  #omicron EPI_ISL_13859472
    "USA/UT-CDC-2-6092913/2021"  : "2021-12-14",  #omicron EPI_ISL_13654335
    "USA/UT-CDC-2-6092847/2021"  : "2021-12-14",  #omicron EPI_ISL_13654332
    "USA/UT-CDC-2-6092806/2021"  : "2021-12-14",  #omicron EPI_ISL_13654333
    "USA/UT-CDC-2-6092814/2021"  : "2021-12-14",  #omicron EPI_ISL_13654334
    "USA/UT-CDC-2-6092742/2021"  : "2021-12-14",  #omicron EPI_ISL_13654337
    "USA/UT-CDC-2-6005657/2021"  : "2021-12-14",  #omicron EPI_ISL_13082869
    "USA/UT-CDC-2-6072549/2021"  : "2021-12-14",  #omicron EPI_ISL_13291542
    "USA/UT-CDC-2-5930436/2021"  : "2021-12-14",  #omicron EPI_ISL_12645488
    "USA/UT-CDC-2-6137461/2021"  : "2021-12-14",  #omicron EPI_ISL_13671642
    "USA/UT-CDC-2-6137559/2021"  : "2021-12-14",  #omicron EPI_ISL_13671639
    "USA/UT-CDC-2-6005654/2021"  : "2021-12-14",  #omicron EPI_ISL_13082865
    "USA/UT-CDC-2-6005578/2021"  : "2021-12-14",  #omicron EPI_ISL_13082866
    "USA/UT-CDC-2-6005674/2021"  : "2021-12-14",  #omicron EPI_ISL_13082868
    "USA/UT-CDC-2-5847504/2021"  : "2021-12-14",  #omicron EPI_ISL_12212716
    "USA/UT-CDC-2-5847441/2021"  : "2021-12-14",  #omicron EPI_ISL_12212715
    "USA/UT-CDC-2-6137489/2021"  : "2021-12-14",  #omicron EPI_ISL_13671635
    "USA/UT-CDC-2-6072542/2021"  : "2021-12-14",  #omicron EPI_ISL_13291539
    "USA/UT-CDC-2-6072521/2021"  : "2021-12-14",  #omicron EPI_ISL_13291543
    "USA/UT-CDC-2-5973980/2021"  : "2021-12-14",  #omicron EPI_ISL_12959034
    "USA/UT-CDC-2-5973965/2021"  : "2021-12-14",  #omicron EPI_ISL_12959040
    "USA/UT-CDC-2-6005665/2021"  : "2021-12-14",  #omicron EPI_ISL_13082863
    "USA/UT-CDC-2-6137398/2021"  : "2021-12-14",  #omicron EPI_ISL_13671641
    "USA/UT-CDC-2-5930401/2021"  : "2021-12-14",  #omicron EPI_ISL_12645491
    "USA/UT-CDC-2-6005656/2021"  : "2021-12-14",  #omicron EPI_ISL_13082870
    "USA/UT-CDC-2-6005755/2021"  : "2021-12-14",  #omicron EPI_ISL_13082864
    "USA/UT-CDC-2-5973881/2021"  : "2021-12-14",  #omicron EPI_ISL_12959038
    "USA/UT-CDC-2-6072619/2021"  : "2021-12-14",  #omicron EPI_ISL_13291544
    "USA/UT-CDC-2-6005574/2021"  : "2021-12-14",  #omicron EPI_ISL_13082867
    "USA/UT-CDC-2-5847550/2021"  : "2021-12-14",  #omicron EPI_ISL_12212712
    "USA/UT-CDC-2-5973853/2021"  : "2021-12-14",  #omicron EPI_ISL_12959031
    "USA/UT-CDC-2-5930509/2021"  : "2021-12-14",  #omicron EPI_ISL_12645489
    "USA/UT-CDC-2-5904066/2021"  : "2021-12-14",  #omicron EPI_ISL_12507478
    "USA/UT-CDC-2-5973987/2021"  : "2021-12-14",  #omicron EPI_ISL_12959029
    "USA/UT-CDC-2-5930514/2021"  : "2021-12-14",  #omicron EPI_ISL_12645492
    "USA/UT-CDC-2-5973868/2021"  : "2021-12-14",  #omicron EPI_ISL_12959033
    "USA/UT-CDC-2-5973975/2021"  : "2021-12-14",  #omicron EPI_ISL_12959032
    "USA/UT-CDC-2-5973968/2021"  : "2021-12-14",  #omicron EPI_ISL_12959030
    "USA/UT-CDC-2-5987509/2021"  : "2021-12-14",  #omicron EPI_ISL_12959039
    "USA/UT-CDC-2-6168146/2021"  : "2021-12-14", #omicron
    "USA/UT-CDC-2-6168012/2021"  : "2021-12-14", #omicron
    "USA/UT-CDC-2-6168110/2021"  : "2021-12-14", #omicron
    "USA/UT-CDC-2-6168124/2021" : "2021-12-14", #omicron EPI_ISL_13859477
    "USA/UT-CDC-2-6168028/2021" : "2021-12-14", #omicron EPI_ISL_13859469
    "USA/UT-CDC-2-6168134/2021" : "2021-12-14", #omicron EPI_ISL_13859476
    "USA/UT-CDC-2-6168027/2021" : "2021-12-14", #omicron EPI_ISL_13859471
    "USA/UT-CDC-2-6168139/2021" : "2021-12-14", #omicron EPI_ISL_13859473
    "USA/UT-CDC-2-6168127/2021" : "2021-12-14", #omicron EPI_ISL_13859474
    "USA/UT-CDC-2-5807353/2021" : "2021-12-14", #omicron EPI_ISL_12142195
    "USA/UT-CDC-2-6072438/2021" : "2021-12-14", #omicron EPI_ISL_13291545
    "USA/UT-CDC-2-5807264/2021" : "2021-12-14", #omicron EPI_ISL_12142193
    "USA/UT-CDC-2-5930449/2021" : "2021-12-14", #omicron EPI_ISL_12645493
    "USA/UT-CDC-2-6168110/2021" : "2021-12-14", #omicron EPI_ISL_13859475
    "USA/UT-CDC-2-5973881/2021" : "2021-12-14", #omicron EPI_ISL_12959038
    "USA/UT-CDC-2-6137489/2021" : "2021-12-14", #omicron EPI_ISL_13671635
    "USA/UT-CDC-2-6005674/2021" : "2021-12-14", #omicron EPI_ISL_13082868
    "USA/UT-CDC-2-6185080/2021" : "2021-12-14", #omicron  EPI_ISL_14262719
    "USA/UT-CDC-2-6184978/2021" : "2021-12-14", #omicron  EPI_ISL_14262710
    "USA/UT-CDC-2-6184982/2021" : "2021-12-14", #omicron  EPI_ISL_14262714
    "USA/UT-CDC-2-6185060/2021" : "2021-12-14", #omicron  EPI_ISL_14262717
    "USA/UT-CDC-2-6185063/2021" : "2021-12-14", #omicron  EPI_ISL_14262718
    "USA/UT-CDC-2-6185064/2021" : "2021-12-14", #omicron  EPI_ISL_14262712
    "USA/UT-CDC-2-6185069/2021" : "2021-12-14", #omicron  EPI_ISL_14262715
    "USA/UT-CDC-2-6185078/2021" : "2021-12-14", #omicron  EPI_ISL_14262716
    "USA/UT-CDC-2-6185157/2021" : "2021-12-14", #omicron  EPI_ISL_14262713
    "USA/UT-CDC-2-6185159/2021" : "2021-12-14", #omicron  EPI_ISL_14262711
    #other utah
    "USA/UT-UPHL-220207170277/2021" : "2021-10-27", #omicron EPI_ISL_9677117
    "USA/UT-UPHL-220514591384/2021" : "2021-12-23", #omicron EPI_ISL_12789786
    "USA/UT-UPHL-211224954608/2021" : "2021-11-29", #omicron EPI_ISL_8066289
    "USA/UT-UPHL-220121379344/2021" : "2021-12-23", #omicron EPI_ISL_9206638
    #oregon data
    "USA/OR-TRACE-LINN-081221-1406/2021" : "2021-08-12", #omicron
    "USA/OR-TRACE-BENT-060321-1396/2021 " :	"2021-06-03", # omicron EPI_ISL_12934186
    "USA/OR-TRACE-BENT-092321-1412/2021" : "2021-09-23", # omicron EPI_ISL_12934145
    "USA/OR-TRACE-BENT-100721-1414/2021" : "2021-10-07", # omicron EPI_ISL_12934167
    "USA/OR-TRACE-BENT-101421-1415/2021" : "2021-10-14", # omicron EPI_ISL_12934260
    "USA/OR-TRACE-BENT-060321-1396/2021" : "2021-06-03", # omicron EPI_ISL_12934186
    "USA/OR-TRACE-BENT-102121-1416/2021" : "2021-10-21", # omicron EPI_ISL_12934228
    "USA/OR-TRACE-BENT-050621-1394/2021" : "2021-05-06", #omicron EPI_ISL_12934205
    "USA/OR-TRACE-LINN-070121-1400/2021" : "2021-07-01", #omicron EPI_ISL_12934238
    "USA/OR-TRACE-MARI-080521-1405/2021" : "2021-08-05", #omicron EPI_ISL_12934181
    "USA/OR-TRACE-MULT-062421-1399/2021" : "2021-06-24", #omicron EPI_ISL_12934155
    "USA/OR-TRACE-BENT-082621-1408/2021" : "2021-08-26", #omicron EPI_ISL_12934214
    "USA/OR-TRACE-LINN-112421-1326/2021" : "2021-11-24", #omicron EPI_ISL_12658855
    "USA/OR-TRACE-BENT-111521-1340/2021" : "2021-11-15", #omicron EPI_ISL_12658866
    "USA/OR_UO_MAP002008_S610_L002/2022" : "2022-01-08", #omicron EPI_ISL_8733455

    #Senegal set with suspicious dates - excluding until can confirm. Sorted by variant
    #Alpha
    "Senegal/24725/2020" : "2020-05-09", #alpha
    "Senegal/24729/2020" : "2020-05-09", #alpha
    "Senegal/24841/2020" : "2020-05-09", #alpha
    "Senegal/24866/2020" : "2020-05-09", #alpha
    "Senegal/24961/2020" : "2020-05-09", #alpha
    #Beta
    "Senegal/25620/2020" : "2020-05-10", #beta
    #Delta
    "Senegal/1785/2020" : "2020-03-31", #delta
    "Senegal/1786/2020" : "2020-03-31", #delta
    "Senegal/1803/2020" : "2020-03-30", #delta
    "Senegal/25616/2020" : "2020-05-10", #delta
    #21J.Delta
    "Senegal/2018/2020" : "2020-04-01", #21J Delta
    "Senegal/2021/2020" : "2020-04-02", #21J Delta
    "Senegal/25388/2020" : "2020-05-09", #21J Delta
    "Senegal/3426/2020" : "2020-04-10", #21J Delta
    "Senegal/3428/2020" : "2020-04-10", #21J Delta
    "Senegal/509/2020" : "2020-03-27", #21J Delta
    #Eta
    "Senegal/1083/2020" : "2020-03-25", #eta
    "Senegal/26999/2020" : "2020-05-16", #eta
    "Senegal/28296/2020" : "2020-05-11", #eta
    #20AS126
    "Senegal/24728/2020" : "2020-05-09", #20AS126
    "Senegal/24929/2020" : "2020-05-09", #20AS126
    "Senegal/25084/2020" : "2020-05-09", #20AS126
    "Senegal/25116/2020" : "2020-05-09", #20AS126
    "Senegal/25230/2020" : "2020-05-09", #20AS126
    "Senegal/25237/2020" : "2020-05-09", #20AS126
    "Senegal/25245/2020" : "2020-05-09", #20AS126
    "Senegal/25246/2020" : "2020-05-09", #20AS126
    "Senegal/25250/2020" : "2020-05-09", #20AS126
    "Senegal/25371/2020" : "2020-05-10", #20AS126
    "Senegal/25404/2020" : "2020-05-10", #20AS126
    "Senegal/25423/2020" : "2020-05-10", #20AS126
    "Senegal/25612/2020" : "2020-05-10", #20AS126
    "Senegal/25614/2020" : "2020-05-10", #20AS126
    "Senegal/25669/2020" : "2020-05-10", #20AS126
    "Senegal/25725/2020" : "2020-05-10", #20AS126
    "Senegal/25977/2020" : "2020-05-11", #20AS126
    "Senegal/26003/2020" : "2020-05-09", #20AS126
    "Senegal/26101/2020" : "2020-05-10", #20AS126
    "Senegal/26167/2020" : "2020-05-10", #20AS126
    "Senegal/26171/2020" : "2020-05-10", #20AS126
    "Senegal/26190/2020" : "2020-05-11", #20AS126
    "Senegal/26326/2020" : "2020-05-11", #20AS126
    "Senegal/26403/2020" : "2020-05-12", #20AS126
    "Senegal/26418/2020" : "2020-05-12", #20AS126
    "Senegal/26471/2020" : "2020-05-13", #20AS126
    "Senegal/26475/2020" : "2020-05-13", #20AS126
    "Senegal/26493/2020" : "2020-05-13", #20AS126
    "Senegal/26501/2020" : "2020-05-13", #20AS126
    "Senegal/26508/2020" : "2020-05-13", #20AS126
    "Senegal/26564/2020" : "2020-05-14", #20AS126
    "Senegal/27009/2020" : "2020-05-16", #20AS126
    "Senegal/27018/2020" : "2020-05-16", #20AS126
    "Senegal/2703/2020" : "2020-04-05", #20AS126
    "Senegal/27079/2020" : "2020-05-16", #20AS126
    "Senegal/27181/2020" : "2020-05-16", #20AS126
    "Senegal/27353/2020" : "2020-05-18", #20AS126
    "Senegal/27634/2020" : "2020-05-20", #20AS126
    "Senegal/28176/2020" : "2020-05-11", #20AS126
    "Senegal/28219/2020" : "2020-05-11", #20AS126
    "Senegal/28239/2020" : "2020-05-11", #20AS126
    "Senegal/28362/2020" : "2020-05-11", #20AS126
    "Senegal/28462/2020" : "2020-05-11", #20AS126
    "Senegal/28852/2020" : "2020-05-12", #20AS126
    "Senegal/28859/2020" : "2020-05-12", #20AS126
    "Senegal/28861/2020" : "2020-05-12", #20AS126
    "Senegal/28889/2020" : "2020-05-12", #20AS126
    "Senegal/28892/2020" : "2020-05-12", #20AS126
    "Senegal/28933/2020" : "2020-05-12", #20AS126
    "Senegal/29211/2020" : "2020-05-12", #20AS126
    "Senegal/29741/2020" : "2020-05-13", #20AS126
    "Senegal/30120/2020" : "2020-05-13", #20AS126
    "Senegal/30875/2020" : "2020-05-14", #20AS126
    "Senegal/30917/2020" : "2020-05-14", #20AS126
    "Senegal/30995/2020" : "2020-05-14", #20AS126
    "Senegal/31134/2020" : "2020-05-14", #20AS126

    # Bad sequences from Germany - supposedly Delta in Oct 2020 - unlikely
    "Germany/NW-RKI-I-291769/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291770/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291771/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291772/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291773/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291774/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291775/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291776/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291777/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291778/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291779/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291780/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291781/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291782/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291783/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291784/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291786/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291788/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291789/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291790/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291791/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291792/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291793/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291794/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291795/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291796/2020" : "2020-10-13", #delta
    "Germany/NW-RKI-I-291797/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291798/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291799/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291800/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291801/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291802/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291803/2020" : "2020-10-17", #delta
    "Germany/NW-RKI-I-291804/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291805/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291806/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291808/2020" : "2020-10-14", #delta
    "Germany/NW-RKI-I-291809/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-291810/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291811/2020" : "2020-10-15", #delta
    "Germany/NW-RKI-I-291812/2020" : "2020-10-16", #delta
    "Germany/NW-RKI-I-307383/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307384/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307386/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307387/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307388/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307389/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307391/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307392/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307393/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307394/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307395/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307396/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307397/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307398/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307399/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307400/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307401/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307402/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307403/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307404/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307405/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307407/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307408/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307409/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307410/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307411/2020" : "2020-10-25", #delta
    "Germany/NW-RKI-I-307412/2020" : "2020-10-25", #delta
    "Germany/NW-RKI-I-307413/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307414/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307415/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307416/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307417/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307418/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307419/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307420/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307421/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307422/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307423/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307424/2020" : "2020-10-28", #delta
    "Germany/NW-RKI-I-307425/2020" : "2020-10-27", #delta
    "Germany/NW-RKI-I-307426/2020" : "2020-10-26", #delta
    "Germany/NW-RKI-I-307427/2020" : "2020-10-28", #delta
    "Germany/SL-RKI-I-297962/2020" : "2020-10-17", #delta
    "Germany/SN-RKI-I-213505/2020" : "2020-08-21", #delta
    #and german seqs from even earlier.
    "Germany/NW-RKI-I-323116/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323117/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323118/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323119/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323120/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323121/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323122/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323123/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323124/2020" : "2020-06-11", #delta
    "Germany/NW-RKI-I-323125/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323126/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323127/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323128/2020" : "2020-06-11", #delta
    "Germany/NW-RKI-I-323129/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323130/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323131/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323132/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323133/2020" : "2020-07-11", #delta
    "Germany/NW-RKI-I-323134/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323135/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323136/2020" : "2020-07-11", #delta
    "Germany/NW-RKI-I-323137/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323138/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323139/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323140/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323141/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323142/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323143/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323144/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323145/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323146/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323147/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323148/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323149/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323150/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323151/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323152/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323153/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323154/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323155/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323156/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323157/2020" : "2020-06-11", #delta
    "Germany/NW-RKI-I-323158/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323159/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323160/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323161/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323162/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323163/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323164/2020" : "2020-07-11", #delta
    "Germany/NW-RKI-I-323165/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323166/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323167/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323168/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323169/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323170/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323171/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323172/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323173/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323174/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323175/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323176/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323177/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323178/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323179/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323180/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323181/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323182/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323183/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323184/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323185/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323186/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323187/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323189/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323190/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323191/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323192/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323193/2020" : "2020-10-11", #delta
    "Germany/NW-RKI-I-323194/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323195/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323196/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323197/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323198/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323199/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323200/2020" : "2020-08-11", #delta
    "Germany/NW-RKI-I-323201/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323202/2020" : "2020-05-11", #delta
    "Germany/NW-RKI-I-323203/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323204/2020" : "2020-06-11", #delta
    "Germany/NW-RKI-I-323205/2020" : "2020-09-11", #delta
    "Germany/NW-RKI-I-323206/2020" : "2020-06-11", #delta
    "Germany/SL-RKI-I-297962/2020" : "2020-10-17", #delta
    "Germany/SN-RKI-I-213505/2020" : "2020-08-21", #delta

    #bunch of bad sequences from the UK which are supposedly Delta,
    #from April 2020...
    "USA/CA-LACPHL-AF03229/2020" : "2020-08-12",
    "USA/ID-IBL-638513/2020" : "2020-08-03",
    "England/MILK-202F06F/2020" : "2020-04-17",
    "England/MILK-2018157/2020" : "2020-04-17",
    "England/MILK-2018193/2020" : "2020-04-17",
    "England/MILK-20182CD/2020" : "2020-04-17",
    "England/MILK-2018333/2020" : "2020-04-18",
    "England/MILK-2018351/2020" : "2020-04-17",
    "England/MILK-20183AC/2020" : "2020-04-19",
    "England/MILK-20183D9/2020" : "2020-04-17",
    "England/MILK-2018412/2020" : "2020-04-17",
    "England/MILK-20184D6/2020" : "2020-04-18",
    "England/MILK-2018500/2020" : "2020-04-18",
    "England/MILK-20185D3/2020" : "2020-04-18",
    "England/MILK-20186A3/2020" : "2020-04-18",
    "England/MILK-202E7A7/2020" : "2020-04-17",
    "England/MILK-202E877/2020" : "2020-04-17",
    "England/MILK-202E8E0/2020" : "2020-04-17",
    "England/MILK-202E91A/2020" : "2020-04-17",
    "England/MILK-202E956/2020" : "2020-04-17",
    "England/MILK-202E992/2020" : "2020-04-17",
    "England/MILK-202E9ED/2020" : "2020-04-17",
    "England/MILK-202EA17/2020" : "2020-04-17",
    "England/MILK-202EA53/2020" : "2020-04-17",
    "England/MILK-202EA62/2020" : "2020-04-17",
    "England/MILK-202EABD/2020" : "2020-04-17",
    "England/MILK-202EB05/2020" : "2020-04-17",
    "England/MILK-202EB41/2020" : "2020-04-17",
    "England/MILK-202EB8D/2020" : "2020-04-17",
    "England/MILK-202EC3F/2020" : "2020-04-17",
    "England/MILK-202EC5D/2020" : "2020-04-17",
    "England/MILK-202EC6C/2020" : "2020-04-17",
    "England/MILK-202EC7B/2020" : "2020-04-17",
    "England/MILK-202EC99/2020" : "2020-04-17",
    "England/MILK-202ED0F/2020" : "2020-04-17",
    "England/MILK-202ED96/2020" : "2020-04-17",
    "England/MILK-202EDB4/2020" : "2020-04-17",
    "England/MILK-202EDF0/2020" : "2020-04-17",
    "England/MILK-202EE75/2020" : "2020-04-17",
    "England/MILK-202EE84/2020" : "2020-04-17",
    "England/MILK-202EEA2/2020" : "2020-04-17",
    "England/MILK-202EEEE/2020" : "2020-04-17",
    "England/MILK-202EF09/2020" : "2020-04-17",
    "England/MILK-202EF18/2020" : "2020-04-17",
    "England/MILK-202EF45/2020" : "2020-04-19",
    "England/MILK-202EF54/2020" : "2020-04-17",
    "England/MILK-202EF90/2020" : "2020-04-17",
    "England/MILK-202EFAF/2020" : "2020-04-17",
    "England/MILK-202F014/2020" : "2020-04-17",
    "England/MILK-202F023/2020" : "2020-04-17",
    "England/MILK-202F032/2020" : "2020-04-17",
    "England/MILK-202F041/2020" : "2020-04-17",
    "England/MILK-202F050/2020" : "2020-04-17",
    "England/MILK-202F0C9/2020" : "2020-04-17",
    "England/MILK-202F0D8/2020" : "2020-04-17",
    "England/MILK-202F0E7/2020" : "2020-04-17",
    "England/MILK-202F14E/2020" : "2020-04-17",
    "England/MILK-202F15D/2020" : "2020-04-17",
    "England/MILK-202F16C/2020" : "2020-04-17",
    "England/MILK-202F17B/2020" : "2020-04-17",
    "England/MILK-202F1D5/2020" : "2020-04-17",
    "England/MILK-202F1F3/2020" : "2020-04-17",
    "England/MILK-202F23C/2020" : "2020-04-17",
    "England/MILK-202F24B/2020" : "2020-04-17",
    "England/MILK-202F278/2020" : "2020-04-17",
    "England/MILK-202F287/2020" : "2020-04-17",
    "England/MILK-202F296/2020" : "2020-04-17",
    "England/MILK-202F30C/2020" : "2020-04-17",
    "England/MILK-202F32A/2020" : "2020-04-17",
    "England/MILK-20181C0/2020" : "2020-04-17",
    "England/MILK-1FFA395/2020" : "2020-04-16",
    "England/MILK-1FFBC5D/2020" : "2020-04-20",
    "England/MILK-1FFC8FE/2020" : "2020-04-17",
    "England/MILK-1FFC9A0/2020" : "2020-04-17",
    "England/MILK-1FFCA25/2020" : "2020-04-17",
    "England/MILK-1FFCAF8/2020" : "2020-04-17",
    "England/MILK-1FFCB40/2020" : "2020-04-17",
    "England/MILK-1FFCB8C/2020" : "2020-04-17",
    "England/MILK-1FFCB9B/2020" : "2020-04-17",
    "England/MILK-1FFCC01/2020" : "2020-04-17",
    "England/MILK-1FFCC2F/2020" : "2020-04-17",
    "England/MILK-1FFCCD4/2020" : "2020-04-17",
    "England/MILK-1FFCCE3/2020" : "2020-04-17",
    "England/MILK-1FFCD59/2020" : "2020-04-17",
    "England/MILK-1FFCD68/2020" : "2020-04-17",
    "England/MILK-1FFCD77/2020" : "2020-04-17",
    "England/MILK-1FFCDC2/2020" : "2020-04-17",
    "England/MILK-1FFCE0B/2020" : "2020-04-17",
    "England/MILK-1FFCE1A/2020" : "2020-04-17",
    "England/MILK-1FFD462/2020" : "2020-04-17",
    "England/MILK-1FFD4BD/2020" : "2020-04-17",
    "England/MILK-1FFD58D/2020" : "2020-04-17",
    "England/MILK-1FFD72D/2020" : "2020-04-17",
    "England/MILK-1FFD778/2020" : "2020-04-17",
    "England/MILK-1FFD796/2020" : "2020-04-17",
    "England/MILK-1FFD7D2/2020" : "2020-04-18",
    "England/MILK-1FFD7E1/2020" : "2020-04-17",
    "England/MILK-1FFD80C/2020" : "2020-04-17",
    "England/MILK-1FFD848/2020" : "2020-04-17",
    "England/MILK-1FFD857/2020" : "2020-04-17",
    "England/MILK-1FFD884/2020" : "2020-04-17",
    "England/MILK-1FFD8FD/2020" : "2020-04-17",
    "England/MILK-1FFD945/2020" : "2020-04-17",
    "England/MILK-1FFD9FA/2020" : "2020-04-17",
    "England/MILK-1FFDA15/2020" : "2020-04-19",
    "England/MILK-2001801/2020" : "2020-04-14",
    "England/MILK-20018F2/2020" : "2020-04-14",
    "England/MILK-2001A92/2020" : "2020-04-14",
    "England/MILK-2003D00/2020" : "2020-04-19",
    "England/MILK-2003D2E/2020" : "2020-04-19",
    "England/MILK-2003D4C/2020" : "2020-04-15",
    "England/MILK-2003DC4/2020" : "2020-04-15",
    "England/MILK-2003E49/2020" : "2020-04-15",
    "England/MILK-2003E94/2020" : "2020-04-19",
    "England/MILK-2003EC1/2020" : "2020-04-15",
    "England/MILK-2003EEF/2020" : "2020-04-15",
    "England/MILK-2003EFE/2020" : "2020-04-15",
    "England/MILK-2003F28/2020" : "2020-04-15",
    "England/MILK-2003F82/2020" : "2020-04-15",
    "England/MILK-2003FBF/2020" : "2020-04-15",
    "England/MILK-2004015/2020" : "2020-04-15",
    "England/MILK-2004103/2020" : "2020-04-15",
    "England/MILK-200415E/2020" : "2020-04-15",
    "England/MILK-2005D86/2020" : "2020-04-15",
    "England/MILK-2005E47/2020" : "2020-04-15",
    "England/MILK-2005EB0/2020" : "2020-04-15",
    "England/MILK-2005F71/2020" : "2020-04-15",
    "England/MILK-2005F9F/2020" : "2020-04-15",
    "England/MILK-2005FBD/2020" : "2020-04-15",
    "England/MILK-2005FDB/2020" : "2020-04-15",
    "England/MILK-2005FF9/2020" : "2020-04-15",
    "England/MILK-2006022/2020" : "2020-04-16",
    "England/MILK-2006101/2020" : "2020-04-15",
    "England/MILK-2017589/2020" : "2020-04-18",
    "England/MILK-2017598/2020" : "2020-04-18",
    "England/MILK-201763B/2020" : "2020-04-18",
    "England/MILK-20176C2/2020" : "2020-04-18",
    "England/MILK-201771A/2020" : "2020-04-18",
    "England/MILK-2017738/2020" : "2020-04-18",
    "England/MILK-2017756/2020" : "2020-04-18",
    "England/MILK-20177B0/2020" : "2020-04-18",
    "England/MILK-20177CF/2020" : "2020-04-18",
    "England/MILK-20177FC/2020" : "2020-04-18",
    "England/MILK-2017808/2020" : "2020-04-18",
    "England/MILK-2017817/2020" : "2020-04-18",
    "England/MILK-2017844/2020" : "2020-04-18",
    "England/MILK-2017853/2020" : "2020-04-18",
    "England/MILK-20178AE/2020" : "2020-04-18",
    "England/MILK-2018D53/2020" : "2020-04-19",
    "England/MILK-2018DF9/2020" : "2020-04-18",
    "England/MILK-2019332/2020" : "2020-04-18",
    "England/MILK-20195B4/2020" : "2020-04-22",
    "England/MILK-2019790/2020" : "2020-04-18",
    "England/MILK-20197FA/2020" : "2020-04-18",
    "England/MILK-2019EC8/2020" : "2020-04-18",
    "England/MILK-2019ED7/2020" : "2020-04-18",
    "England/MILK-2019F2F/2020" : "2020-04-18",
    "England/MILK-2019F6B/2020" : "2020-04-18",
    "England/MILK-201A058/2020" : "2020-04-18",
    "England/MILK-201A155/2020" : "2020-04-20",
    "England/MILK-201A164/2020" : "2020-04-18",
    "England/MILK-201A207/2020" : "2020-04-18",
    "England/MILK-201A261/2020" : "2020-04-18",
    "England/MILK-201A2CB/2020" : "2020-04-18",
    "England/MILK-201A44D/2020" : "2020-04-18",
    "England/MILK-201A45C/2020" : "2020-04-18",
    "England/MILK-201A46B/2020" : "2020-04-18",
    "England/MILK-201A47A/2020" : "2020-04-18",
    "England/MILK-201C311/2020" : "2020-04-18",
    "England/MILK-201C38A/2020" : "2020-04-18",
    "England/MILK-201C3B7/2020" : "2020-04-18",
    "England/MILK-201C3D5/2020" : "2020-04-18",
    "England/MILK-201C43C/2020" : "2020-04-18",
    "England/MILK-201C44B/2020" : "2020-04-18",
    "England/MILK-201C627/2020" : "2020-04-19",
    "England/MILK-201C645/2020" : "2020-04-18",
    "England/MILK-201C724/2020" : "2020-04-18",
    "England/MILK-201C733/2020" : "2020-04-18",
    "England/MILK-201D40E/2020" : "2020-04-19",
    "England/MILK-201D4D1/2020" : "2020-04-19",
    "England/MILK-201D4FF/2020" : "2020-04-19",
    "England/MILK-201D50B/2020" : "2020-04-19",
    "England/MILK-201D565/2020" : "2020-04-19",
    "England/MILK-201D5A1/2020" : "2020-04-19",
    "England/MILK-201D617/2020" : "2020-04-19",
    "England/MILK-201D6BD/2020" : "2020-04-19",
    "England/MILK-201D6EA/2020" : "2020-04-19",
    "England/MILK-201D750/2020" : "2020-04-19",
    "England/MILK-201D76F/2020" : "2020-04-19",
    "England/MILK-201D78D/2020" : "2020-04-19",
    "England/MILK-201D7C9/2020" : "2020-04-19",
    "England/MILK-201D802/2020" : "2020-04-19",
    "England/MILK-201D811/2020" : "2020-04-19",
    "England/MILK-201D820/2020" : "2020-04-19",
    "England/MILK-201D83F/2020" : "2020-04-19",
    "England/MILK-201D8B7/2020" : "2020-04-19",
    "England/MILK-201FDB6/2020" : "2020-04-19",
    "England/MILK-201FDC5/2020" : "2020-04-19",
    "England/MILK-201FDE3/2020" : "2020-04-19",
    "England/MILK-201FE68/2020" : "2020-04-19",
    "England/MILK-201FE77/2020" : "2020-04-19",
    "England/MILK-201FE95/2020" : "2020-04-19",
    "England/MILK-201FED1/2020" : "2020-04-19",
    "England/MILK-201FEFF/2020" : "2020-04-19",
    "England/MILK-201FF0B/2020" : "2020-04-19",
    "England/MILK-201FF56/2020" : "2020-04-19",
    "England/MILK-201FF65/2020" : "2020-04-19",
    "England/MILK-201FFA1/2020" : "2020-04-19",
    "England/MILK-2020022/2020" : "2020-04-19",
    "England/MILK-202007D/2020" : "2020-04-19",
    "England/MILK-202009B/2020" : "2020-04-19",
    "England/MILK-202012F/2020" : "2020-04-19",
    "England/MILK-202016B/2020" : "2020-04-19",
    "England/MILK-2022002/2020" : "2020-04-19",
    "England/MILK-20220C6/2020" : "2020-04-19",
    "England/MILK-20220D5/2020" : "2020-04-19",
    "England/MILK-20221A5/2020" : "2020-04-19",
    "England/MILK-20221B4/2020" : "2020-04-19",
    "England/MILK-20222B1/2020" : "2020-04-19",
    "England/MILK-20222C0/2020" : "2020-04-19",
    "England/MILK-2022318/2020" : "2020-04-19",
    "England/MILK-2022336/2020" : "2020-04-19",
    "England/MILK-2022390/2020" : "2020-04-19",
    "England/MILK-2023195/2020" : "2020-04-19",
    "England/MILK-20231A4/2020" : "2020-04-19",
    "England/MILK-202321A/2020" : "2020-04-19",
    "England/MILK-20232A1/2020" : "2020-04-20",
    "England/MILK-20232B0/2020" : "2020-04-20",
    "England/MILK-20233AE/2020" : "2020-04-20",
    "England/MILK-20233BD/2020" : "2020-04-20",
    "England/MILK-2023423/2020" : "2020-04-19",
    "England/MILK-2023432/2020" : "2020-04-20",
    "England/MILK-2023441/2020" : "2020-04-20",
    "England/MILK-202349C/2020" : "2020-04-20",
    "England/MILK-20234C9/2020" : "2020-04-20",
    "England/MILK-2023511/2020" : "2020-04-20",
    "England/MILK-202365A/2020" : "2020-04-20",
    "England/MILK-20236D2/2020" : "2020-04-20",
    "England/MILK-20254E5/2020" : "2020-04-19",
    "England/MILK-20255B5/2020" : "2020-04-19",
    "England/MILK-20255C4/2020" : "2020-04-19",
    "England/MILK-2027902/2020" : "2020-04-20",
    "England/MILK-202793F/2020" : "2020-04-20",
    "England/MILK-2027AF0/2020" : "2020-04-20",
    "England/MILK-2027B2A/2020" : "2020-04-20",
    "England/MILK-2027B93/2020" : "2020-04-20",
    "England/MILK-2027C72/2020" : "2020-04-20",
    "England/MILK-2027D60/2020" : "2020-04-20",
    "England/MILK-2027D7F/2020" : "2020-04-20",
    "England/MILK-2027DAC/2020" : "2020-04-20",
    "England/MILK-203004D/2020" : "2020-04-19",
    "England/MILK-203005C/2020" : "2020-04-19",
    "England/MILK-2030159/2020" : "2020-04-18",
    "England/MILK-203020B/2020" : "2020-04-18",
    "England/MILK-2030247/2020" : "2020-04-18",
    "England/MILK-2030256/2020" : "2020-04-18",
    "England/MILK-20302CF/2020" : "2020-04-18",
    "England/MILK-20302DE/2020" : "2020-04-18",
    "England/MILK-2030326/2020" : "2020-04-18",
    "England/MILK-2030362/2020" : "2020-04-18",
    "England/MILK-20303AE/2020" : "2020-04-18",
    "England/MILK-20303BD/2020" : "2020-04-18",
    "England/MILK-20303CC/2020" : "2020-04-18",
    "England/MILK-2030423/2020" : "2020-04-18",
    "England/MILK-203046F/2020" : "2020-04-18",
    "England/MILK-20304C9/2020" : "2020-04-18",
    "England/MILK-2030CB2/2020" : "2020-04-19",
    "England/MILK-2030D0A/2020" : "2020-04-19",
    "England/MILK-2030D19/2020" : "2020-04-19",
    "England/MILK-2030D46/2020" : "2020-04-19",
    "England/MILK-2030D82/2020" : "2020-04-19",
    "England/MILK-2030E34/2020" : "2020-04-19",
    "England/MILK-2030E8F/2020" : "2020-04-20",
    "England/MILK-2030F31/2020" : "2020-04-19",
    "England/MILK-2030FD7/2020" : "2020-04-19",
    "England/MILK-2032861/2020" : "2020-04-19",
    "England/MILK-20328AD/2020" : "2020-04-19",
    "England/MILK-203297D/2020" : "2020-04-19",
    "England/MILK-203299B/2020" : "2020-04-19",
    "England/MILK-20329F5/2020" : "2020-04-19",
    "England/MILK-2032A4D/2020" : "2020-04-19",
    "England/MILK-2032AA7/2020" : "2020-04-19",
    "England/MILK-2032BB3/2020" : "2020-04-19",
    "England/MILK-2032BC2/2020" : "2020-04-19",
    "England/MILK-2032BFF/2020" : "2020-04-19",
    "England/MILK-2032C38/2020" : "2020-04-19",
    "England/MILK-2032C47/2020" : "2020-04-19",
    "England/MILK-2032CB0/2020" : "2020-04-19",
    "England/MILK-2032D17/2020" : "2020-04-19",
    "England/MILK-2032D44/2020" : "2020-04-19",
    "England/MILK-2032D71/2020" : "2020-04-19",
    "England/MILK-2032DAE/2020" : "2020-04-19",
    "England/MILK-2032DEA/2020" : "2020-04-18",
    "England/MILK-2032DF9/2020" : "2020-04-18",
    "England/MILK-2032E32/2020" : "2020-04-18",
    "England/MILK-2032EAB/2020" : "2020-04-18",
    "England/MILK-2032EBA/2020" : "2020-04-18",
    "England/MILK-2032F20/2020" : "2020-04-18",
    "England/MILK-2032FE4/2020" : "2020-04-18",
    "England/MILK-203301D/2020" : "2020-04-18",
    "England/MILK-203302C/2020" : "2020-04-18",
    "England/MILK-203304A/2020" : "2020-04-18",
    "England/MILK-2033129/2020" : "2020-04-18",
    "England/MILK-20331FC/2020" : "2020-04-18",
    "England/MILK-2033217/2020" : "2020-04-18",
    "England/MILK-2033226/2020" : "2020-04-18",
    "England/MILK-20332BD/2020" : "2020-04-18",
    "England/MILK-20332F9/2020" : "2020-04-18",
    "England/MILK-2033305/2020" : "2020-04-18",
    "England/MILK-2033921/2020" : "2020-04-18",
    "England/MILK-2033930/2020" : "2020-04-18",
    "England/MILK-203395E/2020" : "2020-04-18",
    "England/MILK-20339A9/2020" : "2020-04-18",
    "England/MILK-20339B8/2020" : "2020-04-18",
    "England/MILK-20339D6/2020" : "2020-04-18",
    "England/MILK-2034270/2020" : "2020-04-19",
    "England/MILK-20342BC/2020" : "2020-04-19",
    "England/MILK-2034410/2020" : "2020-04-19",
    "England/MILK-2034498/2020" : "2020-04-19",
    "England/MILK-20344B6/2020" : "2020-04-19",
    "England/MILK-20344C5/2020" : "2020-04-19",
    "England/MILK-203451D/2020" : "2020-04-19",
    "England/MILK-203452C/2020" : "2020-04-19",
    "England/MILK-203588C/2020" : "2020-04-20",
    "England/MILK-20358C8/2020" : "2020-04-19",
    "England/MILK-203593E/2020" : "2020-04-19",
    "England/MILK-203596B/2020" : "2020-04-19",
    "England/MILK-20359E3/2020" : "2020-04-19",
    "England/MILK-2035AA4/2020" : "2020-04-19",
    "England/MILK-2035B65/2020" : "2020-04-19",
    "England/MILK-2035C71/2020" : "2020-04-19",
    "England/MILK-2035C9F/2020" : "2020-04-19",
    "England/MILK-2036302/2020" : "2020-04-19",
    "England/MILK-203636C/2020" : "2020-04-19",
    "England/MILK-2036399/2020" : "2020-04-19",
    "England/MILK-203641E/2020" : "2020-04-19",
    "England/MILK-203644B/2020" : "2020-04-19",
    "England/MILK-203645A/2020" : "2020-04-19",
    "England/MILK-2036469/2020" : "2020-04-19",
    "England/MILK-2036487/2020" : "2020-04-19",
    "England/MILK-20364F0/2020" : "2020-04-19",
    "England/MILK-203652A/2020" : "2020-04-19",
    "England/MILK-2036548/2020" : "2020-04-19",
    "England/MILK-20365C0/2020" : "2020-04-19",
    "England/MILK-20365FD/2020" : "2020-04-19",
    "England/MILK-2036609/2020" : "2020-04-19",
    "England/MILK-2036672/2020" : "2020-04-19",
    "England/MILK-2036681/2020" : "2020-04-19",
    "England/MILK-20368B8/2020" : "2020-04-19",
    "England/MILK-20368C7/2020" : "2020-04-20",
    "England/MILK-2036F77/2020" : "2020-04-19",
    "England/MILK-2036F86/2020" : "2020-04-19",
    "England/MILK-2036FC2/2020" : "2020-04-19",
    "England/MILK-2037055/2020" : "2020-04-19",
    "England/MILK-2037125/2020" : "2020-04-19",
    "England/MILK-2037161/2020" : "2020-04-20",
    "England/MILK-20371AD/2020" : "2020-04-19",
    "England/MILK-20372B9/2020" : "2020-04-19",
    "England/MILK-20372C8/2020" : "2020-04-19",
    "England/MILK-20372D7/2020" : "2020-04-19",
    "England/MILK-2037301/2020" : "2020-04-19",
    "England/MILK-203733E/2020" : "2020-04-19",
    "England/MILK-2037477/2020" : "2020-04-19",
    "England/MILK-2038C32/2020" : "2020-04-19",
    "England/MILK-2038C50/2020" : "2020-04-19",
    "England/MILK-2038C9C/2020" : "2020-04-19",
    "England/MILK-2038D4E/2020" : "2020-04-19",
    "England/MILK-2038D6C/2020" : "2020-04-19",
    "England/MILK-2038D8A/2020" : "2020-04-19",
    "England/MILK-2038DA8/2020" : "2020-04-19",
    "England/MILK-2038DC6/2020" : "2020-04-19",
    "England/MILK-2038E1E/2020" : "2020-04-19",
    "England/MILK-2038E4B/2020" : "2020-04-19",
    "England/MILK-2038EF0/2020" : "2020-04-21",
    "England/MILK-2038F1B/2020" : "2020-04-21",
    "England/MILK-2038F48/2020" : "2020-04-21",
    "England/MILK-2038F84/2020" : "2020-04-21",
    "England/MILK-2038F93/2020" : "2020-04-21",
    "England/MILK-2038FB1/2020" : "2020-04-21",
    "England/MILK-2039062/2020" : "2020-04-21",
    "England/MILK-2039071/2020" : "2020-04-21",
    "England/MILK-20390AE/2020" : "2020-04-21",
    "England/MILK-20390CC/2020" : "2020-04-21",
    "England/MILK-203917E/2020" : "2020-04-21",
    "England/MILK-203919C/2020" : "2020-04-21",
    "England/MILK-20391BA/2020" : "2020-04-21",
    "England/MILK-20391D8/2020" : "2020-04-21",
    "England/MILK-203A3C2/2020" : "2020-04-22",
    "England/MILK-203A483/2020" : "2020-04-22",
    "England/MILK-203A492/2020" : "2020-04-22",
    "England/MILK-203A4B0/2020" : "2020-04-22",
    "England/MILK-203A4ED/2020" : "2020-04-22",
    "England/MILK-203A571/2020" : "2020-04-22",
    "England/MILK-203A5BD/2020" : "2020-04-22",
    "England/MILK-203A623/2020" : "2020-04-22",
    "England/MILK-203A650/2020" : "2020-04-22",
    "England/MILK-203A66F/2020" : "2020-04-22",
    "England/MILK-203A6AB/2020" : "2020-04-22",
    "England/MILK-203A6BA/2020" : "2020-04-22",
    "England/MILK-203A6C9/2020" : "2020-04-22",
    "England/MILK-203A7A8/2020" : "2020-04-22",
    "England/MILK-203A7F3/2020" : "2020-04-22",
    "England/MILK-203A81E/2020" : "2020-04-22",
    "England/MILK-203A887/2020" : "2020-04-22",
    "England/MILK-203A8C3/2020" : "2020-04-22",
    "England/MILK-203A8D2/2020" : "2020-04-22",
    "England/MILK-203A90C/2020" : "2020-04-22",
    "England/MILK-203A9EE/2020" : "2020-04-22",
    "England/MILK-203AA72/2020" : "2020-04-22",
    "England/MILK-203AA81/2020" : "2020-04-22",
    "England/MILK-203AA90/2020" : "2020-04-22",
    "England/MILK-203AACD/2020" : "2020-04-22",
    "England/MILK-203AADC/2020" : "2020-04-22",
    "England/MILK-203AB15/2020" : "2020-04-22",
    "England/MILK-203AB42/2020" : "2020-04-22",
    "England/MILK-203AB8E/2020" : "2020-04-22",
    "England/MILK-203ABAC/2020" : "2020-04-22",
    "England/MILK-203ABF7/2020" : "2020-04-22",
    "England/MILK-203AC7C/2020" : "2020-04-22",
    "England/MILK-203ACE5/2020" : "2020-04-22",
    "England/MILK-203AD00/2020" : "2020-04-22",
    "England/MILK-203AD2E/2020" : "2020-04-22",
    "England/MILK-203AD5B/2020" : "2020-04-22",
    "England/MILK-203AD79/2020" : "2020-04-22",
    "England/MILK-203AE1C/2020" : "2020-04-22",
    "England/MILK-203AE49/2020" : "2020-04-22",
    "England/MILK-203AEFE/2020" : "2020-04-22",
    "England/MILK-203AF46/2020" : "2020-04-22",
    "England/MILK-203B552/2020" : "2020-04-22",
    "England/MILK-203B59E/2020" : "2020-04-22",
    "England/MILK-203B5AD/2020" : "2020-04-22",
    "England/MILK-203B5F8/2020" : "2020-04-22",
    "England/MILK-203B613/2020" : "2020-04-22",
    "England/MILK-203B640/2020" : "2020-04-21",
    "England/MILK-203B67D/2020" : "2020-04-22",
    "England/MILK-203B68C/2020" : "2020-04-22",
    "England/MILK-203B73E/2020" : "2020-04-22",
    "England/MILK-203B75C/2020" : "2020-04-22",
    "England/MILK-203B7B6/2020" : "2020-04-22",
    "England/MILK-203B7D4/2020" : "2020-04-22",
    "England/MILK-203B877/2020" : "2020-04-22",
    "England/MILK-203B886/2020" : "2020-04-22",
    "England/MILK-203B90B/2020" : "2020-04-22",
    "England/MILK-203BA35/2020" : "2020-04-22",
    "England/MILK-203BAF9/2020" : "2020-04-22",
    "England/MILK-203CCF2/2020" : "2020-04-21",
    "England/MILK-203CD0E/2020" : "2020-04-21",
    "England/MILK-203CD4A/2020" : "2020-04-21",
    "England/MILK-203CD68/2020" : "2020-04-21",
    "England/MILK-203CD77/2020" : "2020-04-21",
    "England/MILK-203CDB3/2020" : "2020-04-22",
    "England/MILK-203CDD1/2020" : "2020-04-21",
    "England/MILK-203CE0B/2020" : "2020-04-21",
    "England/MILK-203CE38/2020" : "2020-04-21",
    "England/MILK-203CE47/2020" : "2020-04-21",
    "England/MILK-203CEA1/2020" : "2020-04-21",
    "England/MILK-203CEFC/2020" : "2020-04-21",
    "England/MILK-203CF08/2020" : "2020-04-21",
    "England/MILK-203CF62/2020" : "2020-04-21",
    "England/MILK-203CF71/2020" : "2020-04-21",
    "England/MILK-203D013/2020" : "2020-04-21",
    "England/MILK-203D12F/2020" : "2020-04-21",
    "England/MILK-203D1A7/2020" : "2020-04-21",
    "England/MILK-203D2B3/2020" : "2020-04-21",
    "England/MILK-203D338/2020" : "2020-04-21",
    "England/MILK-203D3CF/2020" : "2020-04-21",
    "England/MILK-203D444/2020" : "2020-04-21",
    "England/MILK-203D462/2020" : "2020-04-21",
    "England/MILK-203D49F/2020" : "2020-04-21",
    "England/MILK-203D4EA/2020" : "2020-04-21",
    "England/MILK-203D541/2020" : "2020-04-22",
    "England/MILK-203D550/2020" : "2020-04-22",
    "England/MILK-203D5BA/2020" : "2020-04-22",
    "England/MILK-203D620/2020" : "2020-04-22",
    "England/MILK-203D82A/2020" : "2020-04-22",
    "England/MILK-203D848/2020" : "2020-04-22",
    "England/MILK-203F002/2020" : "2020-04-21",
    "England/MILK-203F04E/2020" : "2020-04-21",
    "England/MILK-203F0E4/2020" : "2020-04-21",
    "England/MILK-203F503/2020" : "2020-04-21",
    "England/MILK-203F521/2020" : "2020-04-21",

    #These are sequences submitted where collection date seems incorrect:
    #https://twitter.com/flodebarre/status/1414868236823318530
    # 2021-07-01 635
    # 2021-07-09 582
    # 2021-07-12 738
    #meta <- read.csv("downloaded_gisaid.tsv", sep="\t", as.is=T)
    #meta[which(meta$country=="France" & meta$date == "2021-07-01" & meta$authors == "Anthony LEVASSEUR et al"),]
    #write.table(french3$strain, "french-07-01.txt", sep="\n", quote=F, row.names=F, col.names=F)
    "France/PAC-IHU-14282-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14283-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14284-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14286-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14288-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14289-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14290-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14291-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14292-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14293-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14294-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14294-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-14296-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14298-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14299-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14300-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14301-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14302-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14303-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14304-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14305-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14306-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14307-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14308-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14309-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14310-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14311-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14312-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14314-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14316-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14317-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14318-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14319-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14320-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14321-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14322-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14323-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14324-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14327-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14328-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14329-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14330-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14331-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14332-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14333-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14334-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14335-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14337-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14338-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14339-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14340-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14341-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14341-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-14342-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-14343-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14345-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14347-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14348-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14349-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14350-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14353-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14355-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14356-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14357-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14358-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14360-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14361-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14362-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14363-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14364-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14365-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14366-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14367-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14368-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14369-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14370-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14373-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14373-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-14374-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14375-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14376-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14377-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14378-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14379-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14381-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14382-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14383-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14384-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14385-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14386-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14387-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14388-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14389-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14389-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-14393-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14394-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14395-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14396-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14398-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14469-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14470-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14471-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14472-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14473-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14474-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14475-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14477-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14478-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14479-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14480-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14481-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14482-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14483-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14484-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14486-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14487-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14488-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14489-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14490-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14491-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14492-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14493-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14494-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14495-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14497-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14498-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14500-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14502-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14503-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14504-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14505-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14506-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14507-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14508-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14509-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14510-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14511-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14512-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14513-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14514-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14515-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14516-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14517-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14518-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14519-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14520-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14521-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14522-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14523-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14524-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14525-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14526-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14527-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14529-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14530-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14531-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14532-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14533-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14534-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14535-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14536-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14537-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14538-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14539-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14540-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14541-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14542-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14543-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14544-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14545-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14546-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14547-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14548-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14549-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14550-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14551-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14552-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14553-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14555-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14556-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14557-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14558-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14559-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14560-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14561-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14562-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14564-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14565-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14566-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14567-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14568-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14569-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14570-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14571-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14572-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14573-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14574-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14575-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14576-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14577-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14578-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14579-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14580-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14581-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14582-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14583-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14584-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14585-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14586-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14587-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14588-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14589-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14590-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14591-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14592-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14593-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14594-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14595-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14597-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14598-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14599-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14600-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14601-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14602-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14603-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14604-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14605-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14606-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14607-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14609-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14610-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14611-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14613-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14614-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14616-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14617-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14618-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14619-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14620-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14621-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14622-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14623-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14624-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14625-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14626-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14627-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14629-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14630-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14633-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14634-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14635-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14636-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14637-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14638-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14639-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14640-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14641-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14642-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14643-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14645-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14646-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14647-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14648-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14649-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14650-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14651-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14652-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14653-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14654-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14656-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14657-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14658-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14660-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14662-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14663-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14664-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14665-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14666-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14667-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14668-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14670-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14671-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14672-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14673-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14674-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14675-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14676-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14677-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14678-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14679-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14680-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14682-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14683-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14684-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14685-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14687-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14688-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14690-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14691-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14692-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14693-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14694-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14697-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14698-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14699-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14701-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14702-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14703-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14704-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14705-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14707-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14708-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14709-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14710-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14712-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14713-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14714-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14715-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14716-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14719-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14720-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14721-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14722-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14723-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14724-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14725-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14726-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14727-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14728-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14729-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14730-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14731-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14732-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14733-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14734-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14736-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14737-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14738-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14739-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14740-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14741-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14742-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14743-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14744-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14745-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14746-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14747-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14748-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14749-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14750-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14752-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14753-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14754-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14755-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14757-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14758-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14759-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14760-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14761-Nova1E/2021" : "2021-07-01",
    "France/PAC-IHU-14762-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14763-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14764-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14765-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14766-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14767-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14769-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14770-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14771-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14772-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14773-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14774-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14776-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14777-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14781-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14783-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14784-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14785-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14786-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14787-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14788-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14790-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14791-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14792-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14794-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14795-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14796-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14797-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14799-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14800-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14801-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14802-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14803-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14804-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14805-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14806-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14807-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14808-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14809-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14810-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14811-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14812-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14813-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14814-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14815-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14816-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14817-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14818-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14820-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14821-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14822-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14823-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14824-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14825-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14826-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14827-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14829-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14830-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14831-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14832-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14833-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14834-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14835-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14836-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14837-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14838-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14839-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14840-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14842-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14843-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14844-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14845-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14847-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14848-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14849-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14850-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14851-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14852-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14853-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14854-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14856-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14857-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14859-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14860-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14861-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14862-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14863-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14864-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14865-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14866-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14867-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14868-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14869-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14870-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14871-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14872-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14873-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14874-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14875-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14876-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14877-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14878-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14879-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14880-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14881-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14882-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14883-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14884-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14885-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14886-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14887-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14888-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14889-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14890-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14891-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14892-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14896-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14897-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14898-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14899-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14900-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14901-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14902-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14903-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14904-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14905-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14906-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14908-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14909-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14910-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14911-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14912-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14913-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14914-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14915-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14916-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14917-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14918-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14919-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14920-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14921-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14922-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14923-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14924-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14925-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14926-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14927-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14928-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14929-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14930-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14931-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14932-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14933-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14934-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14935-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14936-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14937-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14939-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14940-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14941-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14942-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14943-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14944-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14945-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14946-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14947-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14948-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14949-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14950-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14951-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14952-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14953-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14955-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14956-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14957-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14958-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14959-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14960-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14961-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14962-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14963-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14964-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14965-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14966-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14967-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14968-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14969-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14970-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14970-Nova2M/2021" : "2021-07-01",
    "France/PAC-IHU-14970-Nova3M/2021" : "2021-07-01",
    "France/PAC-IHU-14971-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14972-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14973-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14974-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14975-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14977-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14978-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14980-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14981-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14982-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14983-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14984-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14985-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14986-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14987-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14988-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14989-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14990-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14991-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14992-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14993-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14994-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-14996-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15000-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15001-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15002-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15003-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15004-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15005-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15006-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15007-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15008-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15009-Nova1M/2021" : "2021-07-01",
    "France/PAC-IHU-15010-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15011-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15012-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15013-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15014-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15015-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15016-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15017-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15018-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15019-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15020-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15021-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15023-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15024-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15025-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15026-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15027-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15028-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15029-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15030-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15031-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15032-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15033-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15034-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15035-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15037-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15039-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15040-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15041-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15042-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15043-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15044-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15045-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15046-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15047-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15048-N1/2021" : "2021-07-01",
    "France/PAC-IHU-15050-N1/2021" : "2021-07-01",
    "France/PAC-IHU-6872-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7464-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7607-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7612-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7619-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7625-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7626-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7638-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7639-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7646-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7663-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7667-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7668-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7670-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7671-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-7673-Nova2E/2021" : "2021-07-01",
    "France/PAC-IHU-10453-Nova2A/2021" : "2021-07-09",
    "France/PAC-IHU-14243-Nova2A/2021" : "2021-07-09",
    "France/PAC-IHU-15080-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15081-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15082-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15083-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15086-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15087-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15088-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15089-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15090-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15091-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15092-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15093-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15094-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15095-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15096-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15097-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15098-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15099-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15101-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15102-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15104-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15105-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15106-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15107-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15108-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15109-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15110-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15111-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15112-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15113-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15114-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15115-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15116-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15117-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15118-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15119-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15121-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15123-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15124-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15125-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15126-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15127-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15128-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15129-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15130-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15131-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15132-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15133-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15134-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15135-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15136-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15137-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15138-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15139-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15140-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15141-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15142-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15143-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15144-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15145-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15146-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15147-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15148-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15149-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15150-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15151-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15152-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15153-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15154-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15155-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15156-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15157-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15158-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15159-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15160-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15161-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15162-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15163-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15164-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15166-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15167-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15168-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15169-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15170-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15171-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15172-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15173-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15174-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15175-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15176-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15177-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15178-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15180-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15181-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15182-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15183-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15184-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15185-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15186-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15187-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15188-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15189-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15190-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15191-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15192-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15193-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15194-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15195-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15197-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15198-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15199-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15200-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15201-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15202-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15203-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15204-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15205-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15206-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15207-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15208-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15209-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15210-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15211-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15212-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15213-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15215-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15216-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15217-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15218-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15219-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15220-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15221-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15222-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15223-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15224-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15225-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15226-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15227-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15228-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15229-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15230-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15231-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15232-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15234-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15235-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15236-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15237-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15238-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15239-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15240-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15241-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15242-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15243-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15244-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15246-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15248-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15249-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15250-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15251-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15252-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15253-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15254-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15255-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15256-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15257-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15258-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15259-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15260-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15261-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15262-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15263-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15264-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15266-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15267-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15268-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15269-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15270-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15272-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15273-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15274-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15275-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15276-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15277-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15278-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15281-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15282-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15283-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15286-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15287-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15288-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15289-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15291-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15292-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15293-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15294-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15295-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15296-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15297-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15299-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15300-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15301-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15302-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15303-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15304-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15305-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15306-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15307-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15308-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15309-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15311-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15312-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15314-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15315-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15316-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15318-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15319-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15320-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15321-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15322-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15323-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15324-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15325-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15326-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15327-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15328-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15329-Nova1E/2021" : "2021-07-09",
    "France/PAC-IHU-15372-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15374-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15376-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15377-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15378-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15379-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15380-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15381-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15382-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15383-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15384-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15386-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15387-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15388-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15389-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15390-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15391-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15392-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15393-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15396-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15399-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15402-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15403-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15405-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15408-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15410-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15412-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15415-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15417-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15418-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15419-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15420-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15421-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15422-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15423-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15424-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15425-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15433-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15435-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15436-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15438-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15439-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15440-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15443-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15444-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15445-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15446-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15448-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15450-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15451-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15452-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15453-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15454-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15456-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15457-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15458-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15460-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15463-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15464-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15466-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15467-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15468-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15470-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15471-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15472-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15473-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15474-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15475-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15476-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15478-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15479-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15480-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15481-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15482-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15483-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15484-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15485-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15487-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15488-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15489-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15490-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15491-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15493-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15494-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15496-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15497-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15498-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15499-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15500-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15501-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15502-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15503-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15504-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15505-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15507-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15508-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15510-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15512-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15513-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15514-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15516-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15517-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15519-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15520-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15521-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15522-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15523-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15526-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15528-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15529-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15530-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15532-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15533-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15534-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15536-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15537-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15538-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15541-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15543-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15544-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15546-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15547-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15548-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15549-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15550-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15551-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15552-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15553-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15554-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15555-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15557-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15558-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15559-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15560-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15561-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15562-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15563-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15564-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15565-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15566-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15567-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15568-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15569-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15570-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15573-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15574-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15575-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15576-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15577-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15578-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15580-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15581-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15582-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15584-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15587-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15588-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15589-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15590-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15591-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15592-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15593-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15595-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15596-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15597-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15598-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15599-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15601-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15602-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15604-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15605-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15607-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15608-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15609-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15610-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15611-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15612-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15613-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15614-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15615-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15617-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15618-Nova1A/2021" : "2021-07-09",
    "France/PAC-IHU-15620-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15621-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15622-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15624-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15625-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15626-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15627-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15628-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15629-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15631-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15632-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15633-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15634-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15635-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15636-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15637-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15638-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15639-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15640-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15641-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15642-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15643-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15644-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15645-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15646-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15647-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15648-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15649-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15650-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15651-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15652-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15653-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15654-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15655-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15656-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15657-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15658-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15659-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15660-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15661-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15662-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15663-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15664-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15665-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15666-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15667-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15668-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15669-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15670-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15672-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15673-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15674-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15675-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15676-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15677-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15678-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15680-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15682-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15683-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15684-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15685-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15686-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15687-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15688-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15689-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15690-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15691-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15692-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15694-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15695-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15697-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15698-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15699-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15700-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15701-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15702-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15703-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15704-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15705-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15706-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15707-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15708-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15709-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15710-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15711-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15712-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15714-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15715-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15716-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15717-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15718-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15719-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15720-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15722-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15723-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15724-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15725-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15728-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15729-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15730-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15731-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15732-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15733-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15734-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15736-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15737-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15739-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15741-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15744-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15745-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15749-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15752-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15754-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15755-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15757-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15758-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15760-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15762-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15763-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15764-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15765-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15766-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15767-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15768-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15769-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15770-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15772-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15773-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15774-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15775-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15777-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15779-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15780-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15781-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15784-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15788-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15789-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15790-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15791-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15793-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15795-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15796-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15800-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15802-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15803-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15805-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15806-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15809-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15810-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15811-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15812-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15817-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15822-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15823-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15827-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15830-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15831-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15832-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15834-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15836-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15842-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15847-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15848-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15850-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15856-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15859-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15860-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15861-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15862-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15863-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15864-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15869-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15870-Nova1M/2021" : "2021-07-09",
    "France/PAC-IHU-15871-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15872-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15873-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15874-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15875-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15876-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15877-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15878-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15879-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15880-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15881-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15882-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15883-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15884-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15885-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15886-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15887-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15888-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15890-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15892-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15893-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15894-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15895-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15896-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15897-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15898-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15899-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15900-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15901-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15902-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15904-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15905-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15906-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15908-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15909-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15910-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15911-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15912-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15914-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15916-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15917-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15918-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15919-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15920-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15921-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15922-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15925-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15926-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15927-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15928-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15929-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15930-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15931-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15937-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15938-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15939-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15940-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15944-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15945-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15946-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15948-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15949-N1/2021" : "2021-07-12",
    "France/PAC-IHU-15990-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15991-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15992-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15993-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15994-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15995-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15996-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15997-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15998-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-15999-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16000-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16001-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16002-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16003-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16004-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16005-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16006-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16008-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16009-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16010-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16011-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16012-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16013-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16014-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16015-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16016-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16017-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16018-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16019-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16020-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16021-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16022-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16023-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16024-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16025-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16026-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16027-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16028-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16029-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16030-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16031-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16033-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16034-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16035-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16036-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16037-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16038-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16040-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16041-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16042-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16043-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16044-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16045-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16046-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16047-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16048-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16049-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16050-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16051-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16053-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16054-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16055-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16055-NovaE2/2021" : "2021-07-12",
    "France/PAC-IHU-16056-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16056-NovaE2/2021" : "2021-07-12",
    "France/PAC-IHU-16057-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16058-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16059-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16060-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16061-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16065-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16066-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16067-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16068-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16069-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16070-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16071-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16072-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16073-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16074-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16075-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16076-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16077-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16078-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16079-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16080-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16081-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16082-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16083-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16084-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16085-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16086-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16087-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16088-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16089-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16090-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16091-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16092-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16093-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16094-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16095-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16096-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16097-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16098-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16099-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16100-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16101-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16102-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16103-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16104-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16106-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16107-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16108-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16109-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16110-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16113-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16114-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16115-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16116-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16117-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16118-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16119-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16120-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16121-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16122-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16123-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16125-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16126-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16127-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16128-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16129-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16131-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16132-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16133-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16134-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16135-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16136-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16137-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16138-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16139-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16142-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16143-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16144-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16145-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16146-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16147-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16148-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16149-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16150-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16151-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16152-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16153-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16154-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16155-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16156-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16157-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16158-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16159-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16160-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16161-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16162-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16164-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16166-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16167-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16168-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16169-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16170-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16171-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16172-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16173-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16174-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16176-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16177-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16178-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16179-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16180-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16181-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16182-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16183-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16184-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16185-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16187-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16188-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16189-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16190-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16191-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16193-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16196-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16197-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16199-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16200-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16202-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16204-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16205-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16207-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16208-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16209-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16210-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16211-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16212-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16213-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16214-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16215-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16217-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16218-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16219-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16220-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16221-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16222-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16223-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16224-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16225-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16225-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16226-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16226-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16227-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16227-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16228-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16228-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16229-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16229-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16230-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16230-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16231-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16231-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16232-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16232-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16233-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16233-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16235-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16235-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16236-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16236-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16237-Nova2A/2021" : "2021-07-12",
    "France/PAC-IHU-16237-NovaE1/2021" : "2021-07-12",
    "France/PAC-IHU-16239-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16240-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16242-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16243-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16244-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16245-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16246-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16248-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16249-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16250-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16251-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16252-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16253-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16254-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16256-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16257-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16258-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16259-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16260-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16261-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16262-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16263-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16264-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16265-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16266-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16267-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16268-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16269-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16270-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16271-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16272-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16273-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16274-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16275-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16276-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16277-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16279-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16280-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16281-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16282-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16283-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16284-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16285-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16286-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16287-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16288-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16289-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16290-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16293-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16294-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16295-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16297-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16298-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16299-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16300-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16301-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16302-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16303-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16304-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16305-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16306-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16307-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16308-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16310-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16311-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16312-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16313-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16314-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16315-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16316-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16317-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16319-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16320-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16321-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16322-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16323-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16324-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16325-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16326-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16327-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16328-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16329-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16330-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16331-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16332-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16334-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16335-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16336-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16337-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16339-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16340-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16341-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16343-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16344-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16345-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16346-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16347-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16348-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16349-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16350-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16351-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16352-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16353-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16354-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16355-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16356-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16357-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16358-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16359-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16360-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16361-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16362-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16363-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16364-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16365-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16366-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16367-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16368-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16369-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16370-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16371-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16372-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16373-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16374-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16375-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16376-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16377-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16378-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16379-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16380-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16381-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16382-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16383-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16384-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16385-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16386-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16387-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16388-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16389-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16390-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16391-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16392-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16393-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16394-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16395-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16396-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16397-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16398-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16399-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16400-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16401-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16402-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16403-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16404-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16405-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16406-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16407-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16408-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16409-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16410-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16411-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16412-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16413-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16414-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16415-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16416-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16417-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16418-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16419-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16420-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16421-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16422-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16423-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16424-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16425-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16426-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16427-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16428-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16429-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16430-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16431-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16432-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16433-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16434-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16435-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16436-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16437-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16438-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16439-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16440-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16441-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16442-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16443-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16444-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16445-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16446-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16448-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16449-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16450-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16451-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16452-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16453-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16454-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16455-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16456-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16457-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16459-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16460-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16461-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16462-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16463-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16464-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16466-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16467-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16468-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16469-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16470-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16471-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16472-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16473-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16475-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16476-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16477-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16478-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16479-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16480-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16481-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16482-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16483-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16484-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16485-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16486-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16487-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16488-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16489-Nova1M/2021" : "2021-07-12",
    "France/PAC-IHU-16568-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16569-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16570-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16571-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16572-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16573-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16575-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16576-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16577-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16578-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16579-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16580-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16581-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16582-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16583-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16584-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16585-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16586-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16587-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16588-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16589-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16590-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16592-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16593-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16594-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16595-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16596-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16597-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16598-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16599-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16600-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16601-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16602-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16605-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16606-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16607-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16608-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16609-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16610-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16611-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16612-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16613-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16614-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16615-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16616-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16618-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16620-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16621-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16622-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16624-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16626-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16627-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16628-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16630-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16632-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16633-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16634-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16635-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16636-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16638-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16639-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16641-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16642-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16643-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16644-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16645-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16646-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16647-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16648-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16649-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16650-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16653-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16654-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16655-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16656-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16657-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16658-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16660-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16664-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16665-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16666-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16668-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16669-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16671-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16672-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16673-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16675-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16677-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16679-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16680-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16681-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16682-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16683-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16684-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16685-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16686-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16687-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16688-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16689-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16690-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16691-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16692-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16693-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16694-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16695-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16696-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16697-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16698-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16699-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16700-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16701-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16702-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16703-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16704-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16705-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16706-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16707-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16708-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16709-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16710-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16711-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16712-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16713-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16714-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16715-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16716-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16717-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16718-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16719-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16720-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16721-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16722-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16724-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16725-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16726-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16727-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16728-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16729-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16730-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16731-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16733-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16734-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16735-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16736-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16737-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16738-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16739-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16741-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16742-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16743-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16744-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16745-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16746-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16747-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16748-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16749-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16750-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16751-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16752-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16753-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16754-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16755-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16756-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16757-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16758-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16759-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16760-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16761-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16762-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16763-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16764-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16765-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16766-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16767-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16768-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16769-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16770-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16771-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16772-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16773-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16774-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16775-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16777-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16778-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16779-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16780-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16781-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16783-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16784-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16785-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16786-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16787-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16788-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16789-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16790-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16791-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16792-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16794-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16795-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16796-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16797-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16798-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16799-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16800-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16802-Nova1A/2021" : "2021-07-12",
    "France/PAC-IHU-16803-Nova1A/2021" : "2021-07-12",
}
