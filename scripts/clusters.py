clusters = {
            "S222": {'snps': [22226, 28931, 29644], 'cluster_data': [],
            "country_info":[], 'col': "#ff8d3d", "display_name": "20A.EU1", "display_name2": "S:A222V",
            "build_name":"20A.EU1",
            "mutations":{
                "nonsynonymous": {"S": [('A', 222, 'V')], 
                                  "ORF10": [('V', 30, 'L')],
                                  "N": [('A', 220, 'V')]
                                 },
                "synonymous": [('T', 445, 'C'), ('C', 6286, 'T'), ('C', 26801, 'G')]
                }
            },

            "S477": {'snps': [22991, 4542], 'cluster_data': [],
            'country_info':[], 'col': "#65beeb", "display_name": "20A.EU2", "display_name2": "S:477N",
            "build_name":"20A.EU2",
            "mutations":{
                "nonsynonymous": {"S": [('S', 477, 'N')], 
                                  "N": [('M', 234, 'I'), ('A', 376, 'T')],
                                  "ORF1b": [('A', 176, 'S'), ('V', 767, 'L'), ('K', 1141, 'R'), ('E', 1184, 'D')]
                                 },
                "synonymous": [('C',4543,'T'), ('G',5629,'T'), ('C',11497,'T'), ('T',26876,'C')]
                }
            },

            "S501": {'snps': [23063], 'cluster_data': [], 'snps2': [23062],
            "country_info":[], 'col': "#ff99ff", "display_name": "S:N501", 
            "build_name":"S.N501", 'url_params': ""  #no europe filter
            # no mutations because has appeared many times independently
            },

            "S69": {'snps': [], 'cluster_data': [], 'gaps': [21766,21767,21768],
            "country_info":[], 'col': "#ffcc00", "display_name": "S:H69-", 
            "build_name":"S.H69-", 'url_params': "c=gt-S_69,501,453" # color, no europe filter
            # no mutations because has appeared many times independently
            },

            "S439": {'snps': [7766, 22878], 'cluster_data': [],
            "country_info":[], 'col': "#fb9a99", "display_name": "S:N439K", 
            "build_name":"S.N439K",
            "mutations":{
                "nonsynonymous": {"S": [('S', 439, 'K')], 
                                  "ORF1a": [('I', 2501, 'T')]
                                 },
                "synonymous": [('C',8047,'T')]
                }
            },

            "S453": {'snps': [22919], 'cluster_data': [],
            "country_info":[], 'col': "#cc0000", "display_name": "S:Y453F", 
            "build_name":"S.Y453F", 'url_params': "c=gt-S_453&f_region=Europe" # color, europe filter
            # no mutations because has appeared many times independently
            },

            "S98": {'snps': [21854, 25504], 'cluster_data': [],
            "country_info":[], 'col': "#911eb4", "display_name": "S:S98F", 
            "build_name":"S.S98F",
            "mutations":{
                "nonsynonymous": {"S": [('S', 98, 'F')], 
                                  "N": [('P', 199, 'L')],
                                  "ORF3a": [('Q',38,'R'), ('G',172,'R'), ('V',202,'L')]
                                 },
                "synonymous": [('C',28651,'T')]
                }
            },

            "S484": {'snps': [23011], 'cluster_data': [],
            "country_info":[], 'col': "#006600", "display_name": "S:E484", 
            "build_name":"S.E484"
            # no mutations because has appeared many times independently
            },

            "S80": {'snps': [21799, 3098], 'cluster_data': [],
            "country_info":[], 'col': "#3cb44b", "display_name": "S:D80Y", 
            "build_name":"S.D80Y",
            "mutations":{
                "nonsynonymous": {"S": [('D',80,'Y')], 
                                  "N": [('S',186,'Y'), ('D',377,'Y')],
                                  "ORF1a": [('T',945,'I'), ('T',1567,'I'), ('Q',3346,'K'), ('V',3475,'F'), ('M',3862,'I')],
                                  "ORF1b": [('P',255,'T')],
                                  "ORF7a": [('R',80,'I')]
                                 },
                "synonymous": [('G',4960,'T'), ('C',6070,'T'), ('C',7303,'T'), ('C',7564,'T'), ('C',10279,'T'), ('C',10525,'T'), ('C',10582,'T'), ('C',27804,'T')]
                }
            },

            "S626": {'snps': [23437, 771], 'cluster_data': [],
            "country_info":[], 'col': "#0000ff", "display_name": "S:A626S", 
            "build_name":"S.A626S",
            "mutations":{
                "nonsynonymous": {"S": [('A',626,'S')]
                                 }
                }
            },

            "S1122": {'snps': [24925,9119],  'cluster_data': [], #mostly Swedish cluster
            "country_info":[], 'col': "#660066", "display_name": "S:V1122L", 
            'build_name': 'S.V1122L',
            "mutations":{
                "nonsynonymous": {"S": [('V',1122,'L')]
                                 }
                }
            },

            "DanishCluster": {'snps': [15655], 'cluster_data': [],
            "country_info":[], 'col': "#ffffff", "display_name": "DanishCluster", 
            "build_name":"DanishCluster"
            # no mutations because is not displayed
            }

#            "S222": {'snps': [22226, 28931, 29644], 'cluster_data': [],
#            "country_info":[], 'col': "#8a8a8a", "display_name": "20A.EU1", 
#            "display_name2": "B.1.177 (20E(EU1))",
#            "build_name":"20A.EU1"},

#            "S501uk": {'snps': [23062,14675], 'cluster_data': [], 'snps2': [],
#            "country_info":[], 'col': "#db4439", "display_name": "B.1.1.7 (501Y.V1)", 
#            "build_name":"S.N501uk", 'url_params': ""},  #no europe filter

            #"S677": {'snps': [23592,26774,29401], 'cluster_data': [], 'build_name': "S.677"},

            #"S69": {'snps': [21766], 'cluster_data': [], 'build_name': "S.69"},
            #"S692": {'snps': [23635], 'cluster_data': [], 'build_name': "S.692"},
            #"S1229": {'snps': [25248], 'cluster_data': [], 'build_name': "S.1229"}
            #"S655": {'snps': [23524], 'cluster_data': [], "display_name": "S:H655Y", 'build_name': "S.H655Y"}
            #"S263": {'snps': [22348], 'cluster_data': [], "build_name": "S.A263S", "display_name": "S:A263S"}
            #"S484": {'snps': [23011], 'cluster_data': [], "build_name": "S.E484", "display_name": "S:E484"}


            #"N220": {'snps': [28931], 'exclude_snps': [22226], 'cluster_data': [], "build_name": "N.A220V", "display_name": "N:A220V"}
            #"ORFTEN30": {'snps': [29644], 'exclude_snps': [22226], 'cluster_data': [], "build_name": "ORF10.V30", "display_name": "ORF10:V30"}
            #"N220re": {'snps': [28931,29644], 'exclude_snps': [22226], 'cluster_data': [], "build_name": "N.A220Vre", "display_name": "N:A220Vre"}
            }

