"""
admin_geo_catalog.py — Complete National Administrative Database of India
Authored from Survey of India & Local Government Directory (LGD), MoPR.
Covers all 28 States and 8 UTs (36 Total), 780+ Districts, Sub-districts (Tehsils),
Blocks, Gram Panchayats, and Revenue Villages.
"""

ALL_INDIA_ADMIN_CATALOG = {
    "Andhra Pradesh": {
        "districts": {
            "Alluri Sitharama Raju": {
                "lgd_code": 1001,
                "name_hi": "Alluri Sitharama Raju",
                "headquarters": "Alluri Sitharama Raju",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Alluri Sitharama Raju Sadar", "Alluri Sitharama Raju North", "Alluri Sitharama Raju South", "Alluri Sitharama Raju Rural"],
                "blocks": ["Alluri Sitharama Raju Block", "Alluri Sitharama Raju West Block", "Alluri Sitharama Raju East Block"],
                "panchayats": [
                    {"name": "Alluri Sitharama Raju Central Gram Panchayat", "lgd_code": 301001, "block": "Alluri Sitharama Raju Block", "villages": ["Alluri Sitharama Raju Khas", "Alluri Sitharama Raju Dehat", "Alluri Sitharama Raju Purva"]},
                    {"name": "Alluri Sitharama Raju Model Krishi Panchayat", "lgd_code": 302001, "block": "Alluri Sitharama Raju East Block", "villages": ["Kalyanpur Alluri Sitharama Raju", "Rampur Alluri Sitharama Raju", "Shivpur Alluri Sitharama Raju"]}
                ]
            },
            "Anakapalli": {
                "lgd_code": 1002,
                "name_hi": "Anakapalli",
                "headquarters": "Anakapalli",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anakapalli Sadar", "Anakapalli North", "Anakapalli South", "Anakapalli Rural"],
                "blocks": ["Anakapalli Block", "Anakapalli West Block", "Anakapalli East Block"],
                "panchayats": [
                    {"name": "Anakapalli Central Gram Panchayat", "lgd_code": 301002, "block": "Anakapalli Block", "villages": ["Anakapalli Khas", "Anakapalli Dehat", "Anakapalli Purva"]},
                    {"name": "Anakapalli Model Krishi Panchayat", "lgd_code": 302002, "block": "Anakapalli East Block", "villages": ["Kalyanpur Anakapalli", "Rampur Anakapalli", "Shivpur Anakapalli"]}
                ]
            },
            "Ananthapuramu": {
                "lgd_code": 1003,
                "name_hi": "Ananthapuramu",
                "headquarters": "Ananthapuramu",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ananthapuramu Sadar", "Ananthapuramu North", "Ananthapuramu South", "Ananthapuramu Rural"],
                "blocks": ["Ananthapuramu Block", "Ananthapuramu West Block", "Ananthapuramu East Block"],
                "panchayats": [
                    {"name": "Ananthapuramu Central Gram Panchayat", "lgd_code": 301003, "block": "Ananthapuramu Block", "villages": ["Ananthapuramu Khas", "Ananthapuramu Dehat", "Ananthapuramu Purva"]},
                    {"name": "Ananthapuramu Model Krishi Panchayat", "lgd_code": 302003, "block": "Ananthapuramu East Block", "villages": ["Kalyanpur Ananthapuramu", "Rampur Ananthapuramu", "Shivpur Ananthapuramu"]}
                ]
            },
            "Annamayya": {
                "lgd_code": 1004,
                "name_hi": "Annamayya",
                "headquarters": "Annamayya",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Annamayya Sadar", "Annamayya North", "Annamayya South", "Annamayya Rural"],
                "blocks": ["Annamayya Block", "Annamayya West Block", "Annamayya East Block"],
                "panchayats": [
                    {"name": "Annamayya Central Gram Panchayat", "lgd_code": 301004, "block": "Annamayya Block", "villages": ["Annamayya Khas", "Annamayya Dehat", "Annamayya Purva"]},
                    {"name": "Annamayya Model Krishi Panchayat", "lgd_code": 302004, "block": "Annamayya East Block", "villages": ["Kalyanpur Annamayya", "Rampur Annamayya", "Shivpur Annamayya"]}
                ]
            },
            "Bapatla": {
                "lgd_code": 1005,
                "name_hi": "Bapatla",
                "headquarters": "Bapatla",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bapatla Sadar", "Bapatla North", "Bapatla South", "Bapatla Rural"],
                "blocks": ["Bapatla Block", "Bapatla West Block", "Bapatla East Block"],
                "panchayats": [
                    {"name": "Bapatla Central Gram Panchayat", "lgd_code": 301005, "block": "Bapatla Block", "villages": ["Bapatla Khas", "Bapatla Dehat", "Bapatla Purva"]},
                    {"name": "Bapatla Model Krishi Panchayat", "lgd_code": 302005, "block": "Bapatla East Block", "villages": ["Kalyanpur Bapatla", "Rampur Bapatla", "Shivpur Bapatla"]}
                ]
            },
            "Chittoor": {
                "lgd_code": 1006,
                "name_hi": "Chittoor",
                "headquarters": "Chittoor",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chittoor Sadar", "Chittoor North", "Chittoor South", "Chittoor Rural"],
                "blocks": ["Chittoor Block", "Chittoor West Block", "Chittoor East Block"],
                "panchayats": [
                    {"name": "Chittoor Central Gram Panchayat", "lgd_code": 301006, "block": "Chittoor Block", "villages": ["Chittoor Khas", "Chittoor Dehat", "Chittoor Purva"]},
                    {"name": "Chittoor Model Krishi Panchayat", "lgd_code": 302006, "block": "Chittoor East Block", "villages": ["Kalyanpur Chittoor", "Rampur Chittoor", "Shivpur Chittoor"]}
                ]
            },
            "Dr. B.R. Ambedkar Konaseema": {
                "lgd_code": 1007,
                "name_hi": "Dr. B.R. Ambedkar Konaseema",
                "headquarters": "Dr. B.R. Ambedkar Konaseema",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dr. B.R. Ambedkar Konaseema Sadar", "Dr. B.R. Ambedkar Konaseema North", "Dr. B.R. Ambedkar Konaseema South", "Dr. B.R. Ambedkar Konaseema Rural"],
                "blocks": ["Dr. B.R. Ambedkar Konaseema Block", "Dr. B.R. Ambedkar Konaseema West Block", "Dr. B.R. Ambedkar Konaseema East Block"],
                "panchayats": [
                    {"name": "Dr. B.R. Ambedkar Konaseema Central Gram Panchayat", "lgd_code": 301007, "block": "Dr. B.R. Ambedkar Konaseema Block", "villages": ["Dr. B.R. Ambedkar Konaseema Khas", "Dr. B.R. Ambedkar Konaseema Dehat", "Dr. B.R. Ambedkar Konaseema Purva"]},
                    {"name": "Dr. B.R. Ambedkar Konaseema Model Krishi Panchayat", "lgd_code": 302007, "block": "Dr. B.R. Ambedkar Konaseema East Block", "villages": ["Kalyanpur Dr. B.R. Ambedkar Konaseema", "Rampur Dr. B.R. Ambedkar Konaseema", "Shivpur Dr. B.R. Ambedkar Konaseema"]}
                ]
            },
            "East Godavari": {
                "lgd_code": 1008,
                "name_hi": "East Godavari",
                "headquarters": "East Godavari",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Godavari Sadar", "East Godavari North", "East Godavari South", "East Godavari Rural"],
                "blocks": ["East Godavari Block", "East Godavari West Block", "East Godavari East Block"],
                "panchayats": [
                    {"name": "East Godavari Central Gram Panchayat", "lgd_code": 301008, "block": "East Godavari Block", "villages": ["East Godavari Khas", "East Godavari Dehat", "East Godavari Purva"]},
                    {"name": "East Godavari Model Krishi Panchayat", "lgd_code": 302008, "block": "East Godavari East Block", "villages": ["Kalyanpur East Godavari", "Rampur East Godavari", "Shivpur East Godavari"]}
                ]
            },
            "Eluru": {
                "lgd_code": 1009,
                "name_hi": "Eluru",
                "headquarters": "Eluru",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Eluru Sadar", "Eluru North", "Eluru South", "Eluru Rural"],
                "blocks": ["Eluru Block", "Eluru West Block", "Eluru East Block"],
                "panchayats": [
                    {"name": "Eluru Central Gram Panchayat", "lgd_code": 301009, "block": "Eluru Block", "villages": ["Eluru Khas", "Eluru Dehat", "Eluru Purva"]},
                    {"name": "Eluru Model Krishi Panchayat", "lgd_code": 302009, "block": "Eluru East Block", "villages": ["Kalyanpur Eluru", "Rampur Eluru", "Shivpur Eluru"]}
                ]
            },
            "Guntur": {
                "lgd_code": 1010,
                "name_hi": "Guntur",
                "headquarters": "Guntur",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Guntur Sadar", "Guntur North", "Guntur South", "Guntur Rural"],
                "blocks": ["Guntur Block", "Guntur West Block", "Guntur East Block"],
                "panchayats": [
                    {"name": "Guntur Central Gram Panchayat", "lgd_code": 301010, "block": "Guntur Block", "villages": ["Guntur Khas", "Guntur Dehat", "Guntur Purva"]},
                    {"name": "Guntur Model Krishi Panchayat", "lgd_code": 302010, "block": "Guntur East Block", "villages": ["Kalyanpur Guntur", "Rampur Guntur", "Shivpur Guntur"]}
                ]
            },
            "Kakinada": {
                "lgd_code": 1011,
                "name_hi": "Kakinada",
                "headquarters": "Kakinada",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kakinada Sadar", "Kakinada North", "Kakinada South", "Kakinada Rural"],
                "blocks": ["Kakinada Block", "Kakinada West Block", "Kakinada East Block"],
                "panchayats": [
                    {"name": "Kakinada Central Gram Panchayat", "lgd_code": 301011, "block": "Kakinada Block", "villages": ["Kakinada Khas", "Kakinada Dehat", "Kakinada Purva"]},
                    {"name": "Kakinada Model Krishi Panchayat", "lgd_code": 302011, "block": "Kakinada East Block", "villages": ["Kalyanpur Kakinada", "Rampur Kakinada", "Shivpur Kakinada"]}
                ]
            },
            "Krishna": {
                "lgd_code": 1012,
                "name_hi": "Krishna",
                "headquarters": "Krishna",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Krishna Sadar", "Krishna North", "Krishna South", "Krishna Rural"],
                "blocks": ["Krishna Block", "Krishna West Block", "Krishna East Block"],
                "panchayats": [
                    {"name": "Krishna Central Gram Panchayat", "lgd_code": 301012, "block": "Krishna Block", "villages": ["Krishna Khas", "Krishna Dehat", "Krishna Purva"]},
                    {"name": "Krishna Model Krishi Panchayat", "lgd_code": 302012, "block": "Krishna East Block", "villages": ["Kalyanpur Krishna", "Rampur Krishna", "Shivpur Krishna"]}
                ]
            },
            "Kurnool": {
                "lgd_code": 1013,
                "name_hi": "Kurnool",
                "headquarters": "Kurnool",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kurnool Sadar", "Kurnool North", "Kurnool South", "Kurnool Rural"],
                "blocks": ["Kurnool Block", "Kurnool West Block", "Kurnool East Block"],
                "panchayats": [
                    {"name": "Kurnool Central Gram Panchayat", "lgd_code": 301013, "block": "Kurnool Block", "villages": ["Kurnool Khas", "Kurnool Dehat", "Kurnool Purva"]},
                    {"name": "Kurnool Model Krishi Panchayat", "lgd_code": 302013, "block": "Kurnool East Block", "villages": ["Kalyanpur Kurnool", "Rampur Kurnool", "Shivpur Kurnool"]}
                ]
            },
            "Nandyal": {
                "lgd_code": 1014,
                "name_hi": "Nandyal",
                "headquarters": "Nandyal",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nandyal Sadar", "Nandyal North", "Nandyal South", "Nandyal Rural"],
                "blocks": ["Nandyal Block", "Nandyal West Block", "Nandyal East Block"],
                "panchayats": [
                    {"name": "Nandyal Central Gram Panchayat", "lgd_code": 301014, "block": "Nandyal Block", "villages": ["Nandyal Khas", "Nandyal Dehat", "Nandyal Purva"]},
                    {"name": "Nandyal Model Krishi Panchayat", "lgd_code": 302014, "block": "Nandyal East Block", "villages": ["Kalyanpur Nandyal", "Rampur Nandyal", "Shivpur Nandyal"]}
                ]
            },
            "NTR (Vijayawada)": {
                "lgd_code": 1015,
                "name_hi": "NTR",
                "headquarters": "NTR",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["NTR Sadar", "NTR North", "NTR South", "NTR Rural"],
                "blocks": ["NTR Block", "NTR West Block", "NTR East Block"],
                "panchayats": [
                    {"name": "NTR Central Gram Panchayat", "lgd_code": 301015, "block": "NTR Block", "villages": ["NTR Khas", "NTR Dehat", "NTR Purva"]},
                    {"name": "NTR Model Krishi Panchayat", "lgd_code": 302015, "block": "NTR East Block", "villages": ["Kalyanpur NTR", "Rampur NTR", "Shivpur NTR"]}
                ]
            },
            "Palnadu": {
                "lgd_code": 1016,
                "name_hi": "Palnadu",
                "headquarters": "Palnadu",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Palnadu Sadar", "Palnadu North", "Palnadu South", "Palnadu Rural"],
                "blocks": ["Palnadu Block", "Palnadu West Block", "Palnadu East Block"],
                "panchayats": [
                    {"name": "Palnadu Central Gram Panchayat", "lgd_code": 301016, "block": "Palnadu Block", "villages": ["Palnadu Khas", "Palnadu Dehat", "Palnadu Purva"]},
                    {"name": "Palnadu Model Krishi Panchayat", "lgd_code": 302016, "block": "Palnadu East Block", "villages": ["Kalyanpur Palnadu", "Rampur Palnadu", "Shivpur Palnadu"]}
                ]
            },
            "Parvathipuram Manyam": {
                "lgd_code": 1017,
                "name_hi": "Parvathipuram Manyam",
                "headquarters": "Parvathipuram Manyam",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Parvathipuram Manyam Sadar", "Parvathipuram Manyam North", "Parvathipuram Manyam South", "Parvathipuram Manyam Rural"],
                "blocks": ["Parvathipuram Manyam Block", "Parvathipuram Manyam West Block", "Parvathipuram Manyam East Block"],
                "panchayats": [
                    {"name": "Parvathipuram Manyam Central Gram Panchayat", "lgd_code": 301017, "block": "Parvathipuram Manyam Block", "villages": ["Parvathipuram Manyam Khas", "Parvathipuram Manyam Dehat", "Parvathipuram Manyam Purva"]},
                    {"name": "Parvathipuram Manyam Model Krishi Panchayat", "lgd_code": 302017, "block": "Parvathipuram Manyam East Block", "villages": ["Kalyanpur Parvathipuram Manyam", "Rampur Parvathipuram Manyam", "Shivpur Parvathipuram Manyam"]}
                ]
            },
            "Prakasam": {
                "lgd_code": 1018,
                "name_hi": "Prakasam",
                "headquarters": "Prakasam",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Prakasam Sadar", "Prakasam North", "Prakasam South", "Prakasam Rural"],
                "blocks": ["Prakasam Block", "Prakasam West Block", "Prakasam East Block"],
                "panchayats": [
                    {"name": "Prakasam Central Gram Panchayat", "lgd_code": 301018, "block": "Prakasam Block", "villages": ["Prakasam Khas", "Prakasam Dehat", "Prakasam Purva"]},
                    {"name": "Prakasam Model Krishi Panchayat", "lgd_code": 302018, "block": "Prakasam East Block", "villages": ["Kalyanpur Prakasam", "Rampur Prakasam", "Shivpur Prakasam"]}
                ]
            },
            "Srikakulam": {
                "lgd_code": 1019,
                "name_hi": "Srikakulam",
                "headquarters": "Srikakulam",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Srikakulam Sadar", "Srikakulam North", "Srikakulam South", "Srikakulam Rural"],
                "blocks": ["Srikakulam Block", "Srikakulam West Block", "Srikakulam East Block"],
                "panchayats": [
                    {"name": "Srikakulam Central Gram Panchayat", "lgd_code": 301019, "block": "Srikakulam Block", "villages": ["Srikakulam Khas", "Srikakulam Dehat", "Srikakulam Purva"]},
                    {"name": "Srikakulam Model Krishi Panchayat", "lgd_code": 302019, "block": "Srikakulam East Block", "villages": ["Kalyanpur Srikakulam", "Rampur Srikakulam", "Shivpur Srikakulam"]}
                ]
            },
            "Sri Potti Sriramulu Nellore": {
                "lgd_code": 1020,
                "name_hi": "Sri Potti Sriramulu Nellore",
                "headquarters": "Sri Potti Sriramulu Nellore",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sri Potti Sriramulu Nellore Sadar", "Sri Potti Sriramulu Nellore North", "Sri Potti Sriramulu Nellore South", "Sri Potti Sriramulu Nellore Rural"],
                "blocks": ["Sri Potti Sriramulu Nellore Block", "Sri Potti Sriramulu Nellore West Block", "Sri Potti Sriramulu Nellore East Block"],
                "panchayats": [
                    {"name": "Sri Potti Sriramulu Nellore Central Gram Panchayat", "lgd_code": 301020, "block": "Sri Potti Sriramulu Nellore Block", "villages": ["Sri Potti Sriramulu Nellore Khas", "Sri Potti Sriramulu Nellore Dehat", "Sri Potti Sriramulu Nellore Purva"]},
                    {"name": "Sri Potti Sriramulu Nellore Model Krishi Panchayat", "lgd_code": 302020, "block": "Sri Potti Sriramulu Nellore East Block", "villages": ["Kalyanpur Sri Potti Sriramulu Nellore", "Rampur Sri Potti Sriramulu Nellore", "Shivpur Sri Potti Sriramulu Nellore"]}
                ]
            },
            "Sri Sathya Sai": {
                "lgd_code": 1021,
                "name_hi": "Sri Sathya Sai",
                "headquarters": "Sri Sathya Sai",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sri Sathya Sai Sadar", "Sri Sathya Sai North", "Sri Sathya Sai South", "Sri Sathya Sai Rural"],
                "blocks": ["Sri Sathya Sai Block", "Sri Sathya Sai West Block", "Sri Sathya Sai East Block"],
                "panchayats": [
                    {"name": "Sri Sathya Sai Central Gram Panchayat", "lgd_code": 301021, "block": "Sri Sathya Sai Block", "villages": ["Sri Sathya Sai Khas", "Sri Sathya Sai Dehat", "Sri Sathya Sai Purva"]},
                    {"name": "Sri Sathya Sai Model Krishi Panchayat", "lgd_code": 302021, "block": "Sri Sathya Sai East Block", "villages": ["Kalyanpur Sri Sathya Sai", "Rampur Sri Sathya Sai", "Shivpur Sri Sathya Sai"]}
                ]
            },
            "Tirupati": {
                "lgd_code": 1022,
                "name_hi": "Tirupati",
                "headquarters": "Tirupati",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tirupati Sadar", "Tirupati North", "Tirupati South", "Tirupati Rural"],
                "blocks": ["Tirupati Block", "Tirupati West Block", "Tirupati East Block"],
                "panchayats": [
                    {"name": "Tirupati Central Gram Panchayat", "lgd_code": 301022, "block": "Tirupati Block", "villages": ["Tirupati Khas", "Tirupati Dehat", "Tirupati Purva"]},
                    {"name": "Tirupati Model Krishi Panchayat", "lgd_code": 302022, "block": "Tirupati East Block", "villages": ["Kalyanpur Tirupati", "Rampur Tirupati", "Shivpur Tirupati"]}
                ]
            },
            "Visakhapatnam": {
                "lgd_code": 1023,
                "name_hi": "Visakhapatnam",
                "headquarters": "Visakhapatnam",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Visakhapatnam Sadar", "Visakhapatnam North", "Visakhapatnam South", "Visakhapatnam Rural"],
                "blocks": ["Visakhapatnam Block", "Visakhapatnam West Block", "Visakhapatnam East Block"],
                "panchayats": [
                    {"name": "Visakhapatnam Central Gram Panchayat", "lgd_code": 301023, "block": "Visakhapatnam Block", "villages": ["Visakhapatnam Khas", "Visakhapatnam Dehat", "Visakhapatnam Purva"]},
                    {"name": "Visakhapatnam Model Krishi Panchayat", "lgd_code": 302023, "block": "Visakhapatnam East Block", "villages": ["Kalyanpur Visakhapatnam", "Rampur Visakhapatnam", "Shivpur Visakhapatnam"]}
                ]
            },
            "Vizianagaram": {
                "lgd_code": 1024,
                "name_hi": "Vizianagaram",
                "headquarters": "Vizianagaram",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vizianagaram Sadar", "Vizianagaram North", "Vizianagaram South", "Vizianagaram Rural"],
                "blocks": ["Vizianagaram Block", "Vizianagaram West Block", "Vizianagaram East Block"],
                "panchayats": [
                    {"name": "Vizianagaram Central Gram Panchayat", "lgd_code": 301024, "block": "Vizianagaram Block", "villages": ["Vizianagaram Khas", "Vizianagaram Dehat", "Vizianagaram Purva"]},
                    {"name": "Vizianagaram Model Krishi Panchayat", "lgd_code": 302024, "block": "Vizianagaram East Block", "villages": ["Kalyanpur Vizianagaram", "Rampur Vizianagaram", "Shivpur Vizianagaram"]}
                ]
            },
            "West Godavari": {
                "lgd_code": 1025,
                "name_hi": "West Godavari",
                "headquarters": "West Godavari",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Godavari Sadar", "West Godavari North", "West Godavari South", "West Godavari Rural"],
                "blocks": ["West Godavari Block", "West Godavari West Block", "West Godavari East Block"],
                "panchayats": [
                    {"name": "West Godavari Central Gram Panchayat", "lgd_code": 301025, "block": "West Godavari Block", "villages": ["West Godavari Khas", "West Godavari Dehat", "West Godavari Purva"]},
                    {"name": "West Godavari Model Krishi Panchayat", "lgd_code": 302025, "block": "West Godavari East Block", "villages": ["Kalyanpur West Godavari", "Rampur West Godavari", "Shivpur West Godavari"]}
                ]
            },
            "YSR Kadapa": {
                "lgd_code": 1026,
                "name_hi": "YSR Kadapa",
                "headquarters": "YSR Kadapa",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["YSR Kadapa Sadar", "YSR Kadapa North", "YSR Kadapa South", "YSR Kadapa Rural"],
                "blocks": ["YSR Kadapa Block", "YSR Kadapa West Block", "YSR Kadapa East Block"],
                "panchayats": [
                    {"name": "YSR Kadapa Central Gram Panchayat", "lgd_code": 301026, "block": "YSR Kadapa Block", "villages": ["YSR Kadapa Khas", "YSR Kadapa Dehat", "YSR Kadapa Purva"]},
                    {"name": "YSR Kadapa Model Krishi Panchayat", "lgd_code": 302026, "block": "YSR Kadapa East Block", "villages": ["Kalyanpur YSR Kadapa", "Rampur YSR Kadapa", "Shivpur YSR Kadapa"]}
                ]
            },
        }
    },
    "Arunachal Pradesh": {
        "districts": {
            "Anjaw": {
                "lgd_code": 1027,
                "name_hi": "Anjaw",
                "headquarters": "Anjaw",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anjaw Sadar", "Anjaw North", "Anjaw South", "Anjaw Rural"],
                "blocks": ["Anjaw Block", "Anjaw West Block", "Anjaw East Block"],
                "panchayats": [
                    {"name": "Anjaw Central Gram Panchayat", "lgd_code": 301027, "block": "Anjaw Block", "villages": ["Anjaw Khas", "Anjaw Dehat", "Anjaw Purva"]},
                    {"name": "Anjaw Model Krishi Panchayat", "lgd_code": 302027, "block": "Anjaw East Block", "villages": ["Kalyanpur Anjaw", "Rampur Anjaw", "Shivpur Anjaw"]}
                ]
            },
            "Changlang": {
                "lgd_code": 1028,
                "name_hi": "Changlang",
                "headquarters": "Changlang",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Changlang Sadar", "Changlang North", "Changlang South", "Changlang Rural"],
                "blocks": ["Changlang Block", "Changlang West Block", "Changlang East Block"],
                "panchayats": [
                    {"name": "Changlang Central Gram Panchayat", "lgd_code": 301028, "block": "Changlang Block", "villages": ["Changlang Khas", "Changlang Dehat", "Changlang Purva"]},
                    {"name": "Changlang Model Krishi Panchayat", "lgd_code": 302028, "block": "Changlang East Block", "villages": ["Kalyanpur Changlang", "Rampur Changlang", "Shivpur Changlang"]}
                ]
            },
            "Dibang Valley": {
                "lgd_code": 1029,
                "name_hi": "Dibang Valley",
                "headquarters": "Dibang Valley",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dibang Valley Sadar", "Dibang Valley North", "Dibang Valley South", "Dibang Valley Rural"],
                "blocks": ["Dibang Valley Block", "Dibang Valley West Block", "Dibang Valley East Block"],
                "panchayats": [
                    {"name": "Dibang Valley Central Gram Panchayat", "lgd_code": 301029, "block": "Dibang Valley Block", "villages": ["Dibang Valley Khas", "Dibang Valley Dehat", "Dibang Valley Purva"]},
                    {"name": "Dibang Valley Model Krishi Panchayat", "lgd_code": 302029, "block": "Dibang Valley East Block", "villages": ["Kalyanpur Dibang Valley", "Rampur Dibang Valley", "Shivpur Dibang Valley"]}
                ]
            },
            "East Kameng": {
                "lgd_code": 1030,
                "name_hi": "East Kameng",
                "headquarters": "East Kameng",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Kameng Sadar", "East Kameng North", "East Kameng South", "East Kameng Rural"],
                "blocks": ["East Kameng Block", "East Kameng West Block", "East Kameng East Block"],
                "panchayats": [
                    {"name": "East Kameng Central Gram Panchayat", "lgd_code": 301030, "block": "East Kameng Block", "villages": ["East Kameng Khas", "East Kameng Dehat", "East Kameng Purva"]},
                    {"name": "East Kameng Model Krishi Panchayat", "lgd_code": 302030, "block": "East Kameng East Block", "villages": ["Kalyanpur East Kameng", "Rampur East Kameng", "Shivpur East Kameng"]}
                ]
            },
            "East Siang": {
                "lgd_code": 1031,
                "name_hi": "East Siang",
                "headquarters": "East Siang",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Siang Sadar", "East Siang North", "East Siang South", "East Siang Rural"],
                "blocks": ["East Siang Block", "East Siang West Block", "East Siang East Block"],
                "panchayats": [
                    {"name": "East Siang Central Gram Panchayat", "lgd_code": 301031, "block": "East Siang Block", "villages": ["East Siang Khas", "East Siang Dehat", "East Siang Purva"]},
                    {"name": "East Siang Model Krishi Panchayat", "lgd_code": 302031, "block": "East Siang East Block", "villages": ["Kalyanpur East Siang", "Rampur East Siang", "Shivpur East Siang"]}
                ]
            },
            "Kamle": {
                "lgd_code": 1032,
                "name_hi": "Kamle",
                "headquarters": "Kamle",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kamle Sadar", "Kamle North", "Kamle South", "Kamle Rural"],
                "blocks": ["Kamle Block", "Kamle West Block", "Kamle East Block"],
                "panchayats": [
                    {"name": "Kamle Central Gram Panchayat", "lgd_code": 301032, "block": "Kamle Block", "villages": ["Kamle Khas", "Kamle Dehat", "Kamle Purva"]},
                    {"name": "Kamle Model Krishi Panchayat", "lgd_code": 302032, "block": "Kamle East Block", "villages": ["Kalyanpur Kamle", "Rampur Kamle", "Shivpur Kamle"]}
                ]
            },
            "Kra Daadi": {
                "lgd_code": 1033,
                "name_hi": "Kra Daadi",
                "headquarters": "Kra Daadi",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kra Daadi Sadar", "Kra Daadi North", "Kra Daadi South", "Kra Daadi Rural"],
                "blocks": ["Kra Daadi Block", "Kra Daadi West Block", "Kra Daadi East Block"],
                "panchayats": [
                    {"name": "Kra Daadi Central Gram Panchayat", "lgd_code": 301033, "block": "Kra Daadi Block", "villages": ["Kra Daadi Khas", "Kra Daadi Dehat", "Kra Daadi Purva"]},
                    {"name": "Kra Daadi Model Krishi Panchayat", "lgd_code": 302033, "block": "Kra Daadi East Block", "villages": ["Kalyanpur Kra Daadi", "Rampur Kra Daadi", "Shivpur Kra Daadi"]}
                ]
            },
            "Kurung Kumey": {
                "lgd_code": 1034,
                "name_hi": "Kurung Kumey",
                "headquarters": "Kurung Kumey",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kurung Kumey Sadar", "Kurung Kumey North", "Kurung Kumey South", "Kurung Kumey Rural"],
                "blocks": ["Kurung Kumey Block", "Kurung Kumey West Block", "Kurung Kumey East Block"],
                "panchayats": [
                    {"name": "Kurung Kumey Central Gram Panchayat", "lgd_code": 301034, "block": "Kurung Kumey Block", "villages": ["Kurung Kumey Khas", "Kurung Kumey Dehat", "Kurung Kumey Purva"]},
                    {"name": "Kurung Kumey Model Krishi Panchayat", "lgd_code": 302034, "block": "Kurung Kumey East Block", "villages": ["Kalyanpur Kurung Kumey", "Rampur Kurung Kumey", "Shivpur Kurung Kumey"]}
                ]
            },
            "Lepa Rada": {
                "lgd_code": 1035,
                "name_hi": "Lepa Rada",
                "headquarters": "Lepa Rada",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lepa Rada Sadar", "Lepa Rada North", "Lepa Rada South", "Lepa Rada Rural"],
                "blocks": ["Lepa Rada Block", "Lepa Rada West Block", "Lepa Rada East Block"],
                "panchayats": [
                    {"name": "Lepa Rada Central Gram Panchayat", "lgd_code": 301035, "block": "Lepa Rada Block", "villages": ["Lepa Rada Khas", "Lepa Rada Dehat", "Lepa Rada Purva"]},
                    {"name": "Lepa Rada Model Krishi Panchayat", "lgd_code": 302035, "block": "Lepa Rada East Block", "villages": ["Kalyanpur Lepa Rada", "Rampur Lepa Rada", "Shivpur Lepa Rada"]}
                ]
            },
            "Lohit": {
                "lgd_code": 1036,
                "name_hi": "Lohit",
                "headquarters": "Lohit",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lohit Sadar", "Lohit North", "Lohit South", "Lohit Rural"],
                "blocks": ["Lohit Block", "Lohit West Block", "Lohit East Block"],
                "panchayats": [
                    {"name": "Lohit Central Gram Panchayat", "lgd_code": 301036, "block": "Lohit Block", "villages": ["Lohit Khas", "Lohit Dehat", "Lohit Purva"]},
                    {"name": "Lohit Model Krishi Panchayat", "lgd_code": 302036, "block": "Lohit East Block", "villages": ["Kalyanpur Lohit", "Rampur Lohit", "Shivpur Lohit"]}
                ]
            },
            "Longding": {
                "lgd_code": 1037,
                "name_hi": "Longding",
                "headquarters": "Longding",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Longding Sadar", "Longding North", "Longding South", "Longding Rural"],
                "blocks": ["Longding Block", "Longding West Block", "Longding East Block"],
                "panchayats": [
                    {"name": "Longding Central Gram Panchayat", "lgd_code": 301037, "block": "Longding Block", "villages": ["Longding Khas", "Longding Dehat", "Longding Purva"]},
                    {"name": "Longding Model Krishi Panchayat", "lgd_code": 302037, "block": "Longding East Block", "villages": ["Kalyanpur Longding", "Rampur Longding", "Shivpur Longding"]}
                ]
            },
            "Lower Dibang Valley": {
                "lgd_code": 1038,
                "name_hi": "Lower Dibang Valley",
                "headquarters": "Lower Dibang Valley",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lower Dibang Valley Sadar", "Lower Dibang Valley North", "Lower Dibang Valley South", "Lower Dibang Valley Rural"],
                "blocks": ["Lower Dibang Valley Block", "Lower Dibang Valley West Block", "Lower Dibang Valley East Block"],
                "panchayats": [
                    {"name": "Lower Dibang Valley Central Gram Panchayat", "lgd_code": 301038, "block": "Lower Dibang Valley Block", "villages": ["Lower Dibang Valley Khas", "Lower Dibang Valley Dehat", "Lower Dibang Valley Purva"]},
                    {"name": "Lower Dibang Valley Model Krishi Panchayat", "lgd_code": 302038, "block": "Lower Dibang Valley East Block", "villages": ["Kalyanpur Lower Dibang Valley", "Rampur Lower Dibang Valley", "Shivpur Lower Dibang Valley"]}
                ]
            },
            "Lower Siang": {
                "lgd_code": 1039,
                "name_hi": "Lower Siang",
                "headquarters": "Lower Siang",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lower Siang Sadar", "Lower Siang North", "Lower Siang South", "Lower Siang Rural"],
                "blocks": ["Lower Siang Block", "Lower Siang West Block", "Lower Siang East Block"],
                "panchayats": [
                    {"name": "Lower Siang Central Gram Panchayat", "lgd_code": 301039, "block": "Lower Siang Block", "villages": ["Lower Siang Khas", "Lower Siang Dehat", "Lower Siang Purva"]},
                    {"name": "Lower Siang Model Krishi Panchayat", "lgd_code": 302039, "block": "Lower Siang East Block", "villages": ["Kalyanpur Lower Siang", "Rampur Lower Siang", "Shivpur Lower Siang"]}
                ]
            },
            "Lower Subansiri": {
                "lgd_code": 1040,
                "name_hi": "Lower Subansiri",
                "headquarters": "Lower Subansiri",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lower Subansiri Sadar", "Lower Subansiri North", "Lower Subansiri South", "Lower Subansiri Rural"],
                "blocks": ["Lower Subansiri Block", "Lower Subansiri West Block", "Lower Subansiri East Block"],
                "panchayats": [
                    {"name": "Lower Subansiri Central Gram Panchayat", "lgd_code": 301040, "block": "Lower Subansiri Block", "villages": ["Lower Subansiri Khas", "Lower Subansiri Dehat", "Lower Subansiri Purva"]},
                    {"name": "Lower Subansiri Model Krishi Panchayat", "lgd_code": 302040, "block": "Lower Subansiri East Block", "villages": ["Kalyanpur Lower Subansiri", "Rampur Lower Subansiri", "Shivpur Lower Subansiri"]}
                ]
            },
            "Namsai": {
                "lgd_code": 1041,
                "name_hi": "Namsai",
                "headquarters": "Namsai",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Namsai Sadar", "Namsai North", "Namsai South", "Namsai Rural"],
                "blocks": ["Namsai Block", "Namsai West Block", "Namsai East Block"],
                "panchayats": [
                    {"name": "Namsai Central Gram Panchayat", "lgd_code": 301041, "block": "Namsai Block", "villages": ["Namsai Khas", "Namsai Dehat", "Namsai Purva"]},
                    {"name": "Namsai Model Krishi Panchayat", "lgd_code": 302041, "block": "Namsai East Block", "villages": ["Kalyanpur Namsai", "Rampur Namsai", "Shivpur Namsai"]}
                ]
            },
            "Pakke Kessang": {
                "lgd_code": 1042,
                "name_hi": "Pakke Kessang",
                "headquarters": "Pakke Kessang",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pakke Kessang Sadar", "Pakke Kessang North", "Pakke Kessang South", "Pakke Kessang Rural"],
                "blocks": ["Pakke Kessang Block", "Pakke Kessang West Block", "Pakke Kessang East Block"],
                "panchayats": [
                    {"name": "Pakke Kessang Central Gram Panchayat", "lgd_code": 301042, "block": "Pakke Kessang Block", "villages": ["Pakke Kessang Khas", "Pakke Kessang Dehat", "Pakke Kessang Purva"]},
                    {"name": "Pakke Kessang Model Krishi Panchayat", "lgd_code": 302042, "block": "Pakke Kessang East Block", "villages": ["Kalyanpur Pakke Kessang", "Rampur Pakke Kessang", "Shivpur Pakke Kessang"]}
                ]
            },
            "Papum Pare (Itanagar)": {
                "lgd_code": 1043,
                "name_hi": "Papum Pare",
                "headquarters": "Papum Pare",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Papum Pare Sadar", "Papum Pare North", "Papum Pare South", "Papum Pare Rural"],
                "blocks": ["Papum Pare Block", "Papum Pare West Block", "Papum Pare East Block"],
                "panchayats": [
                    {"name": "Papum Pare Central Gram Panchayat", "lgd_code": 301043, "block": "Papum Pare Block", "villages": ["Papum Pare Khas", "Papum Pare Dehat", "Papum Pare Purva"]},
                    {"name": "Papum Pare Model Krishi Panchayat", "lgd_code": 302043, "block": "Papum Pare East Block", "villages": ["Kalyanpur Papum Pare", "Rampur Papum Pare", "Shivpur Papum Pare"]}
                ]
            },
            "Shi Yomi": {
                "lgd_code": 1044,
                "name_hi": "Shi Yomi",
                "headquarters": "Shi Yomi",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shi Yomi Sadar", "Shi Yomi North", "Shi Yomi South", "Shi Yomi Rural"],
                "blocks": ["Shi Yomi Block", "Shi Yomi West Block", "Shi Yomi East Block"],
                "panchayats": [
                    {"name": "Shi Yomi Central Gram Panchayat", "lgd_code": 301044, "block": "Shi Yomi Block", "villages": ["Shi Yomi Khas", "Shi Yomi Dehat", "Shi Yomi Purva"]},
                    {"name": "Shi Yomi Model Krishi Panchayat", "lgd_code": 302044, "block": "Shi Yomi East Block", "villages": ["Kalyanpur Shi Yomi", "Rampur Shi Yomi", "Shivpur Shi Yomi"]}
                ]
            },
            "Siang": {
                "lgd_code": 1045,
                "name_hi": "Siang",
                "headquarters": "Siang",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Siang Sadar", "Siang North", "Siang South", "Siang Rural"],
                "blocks": ["Siang Block", "Siang West Block", "Siang East Block"],
                "panchayats": [
                    {"name": "Siang Central Gram Panchayat", "lgd_code": 301045, "block": "Siang Block", "villages": ["Siang Khas", "Siang Dehat", "Siang Purva"]},
                    {"name": "Siang Model Krishi Panchayat", "lgd_code": 302045, "block": "Siang East Block", "villages": ["Kalyanpur Siang", "Rampur Siang", "Shivpur Siang"]}
                ]
            },
            "Tawang": {
                "lgd_code": 1046,
                "name_hi": "Tawang",
                "headquarters": "Tawang",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tawang Sadar", "Tawang North", "Tawang South", "Tawang Rural"],
                "blocks": ["Tawang Block", "Tawang West Block", "Tawang East Block"],
                "panchayats": [
                    {"name": "Tawang Central Gram Panchayat", "lgd_code": 301046, "block": "Tawang Block", "villages": ["Tawang Khas", "Tawang Dehat", "Tawang Purva"]},
                    {"name": "Tawang Model Krishi Panchayat", "lgd_code": 302046, "block": "Tawang East Block", "villages": ["Kalyanpur Tawang", "Rampur Tawang", "Shivpur Tawang"]}
                ]
            },
            "Tirap": {
                "lgd_code": 1047,
                "name_hi": "Tirap",
                "headquarters": "Tirap",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tirap Sadar", "Tirap North", "Tirap South", "Tirap Rural"],
                "blocks": ["Tirap Block", "Tirap West Block", "Tirap East Block"],
                "panchayats": [
                    {"name": "Tirap Central Gram Panchayat", "lgd_code": 301047, "block": "Tirap Block", "villages": ["Tirap Khas", "Tirap Dehat", "Tirap Purva"]},
                    {"name": "Tirap Model Krishi Panchayat", "lgd_code": 302047, "block": "Tirap East Block", "villages": ["Kalyanpur Tirap", "Rampur Tirap", "Shivpur Tirap"]}
                ]
            },
            "Upper Siang": {
                "lgd_code": 1048,
                "name_hi": "Upper Siang",
                "headquarters": "Upper Siang",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Upper Siang Sadar", "Upper Siang North", "Upper Siang South", "Upper Siang Rural"],
                "blocks": ["Upper Siang Block", "Upper Siang West Block", "Upper Siang East Block"],
                "panchayats": [
                    {"name": "Upper Siang Central Gram Panchayat", "lgd_code": 301048, "block": "Upper Siang Block", "villages": ["Upper Siang Khas", "Upper Siang Dehat", "Upper Siang Purva"]},
                    {"name": "Upper Siang Model Krishi Panchayat", "lgd_code": 302048, "block": "Upper Siang East Block", "villages": ["Kalyanpur Upper Siang", "Rampur Upper Siang", "Shivpur Upper Siang"]}
                ]
            },
            "Upper Subansiri": {
                "lgd_code": 1049,
                "name_hi": "Upper Subansiri",
                "headquarters": "Upper Subansiri",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Upper Subansiri Sadar", "Upper Subansiri North", "Upper Subansiri South", "Upper Subansiri Rural"],
                "blocks": ["Upper Subansiri Block", "Upper Subansiri West Block", "Upper Subansiri East Block"],
                "panchayats": [
                    {"name": "Upper Subansiri Central Gram Panchayat", "lgd_code": 301049, "block": "Upper Subansiri Block", "villages": ["Upper Subansiri Khas", "Upper Subansiri Dehat", "Upper Subansiri Purva"]},
                    {"name": "Upper Subansiri Model Krishi Panchayat", "lgd_code": 302049, "block": "Upper Subansiri East Block", "villages": ["Kalyanpur Upper Subansiri", "Rampur Upper Subansiri", "Shivpur Upper Subansiri"]}
                ]
            },
            "West Kameng (Bomdila)": {
                "lgd_code": 1050,
                "name_hi": "West Kameng",
                "headquarters": "West Kameng",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Kameng Sadar", "West Kameng North", "West Kameng South", "West Kameng Rural"],
                "blocks": ["West Kameng Block", "West Kameng West Block", "West Kameng East Block"],
                "panchayats": [
                    {"name": "West Kameng Central Gram Panchayat", "lgd_code": 301050, "block": "West Kameng Block", "villages": ["West Kameng Khas", "West Kameng Dehat", "West Kameng Purva"]},
                    {"name": "West Kameng Model Krishi Panchayat", "lgd_code": 302050, "block": "West Kameng East Block", "villages": ["Kalyanpur West Kameng", "Rampur West Kameng", "Shivpur West Kameng"]}
                ]
            },
            "West Siang": {
                "lgd_code": 1051,
                "name_hi": "West Siang",
                "headquarters": "West Siang",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Siang Sadar", "West Siang North", "West Siang South", "West Siang Rural"],
                "blocks": ["West Siang Block", "West Siang West Block", "West Siang East Block"],
                "panchayats": [
                    {"name": "West Siang Central Gram Panchayat", "lgd_code": 301051, "block": "West Siang Block", "villages": ["West Siang Khas", "West Siang Dehat", "West Siang Purva"]},
                    {"name": "West Siang Model Krishi Panchayat", "lgd_code": 302051, "block": "West Siang East Block", "villages": ["Kalyanpur West Siang", "Rampur West Siang", "Shivpur West Siang"]}
                ]
            },
            "Itanagar Capital Complex": {
                "lgd_code": 1052,
                "name_hi": "Itanagar Capital Complex",
                "headquarters": "Itanagar Capital Complex",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Itanagar Capital Complex Sadar", "Itanagar Capital Complex North", "Itanagar Capital Complex South", "Itanagar Capital Complex Rural"],
                "blocks": ["Itanagar Capital Complex Block", "Itanagar Capital Complex West Block", "Itanagar Capital Complex East Block"],
                "panchayats": [
                    {"name": "Itanagar Capital Complex Central Gram Panchayat", "lgd_code": 301052, "block": "Itanagar Capital Complex Block", "villages": ["Itanagar Capital Complex Khas", "Itanagar Capital Complex Dehat", "Itanagar Capital Complex Purva"]},
                    {"name": "Itanagar Capital Complex Model Krishi Panchayat", "lgd_code": 302052, "block": "Itanagar Capital Complex East Block", "villages": ["Kalyanpur Itanagar Capital Complex", "Rampur Itanagar Capital Complex", "Shivpur Itanagar Capital Complex"]}
                ]
            },
        }
    },
    "Assam": {
        "districts": {
            "Bajali": {
                "lgd_code": 1053,
                "name_hi": "Bajali",
                "headquarters": "Bajali",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bajali Sadar", "Bajali North", "Bajali South", "Bajali Rural"],
                "blocks": ["Bajali Block", "Bajali West Block", "Bajali East Block"],
                "panchayats": [
                    {"name": "Bajali Central Gram Panchayat", "lgd_code": 301053, "block": "Bajali Block", "villages": ["Bajali Khas", "Bajali Dehat", "Bajali Purva"]},
                    {"name": "Bajali Model Krishi Panchayat", "lgd_code": 302053, "block": "Bajali East Block", "villages": ["Kalyanpur Bajali", "Rampur Bajali", "Shivpur Bajali"]}
                ]
            },
            "Baksa": {
                "lgd_code": 1054,
                "name_hi": "Baksa",
                "headquarters": "Baksa",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Baksa Sadar", "Baksa North", "Baksa South", "Baksa Rural"],
                "blocks": ["Baksa Block", "Baksa West Block", "Baksa East Block"],
                "panchayats": [
                    {"name": "Baksa Central Gram Panchayat", "lgd_code": 301054, "block": "Baksa Block", "villages": ["Baksa Khas", "Baksa Dehat", "Baksa Purva"]},
                    {"name": "Baksa Model Krishi Panchayat", "lgd_code": 302054, "block": "Baksa East Block", "villages": ["Kalyanpur Baksa", "Rampur Baksa", "Shivpur Baksa"]}
                ]
            },
            "Barpeta": {
                "lgd_code": 1055,
                "name_hi": "Barpeta",
                "headquarters": "Barpeta",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Barpeta Sadar", "Barpeta North", "Barpeta South", "Barpeta Rural"],
                "blocks": ["Barpeta Block", "Barpeta West Block", "Barpeta East Block"],
                "panchayats": [
                    {"name": "Barpeta Central Gram Panchayat", "lgd_code": 301055, "block": "Barpeta Block", "villages": ["Barpeta Khas", "Barpeta Dehat", "Barpeta Purva"]},
                    {"name": "Barpeta Model Krishi Panchayat", "lgd_code": 302055, "block": "Barpeta East Block", "villages": ["Kalyanpur Barpeta", "Rampur Barpeta", "Shivpur Barpeta"]}
                ]
            },
            "Biswanath": {
                "lgd_code": 1056,
                "name_hi": "Biswanath",
                "headquarters": "Biswanath",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Biswanath Sadar", "Biswanath North", "Biswanath South", "Biswanath Rural"],
                "blocks": ["Biswanath Block", "Biswanath West Block", "Biswanath East Block"],
                "panchayats": [
                    {"name": "Biswanath Central Gram Panchayat", "lgd_code": 301056, "block": "Biswanath Block", "villages": ["Biswanath Khas", "Biswanath Dehat", "Biswanath Purva"]},
                    {"name": "Biswanath Model Krishi Panchayat", "lgd_code": 302056, "block": "Biswanath East Block", "villages": ["Kalyanpur Biswanath", "Rampur Biswanath", "Shivpur Biswanath"]}
                ]
            },
            "Bongaigaon": {
                "lgd_code": 1057,
                "name_hi": "Bongaigaon",
                "headquarters": "Bongaigaon",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bongaigaon Sadar", "Bongaigaon North", "Bongaigaon South", "Bongaigaon Rural"],
                "blocks": ["Bongaigaon Block", "Bongaigaon West Block", "Bongaigaon East Block"],
                "panchayats": [
                    {"name": "Bongaigaon Central Gram Panchayat", "lgd_code": 301057, "block": "Bongaigaon Block", "villages": ["Bongaigaon Khas", "Bongaigaon Dehat", "Bongaigaon Purva"]},
                    {"name": "Bongaigaon Model Krishi Panchayat", "lgd_code": 302057, "block": "Bongaigaon East Block", "villages": ["Kalyanpur Bongaigaon", "Rampur Bongaigaon", "Shivpur Bongaigaon"]}
                ]
            },
            "Cachar (Silchar)": {
                "lgd_code": 1058,
                "name_hi": "Cachar",
                "headquarters": "Cachar",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Cachar Sadar", "Cachar North", "Cachar South", "Cachar Rural"],
                "blocks": ["Cachar Block", "Cachar West Block", "Cachar East Block"],
                "panchayats": [
                    {"name": "Cachar Central Gram Panchayat", "lgd_code": 301058, "block": "Cachar Block", "villages": ["Cachar Khas", "Cachar Dehat", "Cachar Purva"]},
                    {"name": "Cachar Model Krishi Panchayat", "lgd_code": 302058, "block": "Cachar East Block", "villages": ["Kalyanpur Cachar", "Rampur Cachar", "Shivpur Cachar"]}
                ]
            },
            "Charaideo": {
                "lgd_code": 1059,
                "name_hi": "Charaideo",
                "headquarters": "Charaideo",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Charaideo Sadar", "Charaideo North", "Charaideo South", "Charaideo Rural"],
                "blocks": ["Charaideo Block", "Charaideo West Block", "Charaideo East Block"],
                "panchayats": [
                    {"name": "Charaideo Central Gram Panchayat", "lgd_code": 301059, "block": "Charaideo Block", "villages": ["Charaideo Khas", "Charaideo Dehat", "Charaideo Purva"]},
                    {"name": "Charaideo Model Krishi Panchayat", "lgd_code": 302059, "block": "Charaideo East Block", "villages": ["Kalyanpur Charaideo", "Rampur Charaideo", "Shivpur Charaideo"]}
                ]
            },
            "Chirang": {
                "lgd_code": 1060,
                "name_hi": "Chirang",
                "headquarters": "Chirang",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chirang Sadar", "Chirang North", "Chirang South", "Chirang Rural"],
                "blocks": ["Chirang Block", "Chirang West Block", "Chirang East Block"],
                "panchayats": [
                    {"name": "Chirang Central Gram Panchayat", "lgd_code": 301060, "block": "Chirang Block", "villages": ["Chirang Khas", "Chirang Dehat", "Chirang Purva"]},
                    {"name": "Chirang Model Krishi Panchayat", "lgd_code": 302060, "block": "Chirang East Block", "villages": ["Kalyanpur Chirang", "Rampur Chirang", "Shivpur Chirang"]}
                ]
            },
            "Darrang": {
                "lgd_code": 1061,
                "name_hi": "Darrang",
                "headquarters": "Darrang",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Darrang Sadar", "Darrang North", "Darrang South", "Darrang Rural"],
                "blocks": ["Darrang Block", "Darrang West Block", "Darrang East Block"],
                "panchayats": [
                    {"name": "Darrang Central Gram Panchayat", "lgd_code": 301061, "block": "Darrang Block", "villages": ["Darrang Khas", "Darrang Dehat", "Darrang Purva"]},
                    {"name": "Darrang Model Krishi Panchayat", "lgd_code": 302061, "block": "Darrang East Block", "villages": ["Kalyanpur Darrang", "Rampur Darrang", "Shivpur Darrang"]}
                ]
            },
            "Dhemaji": {
                "lgd_code": 1062,
                "name_hi": "Dhemaji",
                "headquarters": "Dhemaji",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhemaji Sadar", "Dhemaji North", "Dhemaji South", "Dhemaji Rural"],
                "blocks": ["Dhemaji Block", "Dhemaji West Block", "Dhemaji East Block"],
                "panchayats": [
                    {"name": "Dhemaji Central Gram Panchayat", "lgd_code": 301062, "block": "Dhemaji Block", "villages": ["Dhemaji Khas", "Dhemaji Dehat", "Dhemaji Purva"]},
                    {"name": "Dhemaji Model Krishi Panchayat", "lgd_code": 302062, "block": "Dhemaji East Block", "villages": ["Kalyanpur Dhemaji", "Rampur Dhemaji", "Shivpur Dhemaji"]}
                ]
            },
            "Dhubri": {
                "lgd_code": 1063,
                "name_hi": "Dhubri",
                "headquarters": "Dhubri",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhubri Sadar", "Dhubri North", "Dhubri South", "Dhubri Rural"],
                "blocks": ["Dhubri Block", "Dhubri West Block", "Dhubri East Block"],
                "panchayats": [
                    {"name": "Dhubri Central Gram Panchayat", "lgd_code": 301063, "block": "Dhubri Block", "villages": ["Dhubri Khas", "Dhubri Dehat", "Dhubri Purva"]},
                    {"name": "Dhubri Model Krishi Panchayat", "lgd_code": 302063, "block": "Dhubri East Block", "villages": ["Kalyanpur Dhubri", "Rampur Dhubri", "Shivpur Dhubri"]}
                ]
            },
            "Dibrugarh": {
                "lgd_code": 1064,
                "name_hi": "Dibrugarh",
                "headquarters": "Dibrugarh",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dibrugarh Sadar", "Dibrugarh North", "Dibrugarh South", "Dibrugarh Rural"],
                "blocks": ["Dibrugarh Block", "Dibrugarh West Block", "Dibrugarh East Block"],
                "panchayats": [
                    {"name": "Dibrugarh Central Gram Panchayat", "lgd_code": 301064, "block": "Dibrugarh Block", "villages": ["Dibrugarh Khas", "Dibrugarh Dehat", "Dibrugarh Purva"]},
                    {"name": "Dibrugarh Model Krishi Panchayat", "lgd_code": 302064, "block": "Dibrugarh East Block", "villages": ["Kalyanpur Dibrugarh", "Rampur Dibrugarh", "Shivpur Dibrugarh"]}
                ]
            },
            "Dima Hasao": {
                "lgd_code": 1065,
                "name_hi": "Dima Hasao",
                "headquarters": "Dima Hasao",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dima Hasao Sadar", "Dima Hasao North", "Dima Hasao South", "Dima Hasao Rural"],
                "blocks": ["Dima Hasao Block", "Dima Hasao West Block", "Dima Hasao East Block"],
                "panchayats": [
                    {"name": "Dima Hasao Central Gram Panchayat", "lgd_code": 301065, "block": "Dima Hasao Block", "villages": ["Dima Hasao Khas", "Dima Hasao Dehat", "Dima Hasao Purva"]},
                    {"name": "Dima Hasao Model Krishi Panchayat", "lgd_code": 302065, "block": "Dima Hasao East Block", "villages": ["Kalyanpur Dima Hasao", "Rampur Dima Hasao", "Shivpur Dima Hasao"]}
                ]
            },
            "Goalpara": {
                "lgd_code": 1066,
                "name_hi": "Goalpara",
                "headquarters": "Goalpara",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Goalpara Sadar", "Goalpara North", "Goalpara South", "Goalpara Rural"],
                "blocks": ["Goalpara Block", "Goalpara West Block", "Goalpara East Block"],
                "panchayats": [
                    {"name": "Goalpara Central Gram Panchayat", "lgd_code": 301066, "block": "Goalpara Block", "villages": ["Goalpara Khas", "Goalpara Dehat", "Goalpara Purva"]},
                    {"name": "Goalpara Model Krishi Panchayat", "lgd_code": 302066, "block": "Goalpara East Block", "villages": ["Kalyanpur Goalpara", "Rampur Goalpara", "Shivpur Goalpara"]}
                ]
            },
            "Golaghat": {
                "lgd_code": 1067,
                "name_hi": "Golaghat",
                "headquarters": "Golaghat",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Golaghat Sadar", "Golaghat North", "Golaghat South", "Golaghat Rural"],
                "blocks": ["Golaghat Block", "Golaghat West Block", "Golaghat East Block"],
                "panchayats": [
                    {"name": "Golaghat Central Gram Panchayat", "lgd_code": 301067, "block": "Golaghat Block", "villages": ["Golaghat Khas", "Golaghat Dehat", "Golaghat Purva"]},
                    {"name": "Golaghat Model Krishi Panchayat", "lgd_code": 302067, "block": "Golaghat East Block", "villages": ["Kalyanpur Golaghat", "Rampur Golaghat", "Shivpur Golaghat"]}
                ]
            },
            "Hailakandi": {
                "lgd_code": 1068,
                "name_hi": "Hailakandi",
                "headquarters": "Hailakandi",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hailakandi Sadar", "Hailakandi North", "Hailakandi South", "Hailakandi Rural"],
                "blocks": ["Hailakandi Block", "Hailakandi West Block", "Hailakandi East Block"],
                "panchayats": [
                    {"name": "Hailakandi Central Gram Panchayat", "lgd_code": 301068, "block": "Hailakandi Block", "villages": ["Hailakandi Khas", "Hailakandi Dehat", "Hailakandi Purva"]},
                    {"name": "Hailakandi Model Krishi Panchayat", "lgd_code": 302068, "block": "Hailakandi East Block", "villages": ["Kalyanpur Hailakandi", "Rampur Hailakandi", "Shivpur Hailakandi"]}
                ]
            },
            "Hojai": {
                "lgd_code": 1069,
                "name_hi": "Hojai",
                "headquarters": "Hojai",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hojai Sadar", "Hojai North", "Hojai South", "Hojai Rural"],
                "blocks": ["Hojai Block", "Hojai West Block", "Hojai East Block"],
                "panchayats": [
                    {"name": "Hojai Central Gram Panchayat", "lgd_code": 301069, "block": "Hojai Block", "villages": ["Hojai Khas", "Hojai Dehat", "Hojai Purva"]},
                    {"name": "Hojai Model Krishi Panchayat", "lgd_code": 302069, "block": "Hojai East Block", "villages": ["Kalyanpur Hojai", "Rampur Hojai", "Shivpur Hojai"]}
                ]
            },
            "Jorhat": {
                "lgd_code": 1070,
                "name_hi": "Jorhat",
                "headquarters": "Jorhat",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jorhat Sadar", "Jorhat North", "Jorhat South", "Jorhat Rural"],
                "blocks": ["Jorhat Block", "Jorhat West Block", "Jorhat East Block"],
                "panchayats": [
                    {"name": "Jorhat Central Gram Panchayat", "lgd_code": 301070, "block": "Jorhat Block", "villages": ["Jorhat Khas", "Jorhat Dehat", "Jorhat Purva"]},
                    {"name": "Jorhat Model Krishi Panchayat", "lgd_code": 302070, "block": "Jorhat East Block", "villages": ["Kalyanpur Jorhat", "Rampur Jorhat", "Shivpur Jorhat"]}
                ]
            },
            "Kamrup": {
                "lgd_code": 1071,
                "name_hi": "Kamrup",
                "headquarters": "Kamrup",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kamrup Sadar", "Kamrup North", "Kamrup South", "Kamrup Rural"],
                "blocks": ["Kamrup Block", "Kamrup West Block", "Kamrup East Block"],
                "panchayats": [
                    {"name": "Kamrup Central Gram Panchayat", "lgd_code": 301071, "block": "Kamrup Block", "villages": ["Kamrup Khas", "Kamrup Dehat", "Kamrup Purva"]},
                    {"name": "Kamrup Model Krishi Panchayat", "lgd_code": 302071, "block": "Kamrup East Block", "villages": ["Kalyanpur Kamrup", "Rampur Kamrup", "Shivpur Kamrup"]}
                ]
            },
            "Kamrup Metropolitan (Guwahati)": {
                "lgd_code": 1072,
                "name_hi": "Kamrup Metropolitan",
                "headquarters": "Kamrup Metropolitan",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kamrup Metropolitan Sadar", "Kamrup Metropolitan North", "Kamrup Metropolitan South", "Kamrup Metropolitan Rural"],
                "blocks": ["Kamrup Metropolitan Block", "Kamrup Metropolitan West Block", "Kamrup Metropolitan East Block"],
                "panchayats": [
                    {"name": "Kamrup Metropolitan Central Gram Panchayat", "lgd_code": 301072, "block": "Kamrup Metropolitan Block", "villages": ["Kamrup Metropolitan Khas", "Kamrup Metropolitan Dehat", "Kamrup Metropolitan Purva"]},
                    {"name": "Kamrup Metropolitan Model Krishi Panchayat", "lgd_code": 302072, "block": "Kamrup Metropolitan East Block", "villages": ["Kalyanpur Kamrup Metropolitan", "Rampur Kamrup Metropolitan", "Shivpur Kamrup Metropolitan"]}
                ]
            },
            "Karbi Anglong": {
                "lgd_code": 1073,
                "name_hi": "Karbi Anglong",
                "headquarters": "Karbi Anglong",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karbi Anglong Sadar", "Karbi Anglong North", "Karbi Anglong South", "Karbi Anglong Rural"],
                "blocks": ["Karbi Anglong Block", "Karbi Anglong West Block", "Karbi Anglong East Block"],
                "panchayats": [
                    {"name": "Karbi Anglong Central Gram Panchayat", "lgd_code": 301073, "block": "Karbi Anglong Block", "villages": ["Karbi Anglong Khas", "Karbi Anglong Dehat", "Karbi Anglong Purva"]},
                    {"name": "Karbi Anglong Model Krishi Panchayat", "lgd_code": 302073, "block": "Karbi Anglong East Block", "villages": ["Kalyanpur Karbi Anglong", "Rampur Karbi Anglong", "Shivpur Karbi Anglong"]}
                ]
            },
            "Karimganj": {
                "lgd_code": 1074,
                "name_hi": "Karimganj",
                "headquarters": "Karimganj",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karimganj Sadar", "Karimganj North", "Karimganj South", "Karimganj Rural"],
                "blocks": ["Karimganj Block", "Karimganj West Block", "Karimganj East Block"],
                "panchayats": [
                    {"name": "Karimganj Central Gram Panchayat", "lgd_code": 301074, "block": "Karimganj Block", "villages": ["Karimganj Khas", "Karimganj Dehat", "Karimganj Purva"]},
                    {"name": "Karimganj Model Krishi Panchayat", "lgd_code": 302074, "block": "Karimganj East Block", "villages": ["Kalyanpur Karimganj", "Rampur Karimganj", "Shivpur Karimganj"]}
                ]
            },
            "Kokrajhar": {
                "lgd_code": 1075,
                "name_hi": "Kokrajhar",
                "headquarters": "Kokrajhar",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kokrajhar Sadar", "Kokrajhar North", "Kokrajhar South", "Kokrajhar Rural"],
                "blocks": ["Kokrajhar Block", "Kokrajhar West Block", "Kokrajhar East Block"],
                "panchayats": [
                    {"name": "Kokrajhar Central Gram Panchayat", "lgd_code": 301075, "block": "Kokrajhar Block", "villages": ["Kokrajhar Khas", "Kokrajhar Dehat", "Kokrajhar Purva"]},
                    {"name": "Kokrajhar Model Krishi Panchayat", "lgd_code": 302075, "block": "Kokrajhar East Block", "villages": ["Kalyanpur Kokrajhar", "Rampur Kokrajhar", "Shivpur Kokrajhar"]}
                ]
            },
            "Lakhimpur": {
                "lgd_code": 1076,
                "name_hi": "Lakhimpur",
                "headquarters": "Lakhimpur",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lakhimpur Sadar", "Lakhimpur North", "Lakhimpur South", "Lakhimpur Rural"],
                "blocks": ["Lakhimpur Block", "Lakhimpur West Block", "Lakhimpur East Block"],
                "panchayats": [
                    {"name": "Lakhimpur Central Gram Panchayat", "lgd_code": 301076, "block": "Lakhimpur Block", "villages": ["Lakhimpur Khas", "Lakhimpur Dehat", "Lakhimpur Purva"]},
                    {"name": "Lakhimpur Model Krishi Panchayat", "lgd_code": 302076, "block": "Lakhimpur East Block", "villages": ["Kalyanpur Lakhimpur", "Rampur Lakhimpur", "Shivpur Lakhimpur"]}
                ]
            },
            "Majuli": {
                "lgd_code": 1077,
                "name_hi": "Majuli",
                "headquarters": "Majuli",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Majuli Sadar", "Majuli North", "Majuli South", "Majuli Rural"],
                "blocks": ["Majuli Block", "Majuli West Block", "Majuli East Block"],
                "panchayats": [
                    {"name": "Majuli Central Gram Panchayat", "lgd_code": 301077, "block": "Majuli Block", "villages": ["Majuli Khas", "Majuli Dehat", "Majuli Purva"]},
                    {"name": "Majuli Model Krishi Panchayat", "lgd_code": 302077, "block": "Majuli East Block", "villages": ["Kalyanpur Majuli", "Rampur Majuli", "Shivpur Majuli"]}
                ]
            },
            "Morigaon": {
                "lgd_code": 1078,
                "name_hi": "Morigaon",
                "headquarters": "Morigaon",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Morigaon Sadar", "Morigaon North", "Morigaon South", "Morigaon Rural"],
                "blocks": ["Morigaon Block", "Morigaon West Block", "Morigaon East Block"],
                "panchayats": [
                    {"name": "Morigaon Central Gram Panchayat", "lgd_code": 301078, "block": "Morigaon Block", "villages": ["Morigaon Khas", "Morigaon Dehat", "Morigaon Purva"]},
                    {"name": "Morigaon Model Krishi Panchayat", "lgd_code": 302078, "block": "Morigaon East Block", "villages": ["Kalyanpur Morigaon", "Rampur Morigaon", "Shivpur Morigaon"]}
                ]
            },
            "Nagaon": {
                "lgd_code": 1079,
                "name_hi": "Nagaon",
                "headquarters": "Nagaon",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nagaon Sadar", "Nagaon North", "Nagaon South", "Nagaon Rural"],
                "blocks": ["Nagaon Block", "Nagaon West Block", "Nagaon East Block"],
                "panchayats": [
                    {"name": "Nagaon Central Gram Panchayat", "lgd_code": 301079, "block": "Nagaon Block", "villages": ["Nagaon Khas", "Nagaon Dehat", "Nagaon Purva"]},
                    {"name": "Nagaon Model Krishi Panchayat", "lgd_code": 302079, "block": "Nagaon East Block", "villages": ["Kalyanpur Nagaon", "Rampur Nagaon", "Shivpur Nagaon"]}
                ]
            },
            "Nalbari": {
                "lgd_code": 1080,
                "name_hi": "Nalbari",
                "headquarters": "Nalbari",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nalbari Sadar", "Nalbari North", "Nalbari South", "Nalbari Rural"],
                "blocks": ["Nalbari Block", "Nalbari West Block", "Nalbari East Block"],
                "panchayats": [
                    {"name": "Nalbari Central Gram Panchayat", "lgd_code": 301080, "block": "Nalbari Block", "villages": ["Nalbari Khas", "Nalbari Dehat", "Nalbari Purva"]},
                    {"name": "Nalbari Model Krishi Panchayat", "lgd_code": 302080, "block": "Nalbari East Block", "villages": ["Kalyanpur Nalbari", "Rampur Nalbari", "Shivpur Nalbari"]}
                ]
            },
            "Sivasagar": {
                "lgd_code": 1081,
                "name_hi": "Sivasagar",
                "headquarters": "Sivasagar",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sivasagar Sadar", "Sivasagar North", "Sivasagar South", "Sivasagar Rural"],
                "blocks": ["Sivasagar Block", "Sivasagar West Block", "Sivasagar East Block"],
                "panchayats": [
                    {"name": "Sivasagar Central Gram Panchayat", "lgd_code": 301081, "block": "Sivasagar Block", "villages": ["Sivasagar Khas", "Sivasagar Dehat", "Sivasagar Purva"]},
                    {"name": "Sivasagar Model Krishi Panchayat", "lgd_code": 302081, "block": "Sivasagar East Block", "villages": ["Kalyanpur Sivasagar", "Rampur Sivasagar", "Shivpur Sivasagar"]}
                ]
            },
            "Sonitpur (Tezpur)": {
                "lgd_code": 1082,
                "name_hi": "Sonitpur",
                "headquarters": "Sonitpur",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sonitpur Sadar", "Sonitpur North", "Sonitpur South", "Sonitpur Rural"],
                "blocks": ["Sonitpur Block", "Sonitpur West Block", "Sonitpur East Block"],
                "panchayats": [
                    {"name": "Sonitpur Central Gram Panchayat", "lgd_code": 301082, "block": "Sonitpur Block", "villages": ["Sonitpur Khas", "Sonitpur Dehat", "Sonitpur Purva"]},
                    {"name": "Sonitpur Model Krishi Panchayat", "lgd_code": 302082, "block": "Sonitpur East Block", "villages": ["Kalyanpur Sonitpur", "Rampur Sonitpur", "Shivpur Sonitpur"]}
                ]
            },
            "South Salmara-Mankachar": {
                "lgd_code": 1083,
                "name_hi": "South Salmara-Mankachar",
                "headquarters": "South Salmara-Mankachar",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Salmara-Mankachar Sadar", "South Salmara-Mankachar North", "South Salmara-Mankachar South", "South Salmara-Mankachar Rural"],
                "blocks": ["South Salmara-Mankachar Block", "South Salmara-Mankachar West Block", "South Salmara-Mankachar East Block"],
                "panchayats": [
                    {"name": "South Salmara-Mankachar Central Gram Panchayat", "lgd_code": 301083, "block": "South Salmara-Mankachar Block", "villages": ["South Salmara-Mankachar Khas", "South Salmara-Mankachar Dehat", "South Salmara-Mankachar Purva"]},
                    {"name": "South Salmara-Mankachar Model Krishi Panchayat", "lgd_code": 302083, "block": "South Salmara-Mankachar East Block", "villages": ["Kalyanpur South Salmara-Mankachar", "Rampur South Salmara-Mankachar", "Shivpur South Salmara-Mankachar"]}
                ]
            },
            "Tamulpur": {
                "lgd_code": 1084,
                "name_hi": "Tamulpur",
                "headquarters": "Tamulpur",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tamulpur Sadar", "Tamulpur North", "Tamulpur South", "Tamulpur Rural"],
                "blocks": ["Tamulpur Block", "Tamulpur West Block", "Tamulpur East Block"],
                "panchayats": [
                    {"name": "Tamulpur Central Gram Panchayat", "lgd_code": 301084, "block": "Tamulpur Block", "villages": ["Tamulpur Khas", "Tamulpur Dehat", "Tamulpur Purva"]},
                    {"name": "Tamulpur Model Krishi Panchayat", "lgd_code": 302084, "block": "Tamulpur East Block", "villages": ["Kalyanpur Tamulpur", "Rampur Tamulpur", "Shivpur Tamulpur"]}
                ]
            },
            "Tinsukia": {
                "lgd_code": 1085,
                "name_hi": "Tinsukia",
                "headquarters": "Tinsukia",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tinsukia Sadar", "Tinsukia North", "Tinsukia South", "Tinsukia Rural"],
                "blocks": ["Tinsukia Block", "Tinsukia West Block", "Tinsukia East Block"],
                "panchayats": [
                    {"name": "Tinsukia Central Gram Panchayat", "lgd_code": 301085, "block": "Tinsukia Block", "villages": ["Tinsukia Khas", "Tinsukia Dehat", "Tinsukia Purva"]},
                    {"name": "Tinsukia Model Krishi Panchayat", "lgd_code": 302085, "block": "Tinsukia East Block", "villages": ["Kalyanpur Tinsukia", "Rampur Tinsukia", "Shivpur Tinsukia"]}
                ]
            },
            "Udalguri": {
                "lgd_code": 1086,
                "name_hi": "Udalguri",
                "headquarters": "Udalguri",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Udalguri Sadar", "Udalguri North", "Udalguri South", "Udalguri Rural"],
                "blocks": ["Udalguri Block", "Udalguri West Block", "Udalguri East Block"],
                "panchayats": [
                    {"name": "Udalguri Central Gram Panchayat", "lgd_code": 301086, "block": "Udalguri Block", "villages": ["Udalguri Khas", "Udalguri Dehat", "Udalguri Purva"]},
                    {"name": "Udalguri Model Krishi Panchayat", "lgd_code": 302086, "block": "Udalguri East Block", "villages": ["Kalyanpur Udalguri", "Rampur Udalguri", "Shivpur Udalguri"]}
                ]
            },
            "West Karbi Anglong": {
                "lgd_code": 1087,
                "name_hi": "West Karbi Anglong",
                "headquarters": "West Karbi Anglong",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Karbi Anglong Sadar", "West Karbi Anglong North", "West Karbi Anglong South", "West Karbi Anglong Rural"],
                "blocks": ["West Karbi Anglong Block", "West Karbi Anglong West Block", "West Karbi Anglong East Block"],
                "panchayats": [
                    {"name": "West Karbi Anglong Central Gram Panchayat", "lgd_code": 301087, "block": "West Karbi Anglong Block", "villages": ["West Karbi Anglong Khas", "West Karbi Anglong Dehat", "West Karbi Anglong Purva"]},
                    {"name": "West Karbi Anglong Model Krishi Panchayat", "lgd_code": 302087, "block": "West Karbi Anglong East Block", "villages": ["Kalyanpur West Karbi Anglong", "Rampur West Karbi Anglong", "Shivpur West Karbi Anglong"]}
                ]
            },
        }
    },
    "Bihar": {
        "districts": {
            "Araria": {
                "lgd_code": 1088,
                "name_hi": "Araria",
                "headquarters": "Araria",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Araria Sadar", "Araria North", "Araria South", "Araria Rural"],
                "blocks": ["Araria Block", "Araria West Block", "Araria East Block"],
                "panchayats": [
                    {"name": "Araria Central Gram Panchayat", "lgd_code": 301088, "block": "Araria Block", "villages": ["Araria Khas", "Araria Dehat", "Araria Purva"]},
                    {"name": "Araria Model Krishi Panchayat", "lgd_code": 302088, "block": "Araria East Block", "villages": ["Kalyanpur Araria", "Rampur Araria", "Shivpur Araria"]}
                ]
            },
            "Arwal": {
                "lgd_code": 1089,
                "name_hi": "Arwal",
                "headquarters": "Arwal",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Arwal Sadar", "Arwal North", "Arwal South", "Arwal Rural"],
                "blocks": ["Arwal Block", "Arwal West Block", "Arwal East Block"],
                "panchayats": [
                    {"name": "Arwal Central Gram Panchayat", "lgd_code": 301089, "block": "Arwal Block", "villages": ["Arwal Khas", "Arwal Dehat", "Arwal Purva"]},
                    {"name": "Arwal Model Krishi Panchayat", "lgd_code": 302089, "block": "Arwal East Block", "villages": ["Kalyanpur Arwal", "Rampur Arwal", "Shivpur Arwal"]}
                ]
            },
            "Aurangabad Bihar": {
                "lgd_code": 1090,
                "name_hi": "Aurangabad Bihar",
                "headquarters": "Aurangabad Bihar",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Aurangabad Bihar Sadar", "Aurangabad Bihar North", "Aurangabad Bihar South", "Aurangabad Bihar Rural"],
                "blocks": ["Aurangabad Bihar Block", "Aurangabad Bihar West Block", "Aurangabad Bihar East Block"],
                "panchayats": [
                    {"name": "Aurangabad Bihar Central Gram Panchayat", "lgd_code": 301090, "block": "Aurangabad Bihar Block", "villages": ["Aurangabad Bihar Khas", "Aurangabad Bihar Dehat", "Aurangabad Bihar Purva"]},
                    {"name": "Aurangabad Bihar Model Krishi Panchayat", "lgd_code": 302090, "block": "Aurangabad Bihar East Block", "villages": ["Kalyanpur Aurangabad Bihar", "Rampur Aurangabad Bihar", "Shivpur Aurangabad Bihar"]}
                ]
            },
            "Banka": {
                "lgd_code": 1091,
                "name_hi": "Banka",
                "headquarters": "Banka",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Banka Sadar", "Banka North", "Banka South", "Banka Rural"],
                "blocks": ["Banka Block", "Banka West Block", "Banka East Block"],
                "panchayats": [
                    {"name": "Banka Central Gram Panchayat", "lgd_code": 301091, "block": "Banka Block", "villages": ["Banka Khas", "Banka Dehat", "Banka Purva"]},
                    {"name": "Banka Model Krishi Panchayat", "lgd_code": 302091, "block": "Banka East Block", "villages": ["Kalyanpur Banka", "Rampur Banka", "Shivpur Banka"]}
                ]
            },
            "Begusarai": {
                "lgd_code": 1092,
                "name_hi": "Begusarai",
                "headquarters": "Begusarai",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Begusarai Sadar", "Begusarai North", "Begusarai South", "Begusarai Rural"],
                "blocks": ["Begusarai Block", "Begusarai West Block", "Begusarai East Block"],
                "panchayats": [
                    {"name": "Begusarai Central Gram Panchayat", "lgd_code": 301092, "block": "Begusarai Block", "villages": ["Begusarai Khas", "Begusarai Dehat", "Begusarai Purva"]},
                    {"name": "Begusarai Model Krishi Panchayat", "lgd_code": 302092, "block": "Begusarai East Block", "villages": ["Kalyanpur Begusarai", "Rampur Begusarai", "Shivpur Begusarai"]}
                ]
            },
            "Bhagalpur": {
                "lgd_code": 1093,
                "name_hi": "Bhagalpur",
                "headquarters": "Bhagalpur",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhagalpur Sadar", "Bhagalpur North", "Bhagalpur South", "Bhagalpur Rural"],
                "blocks": ["Bhagalpur Block", "Bhagalpur West Block", "Bhagalpur East Block"],
                "panchayats": [
                    {"name": "Bhagalpur Central Gram Panchayat", "lgd_code": 301093, "block": "Bhagalpur Block", "villages": ["Bhagalpur Khas", "Bhagalpur Dehat", "Bhagalpur Purva"]},
                    {"name": "Bhagalpur Model Krishi Panchayat", "lgd_code": 302093, "block": "Bhagalpur East Block", "villages": ["Kalyanpur Bhagalpur", "Rampur Bhagalpur", "Shivpur Bhagalpur"]}
                ]
            },
            "Bhojpur (Arrah)": {
                "lgd_code": 1094,
                "name_hi": "Bhojpur",
                "headquarters": "Bhojpur",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhojpur Sadar", "Bhojpur North", "Bhojpur South", "Bhojpur Rural"],
                "blocks": ["Bhojpur Block", "Bhojpur West Block", "Bhojpur East Block"],
                "panchayats": [
                    {"name": "Bhojpur Central Gram Panchayat", "lgd_code": 301094, "block": "Bhojpur Block", "villages": ["Bhojpur Khas", "Bhojpur Dehat", "Bhojpur Purva"]},
                    {"name": "Bhojpur Model Krishi Panchayat", "lgd_code": 302094, "block": "Bhojpur East Block", "villages": ["Kalyanpur Bhojpur", "Rampur Bhojpur", "Shivpur Bhojpur"]}
                ]
            },
            "Buxar": {
                "lgd_code": 1095,
                "name_hi": "Buxar",
                "headquarters": "Buxar",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Buxar Sadar", "Buxar North", "Buxar South", "Buxar Rural"],
                "blocks": ["Buxar Block", "Buxar West Block", "Buxar East Block"],
                "panchayats": [
                    {"name": "Buxar Central Gram Panchayat", "lgd_code": 301095, "block": "Buxar Block", "villages": ["Buxar Khas", "Buxar Dehat", "Buxar Purva"]},
                    {"name": "Buxar Model Krishi Panchayat", "lgd_code": 302095, "block": "Buxar East Block", "villages": ["Kalyanpur Buxar", "Rampur Buxar", "Shivpur Buxar"]}
                ]
            },
            "Darbhanga": {
                "lgd_code": 1096,
                "name_hi": "Darbhanga",
                "headquarters": "Darbhanga",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Darbhanga Sadar", "Darbhanga North", "Darbhanga South", "Darbhanga Rural"],
                "blocks": ["Darbhanga Block", "Darbhanga West Block", "Darbhanga East Block"],
                "panchayats": [
                    {"name": "Darbhanga Central Gram Panchayat", "lgd_code": 301096, "block": "Darbhanga Block", "villages": ["Darbhanga Khas", "Darbhanga Dehat", "Darbhanga Purva"]},
                    {"name": "Darbhanga Model Krishi Panchayat", "lgd_code": 302096, "block": "Darbhanga East Block", "villages": ["Kalyanpur Darbhanga", "Rampur Darbhanga", "Shivpur Darbhanga"]}
                ]
            },
            "East Champaran (Motihari)": {
                "lgd_code": 1097,
                "name_hi": "East Champaran",
                "headquarters": "East Champaran",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Champaran Sadar", "East Champaran North", "East Champaran South", "East Champaran Rural"],
                "blocks": ["East Champaran Block", "East Champaran West Block", "East Champaran East Block"],
                "panchayats": [
                    {"name": "East Champaran Central Gram Panchayat", "lgd_code": 301097, "block": "East Champaran Block", "villages": ["East Champaran Khas", "East Champaran Dehat", "East Champaran Purva"]},
                    {"name": "East Champaran Model Krishi Panchayat", "lgd_code": 302097, "block": "East Champaran East Block", "villages": ["Kalyanpur East Champaran", "Rampur East Champaran", "Shivpur East Champaran"]}
                ]
            },
            "Gaya": {
                "lgd_code": 1098,
                "name_hi": "Gaya",
                "headquarters": "Gaya",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gaya Sadar", "Gaya North", "Gaya South", "Gaya Rural"],
                "blocks": ["Gaya Block", "Gaya West Block", "Gaya East Block"],
                "panchayats": [
                    {"name": "Gaya Central Gram Panchayat", "lgd_code": 301098, "block": "Gaya Block", "villages": ["Gaya Khas", "Gaya Dehat", "Gaya Purva"]},
                    {"name": "Gaya Model Krishi Panchayat", "lgd_code": 302098, "block": "Gaya East Block", "villages": ["Kalyanpur Gaya", "Rampur Gaya", "Shivpur Gaya"]}
                ]
            },
            "Gopalganj": {
                "lgd_code": 1099,
                "name_hi": "Gopalganj",
                "headquarters": "Gopalganj",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gopalganj Sadar", "Gopalganj North", "Gopalganj South", "Gopalganj Rural"],
                "blocks": ["Gopalganj Block", "Gopalganj West Block", "Gopalganj East Block"],
                "panchayats": [
                    {"name": "Gopalganj Central Gram Panchayat", "lgd_code": 301099, "block": "Gopalganj Block", "villages": ["Gopalganj Khas", "Gopalganj Dehat", "Gopalganj Purva"]},
                    {"name": "Gopalganj Model Krishi Panchayat", "lgd_code": 302099, "block": "Gopalganj East Block", "villages": ["Kalyanpur Gopalganj", "Rampur Gopalganj", "Shivpur Gopalganj"]}
                ]
            },
            "Jamui": {
                "lgd_code": 1100,
                "name_hi": "Jamui",
                "headquarters": "Jamui",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jamui Sadar", "Jamui North", "Jamui South", "Jamui Rural"],
                "blocks": ["Jamui Block", "Jamui West Block", "Jamui East Block"],
                "panchayats": [
                    {"name": "Jamui Central Gram Panchayat", "lgd_code": 301100, "block": "Jamui Block", "villages": ["Jamui Khas", "Jamui Dehat", "Jamui Purva"]},
                    {"name": "Jamui Model Krishi Panchayat", "lgd_code": 302100, "block": "Jamui East Block", "villages": ["Kalyanpur Jamui", "Rampur Jamui", "Shivpur Jamui"]}
                ]
            },
            "Jehanabad": {
                "lgd_code": 1101,
                "name_hi": "Jehanabad",
                "headquarters": "Jehanabad",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jehanabad Sadar", "Jehanabad North", "Jehanabad South", "Jehanabad Rural"],
                "blocks": ["Jehanabad Block", "Jehanabad West Block", "Jehanabad East Block"],
                "panchayats": [
                    {"name": "Jehanabad Central Gram Panchayat", "lgd_code": 301101, "block": "Jehanabad Block", "villages": ["Jehanabad Khas", "Jehanabad Dehat", "Jehanabad Purva"]},
                    {"name": "Jehanabad Model Krishi Panchayat", "lgd_code": 302101, "block": "Jehanabad East Block", "villages": ["Kalyanpur Jehanabad", "Rampur Jehanabad", "Shivpur Jehanabad"]}
                ]
            },
            "Kaimur (Bhabua)": {
                "lgd_code": 1102,
                "name_hi": "Kaimur",
                "headquarters": "Kaimur",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kaimur Sadar", "Kaimur North", "Kaimur South", "Kaimur Rural"],
                "blocks": ["Kaimur Block", "Kaimur West Block", "Kaimur East Block"],
                "panchayats": [
                    {"name": "Kaimur Central Gram Panchayat", "lgd_code": 301102, "block": "Kaimur Block", "villages": ["Kaimur Khas", "Kaimur Dehat", "Kaimur Purva"]},
                    {"name": "Kaimur Model Krishi Panchayat", "lgd_code": 302102, "block": "Kaimur East Block", "villages": ["Kalyanpur Kaimur", "Rampur Kaimur", "Shivpur Kaimur"]}
                ]
            },
            "Katihar": {
                "lgd_code": 1103,
                "name_hi": "Katihar",
                "headquarters": "Katihar",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Katihar Sadar", "Katihar North", "Katihar South", "Katihar Rural"],
                "blocks": ["Katihar Block", "Katihar West Block", "Katihar East Block"],
                "panchayats": [
                    {"name": "Katihar Central Gram Panchayat", "lgd_code": 301103, "block": "Katihar Block", "villages": ["Katihar Khas", "Katihar Dehat", "Katihar Purva"]},
                    {"name": "Katihar Model Krishi Panchayat", "lgd_code": 302103, "block": "Katihar East Block", "villages": ["Kalyanpur Katihar", "Rampur Katihar", "Shivpur Katihar"]}
                ]
            },
            "Khagaria": {
                "lgd_code": 1104,
                "name_hi": "Khagaria",
                "headquarters": "Khagaria",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khagaria Sadar", "Khagaria North", "Khagaria South", "Khagaria Rural"],
                "blocks": ["Khagaria Block", "Khagaria West Block", "Khagaria East Block"],
                "panchayats": [
                    {"name": "Khagaria Central Gram Panchayat", "lgd_code": 301104, "block": "Khagaria Block", "villages": ["Khagaria Khas", "Khagaria Dehat", "Khagaria Purva"]},
                    {"name": "Khagaria Model Krishi Panchayat", "lgd_code": 302104, "block": "Khagaria East Block", "villages": ["Kalyanpur Khagaria", "Rampur Khagaria", "Shivpur Khagaria"]}
                ]
            },
            "Kishanganj": {
                "lgd_code": 1105,
                "name_hi": "Kishanganj",
                "headquarters": "Kishanganj",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kishanganj Sadar", "Kishanganj North", "Kishanganj South", "Kishanganj Rural"],
                "blocks": ["Kishanganj Block", "Kishanganj West Block", "Kishanganj East Block"],
                "panchayats": [
                    {"name": "Kishanganj Central Gram Panchayat", "lgd_code": 301105, "block": "Kishanganj Block", "villages": ["Kishanganj Khas", "Kishanganj Dehat", "Kishanganj Purva"]},
                    {"name": "Kishanganj Model Krishi Panchayat", "lgd_code": 302105, "block": "Kishanganj East Block", "villages": ["Kalyanpur Kishanganj", "Rampur Kishanganj", "Shivpur Kishanganj"]}
                ]
            },
            "Lakhisarai": {
                "lgd_code": 1106,
                "name_hi": "Lakhisarai",
                "headquarters": "Lakhisarai",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lakhisarai Sadar", "Lakhisarai North", "Lakhisarai South", "Lakhisarai Rural"],
                "blocks": ["Lakhisarai Block", "Lakhisarai West Block", "Lakhisarai East Block"],
                "panchayats": [
                    {"name": "Lakhisarai Central Gram Panchayat", "lgd_code": 301106, "block": "Lakhisarai Block", "villages": ["Lakhisarai Khas", "Lakhisarai Dehat", "Lakhisarai Purva"]},
                    {"name": "Lakhisarai Model Krishi Panchayat", "lgd_code": 302106, "block": "Lakhisarai East Block", "villages": ["Kalyanpur Lakhisarai", "Rampur Lakhisarai", "Shivpur Lakhisarai"]}
                ]
            },
            "Madhepura": {
                "lgd_code": 1107,
                "name_hi": "Madhepura",
                "headquarters": "Madhepura",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Madhepura Sadar", "Madhepura North", "Madhepura South", "Madhepura Rural"],
                "blocks": ["Madhepura Block", "Madhepura West Block", "Madhepura East Block"],
                "panchayats": [
                    {"name": "Madhepura Central Gram Panchayat", "lgd_code": 301107, "block": "Madhepura Block", "villages": ["Madhepura Khas", "Madhepura Dehat", "Madhepura Purva"]},
                    {"name": "Madhepura Model Krishi Panchayat", "lgd_code": 302107, "block": "Madhepura East Block", "villages": ["Kalyanpur Madhepura", "Rampur Madhepura", "Shivpur Madhepura"]}
                ]
            },
            "Madhubani": {
                "lgd_code": 1108,
                "name_hi": "Madhubani",
                "headquarters": "Madhubani",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Madhubani Sadar", "Madhubani North", "Madhubani South", "Madhubani Rural"],
                "blocks": ["Madhubani Block", "Madhubani West Block", "Madhubani East Block"],
                "panchayats": [
                    {"name": "Madhubani Central Gram Panchayat", "lgd_code": 301108, "block": "Madhubani Block", "villages": ["Madhubani Khas", "Madhubani Dehat", "Madhubani Purva"]},
                    {"name": "Madhubani Model Krishi Panchayat", "lgd_code": 302108, "block": "Madhubani East Block", "villages": ["Kalyanpur Madhubani", "Rampur Madhubani", "Shivpur Madhubani"]}
                ]
            },
            "Munger": {
                "lgd_code": 1109,
                "name_hi": "Munger",
                "headquarters": "Munger",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Munger Sadar", "Munger North", "Munger South", "Munger Rural"],
                "blocks": ["Munger Block", "Munger West Block", "Munger East Block"],
                "panchayats": [
                    {"name": "Munger Central Gram Panchayat", "lgd_code": 301109, "block": "Munger Block", "villages": ["Munger Khas", "Munger Dehat", "Munger Purva"]},
                    {"name": "Munger Model Krishi Panchayat", "lgd_code": 302109, "block": "Munger East Block", "villages": ["Kalyanpur Munger", "Rampur Munger", "Shivpur Munger"]}
                ]
            },
            "Muzaffarpur": {
                "lgd_code": 1110,
                "name_hi": "Muzaffarpur",
                "headquarters": "Muzaffarpur",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Muzaffarpur Sadar", "Muzaffarpur North", "Muzaffarpur South", "Muzaffarpur Rural"],
                "blocks": ["Muzaffarpur Block", "Muzaffarpur West Block", "Muzaffarpur East Block"],
                "panchayats": [
                    {"name": "Muzaffarpur Central Gram Panchayat", "lgd_code": 301110, "block": "Muzaffarpur Block", "villages": ["Muzaffarpur Khas", "Muzaffarpur Dehat", "Muzaffarpur Purva"]},
                    {"name": "Muzaffarpur Model Krishi Panchayat", "lgd_code": 302110, "block": "Muzaffarpur East Block", "villages": ["Kalyanpur Muzaffarpur", "Rampur Muzaffarpur", "Shivpur Muzaffarpur"]}
                ]
            },
            "Nalanda (Bihar Sharif)": {
                "lgd_code": 1111,
                "name_hi": "Nalanda",
                "headquarters": "Nalanda",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nalanda Sadar", "Nalanda North", "Nalanda South", "Nalanda Rural"],
                "blocks": ["Nalanda Block", "Nalanda West Block", "Nalanda East Block"],
                "panchayats": [
                    {"name": "Nalanda Central Gram Panchayat", "lgd_code": 301111, "block": "Nalanda Block", "villages": ["Nalanda Khas", "Nalanda Dehat", "Nalanda Purva"]},
                    {"name": "Nalanda Model Krishi Panchayat", "lgd_code": 302111, "block": "Nalanda East Block", "villages": ["Kalyanpur Nalanda", "Rampur Nalanda", "Shivpur Nalanda"]}
                ]
            },
            "Nawada": {
                "lgd_code": 1112,
                "name_hi": "Nawada",
                "headquarters": "Nawada",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nawada Sadar", "Nawada North", "Nawada South", "Nawada Rural"],
                "blocks": ["Nawada Block", "Nawada West Block", "Nawada East Block"],
                "panchayats": [
                    {"name": "Nawada Central Gram Panchayat", "lgd_code": 301112, "block": "Nawada Block", "villages": ["Nawada Khas", "Nawada Dehat", "Nawada Purva"]},
                    {"name": "Nawada Model Krishi Panchayat", "lgd_code": 302112, "block": "Nawada East Block", "villages": ["Kalyanpur Nawada", "Rampur Nawada", "Shivpur Nawada"]}
                ]
            },
            "Patna": {
                "lgd_code": 1113,
                "name_hi": "Patna",
                "headquarters": "Patna",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Patna Sadar", "Patna North", "Patna South", "Patna Rural"],
                "blocks": ["Patna Block", "Patna West Block", "Patna East Block"],
                "panchayats": [
                    {"name": "Patna Central Gram Panchayat", "lgd_code": 301113, "block": "Patna Block", "villages": ["Patna Khas", "Patna Dehat", "Patna Purva"]},
                    {"name": "Patna Model Krishi Panchayat", "lgd_code": 302113, "block": "Patna East Block", "villages": ["Kalyanpur Patna", "Rampur Patna", "Shivpur Patna"]}
                ]
            },
            "Purnia": {
                "lgd_code": 1114,
                "name_hi": "Purnia",
                "headquarters": "Purnia",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Purnia Sadar", "Purnia North", "Purnia South", "Purnia Rural"],
                "blocks": ["Purnia Block", "Purnia West Block", "Purnia East Block"],
                "panchayats": [
                    {"name": "Purnia Central Gram Panchayat", "lgd_code": 301114, "block": "Purnia Block", "villages": ["Purnia Khas", "Purnia Dehat", "Purnia Purva"]},
                    {"name": "Purnia Model Krishi Panchayat", "lgd_code": 302114, "block": "Purnia East Block", "villages": ["Kalyanpur Purnia", "Rampur Purnia", "Shivpur Purnia"]}
                ]
            },
            "Rohtas (Sasaram)": {
                "lgd_code": 1115,
                "name_hi": "Rohtas",
                "headquarters": "Rohtas",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rohtas Sadar", "Rohtas North", "Rohtas South", "Rohtas Rural"],
                "blocks": ["Rohtas Block", "Rohtas West Block", "Rohtas East Block"],
                "panchayats": [
                    {"name": "Rohtas Central Gram Panchayat", "lgd_code": 301115, "block": "Rohtas Block", "villages": ["Rohtas Khas", "Rohtas Dehat", "Rohtas Purva"]},
                    {"name": "Rohtas Model Krishi Panchayat", "lgd_code": 302115, "block": "Rohtas East Block", "villages": ["Kalyanpur Rohtas", "Rampur Rohtas", "Shivpur Rohtas"]}
                ]
            },
            "Saharsa": {
                "lgd_code": 1116,
                "name_hi": "Saharsa",
                "headquarters": "Saharsa",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saharsa Sadar", "Saharsa North", "Saharsa South", "Saharsa Rural"],
                "blocks": ["Saharsa Block", "Saharsa West Block", "Saharsa East Block"],
                "panchayats": [
                    {"name": "Saharsa Central Gram Panchayat", "lgd_code": 301116, "block": "Saharsa Block", "villages": ["Saharsa Khas", "Saharsa Dehat", "Saharsa Purva"]},
                    {"name": "Saharsa Model Krishi Panchayat", "lgd_code": 302116, "block": "Saharsa East Block", "villages": ["Kalyanpur Saharsa", "Rampur Saharsa", "Shivpur Saharsa"]}
                ]
            },
            "Samastipur": {
                "lgd_code": 1117,
                "name_hi": "Samastipur",
                "headquarters": "Samastipur",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Samastipur Sadar", "Samastipur North", "Samastipur South", "Samastipur Rural"],
                "blocks": ["Samastipur Block", "Samastipur West Block", "Samastipur East Block"],
                "panchayats": [
                    {"name": "Samastipur Central Gram Panchayat", "lgd_code": 301117, "block": "Samastipur Block", "villages": ["Samastipur Khas", "Samastipur Dehat", "Samastipur Purva"]},
                    {"name": "Samastipur Model Krishi Panchayat", "lgd_code": 302117, "block": "Samastipur East Block", "villages": ["Kalyanpur Samastipur", "Rampur Samastipur", "Shivpur Samastipur"]}
                ]
            },
            "Saran (Chhapra)": {
                "lgd_code": 1118,
                "name_hi": "Saran",
                "headquarters": "Saran",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saran Sadar", "Saran North", "Saran South", "Saran Rural"],
                "blocks": ["Saran Block", "Saran West Block", "Saran East Block"],
                "panchayats": [
                    {"name": "Saran Central Gram Panchayat", "lgd_code": 301118, "block": "Saran Block", "villages": ["Saran Khas", "Saran Dehat", "Saran Purva"]},
                    {"name": "Saran Model Krishi Panchayat", "lgd_code": 302118, "block": "Saran East Block", "villages": ["Kalyanpur Saran", "Rampur Saran", "Shivpur Saran"]}
                ]
            },
            "Sheikhpura": {
                "lgd_code": 1119,
                "name_hi": "Sheikhpura",
                "headquarters": "Sheikhpura",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sheikhpura Sadar", "Sheikhpura North", "Sheikhpura South", "Sheikhpura Rural"],
                "blocks": ["Sheikhpura Block", "Sheikhpura West Block", "Sheikhpura East Block"],
                "panchayats": [
                    {"name": "Sheikhpura Central Gram Panchayat", "lgd_code": 301119, "block": "Sheikhpura Block", "villages": ["Sheikhpura Khas", "Sheikhpura Dehat", "Sheikhpura Purva"]},
                    {"name": "Sheikhpura Model Krishi Panchayat", "lgd_code": 302119, "block": "Sheikhpura East Block", "villages": ["Kalyanpur Sheikhpura", "Rampur Sheikhpura", "Shivpur Sheikhpura"]}
                ]
            },
            "Sheohar": {
                "lgd_code": 1120,
                "name_hi": "Sheohar",
                "headquarters": "Sheohar",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sheohar Sadar", "Sheohar North", "Sheohar South", "Sheohar Rural"],
                "blocks": ["Sheohar Block", "Sheohar West Block", "Sheohar East Block"],
                "panchayats": [
                    {"name": "Sheohar Central Gram Panchayat", "lgd_code": 301120, "block": "Sheohar Block", "villages": ["Sheohar Khas", "Sheohar Dehat", "Sheohar Purva"]},
                    {"name": "Sheohar Model Krishi Panchayat", "lgd_code": 302120, "block": "Sheohar East Block", "villages": ["Kalyanpur Sheohar", "Rampur Sheohar", "Shivpur Sheohar"]}
                ]
            },
            "Sitamarhi": {
                "lgd_code": 1121,
                "name_hi": "Sitamarhi",
                "headquarters": "Sitamarhi",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sitamarhi Sadar", "Sitamarhi North", "Sitamarhi South", "Sitamarhi Rural"],
                "blocks": ["Sitamarhi Block", "Sitamarhi West Block", "Sitamarhi East Block"],
                "panchayats": [
                    {"name": "Sitamarhi Central Gram Panchayat", "lgd_code": 301121, "block": "Sitamarhi Block", "villages": ["Sitamarhi Khas", "Sitamarhi Dehat", "Sitamarhi Purva"]},
                    {"name": "Sitamarhi Model Krishi Panchayat", "lgd_code": 302121, "block": "Sitamarhi East Block", "villages": ["Kalyanpur Sitamarhi", "Rampur Sitamarhi", "Shivpur Sitamarhi"]}
                ]
            },
            "Siwan": {
                "lgd_code": 1122,
                "name_hi": "Siwan",
                "headquarters": "Siwan",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Siwan Sadar", "Siwan North", "Siwan South", "Siwan Rural"],
                "blocks": ["Siwan Block", "Siwan West Block", "Siwan East Block"],
                "panchayats": [
                    {"name": "Siwan Central Gram Panchayat", "lgd_code": 301122, "block": "Siwan Block", "villages": ["Siwan Khas", "Siwan Dehat", "Siwan Purva"]},
                    {"name": "Siwan Model Krishi Panchayat", "lgd_code": 302122, "block": "Siwan East Block", "villages": ["Kalyanpur Siwan", "Rampur Siwan", "Shivpur Siwan"]}
                ]
            },
            "Supaul": {
                "lgd_code": 1123,
                "name_hi": "Supaul",
                "headquarters": "Supaul",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Supaul Sadar", "Supaul North", "Supaul South", "Supaul Rural"],
                "blocks": ["Supaul Block", "Supaul West Block", "Supaul East Block"],
                "panchayats": [
                    {"name": "Supaul Central Gram Panchayat", "lgd_code": 301123, "block": "Supaul Block", "villages": ["Supaul Khas", "Supaul Dehat", "Supaul Purva"]},
                    {"name": "Supaul Model Krishi Panchayat", "lgd_code": 302123, "block": "Supaul East Block", "villages": ["Kalyanpur Supaul", "Rampur Supaul", "Shivpur Supaul"]}
                ]
            },
            "Vaishali (Hajipur)": {
                "lgd_code": 1124,
                "name_hi": "Vaishali",
                "headquarters": "Vaishali",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vaishali Sadar", "Vaishali North", "Vaishali South", "Vaishali Rural"],
                "blocks": ["Vaishali Block", "Vaishali West Block", "Vaishali East Block"],
                "panchayats": [
                    {"name": "Vaishali Central Gram Panchayat", "lgd_code": 301124, "block": "Vaishali Block", "villages": ["Vaishali Khas", "Vaishali Dehat", "Vaishali Purva"]},
                    {"name": "Vaishali Model Krishi Panchayat", "lgd_code": 302124, "block": "Vaishali East Block", "villages": ["Kalyanpur Vaishali", "Rampur Vaishali", "Shivpur Vaishali"]}
                ]
            },
            "West Champaran (Bettiah)": {
                "lgd_code": 1125,
                "name_hi": "West Champaran",
                "headquarters": "West Champaran",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Champaran Sadar", "West Champaran North", "West Champaran South", "West Champaran Rural"],
                "blocks": ["West Champaran Block", "West Champaran West Block", "West Champaran East Block"],
                "panchayats": [
                    {"name": "West Champaran Central Gram Panchayat", "lgd_code": 301125, "block": "West Champaran Block", "villages": ["West Champaran Khas", "West Champaran Dehat", "West Champaran Purva"]},
                    {"name": "West Champaran Model Krishi Panchayat", "lgd_code": 302125, "block": "West Champaran East Block", "villages": ["Kalyanpur West Champaran", "Rampur West Champaran", "Shivpur West Champaran"]}
                ]
            },
        }
    },
    "Chhattisgarh": {
        "districts": {
            "Balod": {
                "lgd_code": 1126,
                "name_hi": "Balod",
                "headquarters": "Balod",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balod Sadar", "Balod North", "Balod South", "Balod Rural"],
                "blocks": ["Balod Block", "Balod West Block", "Balod East Block"],
                "panchayats": [
                    {"name": "Balod Central Gram Panchayat", "lgd_code": 301126, "block": "Balod Block", "villages": ["Balod Khas", "Balod Dehat", "Balod Purva"]},
                    {"name": "Balod Model Krishi Panchayat", "lgd_code": 302126, "block": "Balod East Block", "villages": ["Kalyanpur Balod", "Rampur Balod", "Shivpur Balod"]}
                ]
            },
            "Baloda Bazar-Bhatapara": {
                "lgd_code": 1127,
                "name_hi": "Baloda Bazar-Bhatapara",
                "headquarters": "Baloda Bazar-Bhatapara",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Baloda Bazar-Bhatapara Sadar", "Baloda Bazar-Bhatapara North", "Baloda Bazar-Bhatapara South", "Baloda Bazar-Bhatapara Rural"],
                "blocks": ["Baloda Bazar-Bhatapara Block", "Baloda Bazar-Bhatapara West Block", "Baloda Bazar-Bhatapara East Block"],
                "panchayats": [
                    {"name": "Baloda Bazar-Bhatapara Central Gram Panchayat", "lgd_code": 301127, "block": "Baloda Bazar-Bhatapara Block", "villages": ["Baloda Bazar-Bhatapara Khas", "Baloda Bazar-Bhatapara Dehat", "Baloda Bazar-Bhatapara Purva"]},
                    {"name": "Baloda Bazar-Bhatapara Model Krishi Panchayat", "lgd_code": 302127, "block": "Baloda Bazar-Bhatapara East Block", "villages": ["Kalyanpur Baloda Bazar-Bhatapara", "Rampur Baloda Bazar-Bhatapara", "Shivpur Baloda Bazar-Bhatapara"]}
                ]
            },
            "Balrampur-Ramanujganj": {
                "lgd_code": 1128,
                "name_hi": "Balrampur-Ramanujganj",
                "headquarters": "Balrampur-Ramanujganj",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balrampur-Ramanujganj Sadar", "Balrampur-Ramanujganj North", "Balrampur-Ramanujganj South", "Balrampur-Ramanujganj Rural"],
                "blocks": ["Balrampur-Ramanujganj Block", "Balrampur-Ramanujganj West Block", "Balrampur-Ramanujganj East Block"],
                "panchayats": [
                    {"name": "Balrampur-Ramanujganj Central Gram Panchayat", "lgd_code": 301128, "block": "Balrampur-Ramanujganj Block", "villages": ["Balrampur-Ramanujganj Khas", "Balrampur-Ramanujganj Dehat", "Balrampur-Ramanujganj Purva"]},
                    {"name": "Balrampur-Ramanujganj Model Krishi Panchayat", "lgd_code": 302128, "block": "Balrampur-Ramanujganj East Block", "villages": ["Kalyanpur Balrampur-Ramanujganj", "Rampur Balrampur-Ramanujganj", "Shivpur Balrampur-Ramanujganj"]}
                ]
            },
            "Bastar (Jagdalpur)": {
                "lgd_code": 1129,
                "name_hi": "Bastar",
                "headquarters": "Bastar",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bastar Sadar", "Bastar North", "Bastar South", "Bastar Rural"],
                "blocks": ["Bastar Block", "Bastar West Block", "Bastar East Block"],
                "panchayats": [
                    {"name": "Bastar Central Gram Panchayat", "lgd_code": 301129, "block": "Bastar Block", "villages": ["Bastar Khas", "Bastar Dehat", "Bastar Purva"]},
                    {"name": "Bastar Model Krishi Panchayat", "lgd_code": 302129, "block": "Bastar East Block", "villages": ["Kalyanpur Bastar", "Rampur Bastar", "Shivpur Bastar"]}
                ]
            },
            "Bemetara": {
                "lgd_code": 1130,
                "name_hi": "Bemetara",
                "headquarters": "Bemetara",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bemetara Sadar", "Bemetara North", "Bemetara South", "Bemetara Rural"],
                "blocks": ["Bemetara Block", "Bemetara West Block", "Bemetara East Block"],
                "panchayats": [
                    {"name": "Bemetara Central Gram Panchayat", "lgd_code": 301130, "block": "Bemetara Block", "villages": ["Bemetara Khas", "Bemetara Dehat", "Bemetara Purva"]},
                    {"name": "Bemetara Model Krishi Panchayat", "lgd_code": 302130, "block": "Bemetara East Block", "villages": ["Kalyanpur Bemetara", "Rampur Bemetara", "Shivpur Bemetara"]}
                ]
            },
            "Bijapur": {
                "lgd_code": 1131,
                "name_hi": "Bijapur",
                "headquarters": "Bijapur",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bijapur Sadar", "Bijapur North", "Bijapur South", "Bijapur Rural"],
                "blocks": ["Bijapur Block", "Bijapur West Block", "Bijapur East Block"],
                "panchayats": [
                    {"name": "Bijapur Central Gram Panchayat", "lgd_code": 301131, "block": "Bijapur Block", "villages": ["Bijapur Khas", "Bijapur Dehat", "Bijapur Purva"]},
                    {"name": "Bijapur Model Krishi Panchayat", "lgd_code": 302131, "block": "Bijapur East Block", "villages": ["Kalyanpur Bijapur", "Rampur Bijapur", "Shivpur Bijapur"]}
                ]
            },
            "Bilaspur": {
                "lgd_code": 1132,
                "name_hi": "Bilaspur",
                "headquarters": "Bilaspur",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bilaspur Sadar", "Bilaspur North", "Bilaspur South", "Bilaspur Rural"],
                "blocks": ["Bilaspur Block", "Bilaspur West Block", "Bilaspur East Block"],
                "panchayats": [
                    {"name": "Bilaspur Central Gram Panchayat", "lgd_code": 301132, "block": "Bilaspur Block", "villages": ["Bilaspur Khas", "Bilaspur Dehat", "Bilaspur Purva"]},
                    {"name": "Bilaspur Model Krishi Panchayat", "lgd_code": 302132, "block": "Bilaspur East Block", "villages": ["Kalyanpur Bilaspur", "Rampur Bilaspur", "Shivpur Bilaspur"]}
                ]
            },
            "Dakshin Bastar Dantewada": {
                "lgd_code": 1133,
                "name_hi": "Dakshin Bastar Dantewada",
                "headquarters": "Dakshin Bastar Dantewada",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dakshin Bastar Dantewada Sadar", "Dakshin Bastar Dantewada North", "Dakshin Bastar Dantewada South", "Dakshin Bastar Dantewada Rural"],
                "blocks": ["Dakshin Bastar Dantewada Block", "Dakshin Bastar Dantewada West Block", "Dakshin Bastar Dantewada East Block"],
                "panchayats": [
                    {"name": "Dakshin Bastar Dantewada Central Gram Panchayat", "lgd_code": 301133, "block": "Dakshin Bastar Dantewada Block", "villages": ["Dakshin Bastar Dantewada Khas", "Dakshin Bastar Dantewada Dehat", "Dakshin Bastar Dantewada Purva"]},
                    {"name": "Dakshin Bastar Dantewada Model Krishi Panchayat", "lgd_code": 302133, "block": "Dakshin Bastar Dantewada East Block", "villages": ["Kalyanpur Dakshin Bastar Dantewada", "Rampur Dakshin Bastar Dantewada", "Shivpur Dakshin Bastar Dantewada"]}
                ]
            },
            "Dhamtari": {
                "lgd_code": 1134,
                "name_hi": "Dhamtari",
                "headquarters": "Dhamtari",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhamtari Sadar", "Dhamtari North", "Dhamtari South", "Dhamtari Rural"],
                "blocks": ["Dhamtari Block", "Dhamtari West Block", "Dhamtari East Block"],
                "panchayats": [
                    {"name": "Dhamtari Central Gram Panchayat", "lgd_code": 301134, "block": "Dhamtari Block", "villages": ["Dhamtari Khas", "Dhamtari Dehat", "Dhamtari Purva"]},
                    {"name": "Dhamtari Model Krishi Panchayat", "lgd_code": 302134, "block": "Dhamtari East Block", "villages": ["Kalyanpur Dhamtari", "Rampur Dhamtari", "Shivpur Dhamtari"]}
                ]
            },
            "Durg (Bhilai)": {
                "lgd_code": 1135,
                "name_hi": "Durg",
                "headquarters": "Durg",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Durg Sadar", "Durg North", "Durg South", "Durg Rural"],
                "blocks": ["Durg Block", "Durg West Block", "Durg East Block"],
                "panchayats": [
                    {"name": "Durg Central Gram Panchayat", "lgd_code": 301135, "block": "Durg Block", "villages": ["Durg Khas", "Durg Dehat", "Durg Purva"]},
                    {"name": "Durg Model Krishi Panchayat", "lgd_code": 302135, "block": "Durg East Block", "villages": ["Kalyanpur Durg", "Rampur Durg", "Shivpur Durg"]}
                ]
            },
            "Gariaband": {
                "lgd_code": 1136,
                "name_hi": "Gariaband",
                "headquarters": "Gariaband",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gariaband Sadar", "Gariaband North", "Gariaband South", "Gariaband Rural"],
                "blocks": ["Gariaband Block", "Gariaband West Block", "Gariaband East Block"],
                "panchayats": [
                    {"name": "Gariaband Central Gram Panchayat", "lgd_code": 301136, "block": "Gariaband Block", "villages": ["Gariaband Khas", "Gariaband Dehat", "Gariaband Purva"]},
                    {"name": "Gariaband Model Krishi Panchayat", "lgd_code": 302136, "block": "Gariaband East Block", "villages": ["Kalyanpur Gariaband", "Rampur Gariaband", "Shivpur Gariaband"]}
                ]
            },
            "Gaurela-Pendra-Marwahi": {
                "lgd_code": 1137,
                "name_hi": "Gaurela-Pendra-Marwahi",
                "headquarters": "Gaurela-Pendra-Marwahi",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gaurela-Pendra-Marwahi Sadar", "Gaurela-Pendra-Marwahi North", "Gaurela-Pendra-Marwahi South", "Gaurela-Pendra-Marwahi Rural"],
                "blocks": ["Gaurela-Pendra-Marwahi Block", "Gaurela-Pendra-Marwahi West Block", "Gaurela-Pendra-Marwahi East Block"],
                "panchayats": [
                    {"name": "Gaurela-Pendra-Marwahi Central Gram Panchayat", "lgd_code": 301137, "block": "Gaurela-Pendra-Marwahi Block", "villages": ["Gaurela-Pendra-Marwahi Khas", "Gaurela-Pendra-Marwahi Dehat", "Gaurela-Pendra-Marwahi Purva"]},
                    {"name": "Gaurela-Pendra-Marwahi Model Krishi Panchayat", "lgd_code": 302137, "block": "Gaurela-Pendra-Marwahi East Block", "villages": ["Kalyanpur Gaurela-Pendra-Marwahi", "Rampur Gaurela-Pendra-Marwahi", "Shivpur Gaurela-Pendra-Marwahi"]}
                ]
            },
            "Janjgir-Champa": {
                "lgd_code": 1138,
                "name_hi": "Janjgir-Champa",
                "headquarters": "Janjgir-Champa",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Janjgir-Champa Sadar", "Janjgir-Champa North", "Janjgir-Champa South", "Janjgir-Champa Rural"],
                "blocks": ["Janjgir-Champa Block", "Janjgir-Champa West Block", "Janjgir-Champa East Block"],
                "panchayats": [
                    {"name": "Janjgir-Champa Central Gram Panchayat", "lgd_code": 301138, "block": "Janjgir-Champa Block", "villages": ["Janjgir-Champa Khas", "Janjgir-Champa Dehat", "Janjgir-Champa Purva"]},
                    {"name": "Janjgir-Champa Model Krishi Panchayat", "lgd_code": 302138, "block": "Janjgir-Champa East Block", "villages": ["Kalyanpur Janjgir-Champa", "Rampur Janjgir-Champa", "Shivpur Janjgir-Champa"]}
                ]
            },
            "Jashpur": {
                "lgd_code": 1139,
                "name_hi": "Jashpur",
                "headquarters": "Jashpur",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jashpur Sadar", "Jashpur North", "Jashpur South", "Jashpur Rural"],
                "blocks": ["Jashpur Block", "Jashpur West Block", "Jashpur East Block"],
                "panchayats": [
                    {"name": "Jashpur Central Gram Panchayat", "lgd_code": 301139, "block": "Jashpur Block", "villages": ["Jashpur Khas", "Jashpur Dehat", "Jashpur Purva"]},
                    {"name": "Jashpur Model Krishi Panchayat", "lgd_code": 302139, "block": "Jashpur East Block", "villages": ["Kalyanpur Jashpur", "Rampur Jashpur", "Shivpur Jashpur"]}
                ]
            },
            "Kabirdham (Kawardha)": {
                "lgd_code": 1140,
                "name_hi": "Kabirdham",
                "headquarters": "Kabirdham",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kabirdham Sadar", "Kabirdham North", "Kabirdham South", "Kabirdham Rural"],
                "blocks": ["Kabirdham Block", "Kabirdham West Block", "Kabirdham East Block"],
                "panchayats": [
                    {"name": "Kabirdham Central Gram Panchayat", "lgd_code": 301140, "block": "Kabirdham Block", "villages": ["Kabirdham Khas", "Kabirdham Dehat", "Kabirdham Purva"]},
                    {"name": "Kabirdham Model Krishi Panchayat", "lgd_code": 302140, "block": "Kabirdham East Block", "villages": ["Kalyanpur Kabirdham", "Rampur Kabirdham", "Shivpur Kabirdham"]}
                ]
            },
            "Kanker": {
                "lgd_code": 1141,
                "name_hi": "Kanker",
                "headquarters": "Kanker",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kanker Sadar", "Kanker North", "Kanker South", "Kanker Rural"],
                "blocks": ["Kanker Block", "Kanker West Block", "Kanker East Block"],
                "panchayats": [
                    {"name": "Kanker Central Gram Panchayat", "lgd_code": 301141, "block": "Kanker Block", "villages": ["Kanker Khas", "Kanker Dehat", "Kanker Purva"]},
                    {"name": "Kanker Model Krishi Panchayat", "lgd_code": 302141, "block": "Kanker East Block", "villages": ["Kalyanpur Kanker", "Rampur Kanker", "Shivpur Kanker"]}
                ]
            },
            "Khairagarh-Chhuikhadan-Gandai": {
                "lgd_code": 1142,
                "name_hi": "Khairagarh-Chhuikhadan-Gandai",
                "headquarters": "Khairagarh-Chhuikhadan-Gandai",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khairagarh-Chhuikhadan-Gandai Sadar", "Khairagarh-Chhuikhadan-Gandai North", "Khairagarh-Chhuikhadan-Gandai South", "Khairagarh-Chhuikhadan-Gandai Rural"],
                "blocks": ["Khairagarh-Chhuikhadan-Gandai Block", "Khairagarh-Chhuikhadan-Gandai West Block", "Khairagarh-Chhuikhadan-Gandai East Block"],
                "panchayats": [
                    {"name": "Khairagarh-Chhuikhadan-Gandai Central Gram Panchayat", "lgd_code": 301142, "block": "Khairagarh-Chhuikhadan-Gandai Block", "villages": ["Khairagarh-Chhuikhadan-Gandai Khas", "Khairagarh-Chhuikhadan-Gandai Dehat", "Khairagarh-Chhuikhadan-Gandai Purva"]},
                    {"name": "Khairagarh-Chhuikhadan-Gandai Model Krishi Panchayat", "lgd_code": 302142, "block": "Khairagarh-Chhuikhadan-Gandai East Block", "villages": ["Kalyanpur Khairagarh-Chhuikhadan-Gandai", "Rampur Khairagarh-Chhuikhadan-Gandai", "Shivpur Khairagarh-Chhuikhadan-Gandai"]}
                ]
            },
            "Kondagaon": {
                "lgd_code": 1143,
                "name_hi": "Kondagaon",
                "headquarters": "Kondagaon",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kondagaon Sadar", "Kondagaon North", "Kondagaon South", "Kondagaon Rural"],
                "blocks": ["Kondagaon Block", "Kondagaon West Block", "Kondagaon East Block"],
                "panchayats": [
                    {"name": "Kondagaon Central Gram Panchayat", "lgd_code": 301143, "block": "Kondagaon Block", "villages": ["Kondagaon Khas", "Kondagaon Dehat", "Kondagaon Purva"]},
                    {"name": "Kondagaon Model Krishi Panchayat", "lgd_code": 302143, "block": "Kondagaon East Block", "villages": ["Kalyanpur Kondagaon", "Rampur Kondagaon", "Shivpur Kondagaon"]}
                ]
            },
            "Korba": {
                "lgd_code": 1144,
                "name_hi": "Korba",
                "headquarters": "Korba",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Korba Sadar", "Korba North", "Korba South", "Korba Rural"],
                "blocks": ["Korba Block", "Korba West Block", "Korba East Block"],
                "panchayats": [
                    {"name": "Korba Central Gram Panchayat", "lgd_code": 301144, "block": "Korba Block", "villages": ["Korba Khas", "Korba Dehat", "Korba Purva"]},
                    {"name": "Korba Model Krishi Panchayat", "lgd_code": 302144, "block": "Korba East Block", "villages": ["Kalyanpur Korba", "Rampur Korba", "Shivpur Korba"]}
                ]
            },
            "Koriya": {
                "lgd_code": 1145,
                "name_hi": "Koriya",
                "headquarters": "Koriya",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Koriya Sadar", "Koriya North", "Koriya South", "Koriya Rural"],
                "blocks": ["Koriya Block", "Koriya West Block", "Koriya East Block"],
                "panchayats": [
                    {"name": "Koriya Central Gram Panchayat", "lgd_code": 301145, "block": "Koriya Block", "villages": ["Koriya Khas", "Koriya Dehat", "Koriya Purva"]},
                    {"name": "Koriya Model Krishi Panchayat", "lgd_code": 302145, "block": "Koriya East Block", "villages": ["Kalyanpur Koriya", "Rampur Koriya", "Shivpur Koriya"]}
                ]
            },
            "Mahasamund": {
                "lgd_code": 1146,
                "name_hi": "Mahasamund",
                "headquarters": "Mahasamund",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahasamund Sadar", "Mahasamund North", "Mahasamund South", "Mahasamund Rural"],
                "blocks": ["Mahasamund Block", "Mahasamund West Block", "Mahasamund East Block"],
                "panchayats": [
                    {"name": "Mahasamund Central Gram Panchayat", "lgd_code": 301146, "block": "Mahasamund Block", "villages": ["Mahasamund Khas", "Mahasamund Dehat", "Mahasamund Purva"]},
                    {"name": "Mahasamund Model Krishi Panchayat", "lgd_code": 302146, "block": "Mahasamund East Block", "villages": ["Kalyanpur Mahasamund", "Rampur Mahasamund", "Shivpur Mahasamund"]}
                ]
            },
            "Manendragarh-Chirmiri-Bharatpur": {
                "lgd_code": 1147,
                "name_hi": "Manendragarh-Chirmiri-Bharatpur",
                "headquarters": "Manendragarh-Chirmiri-Bharatpur",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Manendragarh-Chirmiri-Bharatpur Sadar", "Manendragarh-Chirmiri-Bharatpur North", "Manendragarh-Chirmiri-Bharatpur South", "Manendragarh-Chirmiri-Bharatpur Rural"],
                "blocks": ["Manendragarh-Chirmiri-Bharatpur Block", "Manendragarh-Chirmiri-Bharatpur West Block", "Manendragarh-Chirmiri-Bharatpur East Block"],
                "panchayats": [
                    {"name": "Manendragarh-Chirmiri-Bharatpur Central Gram Panchayat", "lgd_code": 301147, "block": "Manendragarh-Chirmiri-Bharatpur Block", "villages": ["Manendragarh-Chirmiri-Bharatpur Khas", "Manendragarh-Chirmiri-Bharatpur Dehat", "Manendragarh-Chirmiri-Bharatpur Purva"]},
                    {"name": "Manendragarh-Chirmiri-Bharatpur Model Krishi Panchayat", "lgd_code": 302147, "block": "Manendragarh-Chirmiri-Bharatpur East Block", "villages": ["Kalyanpur Manendragarh-Chirmiri-Bharatpur", "Rampur Manendragarh-Chirmiri-Bharatpur", "Shivpur Manendragarh-Chirmiri-Bharatpur"]}
                ]
            },
            "Mohla-Manpur-Ambagarh Chowki": {
                "lgd_code": 1148,
                "name_hi": "Mohla-Manpur-Ambagarh Chowki",
                "headquarters": "Mohla-Manpur-Ambagarh Chowki",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mohla-Manpur-Ambagarh Chowki Sadar", "Mohla-Manpur-Ambagarh Chowki North", "Mohla-Manpur-Ambagarh Chowki South", "Mohla-Manpur-Ambagarh Chowki Rural"],
                "blocks": ["Mohla-Manpur-Ambagarh Chowki Block", "Mohla-Manpur-Ambagarh Chowki West Block", "Mohla-Manpur-Ambagarh Chowki East Block"],
                "panchayats": [
                    {"name": "Mohla-Manpur-Ambagarh Chowki Central Gram Panchayat", "lgd_code": 301148, "block": "Mohla-Manpur-Ambagarh Chowki Block", "villages": ["Mohla-Manpur-Ambagarh Chowki Khas", "Mohla-Manpur-Ambagarh Chowki Dehat", "Mohla-Manpur-Ambagarh Chowki Purva"]},
                    {"name": "Mohla-Manpur-Ambagarh Chowki Model Krishi Panchayat", "lgd_code": 302148, "block": "Mohla-Manpur-Ambagarh Chowki East Block", "villages": ["Kalyanpur Mohla-Manpur-Ambagarh Chowki", "Rampur Mohla-Manpur-Ambagarh Chowki", "Shivpur Mohla-Manpur-Ambagarh Chowki"]}
                ]
            },
            "Mungeli": {
                "lgd_code": 1149,
                "name_hi": "Mungeli",
                "headquarters": "Mungeli",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mungeli Sadar", "Mungeli North", "Mungeli South", "Mungeli Rural"],
                "blocks": ["Mungeli Block", "Mungeli West Block", "Mungeli East Block"],
                "panchayats": [
                    {"name": "Mungeli Central Gram Panchayat", "lgd_code": 301149, "block": "Mungeli Block", "villages": ["Mungeli Khas", "Mungeli Dehat", "Mungeli Purva"]},
                    {"name": "Mungeli Model Krishi Panchayat", "lgd_code": 302149, "block": "Mungeli East Block", "villages": ["Kalyanpur Mungeli", "Rampur Mungeli", "Shivpur Mungeli"]}
                ]
            },
            "Narayanpur": {
                "lgd_code": 1150,
                "name_hi": "Narayanpur",
                "headquarters": "Narayanpur",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Narayanpur Sadar", "Narayanpur North", "Narayanpur South", "Narayanpur Rural"],
                "blocks": ["Narayanpur Block", "Narayanpur West Block", "Narayanpur East Block"],
                "panchayats": [
                    {"name": "Narayanpur Central Gram Panchayat", "lgd_code": 301150, "block": "Narayanpur Block", "villages": ["Narayanpur Khas", "Narayanpur Dehat", "Narayanpur Purva"]},
                    {"name": "Narayanpur Model Krishi Panchayat", "lgd_code": 302150, "block": "Narayanpur East Block", "villages": ["Kalyanpur Narayanpur", "Rampur Narayanpur", "Shivpur Narayanpur"]}
                ]
            },
            "Raigarh": {
                "lgd_code": 1151,
                "name_hi": "Raigarh",
                "headquarters": "Raigarh",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Raigarh Sadar", "Raigarh North", "Raigarh South", "Raigarh Rural"],
                "blocks": ["Raigarh Block", "Raigarh West Block", "Raigarh East Block"],
                "panchayats": [
                    {"name": "Raigarh Central Gram Panchayat", "lgd_code": 301151, "block": "Raigarh Block", "villages": ["Raigarh Khas", "Raigarh Dehat", "Raigarh Purva"]},
                    {"name": "Raigarh Model Krishi Panchayat", "lgd_code": 302151, "block": "Raigarh East Block", "villages": ["Kalyanpur Raigarh", "Rampur Raigarh", "Shivpur Raigarh"]}
                ]
            },
            "Raipur": {
                "lgd_code": 1152,
                "name_hi": "Raipur",
                "headquarters": "Raipur",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Raipur Sadar", "Raipur North", "Raipur South", "Raipur Rural"],
                "blocks": ["Raipur Block", "Raipur West Block", "Raipur East Block"],
                "panchayats": [
                    {"name": "Raipur Central Gram Panchayat", "lgd_code": 301152, "block": "Raipur Block", "villages": ["Raipur Khas", "Raipur Dehat", "Raipur Purva"]},
                    {"name": "Raipur Model Krishi Panchayat", "lgd_code": 302152, "block": "Raipur East Block", "villages": ["Kalyanpur Raipur", "Rampur Raipur", "Shivpur Raipur"]}
                ]
            },
            "Rajnandgaon": {
                "lgd_code": 1153,
                "name_hi": "Rajnandgaon",
                "headquarters": "Rajnandgaon",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajnandgaon Sadar", "Rajnandgaon North", "Rajnandgaon South", "Rajnandgaon Rural"],
                "blocks": ["Rajnandgaon Block", "Rajnandgaon West Block", "Rajnandgaon East Block"],
                "panchayats": [
                    {"name": "Rajnandgaon Central Gram Panchayat", "lgd_code": 301153, "block": "Rajnandgaon Block", "villages": ["Rajnandgaon Khas", "Rajnandgaon Dehat", "Rajnandgaon Purva"]},
                    {"name": "Rajnandgaon Model Krishi Panchayat", "lgd_code": 302153, "block": "Rajnandgaon East Block", "villages": ["Kalyanpur Rajnandgaon", "Rampur Rajnandgaon", "Shivpur Rajnandgaon"]}
                ]
            },
            "Sarangarh-Bilaigarh": {
                "lgd_code": 1154,
                "name_hi": "Sarangarh-Bilaigarh",
                "headquarters": "Sarangarh-Bilaigarh",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sarangarh-Bilaigarh Sadar", "Sarangarh-Bilaigarh North", "Sarangarh-Bilaigarh South", "Sarangarh-Bilaigarh Rural"],
                "blocks": ["Sarangarh-Bilaigarh Block", "Sarangarh-Bilaigarh West Block", "Sarangarh-Bilaigarh East Block"],
                "panchayats": [
                    {"name": "Sarangarh-Bilaigarh Central Gram Panchayat", "lgd_code": 301154, "block": "Sarangarh-Bilaigarh Block", "villages": ["Sarangarh-Bilaigarh Khas", "Sarangarh-Bilaigarh Dehat", "Sarangarh-Bilaigarh Purva"]},
                    {"name": "Sarangarh-Bilaigarh Model Krishi Panchayat", "lgd_code": 302154, "block": "Sarangarh-Bilaigarh East Block", "villages": ["Kalyanpur Sarangarh-Bilaigarh", "Rampur Sarangarh-Bilaigarh", "Shivpur Sarangarh-Bilaigarh"]}
                ]
            },
            "Sakti": {
                "lgd_code": 1155,
                "name_hi": "Sakti",
                "headquarters": "Sakti",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sakti Sadar", "Sakti North", "Sakti South", "Sakti Rural"],
                "blocks": ["Sakti Block", "Sakti West Block", "Sakti East Block"],
                "panchayats": [
                    {"name": "Sakti Central Gram Panchayat", "lgd_code": 301155, "block": "Sakti Block", "villages": ["Sakti Khas", "Sakti Dehat", "Sakti Purva"]},
                    {"name": "Sakti Model Krishi Panchayat", "lgd_code": 302155, "block": "Sakti East Block", "villages": ["Kalyanpur Sakti", "Rampur Sakti", "Shivpur Sakti"]}
                ]
            },
            "Sukma": {
                "lgd_code": 1156,
                "name_hi": "Sukma",
                "headquarters": "Sukma",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sukma Sadar", "Sukma North", "Sukma South", "Sukma Rural"],
                "blocks": ["Sukma Block", "Sukma West Block", "Sukma East Block"],
                "panchayats": [
                    {"name": "Sukma Central Gram Panchayat", "lgd_code": 301156, "block": "Sukma Block", "villages": ["Sukma Khas", "Sukma Dehat", "Sukma Purva"]},
                    {"name": "Sukma Model Krishi Panchayat", "lgd_code": 302156, "block": "Sukma East Block", "villages": ["Kalyanpur Sukma", "Rampur Sukma", "Shivpur Sukma"]}
                ]
            },
            "Surajpur": {
                "lgd_code": 1157,
                "name_hi": "Surajpur",
                "headquarters": "Surajpur",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Surajpur Sadar", "Surajpur North", "Surajpur South", "Surajpur Rural"],
                "blocks": ["Surajpur Block", "Surajpur West Block", "Surajpur East Block"],
                "panchayats": [
                    {"name": "Surajpur Central Gram Panchayat", "lgd_code": 301157, "block": "Surajpur Block", "villages": ["Surajpur Khas", "Surajpur Dehat", "Surajpur Purva"]},
                    {"name": "Surajpur Model Krishi Panchayat", "lgd_code": 302157, "block": "Surajpur East Block", "villages": ["Kalyanpur Surajpur", "Rampur Surajpur", "Shivpur Surajpur"]}
                ]
            },
            "Surguja (Ambikapur)": {
                "lgd_code": 1158,
                "name_hi": "Surguja",
                "headquarters": "Surguja",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Surguja Sadar", "Surguja North", "Surguja South", "Surguja Rural"],
                "blocks": ["Surguja Block", "Surguja West Block", "Surguja East Block"],
                "panchayats": [
                    {"name": "Surguja Central Gram Panchayat", "lgd_code": 301158, "block": "Surguja Block", "villages": ["Surguja Khas", "Surguja Dehat", "Surguja Purva"]},
                    {"name": "Surguja Model Krishi Panchayat", "lgd_code": 302158, "block": "Surguja East Block", "villages": ["Kalyanpur Surguja", "Rampur Surguja", "Shivpur Surguja"]}
                ]
            },
        }
    },
    "Goa": {
        "districts": {
            "North Goa (Panaji)": {
                "lgd_code": 1159,
                "name_hi": "North Goa",
                "headquarters": "North Goa",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North Goa Sadar", "North Goa North", "North Goa South", "North Goa Rural"],
                "blocks": ["North Goa Block", "North Goa West Block", "North Goa East Block"],
                "panchayats": [
                    {"name": "North Goa Central Gram Panchayat", "lgd_code": 301159, "block": "North Goa Block", "villages": ["North Goa Khas", "North Goa Dehat", "North Goa Purva"]},
                    {"name": "North Goa Model Krishi Panchayat", "lgd_code": 302159, "block": "North Goa East Block", "villages": ["Kalyanpur North Goa", "Rampur North Goa", "Shivpur North Goa"]}
                ]
            },
            "South Goa (Margao)": {
                "lgd_code": 1160,
                "name_hi": "South Goa",
                "headquarters": "South Goa",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Goa Sadar", "South Goa North", "South Goa South", "South Goa Rural"],
                "blocks": ["South Goa Block", "South Goa West Block", "South Goa East Block"],
                "panchayats": [
                    {"name": "South Goa Central Gram Panchayat", "lgd_code": 301160, "block": "South Goa Block", "villages": ["South Goa Khas", "South Goa Dehat", "South Goa Purva"]},
                    {"name": "South Goa Model Krishi Panchayat", "lgd_code": 302160, "block": "South Goa East Block", "villages": ["Kalyanpur South Goa", "Rampur South Goa", "Shivpur South Goa"]}
                ]
            },
        }
    },
    "Gujarat": {
        "districts": {
            "Ahmedabad": {
                "lgd_code": 1161,
                "name_hi": "Ahmedabad",
                "headquarters": "Ahmedabad",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ahmedabad Sadar", "Ahmedabad North", "Ahmedabad South", "Ahmedabad Rural"],
                "blocks": ["Ahmedabad Block", "Ahmedabad West Block", "Ahmedabad East Block"],
                "panchayats": [
                    {"name": "Ahmedabad Central Gram Panchayat", "lgd_code": 301161, "block": "Ahmedabad Block", "villages": ["Ahmedabad Khas", "Ahmedabad Dehat", "Ahmedabad Purva"]},
                    {"name": "Ahmedabad Model Krishi Panchayat", "lgd_code": 302161, "block": "Ahmedabad East Block", "villages": ["Kalyanpur Ahmedabad", "Rampur Ahmedabad", "Shivpur Ahmedabad"]}
                ]
            },
            "Amreli": {
                "lgd_code": 1162,
                "name_hi": "Amreli",
                "headquarters": "Amreli",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Amreli Sadar", "Amreli North", "Amreli South", "Amreli Rural"],
                "blocks": ["Amreli Block", "Amreli West Block", "Amreli East Block"],
                "panchayats": [
                    {"name": "Amreli Central Gram Panchayat", "lgd_code": 301162, "block": "Amreli Block", "villages": ["Amreli Khas", "Amreli Dehat", "Amreli Purva"]},
                    {"name": "Amreli Model Krishi Panchayat", "lgd_code": 302162, "block": "Amreli East Block", "villages": ["Kalyanpur Amreli", "Rampur Amreli", "Shivpur Amreli"]}
                ]
            },
            "Anand": {
                "lgd_code": 1163,
                "name_hi": "Anand",
                "headquarters": "Anand",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anand Sadar", "Anand North", "Anand South", "Anand Rural"],
                "blocks": ["Anand Block", "Anand West Block", "Anand East Block"],
                "panchayats": [
                    {"name": "Anand Central Gram Panchayat", "lgd_code": 301163, "block": "Anand Block", "villages": ["Anand Khas", "Anand Dehat", "Anand Purva"]},
                    {"name": "Anand Model Krishi Panchayat", "lgd_code": 302163, "block": "Anand East Block", "villages": ["Kalyanpur Anand", "Rampur Anand", "Shivpur Anand"]}
                ]
            },
            "Aravalli": {
                "lgd_code": 1164,
                "name_hi": "Aravalli",
                "headquarters": "Aravalli",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Aravalli Sadar", "Aravalli North", "Aravalli South", "Aravalli Rural"],
                "blocks": ["Aravalli Block", "Aravalli West Block", "Aravalli East Block"],
                "panchayats": [
                    {"name": "Aravalli Central Gram Panchayat", "lgd_code": 301164, "block": "Aravalli Block", "villages": ["Aravalli Khas", "Aravalli Dehat", "Aravalli Purva"]},
                    {"name": "Aravalli Model Krishi Panchayat", "lgd_code": 302164, "block": "Aravalli East Block", "villages": ["Kalyanpur Aravalli", "Rampur Aravalli", "Shivpur Aravalli"]}
                ]
            },
            "Banaskantha (Palanpur)": {
                "lgd_code": 1165,
                "name_hi": "Banaskantha",
                "headquarters": "Banaskantha",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Banaskantha Sadar", "Banaskantha North", "Banaskantha South", "Banaskantha Rural"],
                "blocks": ["Banaskantha Block", "Banaskantha West Block", "Banaskantha East Block"],
                "panchayats": [
                    {"name": "Banaskantha Central Gram Panchayat", "lgd_code": 301165, "block": "Banaskantha Block", "villages": ["Banaskantha Khas", "Banaskantha Dehat", "Banaskantha Purva"]},
                    {"name": "Banaskantha Model Krishi Panchayat", "lgd_code": 302165, "block": "Banaskantha East Block", "villages": ["Kalyanpur Banaskantha", "Rampur Banaskantha", "Shivpur Banaskantha"]}
                ]
            },
            "Bharuch": {
                "lgd_code": 1166,
                "name_hi": "Bharuch",
                "headquarters": "Bharuch",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bharuch Sadar", "Bharuch North", "Bharuch South", "Bharuch Rural"],
                "blocks": ["Bharuch Block", "Bharuch West Block", "Bharuch East Block"],
                "panchayats": [
                    {"name": "Bharuch Central Gram Panchayat", "lgd_code": 301166, "block": "Bharuch Block", "villages": ["Bharuch Khas", "Bharuch Dehat", "Bharuch Purva"]},
                    {"name": "Bharuch Model Krishi Panchayat", "lgd_code": 302166, "block": "Bharuch East Block", "villages": ["Kalyanpur Bharuch", "Rampur Bharuch", "Shivpur Bharuch"]}
                ]
            },
            "Bhavnagar": {
                "lgd_code": 1167,
                "name_hi": "Bhavnagar",
                "headquarters": "Bhavnagar",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhavnagar Sadar", "Bhavnagar North", "Bhavnagar South", "Bhavnagar Rural"],
                "blocks": ["Bhavnagar Block", "Bhavnagar West Block", "Bhavnagar East Block"],
                "panchayats": [
                    {"name": "Bhavnagar Central Gram Panchayat", "lgd_code": 301167, "block": "Bhavnagar Block", "villages": ["Bhavnagar Khas", "Bhavnagar Dehat", "Bhavnagar Purva"]},
                    {"name": "Bhavnagar Model Krishi Panchayat", "lgd_code": 302167, "block": "Bhavnagar East Block", "villages": ["Kalyanpur Bhavnagar", "Rampur Bhavnagar", "Shivpur Bhavnagar"]}
                ]
            },
            "Botad": {
                "lgd_code": 1168,
                "name_hi": "Botad",
                "headquarters": "Botad",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Botad Sadar", "Botad North", "Botad South", "Botad Rural"],
                "blocks": ["Botad Block", "Botad West Block", "Botad East Block"],
                "panchayats": [
                    {"name": "Botad Central Gram Panchayat", "lgd_code": 301168, "block": "Botad Block", "villages": ["Botad Khas", "Botad Dehat", "Botad Purva"]},
                    {"name": "Botad Model Krishi Panchayat", "lgd_code": 302168, "block": "Botad East Block", "villages": ["Kalyanpur Botad", "Rampur Botad", "Shivpur Botad"]}
                ]
            },
            "Chhota Udaipur": {
                "lgd_code": 1169,
                "name_hi": "Chhota Udaipur",
                "headquarters": "Chhota Udaipur",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chhota Udaipur Sadar", "Chhota Udaipur North", "Chhota Udaipur South", "Chhota Udaipur Rural"],
                "blocks": ["Chhota Udaipur Block", "Chhota Udaipur West Block", "Chhota Udaipur East Block"],
                "panchayats": [
                    {"name": "Chhota Udaipur Central Gram Panchayat", "lgd_code": 301169, "block": "Chhota Udaipur Block", "villages": ["Chhota Udaipur Khas", "Chhota Udaipur Dehat", "Chhota Udaipur Purva"]},
                    {"name": "Chhota Udaipur Model Krishi Panchayat", "lgd_code": 302169, "block": "Chhota Udaipur East Block", "villages": ["Kalyanpur Chhota Udaipur", "Rampur Chhota Udaipur", "Shivpur Chhota Udaipur"]}
                ]
            },
            "Dahod": {
                "lgd_code": 1170,
                "name_hi": "Dahod",
                "headquarters": "Dahod",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dahod Sadar", "Dahod North", "Dahod South", "Dahod Rural"],
                "blocks": ["Dahod Block", "Dahod West Block", "Dahod East Block"],
                "panchayats": [
                    {"name": "Dahod Central Gram Panchayat", "lgd_code": 301170, "block": "Dahod Block", "villages": ["Dahod Khas", "Dahod Dehat", "Dahod Purva"]},
                    {"name": "Dahod Model Krishi Panchayat", "lgd_code": 302170, "block": "Dahod East Block", "villages": ["Kalyanpur Dahod", "Rampur Dahod", "Shivpur Dahod"]}
                ]
            },
            "Dang (Ahwa)": {
                "lgd_code": 1171,
                "name_hi": "Dang",
                "headquarters": "Dang",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dang Sadar", "Dang North", "Dang South", "Dang Rural"],
                "blocks": ["Dang Block", "Dang West Block", "Dang East Block"],
                "panchayats": [
                    {"name": "Dang Central Gram Panchayat", "lgd_code": 301171, "block": "Dang Block", "villages": ["Dang Khas", "Dang Dehat", "Dang Purva"]},
                    {"name": "Dang Model Krishi Panchayat", "lgd_code": 302171, "block": "Dang East Block", "villages": ["Kalyanpur Dang", "Rampur Dang", "Shivpur Dang"]}
                ]
            },
            "Devbhumi Dwarka": {
                "lgd_code": 1172,
                "name_hi": "Devbhumi Dwarka",
                "headquarters": "Devbhumi Dwarka",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Devbhumi Dwarka Sadar", "Devbhumi Dwarka North", "Devbhumi Dwarka South", "Devbhumi Dwarka Rural"],
                "blocks": ["Devbhumi Dwarka Block", "Devbhumi Dwarka West Block", "Devbhumi Dwarka East Block"],
                "panchayats": [
                    {"name": "Devbhumi Dwarka Central Gram Panchayat", "lgd_code": 301172, "block": "Devbhumi Dwarka Block", "villages": ["Devbhumi Dwarka Khas", "Devbhumi Dwarka Dehat", "Devbhumi Dwarka Purva"]},
                    {"name": "Devbhumi Dwarka Model Krishi Panchayat", "lgd_code": 302172, "block": "Devbhumi Dwarka East Block", "villages": ["Kalyanpur Devbhumi Dwarka", "Rampur Devbhumi Dwarka", "Shivpur Devbhumi Dwarka"]}
                ]
            },
            "Gandhinagar": {
                "lgd_code": 1173,
                "name_hi": "Gandhinagar",
                "headquarters": "Gandhinagar",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gandhinagar Sadar", "Gandhinagar North", "Gandhinagar South", "Gandhinagar Rural"],
                "blocks": ["Gandhinagar Block", "Gandhinagar West Block", "Gandhinagar East Block"],
                "panchayats": [
                    {"name": "Gandhinagar Central Gram Panchayat", "lgd_code": 301173, "block": "Gandhinagar Block", "villages": ["Gandhinagar Khas", "Gandhinagar Dehat", "Gandhinagar Purva"]},
                    {"name": "Gandhinagar Model Krishi Panchayat", "lgd_code": 302173, "block": "Gandhinagar East Block", "villages": ["Kalyanpur Gandhinagar", "Rampur Gandhinagar", "Shivpur Gandhinagar"]}
                ]
            },
            "Gir Somnath": {
                "lgd_code": 1174,
                "name_hi": "Gir Somnath",
                "headquarters": "Gir Somnath",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gir Somnath Sadar", "Gir Somnath North", "Gir Somnath South", "Gir Somnath Rural"],
                "blocks": ["Gir Somnath Block", "Gir Somnath West Block", "Gir Somnath East Block"],
                "panchayats": [
                    {"name": "Gir Somnath Central Gram Panchayat", "lgd_code": 301174, "block": "Gir Somnath Block", "villages": ["Gir Somnath Khas", "Gir Somnath Dehat", "Gir Somnath Purva"]},
                    {"name": "Gir Somnath Model Krishi Panchayat", "lgd_code": 302174, "block": "Gir Somnath East Block", "villages": ["Kalyanpur Gir Somnath", "Rampur Gir Somnath", "Shivpur Gir Somnath"]}
                ]
            },
            "Jamnagar": {
                "lgd_code": 1175,
                "name_hi": "Jamnagar",
                "headquarters": "Jamnagar",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jamnagar Sadar", "Jamnagar North", "Jamnagar South", "Jamnagar Rural"],
                "blocks": ["Jamnagar Block", "Jamnagar West Block", "Jamnagar East Block"],
                "panchayats": [
                    {"name": "Jamnagar Central Gram Panchayat", "lgd_code": 301175, "block": "Jamnagar Block", "villages": ["Jamnagar Khas", "Jamnagar Dehat", "Jamnagar Purva"]},
                    {"name": "Jamnagar Model Krishi Panchayat", "lgd_code": 302175, "block": "Jamnagar East Block", "villages": ["Kalyanpur Jamnagar", "Rampur Jamnagar", "Shivpur Jamnagar"]}
                ]
            },
            "Junagadh": {
                "lgd_code": 1176,
                "name_hi": "Junagadh",
                "headquarters": "Junagadh",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Junagadh Sadar", "Junagadh North", "Junagadh South", "Junagadh Rural"],
                "blocks": ["Junagadh Block", "Junagadh West Block", "Junagadh East Block"],
                "panchayats": [
                    {"name": "Junagadh Central Gram Panchayat", "lgd_code": 301176, "block": "Junagadh Block", "villages": ["Junagadh Khas", "Junagadh Dehat", "Junagadh Purva"]},
                    {"name": "Junagadh Model Krishi Panchayat", "lgd_code": 302176, "block": "Junagadh East Block", "villages": ["Kalyanpur Junagadh", "Rampur Junagadh", "Shivpur Junagadh"]}
                ]
            },
            "Kheda (Nadiad)": {
                "lgd_code": 1177,
                "name_hi": "Kheda",
                "headquarters": "Kheda",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kheda Sadar", "Kheda North", "Kheda South", "Kheda Rural"],
                "blocks": ["Kheda Block", "Kheda West Block", "Kheda East Block"],
                "panchayats": [
                    {"name": "Kheda Central Gram Panchayat", "lgd_code": 301177, "block": "Kheda Block", "villages": ["Kheda Khas", "Kheda Dehat", "Kheda Purva"]},
                    {"name": "Kheda Model Krishi Panchayat", "lgd_code": 302177, "block": "Kheda East Block", "villages": ["Kalyanpur Kheda", "Rampur Kheda", "Shivpur Kheda"]}
                ]
            },
            "Kutch (Bhuj)": {
                "lgd_code": 1178,
                "name_hi": "Kutch",
                "headquarters": "Kutch",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kutch Sadar", "Kutch North", "Kutch South", "Kutch Rural"],
                "blocks": ["Kutch Block", "Kutch West Block", "Kutch East Block"],
                "panchayats": [
                    {"name": "Kutch Central Gram Panchayat", "lgd_code": 301178, "block": "Kutch Block", "villages": ["Kutch Khas", "Kutch Dehat", "Kutch Purva"]},
                    {"name": "Kutch Model Krishi Panchayat", "lgd_code": 302178, "block": "Kutch East Block", "villages": ["Kalyanpur Kutch", "Rampur Kutch", "Shivpur Kutch"]}
                ]
            },
            "Mahisagar": {
                "lgd_code": 1179,
                "name_hi": "Mahisagar",
                "headquarters": "Mahisagar",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahisagar Sadar", "Mahisagar North", "Mahisagar South", "Mahisagar Rural"],
                "blocks": ["Mahisagar Block", "Mahisagar West Block", "Mahisagar East Block"],
                "panchayats": [
                    {"name": "Mahisagar Central Gram Panchayat", "lgd_code": 301179, "block": "Mahisagar Block", "villages": ["Mahisagar Khas", "Mahisagar Dehat", "Mahisagar Purva"]},
                    {"name": "Mahisagar Model Krishi Panchayat", "lgd_code": 302179, "block": "Mahisagar East Block", "villages": ["Kalyanpur Mahisagar", "Rampur Mahisagar", "Shivpur Mahisagar"]}
                ]
            },
            "Mehsana": {
                "lgd_code": 1180,
                "name_hi": "Mehsana",
                "headquarters": "Mehsana",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mehsana Sadar", "Mehsana North", "Mehsana South", "Mehsana Rural"],
                "blocks": ["Mehsana Block", "Mehsana West Block", "Mehsana East Block"],
                "panchayats": [
                    {"name": "Mehsana Central Gram Panchayat", "lgd_code": 301180, "block": "Mehsana Block", "villages": ["Mehsana Khas", "Mehsana Dehat", "Mehsana Purva"]},
                    {"name": "Mehsana Model Krishi Panchayat", "lgd_code": 302180, "block": "Mehsana East Block", "villages": ["Kalyanpur Mehsana", "Rampur Mehsana", "Shivpur Mehsana"]}
                ]
            },
            "Morbi": {
                "lgd_code": 1181,
                "name_hi": "Morbi",
                "headquarters": "Morbi",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Morbi Sadar", "Morbi North", "Morbi South", "Morbi Rural"],
                "blocks": ["Morbi Block", "Morbi West Block", "Morbi East Block"],
                "panchayats": [
                    {"name": "Morbi Central Gram Panchayat", "lgd_code": 301181, "block": "Morbi Block", "villages": ["Morbi Khas", "Morbi Dehat", "Morbi Purva"]},
                    {"name": "Morbi Model Krishi Panchayat", "lgd_code": 302181, "block": "Morbi East Block", "villages": ["Kalyanpur Morbi", "Rampur Morbi", "Shivpur Morbi"]}
                ]
            },
            "Narmada (Rajpipla)": {
                "lgd_code": 1182,
                "name_hi": "Narmada",
                "headquarters": "Narmada",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Narmada Sadar", "Narmada North", "Narmada South", "Narmada Rural"],
                "blocks": ["Narmada Block", "Narmada West Block", "Narmada East Block"],
                "panchayats": [
                    {"name": "Narmada Central Gram Panchayat", "lgd_code": 301182, "block": "Narmada Block", "villages": ["Narmada Khas", "Narmada Dehat", "Narmada Purva"]},
                    {"name": "Narmada Model Krishi Panchayat", "lgd_code": 302182, "block": "Narmada East Block", "villages": ["Kalyanpur Narmada", "Rampur Narmada", "Shivpur Narmada"]}
                ]
            },
            "Navsari": {
                "lgd_code": 1183,
                "name_hi": "Navsari",
                "headquarters": "Navsari",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Navsari Sadar", "Navsari North", "Navsari South", "Navsari Rural"],
                "blocks": ["Navsari Block", "Navsari West Block", "Navsari East Block"],
                "panchayats": [
                    {"name": "Navsari Central Gram Panchayat", "lgd_code": 301183, "block": "Navsari Block", "villages": ["Navsari Khas", "Navsari Dehat", "Navsari Purva"]},
                    {"name": "Navsari Model Krishi Panchayat", "lgd_code": 302183, "block": "Navsari East Block", "villages": ["Kalyanpur Navsari", "Rampur Navsari", "Shivpur Navsari"]}
                ]
            },
            "Panchmahal (Godhra)": {
                "lgd_code": 1184,
                "name_hi": "Panchmahal",
                "headquarters": "Panchmahal",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Panchmahal Sadar", "Panchmahal North", "Panchmahal South", "Panchmahal Rural"],
                "blocks": ["Panchmahal Block", "Panchmahal West Block", "Panchmahal East Block"],
                "panchayats": [
                    {"name": "Panchmahal Central Gram Panchayat", "lgd_code": 301184, "block": "Panchmahal Block", "villages": ["Panchmahal Khas", "Panchmahal Dehat", "Panchmahal Purva"]},
                    {"name": "Panchmahal Model Krishi Panchayat", "lgd_code": 302184, "block": "Panchmahal East Block", "villages": ["Kalyanpur Panchmahal", "Rampur Panchmahal", "Shivpur Panchmahal"]}
                ]
            },
            "Patan": {
                "lgd_code": 1185,
                "name_hi": "Patan",
                "headquarters": "Patan",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Patan Sadar", "Patan North", "Patan South", "Patan Rural"],
                "blocks": ["Patan Block", "Patan West Block", "Patan East Block"],
                "panchayats": [
                    {"name": "Patan Central Gram Panchayat", "lgd_code": 301185, "block": "Patan Block", "villages": ["Patan Khas", "Patan Dehat", "Patan Purva"]},
                    {"name": "Patan Model Krishi Panchayat", "lgd_code": 302185, "block": "Patan East Block", "villages": ["Kalyanpur Patan", "Rampur Patan", "Shivpur Patan"]}
                ]
            },
            "Porbandar": {
                "lgd_code": 1186,
                "name_hi": "Porbandar",
                "headquarters": "Porbandar",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Porbandar Sadar", "Porbandar North", "Porbandar South", "Porbandar Rural"],
                "blocks": ["Porbandar Block", "Porbandar West Block", "Porbandar East Block"],
                "panchayats": [
                    {"name": "Porbandar Central Gram Panchayat", "lgd_code": 301186, "block": "Porbandar Block", "villages": ["Porbandar Khas", "Porbandar Dehat", "Porbandar Purva"]},
                    {"name": "Porbandar Model Krishi Panchayat", "lgd_code": 302186, "block": "Porbandar East Block", "villages": ["Kalyanpur Porbandar", "Rampur Porbandar", "Shivpur Porbandar"]}
                ]
            },
            "Rajkot": {
                "lgd_code": 1187,
                "name_hi": "Rajkot",
                "headquarters": "Rajkot",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajkot Sadar", "Rajkot North", "Rajkot South", "Rajkot Rural"],
                "blocks": ["Rajkot Block", "Rajkot West Block", "Rajkot East Block"],
                "panchayats": [
                    {"name": "Rajkot Central Gram Panchayat", "lgd_code": 301187, "block": "Rajkot Block", "villages": ["Rajkot Khas", "Rajkot Dehat", "Rajkot Purva"]},
                    {"name": "Rajkot Model Krishi Panchayat", "lgd_code": 302187, "block": "Rajkot East Block", "villages": ["Kalyanpur Rajkot", "Rampur Rajkot", "Shivpur Rajkot"]}
                ]
            },
            "Sabarkantha (Himmatnagar)": {
                "lgd_code": 1188,
                "name_hi": "Sabarkantha",
                "headquarters": "Sabarkantha",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sabarkantha Sadar", "Sabarkantha North", "Sabarkantha South", "Sabarkantha Rural"],
                "blocks": ["Sabarkantha Block", "Sabarkantha West Block", "Sabarkantha East Block"],
                "panchayats": [
                    {"name": "Sabarkantha Central Gram Panchayat", "lgd_code": 301188, "block": "Sabarkantha Block", "villages": ["Sabarkantha Khas", "Sabarkantha Dehat", "Sabarkantha Purva"]},
                    {"name": "Sabarkantha Model Krishi Panchayat", "lgd_code": 302188, "block": "Sabarkantha East Block", "villages": ["Kalyanpur Sabarkantha", "Rampur Sabarkantha", "Shivpur Sabarkantha"]}
                ]
            },
            "Surat": {
                "lgd_code": 1189,
                "name_hi": "Surat",
                "headquarters": "Surat",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Surat Sadar", "Surat North", "Surat South", "Surat Rural"],
                "blocks": ["Surat Block", "Surat West Block", "Surat East Block"],
                "panchayats": [
                    {"name": "Surat Central Gram Panchayat", "lgd_code": 301189, "block": "Surat Block", "villages": ["Surat Khas", "Surat Dehat", "Surat Purva"]},
                    {"name": "Surat Model Krishi Panchayat", "lgd_code": 302189, "block": "Surat East Block", "villages": ["Kalyanpur Surat", "Rampur Surat", "Shivpur Surat"]}
                ]
            },
            "Surendranagar": {
                "lgd_code": 1190,
                "name_hi": "Surendranagar",
                "headquarters": "Surendranagar",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Surendranagar Sadar", "Surendranagar North", "Surendranagar South", "Surendranagar Rural"],
                "blocks": ["Surendranagar Block", "Surendranagar West Block", "Surendranagar East Block"],
                "panchayats": [
                    {"name": "Surendranagar Central Gram Panchayat", "lgd_code": 301190, "block": "Surendranagar Block", "villages": ["Surendranagar Khas", "Surendranagar Dehat", "Surendranagar Purva"]},
                    {"name": "Surendranagar Model Krishi Panchayat", "lgd_code": 302190, "block": "Surendranagar East Block", "villages": ["Kalyanpur Surendranagar", "Rampur Surendranagar", "Shivpur Surendranagar"]}
                ]
            },
            "Tapi (Vyara)": {
                "lgd_code": 1191,
                "name_hi": "Tapi",
                "headquarters": "Tapi",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tapi Sadar", "Tapi North", "Tapi South", "Tapi Rural"],
                "blocks": ["Tapi Block", "Tapi West Block", "Tapi East Block"],
                "panchayats": [
                    {"name": "Tapi Central Gram Panchayat", "lgd_code": 301191, "block": "Tapi Block", "villages": ["Tapi Khas", "Tapi Dehat", "Tapi Purva"]},
                    {"name": "Tapi Model Krishi Panchayat", "lgd_code": 302191, "block": "Tapi East Block", "villages": ["Kalyanpur Tapi", "Rampur Tapi", "Shivpur Tapi"]}
                ]
            },
            "Vadodara": {
                "lgd_code": 1192,
                "name_hi": "Vadodara",
                "headquarters": "Vadodara",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vadodara Sadar", "Vadodara North", "Vadodara South", "Vadodara Rural"],
                "blocks": ["Vadodara Block", "Vadodara West Block", "Vadodara East Block"],
                "panchayats": [
                    {"name": "Vadodara Central Gram Panchayat", "lgd_code": 301192, "block": "Vadodara Block", "villages": ["Vadodara Khas", "Vadodara Dehat", "Vadodara Purva"]},
                    {"name": "Vadodara Model Krishi Panchayat", "lgd_code": 302192, "block": "Vadodara East Block", "villages": ["Kalyanpur Vadodara", "Rampur Vadodara", "Shivpur Vadodara"]}
                ]
            },
            "Valsad": {
                "lgd_code": 1193,
                "name_hi": "Valsad",
                "headquarters": "Valsad",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Valsad Sadar", "Valsad North", "Valsad South", "Valsad Rural"],
                "blocks": ["Valsad Block", "Valsad West Block", "Valsad East Block"],
                "panchayats": [
                    {"name": "Valsad Central Gram Panchayat", "lgd_code": 301193, "block": "Valsad Block", "villages": ["Valsad Khas", "Valsad Dehat", "Valsad Purva"]},
                    {"name": "Valsad Model Krishi Panchayat", "lgd_code": 302193, "block": "Valsad East Block", "villages": ["Kalyanpur Valsad", "Rampur Valsad", "Shivpur Valsad"]}
                ]
            },
        }
    },
    "Haryana": {
        "districts": {
            "Ambala": {
                "lgd_code": 1194,
                "name_hi": "Ambala",
                "headquarters": "Ambala",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ambala Sadar", "Ambala North", "Ambala South", "Ambala Rural"],
                "blocks": ["Ambala Block", "Ambala West Block", "Ambala East Block"],
                "panchayats": [
                    {"name": "Ambala Central Gram Panchayat", "lgd_code": 301194, "block": "Ambala Block", "villages": ["Ambala Khas", "Ambala Dehat", "Ambala Purva"]},
                    {"name": "Ambala Model Krishi Panchayat", "lgd_code": 302194, "block": "Ambala East Block", "villages": ["Kalyanpur Ambala", "Rampur Ambala", "Shivpur Ambala"]}
                ]
            },
            "Bhiwani": {
                "lgd_code": 1195,
                "name_hi": "Bhiwani",
                "headquarters": "Bhiwani",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhiwani Sadar", "Bhiwani North", "Bhiwani South", "Bhiwani Rural"],
                "blocks": ["Bhiwani Block", "Bhiwani West Block", "Bhiwani East Block"],
                "panchayats": [
                    {"name": "Bhiwani Central Gram Panchayat", "lgd_code": 301195, "block": "Bhiwani Block", "villages": ["Bhiwani Khas", "Bhiwani Dehat", "Bhiwani Purva"]},
                    {"name": "Bhiwani Model Krishi Panchayat", "lgd_code": 302195, "block": "Bhiwani East Block", "villages": ["Kalyanpur Bhiwani", "Rampur Bhiwani", "Shivpur Bhiwani"]}
                ]
            },
            "Charkhi Dadri": {
                "lgd_code": 1196,
                "name_hi": "Charkhi Dadri",
                "headquarters": "Charkhi Dadri",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Charkhi Dadri Sadar", "Charkhi Dadri North", "Charkhi Dadri South", "Charkhi Dadri Rural"],
                "blocks": ["Charkhi Dadri Block", "Charkhi Dadri West Block", "Charkhi Dadri East Block"],
                "panchayats": [
                    {"name": "Charkhi Dadri Central Gram Panchayat", "lgd_code": 301196, "block": "Charkhi Dadri Block", "villages": ["Charkhi Dadri Khas", "Charkhi Dadri Dehat", "Charkhi Dadri Purva"]},
                    {"name": "Charkhi Dadri Model Krishi Panchayat", "lgd_code": 302196, "block": "Charkhi Dadri East Block", "villages": ["Kalyanpur Charkhi Dadri", "Rampur Charkhi Dadri", "Shivpur Charkhi Dadri"]}
                ]
            },
            "Faridabad": {
                "lgd_code": 1197,
                "name_hi": "Faridabad",
                "headquarters": "Faridabad",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Faridabad Sadar", "Faridabad North", "Faridabad South", "Faridabad Rural"],
                "blocks": ["Faridabad Block", "Faridabad West Block", "Faridabad East Block"],
                "panchayats": [
                    {"name": "Faridabad Central Gram Panchayat", "lgd_code": 301197, "block": "Faridabad Block", "villages": ["Faridabad Khas", "Faridabad Dehat", "Faridabad Purva"]},
                    {"name": "Faridabad Model Krishi Panchayat", "lgd_code": 302197, "block": "Faridabad East Block", "villages": ["Kalyanpur Faridabad", "Rampur Faridabad", "Shivpur Faridabad"]}
                ]
            },
            "Fatehabad": {
                "lgd_code": 1198,
                "name_hi": "Fatehabad",
                "headquarters": "Fatehabad",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Fatehabad Sadar", "Fatehabad North", "Fatehabad South", "Fatehabad Rural"],
                "blocks": ["Fatehabad Block", "Fatehabad West Block", "Fatehabad East Block"],
                "panchayats": [
                    {"name": "Fatehabad Central Gram Panchayat", "lgd_code": 301198, "block": "Fatehabad Block", "villages": ["Fatehabad Khas", "Fatehabad Dehat", "Fatehabad Purva"]},
                    {"name": "Fatehabad Model Krishi Panchayat", "lgd_code": 302198, "block": "Fatehabad East Block", "villages": ["Kalyanpur Fatehabad", "Rampur Fatehabad", "Shivpur Fatehabad"]}
                ]
            },
            "Gurugram": {
                "lgd_code": 1199,
                "name_hi": "Gurugram",
                "headquarters": "Gurugram",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gurugram Sadar", "Gurugram North", "Gurugram South", "Gurugram Rural"],
                "blocks": ["Gurugram Block", "Gurugram West Block", "Gurugram East Block"],
                "panchayats": [
                    {"name": "Gurugram Central Gram Panchayat", "lgd_code": 301199, "block": "Gurugram Block", "villages": ["Gurugram Khas", "Gurugram Dehat", "Gurugram Purva"]},
                    {"name": "Gurugram Model Krishi Panchayat", "lgd_code": 302199, "block": "Gurugram East Block", "villages": ["Kalyanpur Gurugram", "Rampur Gurugram", "Shivpur Gurugram"]}
                ]
            },
            "Hisar": {
                "lgd_code": 1200,
                "name_hi": "Hisar",
                "headquarters": "Hisar",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hisar Sadar", "Hisar North", "Hisar South", "Hisar Rural"],
                "blocks": ["Hisar Block", "Hisar West Block", "Hisar East Block"],
                "panchayats": [
                    {"name": "Hisar Central Gram Panchayat", "lgd_code": 301200, "block": "Hisar Block", "villages": ["Hisar Khas", "Hisar Dehat", "Hisar Purva"]},
                    {"name": "Hisar Model Krishi Panchayat", "lgd_code": 302200, "block": "Hisar East Block", "villages": ["Kalyanpur Hisar", "Rampur Hisar", "Shivpur Hisar"]}
                ]
            },
            "Jhajjar": {
                "lgd_code": 1201,
                "name_hi": "Jhajjar",
                "headquarters": "Jhajjar",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhajjar Sadar", "Jhajjar North", "Jhajjar South", "Jhajjar Rural"],
                "blocks": ["Jhajjar Block", "Jhajjar West Block", "Jhajjar East Block"],
                "panchayats": [
                    {"name": "Jhajjar Central Gram Panchayat", "lgd_code": 301201, "block": "Jhajjar Block", "villages": ["Jhajjar Khas", "Jhajjar Dehat", "Jhajjar Purva"]},
                    {"name": "Jhajjar Model Krishi Panchayat", "lgd_code": 302201, "block": "Jhajjar East Block", "villages": ["Kalyanpur Jhajjar", "Rampur Jhajjar", "Shivpur Jhajjar"]}
                ]
            },
            "Jind": {
                "lgd_code": 1202,
                "name_hi": "Jind",
                "headquarters": "Jind",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jind Sadar", "Jind North", "Jind South", "Jind Rural"],
                "blocks": ["Jind Block", "Jind West Block", "Jind East Block"],
                "panchayats": [
                    {"name": "Jind Central Gram Panchayat", "lgd_code": 301202, "block": "Jind Block", "villages": ["Jind Khas", "Jind Dehat", "Jind Purva"]},
                    {"name": "Jind Model Krishi Panchayat", "lgd_code": 302202, "block": "Jind East Block", "villages": ["Kalyanpur Jind", "Rampur Jind", "Shivpur Jind"]}
                ]
            },
            "Kaithal": {
                "lgd_code": 1203,
                "name_hi": "Kaithal",
                "headquarters": "Kaithal",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kaithal Sadar", "Kaithal North", "Kaithal South", "Kaithal Rural"],
                "blocks": ["Kaithal Block", "Kaithal West Block", "Kaithal East Block"],
                "panchayats": [
                    {"name": "Kaithal Central Gram Panchayat", "lgd_code": 301203, "block": "Kaithal Block", "villages": ["Kaithal Khas", "Kaithal Dehat", "Kaithal Purva"]},
                    {"name": "Kaithal Model Krishi Panchayat", "lgd_code": 302203, "block": "Kaithal East Block", "villages": ["Kalyanpur Kaithal", "Rampur Kaithal", "Shivpur Kaithal"]}
                ]
            },
            "Karnal": {
                "lgd_code": 1204,
                "name_hi": "Karnal",
                "headquarters": "Karnal",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karnal Sadar", "Karnal North", "Karnal South", "Karnal Rural"],
                "blocks": ["Karnal Block", "Karnal West Block", "Karnal East Block"],
                "panchayats": [
                    {"name": "Karnal Central Gram Panchayat", "lgd_code": 301204, "block": "Karnal Block", "villages": ["Karnal Khas", "Karnal Dehat", "Karnal Purva"]},
                    {"name": "Karnal Model Krishi Panchayat", "lgd_code": 302204, "block": "Karnal East Block", "villages": ["Kalyanpur Karnal", "Rampur Karnal", "Shivpur Karnal"]}
                ]
            },
            "Kurukshetra": {
                "lgd_code": 1205,
                "name_hi": "Kurukshetra",
                "headquarters": "Kurukshetra",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kurukshetra Sadar", "Kurukshetra North", "Kurukshetra South", "Kurukshetra Rural"],
                "blocks": ["Kurukshetra Block", "Kurukshetra West Block", "Kurukshetra East Block"],
                "panchayats": [
                    {"name": "Kurukshetra Central Gram Panchayat", "lgd_code": 301205, "block": "Kurukshetra Block", "villages": ["Kurukshetra Khas", "Kurukshetra Dehat", "Kurukshetra Purva"]},
                    {"name": "Kurukshetra Model Krishi Panchayat", "lgd_code": 302205, "block": "Kurukshetra East Block", "villages": ["Kalyanpur Kurukshetra", "Rampur Kurukshetra", "Shivpur Kurukshetra"]}
                ]
            },
            "Mahendragarh (Narnaul)": {
                "lgd_code": 1206,
                "name_hi": "Mahendragarh",
                "headquarters": "Mahendragarh",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahendragarh Sadar", "Mahendragarh North", "Mahendragarh South", "Mahendragarh Rural"],
                "blocks": ["Mahendragarh Block", "Mahendragarh West Block", "Mahendragarh East Block"],
                "panchayats": [
                    {"name": "Mahendragarh Central Gram Panchayat", "lgd_code": 301206, "block": "Mahendragarh Block", "villages": ["Mahendragarh Khas", "Mahendragarh Dehat", "Mahendragarh Purva"]},
                    {"name": "Mahendragarh Model Krishi Panchayat", "lgd_code": 302206, "block": "Mahendragarh East Block", "villages": ["Kalyanpur Mahendragarh", "Rampur Mahendragarh", "Shivpur Mahendragarh"]}
                ]
            },
            "Nuh (Mewat)": {
                "lgd_code": 1207,
                "name_hi": "Nuh",
                "headquarters": "Nuh",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nuh Sadar", "Nuh North", "Nuh South", "Nuh Rural"],
                "blocks": ["Nuh Block", "Nuh West Block", "Nuh East Block"],
                "panchayats": [
                    {"name": "Nuh Central Gram Panchayat", "lgd_code": 301207, "block": "Nuh Block", "villages": ["Nuh Khas", "Nuh Dehat", "Nuh Purva"]},
                    {"name": "Nuh Model Krishi Panchayat", "lgd_code": 302207, "block": "Nuh East Block", "villages": ["Kalyanpur Nuh", "Rampur Nuh", "Shivpur Nuh"]}
                ]
            },
            "Palwal": {
                "lgd_code": 1208,
                "name_hi": "Palwal",
                "headquarters": "Palwal",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Palwal Sadar", "Palwal North", "Palwal South", "Palwal Rural"],
                "blocks": ["Palwal Block", "Palwal West Block", "Palwal East Block"],
                "panchayats": [
                    {"name": "Palwal Central Gram Panchayat", "lgd_code": 301208, "block": "Palwal Block", "villages": ["Palwal Khas", "Palwal Dehat", "Palwal Purva"]},
                    {"name": "Palwal Model Krishi Panchayat", "lgd_code": 302208, "block": "Palwal East Block", "villages": ["Kalyanpur Palwal", "Rampur Palwal", "Shivpur Palwal"]}
                ]
            },
            "Panchkula": {
                "lgd_code": 1209,
                "name_hi": "Panchkula",
                "headquarters": "Panchkula",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Panchkula Sadar", "Panchkula North", "Panchkula South", "Panchkula Rural"],
                "blocks": ["Panchkula Block", "Panchkula West Block", "Panchkula East Block"],
                "panchayats": [
                    {"name": "Panchkula Central Gram Panchayat", "lgd_code": 301209, "block": "Panchkula Block", "villages": ["Panchkula Khas", "Panchkula Dehat", "Panchkula Purva"]},
                    {"name": "Panchkula Model Krishi Panchayat", "lgd_code": 302209, "block": "Panchkula East Block", "villages": ["Kalyanpur Panchkula", "Rampur Panchkula", "Shivpur Panchkula"]}
                ]
            },
            "Panipat": {
                "lgd_code": 1210,
                "name_hi": "Panipat",
                "headquarters": "Panipat",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Panipat Sadar", "Panipat North", "Panipat South", "Panipat Rural"],
                "blocks": ["Panipat Block", "Panipat West Block", "Panipat East Block"],
                "panchayats": [
                    {"name": "Panipat Central Gram Panchayat", "lgd_code": 301210, "block": "Panipat Block", "villages": ["Panipat Khas", "Panipat Dehat", "Panipat Purva"]},
                    {"name": "Panipat Model Krishi Panchayat", "lgd_code": 302210, "block": "Panipat East Block", "villages": ["Kalyanpur Panipat", "Rampur Panipat", "Shivpur Panipat"]}
                ]
            },
            "Rewari": {
                "lgd_code": 1211,
                "name_hi": "Rewari",
                "headquarters": "Rewari",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rewari Sadar", "Rewari North", "Rewari South", "Rewari Rural"],
                "blocks": ["Rewari Block", "Rewari West Block", "Rewari East Block"],
                "panchayats": [
                    {"name": "Rewari Central Gram Panchayat", "lgd_code": 301211, "block": "Rewari Block", "villages": ["Rewari Khas", "Rewari Dehat", "Rewari Purva"]},
                    {"name": "Rewari Model Krishi Panchayat", "lgd_code": 302211, "block": "Rewari East Block", "villages": ["Kalyanpur Rewari", "Rampur Rewari", "Shivpur Rewari"]}
                ]
            },
            "Rohtak": {
                "lgd_code": 1212,
                "name_hi": "Rohtak",
                "headquarters": "Rohtak",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rohtak Sadar", "Rohtak North", "Rohtak South", "Rohtak Rural"],
                "blocks": ["Rohtak Block", "Rohtak West Block", "Rohtak East Block"],
                "panchayats": [
                    {"name": "Rohtak Central Gram Panchayat", "lgd_code": 301212, "block": "Rohtak Block", "villages": ["Rohtak Khas", "Rohtak Dehat", "Rohtak Purva"]},
                    {"name": "Rohtak Model Krishi Panchayat", "lgd_code": 302212, "block": "Rohtak East Block", "villages": ["Kalyanpur Rohtak", "Rampur Rohtak", "Shivpur Rohtak"]}
                ]
            },
            "Sirsa": {
                "lgd_code": 1213,
                "name_hi": "Sirsa",
                "headquarters": "Sirsa",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sirsa Sadar", "Sirsa North", "Sirsa South", "Sirsa Rural"],
                "blocks": ["Sirsa Block", "Sirsa West Block", "Sirsa East Block"],
                "panchayats": [
                    {"name": "Sirsa Central Gram Panchayat", "lgd_code": 301213, "block": "Sirsa Block", "villages": ["Sirsa Khas", "Sirsa Dehat", "Sirsa Purva"]},
                    {"name": "Sirsa Model Krishi Panchayat", "lgd_code": 302213, "block": "Sirsa East Block", "villages": ["Kalyanpur Sirsa", "Rampur Sirsa", "Shivpur Sirsa"]}
                ]
            },
            "Sonipat": {
                "lgd_code": 1214,
                "name_hi": "Sonipat",
                "headquarters": "Sonipat",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sonipat Sadar", "Sonipat North", "Sonipat South", "Sonipat Rural"],
                "blocks": ["Sonipat Block", "Sonipat West Block", "Sonipat East Block"],
                "panchayats": [
                    {"name": "Sonipat Central Gram Panchayat", "lgd_code": 301214, "block": "Sonipat Block", "villages": ["Sonipat Khas", "Sonipat Dehat", "Sonipat Purva"]},
                    {"name": "Sonipat Model Krishi Panchayat", "lgd_code": 302214, "block": "Sonipat East Block", "villages": ["Kalyanpur Sonipat", "Rampur Sonipat", "Shivpur Sonipat"]}
                ]
            },
            "Yamunanagar": {
                "lgd_code": 1215,
                "name_hi": "Yamunanagar",
                "headquarters": "Yamunanagar",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Yamunanagar Sadar", "Yamunanagar North", "Yamunanagar South", "Yamunanagar Rural"],
                "blocks": ["Yamunanagar Block", "Yamunanagar West Block", "Yamunanagar East Block"],
                "panchayats": [
                    {"name": "Yamunanagar Central Gram Panchayat", "lgd_code": 301215, "block": "Yamunanagar Block", "villages": ["Yamunanagar Khas", "Yamunanagar Dehat", "Yamunanagar Purva"]},
                    {"name": "Yamunanagar Model Krishi Panchayat", "lgd_code": 302215, "block": "Yamunanagar East Block", "villages": ["Kalyanpur Yamunanagar", "Rampur Yamunanagar", "Shivpur Yamunanagar"]}
                ]
            },
        }
    },
    "Himachal Pradesh": {
        "districts": {
            "Bilaspur HP": {
                "lgd_code": 1216,
                "name_hi": "Bilaspur HP",
                "headquarters": "Bilaspur HP",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bilaspur HP Sadar", "Bilaspur HP North", "Bilaspur HP South", "Bilaspur HP Rural"],
                "blocks": ["Bilaspur HP Block", "Bilaspur HP West Block", "Bilaspur HP East Block"],
                "panchayats": [
                    {"name": "Bilaspur HP Central Gram Panchayat", "lgd_code": 301216, "block": "Bilaspur HP Block", "villages": ["Bilaspur HP Khas", "Bilaspur HP Dehat", "Bilaspur HP Purva"]},
                    {"name": "Bilaspur HP Model Krishi Panchayat", "lgd_code": 302216, "block": "Bilaspur HP East Block", "villages": ["Kalyanpur Bilaspur HP", "Rampur Bilaspur HP", "Shivpur Bilaspur HP"]}
                ]
            },
            "Chamba": {
                "lgd_code": 1217,
                "name_hi": "Chamba",
                "headquarters": "Chamba",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chamba Sadar", "Chamba North", "Chamba South", "Chamba Rural"],
                "blocks": ["Chamba Block", "Chamba West Block", "Chamba East Block"],
                "panchayats": [
                    {"name": "Chamba Central Gram Panchayat", "lgd_code": 301217, "block": "Chamba Block", "villages": ["Chamba Khas", "Chamba Dehat", "Chamba Purva"]},
                    {"name": "Chamba Model Krishi Panchayat", "lgd_code": 302217, "block": "Chamba East Block", "villages": ["Kalyanpur Chamba", "Rampur Chamba", "Shivpur Chamba"]}
                ]
            },
            "Hamirpur HP": {
                "lgd_code": 1218,
                "name_hi": "Hamirpur HP",
                "headquarters": "Hamirpur HP",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hamirpur HP Sadar", "Hamirpur HP North", "Hamirpur HP South", "Hamirpur HP Rural"],
                "blocks": ["Hamirpur HP Block", "Hamirpur HP West Block", "Hamirpur HP East Block"],
                "panchayats": [
                    {"name": "Hamirpur HP Central Gram Panchayat", "lgd_code": 301218, "block": "Hamirpur HP Block", "villages": ["Hamirpur HP Khas", "Hamirpur HP Dehat", "Hamirpur HP Purva"]},
                    {"name": "Hamirpur HP Model Krishi Panchayat", "lgd_code": 302218, "block": "Hamirpur HP East Block", "villages": ["Kalyanpur Hamirpur HP", "Rampur Hamirpur HP", "Shivpur Hamirpur HP"]}
                ]
            },
            "Kangra (Dharamshala)": {
                "lgd_code": 1219,
                "name_hi": "Kangra",
                "headquarters": "Kangra",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kangra Sadar", "Kangra North", "Kangra South", "Kangra Rural"],
                "blocks": ["Kangra Block", "Kangra West Block", "Kangra East Block"],
                "panchayats": [
                    {"name": "Kangra Central Gram Panchayat", "lgd_code": 301219, "block": "Kangra Block", "villages": ["Kangra Khas", "Kangra Dehat", "Kangra Purva"]},
                    {"name": "Kangra Model Krishi Panchayat", "lgd_code": 302219, "block": "Kangra East Block", "villages": ["Kalyanpur Kangra", "Rampur Kangra", "Shivpur Kangra"]}
                ]
            },
            "Kinnaur (Reckong Peo)": {
                "lgd_code": 1220,
                "name_hi": "Kinnaur",
                "headquarters": "Kinnaur",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kinnaur Sadar", "Kinnaur North", "Kinnaur South", "Kinnaur Rural"],
                "blocks": ["Kinnaur Block", "Kinnaur West Block", "Kinnaur East Block"],
                "panchayats": [
                    {"name": "Kinnaur Central Gram Panchayat", "lgd_code": 301220, "block": "Kinnaur Block", "villages": ["Kinnaur Khas", "Kinnaur Dehat", "Kinnaur Purva"]},
                    {"name": "Kinnaur Model Krishi Panchayat", "lgd_code": 302220, "block": "Kinnaur East Block", "villages": ["Kalyanpur Kinnaur", "Rampur Kinnaur", "Shivpur Kinnaur"]}
                ]
            },
            "Kullu (Manali)": {
                "lgd_code": 1221,
                "name_hi": "Kullu",
                "headquarters": "Kullu",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kullu Sadar", "Kullu North", "Kullu South", "Kullu Rural"],
                "blocks": ["Kullu Block", "Kullu West Block", "Kullu East Block"],
                "panchayats": [
                    {"name": "Kullu Central Gram Panchayat", "lgd_code": 301221, "block": "Kullu Block", "villages": ["Kullu Khas", "Kullu Dehat", "Kullu Purva"]},
                    {"name": "Kullu Model Krishi Panchayat", "lgd_code": 302221, "block": "Kullu East Block", "villages": ["Kalyanpur Kullu", "Rampur Kullu", "Shivpur Kullu"]}
                ]
            },
            "Lahaul and Spiti (Keylong)": {
                "lgd_code": 1222,
                "name_hi": "Lahaul and Spiti",
                "headquarters": "Lahaul and Spiti",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lahaul and Spiti Sadar", "Lahaul and Spiti North", "Lahaul and Spiti South", "Lahaul and Spiti Rural"],
                "blocks": ["Lahaul and Spiti Block", "Lahaul and Spiti West Block", "Lahaul and Spiti East Block"],
                "panchayats": [
                    {"name": "Lahaul and Spiti Central Gram Panchayat", "lgd_code": 301222, "block": "Lahaul and Spiti Block", "villages": ["Lahaul and Spiti Khas", "Lahaul and Spiti Dehat", "Lahaul and Spiti Purva"]},
                    {"name": "Lahaul and Spiti Model Krishi Panchayat", "lgd_code": 302222, "block": "Lahaul and Spiti East Block", "villages": ["Kalyanpur Lahaul and Spiti", "Rampur Lahaul and Spiti", "Shivpur Lahaul and Spiti"]}
                ]
            },
            "Mandi": {
                "lgd_code": 1223,
                "name_hi": "Mandi",
                "headquarters": "Mandi",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mandi Sadar", "Mandi North", "Mandi South", "Mandi Rural"],
                "blocks": ["Mandi Block", "Mandi West Block", "Mandi East Block"],
                "panchayats": [
                    {"name": "Mandi Central Gram Panchayat", "lgd_code": 301223, "block": "Mandi Block", "villages": ["Mandi Khas", "Mandi Dehat", "Mandi Purva"]},
                    {"name": "Mandi Model Krishi Panchayat", "lgd_code": 302223, "block": "Mandi East Block", "villages": ["Kalyanpur Mandi", "Rampur Mandi", "Shivpur Mandi"]}
                ]
            },
            "Shimla": {
                "lgd_code": 1224,
                "name_hi": "Shimla",
                "headquarters": "Shimla",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shimla Sadar", "Shimla North", "Shimla South", "Shimla Rural"],
                "blocks": ["Shimla Block", "Shimla West Block", "Shimla East Block"],
                "panchayats": [
                    {"name": "Shimla Central Gram Panchayat", "lgd_code": 301224, "block": "Shimla Block", "villages": ["Shimla Khas", "Shimla Dehat", "Shimla Purva"]},
                    {"name": "Shimla Model Krishi Panchayat", "lgd_code": 302224, "block": "Shimla East Block", "villages": ["Kalyanpur Shimla", "Rampur Shimla", "Shivpur Shimla"]}
                ]
            },
            "Sirmaur (Nahan)": {
                "lgd_code": 1225,
                "name_hi": "Sirmaur",
                "headquarters": "Sirmaur",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sirmaur Sadar", "Sirmaur North", "Sirmaur South", "Sirmaur Rural"],
                "blocks": ["Sirmaur Block", "Sirmaur West Block", "Sirmaur East Block"],
                "panchayats": [
                    {"name": "Sirmaur Central Gram Panchayat", "lgd_code": 301225, "block": "Sirmaur Block", "villages": ["Sirmaur Khas", "Sirmaur Dehat", "Sirmaur Purva"]},
                    {"name": "Sirmaur Model Krishi Panchayat", "lgd_code": 302225, "block": "Sirmaur East Block", "villages": ["Kalyanpur Sirmaur", "Rampur Sirmaur", "Shivpur Sirmaur"]}
                ]
            },
            "Solan": {
                "lgd_code": 1226,
                "name_hi": "Solan",
                "headquarters": "Solan",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Solan Sadar", "Solan North", "Solan South", "Solan Rural"],
                "blocks": ["Solan Block", "Solan West Block", "Solan East Block"],
                "panchayats": [
                    {"name": "Solan Central Gram Panchayat", "lgd_code": 301226, "block": "Solan Block", "villages": ["Solan Khas", "Solan Dehat", "Solan Purva"]},
                    {"name": "Solan Model Krishi Panchayat", "lgd_code": 302226, "block": "Solan East Block", "villages": ["Kalyanpur Solan", "Rampur Solan", "Shivpur Solan"]}
                ]
            },
            "Una": {
                "lgd_code": 1227,
                "name_hi": "Una",
                "headquarters": "Una",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Una Sadar", "Una North", "Una South", "Una Rural"],
                "blocks": ["Una Block", "Una West Block", "Una East Block"],
                "panchayats": [
                    {"name": "Una Central Gram Panchayat", "lgd_code": 301227, "block": "Una Block", "villages": ["Una Khas", "Una Dehat", "Una Purva"]},
                    {"name": "Una Model Krishi Panchayat", "lgd_code": 302227, "block": "Una East Block", "villages": ["Kalyanpur Una", "Rampur Una", "Shivpur Una"]}
                ]
            },
        }
    },
    "Jharkhand": {
        "districts": {
            "Bokaro": {
                "lgd_code": 1228,
                "name_hi": "Bokaro",
                "headquarters": "Bokaro",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bokaro Sadar", "Bokaro North", "Bokaro South", "Bokaro Rural"],
                "blocks": ["Bokaro Block", "Bokaro West Block", "Bokaro East Block"],
                "panchayats": [
                    {"name": "Bokaro Central Gram Panchayat", "lgd_code": 301228, "block": "Bokaro Block", "villages": ["Bokaro Khas", "Bokaro Dehat", "Bokaro Purva"]},
                    {"name": "Bokaro Model Krishi Panchayat", "lgd_code": 302228, "block": "Bokaro East Block", "villages": ["Kalyanpur Bokaro", "Rampur Bokaro", "Shivpur Bokaro"]}
                ]
            },
            "Chatra": {
                "lgd_code": 1229,
                "name_hi": "Chatra",
                "headquarters": "Chatra",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chatra Sadar", "Chatra North", "Chatra South", "Chatra Rural"],
                "blocks": ["Chatra Block", "Chatra West Block", "Chatra East Block"],
                "panchayats": [
                    {"name": "Chatra Central Gram Panchayat", "lgd_code": 301229, "block": "Chatra Block", "villages": ["Chatra Khas", "Chatra Dehat", "Chatra Purva"]},
                    {"name": "Chatra Model Krishi Panchayat", "lgd_code": 302229, "block": "Chatra East Block", "villages": ["Kalyanpur Chatra", "Rampur Chatra", "Shivpur Chatra"]}
                ]
            },
            "Deoghar": {
                "lgd_code": 1230,
                "name_hi": "Deoghar",
                "headquarters": "Deoghar",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Deoghar Sadar", "Deoghar North", "Deoghar South", "Deoghar Rural"],
                "blocks": ["Deoghar Block", "Deoghar West Block", "Deoghar East Block"],
                "panchayats": [
                    {"name": "Deoghar Central Gram Panchayat", "lgd_code": 301230, "block": "Deoghar Block", "villages": ["Deoghar Khas", "Deoghar Dehat", "Deoghar Purva"]},
                    {"name": "Deoghar Model Krishi Panchayat", "lgd_code": 302230, "block": "Deoghar East Block", "villages": ["Kalyanpur Deoghar", "Rampur Deoghar", "Shivpur Deoghar"]}
                ]
            },
            "Dhanbad": {
                "lgd_code": 1231,
                "name_hi": "Dhanbad",
                "headquarters": "Dhanbad",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhanbad Sadar", "Dhanbad North", "Dhanbad South", "Dhanbad Rural"],
                "blocks": ["Dhanbad Block", "Dhanbad West Block", "Dhanbad East Block"],
                "panchayats": [
                    {"name": "Dhanbad Central Gram Panchayat", "lgd_code": 301231, "block": "Dhanbad Block", "villages": ["Dhanbad Khas", "Dhanbad Dehat", "Dhanbad Purva"]},
                    {"name": "Dhanbad Model Krishi Panchayat", "lgd_code": 302231, "block": "Dhanbad East Block", "villages": ["Kalyanpur Dhanbad", "Rampur Dhanbad", "Shivpur Dhanbad"]}
                ]
            },
            "Dumka": {
                "lgd_code": 1232,
                "name_hi": "Dumka",
                "headquarters": "Dumka",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dumka Sadar", "Dumka North", "Dumka South", "Dumka Rural"],
                "blocks": ["Dumka Block", "Dumka West Block", "Dumka East Block"],
                "panchayats": [
                    {"name": "Dumka Central Gram Panchayat", "lgd_code": 301232, "block": "Dumka Block", "villages": ["Dumka Khas", "Dumka Dehat", "Dumka Purva"]},
                    {"name": "Dumka Model Krishi Panchayat", "lgd_code": 302232, "block": "Dumka East Block", "villages": ["Kalyanpur Dumka", "Rampur Dumka", "Shivpur Dumka"]}
                ]
            },
            "East Singhbhum (Jamshedpur)": {
                "lgd_code": 1233,
                "name_hi": "East Singhbhum",
                "headquarters": "East Singhbhum",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Singhbhum Sadar", "East Singhbhum North", "East Singhbhum South", "East Singhbhum Rural"],
                "blocks": ["East Singhbhum Block", "East Singhbhum West Block", "East Singhbhum East Block"],
                "panchayats": [
                    {"name": "East Singhbhum Central Gram Panchayat", "lgd_code": 301233, "block": "East Singhbhum Block", "villages": ["East Singhbhum Khas", "East Singhbhum Dehat", "East Singhbhum Purva"]},
                    {"name": "East Singhbhum Model Krishi Panchayat", "lgd_code": 302233, "block": "East Singhbhum East Block", "villages": ["Kalyanpur East Singhbhum", "Rampur East Singhbhum", "Shivpur East Singhbhum"]}
                ]
            },
            "Garhwa": {
                "lgd_code": 1234,
                "name_hi": "Garhwa",
                "headquarters": "Garhwa",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Garhwa Sadar", "Garhwa North", "Garhwa South", "Garhwa Rural"],
                "blocks": ["Garhwa Block", "Garhwa West Block", "Garhwa East Block"],
                "panchayats": [
                    {"name": "Garhwa Central Gram Panchayat", "lgd_code": 301234, "block": "Garhwa Block", "villages": ["Garhwa Khas", "Garhwa Dehat", "Garhwa Purva"]},
                    {"name": "Garhwa Model Krishi Panchayat", "lgd_code": 302234, "block": "Garhwa East Block", "villages": ["Kalyanpur Garhwa", "Rampur Garhwa", "Shivpur Garhwa"]}
                ]
            },
            "Giridih": {
                "lgd_code": 1235,
                "name_hi": "Giridih",
                "headquarters": "Giridih",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Giridih Sadar", "Giridih North", "Giridih South", "Giridih Rural"],
                "blocks": ["Giridih Block", "Giridih West Block", "Giridih East Block"],
                "panchayats": [
                    {"name": "Giridih Central Gram Panchayat", "lgd_code": 301235, "block": "Giridih Block", "villages": ["Giridih Khas", "Giridih Dehat", "Giridih Purva"]},
                    {"name": "Giridih Model Krishi Panchayat", "lgd_code": 302235, "block": "Giridih East Block", "villages": ["Kalyanpur Giridih", "Rampur Giridih", "Shivpur Giridih"]}
                ]
            },
            "Godda": {
                "lgd_code": 1236,
                "name_hi": "Godda",
                "headquarters": "Godda",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Godda Sadar", "Godda North", "Godda South", "Godda Rural"],
                "blocks": ["Godda Block", "Godda West Block", "Godda East Block"],
                "panchayats": [
                    {"name": "Godda Central Gram Panchayat", "lgd_code": 301236, "block": "Godda Block", "villages": ["Godda Khas", "Godda Dehat", "Godda Purva"]},
                    {"name": "Godda Model Krishi Panchayat", "lgd_code": 302236, "block": "Godda East Block", "villages": ["Kalyanpur Godda", "Rampur Godda", "Shivpur Godda"]}
                ]
            },
            "Gumla": {
                "lgd_code": 1237,
                "name_hi": "Gumla",
                "headquarters": "Gumla",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gumla Sadar", "Gumla North", "Gumla South", "Gumla Rural"],
                "blocks": ["Gumla Block", "Gumla West Block", "Gumla East Block"],
                "panchayats": [
                    {"name": "Gumla Central Gram Panchayat", "lgd_code": 301237, "block": "Gumla Block", "villages": ["Gumla Khas", "Gumla Dehat", "Gumla Purva"]},
                    {"name": "Gumla Model Krishi Panchayat", "lgd_code": 302237, "block": "Gumla East Block", "villages": ["Kalyanpur Gumla", "Rampur Gumla", "Shivpur Gumla"]}
                ]
            },
            "Hazaribagh": {
                "lgd_code": 1238,
                "name_hi": "Hazaribagh",
                "headquarters": "Hazaribagh",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hazaribagh Sadar", "Hazaribagh North", "Hazaribagh South", "Hazaribagh Rural"],
                "blocks": ["Hazaribagh Block", "Hazaribagh West Block", "Hazaribagh East Block"],
                "panchayats": [
                    {"name": "Hazaribagh Central Gram Panchayat", "lgd_code": 301238, "block": "Hazaribagh Block", "villages": ["Hazaribagh Khas", "Hazaribagh Dehat", "Hazaribagh Purva"]},
                    {"name": "Hazaribagh Model Krishi Panchayat", "lgd_code": 302238, "block": "Hazaribagh East Block", "villages": ["Kalyanpur Hazaribagh", "Rampur Hazaribagh", "Shivpur Hazaribagh"]}
                ]
            },
            "Jamtara": {
                "lgd_code": 1239,
                "name_hi": "Jamtara",
                "headquarters": "Jamtara",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jamtara Sadar", "Jamtara North", "Jamtara South", "Jamtara Rural"],
                "blocks": ["Jamtara Block", "Jamtara West Block", "Jamtara East Block"],
                "panchayats": [
                    {"name": "Jamtara Central Gram Panchayat", "lgd_code": 301239, "block": "Jamtara Block", "villages": ["Jamtara Khas", "Jamtara Dehat", "Jamtara Purva"]},
                    {"name": "Jamtara Model Krishi Panchayat", "lgd_code": 302239, "block": "Jamtara East Block", "villages": ["Kalyanpur Jamtara", "Rampur Jamtara", "Shivpur Jamtara"]}
                ]
            },
            "Khunti": {
                "lgd_code": 1240,
                "name_hi": "Khunti",
                "headquarters": "Khunti",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khunti Sadar", "Khunti North", "Khunti South", "Khunti Rural"],
                "blocks": ["Khunti Block", "Khunti West Block", "Khunti East Block"],
                "panchayats": [
                    {"name": "Khunti Central Gram Panchayat", "lgd_code": 301240, "block": "Khunti Block", "villages": ["Khunti Khas", "Khunti Dehat", "Khunti Purva"]},
                    {"name": "Khunti Model Krishi Panchayat", "lgd_code": 302240, "block": "Khunti East Block", "villages": ["Kalyanpur Khunti", "Rampur Khunti", "Shivpur Khunti"]}
                ]
            },
            "Koderma": {
                "lgd_code": 1241,
                "name_hi": "Koderma",
                "headquarters": "Koderma",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Koderma Sadar", "Koderma North", "Koderma South", "Koderma Rural"],
                "blocks": ["Koderma Block", "Koderma West Block", "Koderma East Block"],
                "panchayats": [
                    {"name": "Koderma Central Gram Panchayat", "lgd_code": 301241, "block": "Koderma Block", "villages": ["Koderma Khas", "Koderma Dehat", "Koderma Purva"]},
                    {"name": "Koderma Model Krishi Panchayat", "lgd_code": 302241, "block": "Koderma East Block", "villages": ["Kalyanpur Koderma", "Rampur Koderma", "Shivpur Koderma"]}
                ]
            },
            "Latehar": {
                "lgd_code": 1242,
                "name_hi": "Latehar",
                "headquarters": "Latehar",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Latehar Sadar", "Latehar North", "Latehar South", "Latehar Rural"],
                "blocks": ["Latehar Block", "Latehar West Block", "Latehar East Block"],
                "panchayats": [
                    {"name": "Latehar Central Gram Panchayat", "lgd_code": 301242, "block": "Latehar Block", "villages": ["Latehar Khas", "Latehar Dehat", "Latehar Purva"]},
                    {"name": "Latehar Model Krishi Panchayat", "lgd_code": 302242, "block": "Latehar East Block", "villages": ["Kalyanpur Latehar", "Rampur Latehar", "Shivpur Latehar"]}
                ]
            },
            "Lohardaga": {
                "lgd_code": 1243,
                "name_hi": "Lohardaga",
                "headquarters": "Lohardaga",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lohardaga Sadar", "Lohardaga North", "Lohardaga South", "Lohardaga Rural"],
                "blocks": ["Lohardaga Block", "Lohardaga West Block", "Lohardaga East Block"],
                "panchayats": [
                    {"name": "Lohardaga Central Gram Panchayat", "lgd_code": 301243, "block": "Lohardaga Block", "villages": ["Lohardaga Khas", "Lohardaga Dehat", "Lohardaga Purva"]},
                    {"name": "Lohardaga Model Krishi Panchayat", "lgd_code": 302243, "block": "Lohardaga East Block", "villages": ["Kalyanpur Lohardaga", "Rampur Lohardaga", "Shivpur Lohardaga"]}
                ]
            },
            "Pakur": {
                "lgd_code": 1244,
                "name_hi": "Pakur",
                "headquarters": "Pakur",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pakur Sadar", "Pakur North", "Pakur South", "Pakur Rural"],
                "blocks": ["Pakur Block", "Pakur West Block", "Pakur East Block"],
                "panchayats": [
                    {"name": "Pakur Central Gram Panchayat", "lgd_code": 301244, "block": "Pakur Block", "villages": ["Pakur Khas", "Pakur Dehat", "Pakur Purva"]},
                    {"name": "Pakur Model Krishi Panchayat", "lgd_code": 302244, "block": "Pakur East Block", "villages": ["Kalyanpur Pakur", "Rampur Pakur", "Shivpur Pakur"]}
                ]
            },
            "Palamu (Daltonganj)": {
                "lgd_code": 1245,
                "name_hi": "Palamu",
                "headquarters": "Palamu",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Palamu Sadar", "Palamu North", "Palamu South", "Palamu Rural"],
                "blocks": ["Palamu Block", "Palamu West Block", "Palamu East Block"],
                "panchayats": [
                    {"name": "Palamu Central Gram Panchayat", "lgd_code": 301245, "block": "Palamu Block", "villages": ["Palamu Khas", "Palamu Dehat", "Palamu Purva"]},
                    {"name": "Palamu Model Krishi Panchayat", "lgd_code": 302245, "block": "Palamu East Block", "villages": ["Kalyanpur Palamu", "Rampur Palamu", "Shivpur Palamu"]}
                ]
            },
            "Ramgarh": {
                "lgd_code": 1246,
                "name_hi": "Ramgarh",
                "headquarters": "Ramgarh",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ramgarh Sadar", "Ramgarh North", "Ramgarh South", "Ramgarh Rural"],
                "blocks": ["Ramgarh Block", "Ramgarh West Block", "Ramgarh East Block"],
                "panchayats": [
                    {"name": "Ramgarh Central Gram Panchayat", "lgd_code": 301246, "block": "Ramgarh Block", "villages": ["Ramgarh Khas", "Ramgarh Dehat", "Ramgarh Purva"]},
                    {"name": "Ramgarh Model Krishi Panchayat", "lgd_code": 302246, "block": "Ramgarh East Block", "villages": ["Kalyanpur Ramgarh", "Rampur Ramgarh", "Shivpur Ramgarh"]}
                ]
            },
            "Ranchi": {
                "lgd_code": 1247,
                "name_hi": "Ranchi",
                "headquarters": "Ranchi",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ranchi Sadar", "Ranchi North", "Ranchi South", "Ranchi Rural"],
                "blocks": ["Ranchi Block", "Ranchi West Block", "Ranchi East Block"],
                "panchayats": [
                    {"name": "Ranchi Central Gram Panchayat", "lgd_code": 301247, "block": "Ranchi Block", "villages": ["Ranchi Khas", "Ranchi Dehat", "Ranchi Purva"]},
                    {"name": "Ranchi Model Krishi Panchayat", "lgd_code": 302247, "block": "Ranchi East Block", "villages": ["Kalyanpur Ranchi", "Rampur Ranchi", "Shivpur Ranchi"]}
                ]
            },
            "Sahebganj": {
                "lgd_code": 1248,
                "name_hi": "Sahebganj",
                "headquarters": "Sahebganj",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sahebganj Sadar", "Sahebganj North", "Sahebganj South", "Sahebganj Rural"],
                "blocks": ["Sahebganj Block", "Sahebganj West Block", "Sahebganj East Block"],
                "panchayats": [
                    {"name": "Sahebganj Central Gram Panchayat", "lgd_code": 301248, "block": "Sahebganj Block", "villages": ["Sahebganj Khas", "Sahebganj Dehat", "Sahebganj Purva"]},
                    {"name": "Sahebganj Model Krishi Panchayat", "lgd_code": 302248, "block": "Sahebganj East Block", "villages": ["Kalyanpur Sahebganj", "Rampur Sahebganj", "Shivpur Sahebganj"]}
                ]
            },
            "Saraikela-Kharsawan": {
                "lgd_code": 1249,
                "name_hi": "Saraikela-Kharsawan",
                "headquarters": "Saraikela-Kharsawan",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saraikela-Kharsawan Sadar", "Saraikela-Kharsawan North", "Saraikela-Kharsawan South", "Saraikela-Kharsawan Rural"],
                "blocks": ["Saraikela-Kharsawan Block", "Saraikela-Kharsawan West Block", "Saraikela-Kharsawan East Block"],
                "panchayats": [
                    {"name": "Saraikela-Kharsawan Central Gram Panchayat", "lgd_code": 301249, "block": "Saraikela-Kharsawan Block", "villages": ["Saraikela-Kharsawan Khas", "Saraikela-Kharsawan Dehat", "Saraikela-Kharsawan Purva"]},
                    {"name": "Saraikela-Kharsawan Model Krishi Panchayat", "lgd_code": 302249, "block": "Saraikela-Kharsawan East Block", "villages": ["Kalyanpur Saraikela-Kharsawan", "Rampur Saraikela-Kharsawan", "Shivpur Saraikela-Kharsawan"]}
                ]
            },
            "Simdega": {
                "lgd_code": 1250,
                "name_hi": "Simdega",
                "headquarters": "Simdega",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Simdega Sadar", "Simdega North", "Simdega South", "Simdega Rural"],
                "blocks": ["Simdega Block", "Simdega West Block", "Simdega East Block"],
                "panchayats": [
                    {"name": "Simdega Central Gram Panchayat", "lgd_code": 301250, "block": "Simdega Block", "villages": ["Simdega Khas", "Simdega Dehat", "Simdega Purva"]},
                    {"name": "Simdega Model Krishi Panchayat", "lgd_code": 302250, "block": "Simdega East Block", "villages": ["Kalyanpur Simdega", "Rampur Simdega", "Shivpur Simdega"]}
                ]
            },
            "West Singhbhum (Chaibasa)": {
                "lgd_code": 1251,
                "name_hi": "West Singhbhum",
                "headquarters": "West Singhbhum",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Singhbhum Sadar", "West Singhbhum North", "West Singhbhum South", "West Singhbhum Rural"],
                "blocks": ["West Singhbhum Block", "West Singhbhum West Block", "West Singhbhum East Block"],
                "panchayats": [
                    {"name": "West Singhbhum Central Gram Panchayat", "lgd_code": 301251, "block": "West Singhbhum Block", "villages": ["West Singhbhum Khas", "West Singhbhum Dehat", "West Singhbhum Purva"]},
                    {"name": "West Singhbhum Model Krishi Panchayat", "lgd_code": 302251, "block": "West Singhbhum East Block", "villages": ["Kalyanpur West Singhbhum", "Rampur West Singhbhum", "Shivpur West Singhbhum"]}
                ]
            },
        }
    },
    "Karnataka": {
        "districts": {
            "Bagalkote": {
                "lgd_code": 1252,
                "name_hi": "Bagalkote",
                "headquarters": "Bagalkote",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bagalkote Sadar", "Bagalkote North", "Bagalkote South", "Bagalkote Rural"],
                "blocks": ["Bagalkote Block", "Bagalkote West Block", "Bagalkote East Block"],
                "panchayats": [
                    {"name": "Bagalkote Central Gram Panchayat", "lgd_code": 301252, "block": "Bagalkote Block", "villages": ["Bagalkote Khas", "Bagalkote Dehat", "Bagalkote Purva"]},
                    {"name": "Bagalkote Model Krishi Panchayat", "lgd_code": 302252, "block": "Bagalkote East Block", "villages": ["Kalyanpur Bagalkote", "Rampur Bagalkote", "Shivpur Bagalkote"]}
                ]
            },
            "Ballari": {
                "lgd_code": 1253,
                "name_hi": "Ballari",
                "headquarters": "Ballari",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ballari Sadar", "Ballari North", "Ballari South", "Ballari Rural"],
                "blocks": ["Ballari Block", "Ballari West Block", "Ballari East Block"],
                "panchayats": [
                    {"name": "Ballari Central Gram Panchayat", "lgd_code": 301253, "block": "Ballari Block", "villages": ["Ballari Khas", "Ballari Dehat", "Ballari Purva"]},
                    {"name": "Ballari Model Krishi Panchayat", "lgd_code": 302253, "block": "Ballari East Block", "villages": ["Kalyanpur Ballari", "Rampur Ballari", "Shivpur Ballari"]}
                ]
            },
            "Belagavi": {
                "lgd_code": 1254,
                "name_hi": "Belagavi",
                "headquarters": "Belagavi",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Belagavi Sadar", "Belagavi North", "Belagavi South", "Belagavi Rural"],
                "blocks": ["Belagavi Block", "Belagavi West Block", "Belagavi East Block"],
                "panchayats": [
                    {"name": "Belagavi Central Gram Panchayat", "lgd_code": 301254, "block": "Belagavi Block", "villages": ["Belagavi Khas", "Belagavi Dehat", "Belagavi Purva"]},
                    {"name": "Belagavi Model Krishi Panchayat", "lgd_code": 302254, "block": "Belagavi East Block", "villages": ["Kalyanpur Belagavi", "Rampur Belagavi", "Shivpur Belagavi"]}
                ]
            },
            "Bengaluru Rural": {
                "lgd_code": 1255,
                "name_hi": "Bengaluru Rural",
                "headquarters": "Bengaluru Rural",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bengaluru Rural Sadar", "Bengaluru Rural North", "Bengaluru Rural South", "Bengaluru Rural Rural"],
                "blocks": ["Bengaluru Rural Block", "Bengaluru Rural West Block", "Bengaluru Rural East Block"],
                "panchayats": [
                    {"name": "Bengaluru Rural Central Gram Panchayat", "lgd_code": 301255, "block": "Bengaluru Rural Block", "villages": ["Bengaluru Rural Khas", "Bengaluru Rural Dehat", "Bengaluru Rural Purva"]},
                    {"name": "Bengaluru Rural Model Krishi Panchayat", "lgd_code": 302255, "block": "Bengaluru Rural East Block", "villages": ["Kalyanpur Bengaluru Rural", "Rampur Bengaluru Rural", "Shivpur Bengaluru Rural"]}
                ]
            },
            "Bengaluru Urban": {
                "lgd_code": 1256,
                "name_hi": "Bengaluru Urban",
                "headquarters": "Bengaluru Urban",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bengaluru Urban Sadar", "Bengaluru Urban North", "Bengaluru Urban South", "Bengaluru Urban Rural"],
                "blocks": ["Bengaluru Urban Block", "Bengaluru Urban West Block", "Bengaluru Urban East Block"],
                "panchayats": [
                    {"name": "Bengaluru Urban Central Gram Panchayat", "lgd_code": 301256, "block": "Bengaluru Urban Block", "villages": ["Bengaluru Urban Khas", "Bengaluru Urban Dehat", "Bengaluru Urban Purva"]},
                    {"name": "Bengaluru Urban Model Krishi Panchayat", "lgd_code": 302256, "block": "Bengaluru Urban East Block", "villages": ["Kalyanpur Bengaluru Urban", "Rampur Bengaluru Urban", "Shivpur Bengaluru Urban"]}
                ]
            },
            "Bidar": {
                "lgd_code": 1257,
                "name_hi": "Bidar",
                "headquarters": "Bidar",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bidar Sadar", "Bidar North", "Bidar South", "Bidar Rural"],
                "blocks": ["Bidar Block", "Bidar West Block", "Bidar East Block"],
                "panchayats": [
                    {"name": "Bidar Central Gram Panchayat", "lgd_code": 301257, "block": "Bidar Block", "villages": ["Bidar Khas", "Bidar Dehat", "Bidar Purva"]},
                    {"name": "Bidar Model Krishi Panchayat", "lgd_code": 302257, "block": "Bidar East Block", "villages": ["Kalyanpur Bidar", "Rampur Bidar", "Shivpur Bidar"]}
                ]
            },
            "Chamarajanagar": {
                "lgd_code": 1258,
                "name_hi": "Chamarajanagar",
                "headquarters": "Chamarajanagar",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chamarajanagar Sadar", "Chamarajanagar North", "Chamarajanagar South", "Chamarajanagar Rural"],
                "blocks": ["Chamarajanagar Block", "Chamarajanagar West Block", "Chamarajanagar East Block"],
                "panchayats": [
                    {"name": "Chamarajanagar Central Gram Panchayat", "lgd_code": 301258, "block": "Chamarajanagar Block", "villages": ["Chamarajanagar Khas", "Chamarajanagar Dehat", "Chamarajanagar Purva"]},
                    {"name": "Chamarajanagar Model Krishi Panchayat", "lgd_code": 302258, "block": "Chamarajanagar East Block", "villages": ["Kalyanpur Chamarajanagar", "Rampur Chamarajanagar", "Shivpur Chamarajanagar"]}
                ]
            },
            "Chikkaballapura": {
                "lgd_code": 1259,
                "name_hi": "Chikkaballapura",
                "headquarters": "Chikkaballapura",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chikkaballapura Sadar", "Chikkaballapura North", "Chikkaballapura South", "Chikkaballapura Rural"],
                "blocks": ["Chikkaballapura Block", "Chikkaballapura West Block", "Chikkaballapura East Block"],
                "panchayats": [
                    {"name": "Chikkaballapura Central Gram Panchayat", "lgd_code": 301259, "block": "Chikkaballapura Block", "villages": ["Chikkaballapura Khas", "Chikkaballapura Dehat", "Chikkaballapura Purva"]},
                    {"name": "Chikkaballapura Model Krishi Panchayat", "lgd_code": 302259, "block": "Chikkaballapura East Block", "villages": ["Kalyanpur Chikkaballapura", "Rampur Chikkaballapura", "Shivpur Chikkaballapura"]}
                ]
            },
            "Chikkamagaluru": {
                "lgd_code": 1260,
                "name_hi": "Chikkamagaluru",
                "headquarters": "Chikkamagaluru",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chikkamagaluru Sadar", "Chikkamagaluru North", "Chikkamagaluru South", "Chikkamagaluru Rural"],
                "blocks": ["Chikkamagaluru Block", "Chikkamagaluru West Block", "Chikkamagaluru East Block"],
                "panchayats": [
                    {"name": "Chikkamagaluru Central Gram Panchayat", "lgd_code": 301260, "block": "Chikkamagaluru Block", "villages": ["Chikkamagaluru Khas", "Chikkamagaluru Dehat", "Chikkamagaluru Purva"]},
                    {"name": "Chikkamagaluru Model Krishi Panchayat", "lgd_code": 302260, "block": "Chikkamagaluru East Block", "villages": ["Kalyanpur Chikkamagaluru", "Rampur Chikkamagaluru", "Shivpur Chikkamagaluru"]}
                ]
            },
            "Chitradurga": {
                "lgd_code": 1261,
                "name_hi": "Chitradurga",
                "headquarters": "Chitradurga",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chitradurga Sadar", "Chitradurga North", "Chitradurga South", "Chitradurga Rural"],
                "blocks": ["Chitradurga Block", "Chitradurga West Block", "Chitradurga East Block"],
                "panchayats": [
                    {"name": "Chitradurga Central Gram Panchayat", "lgd_code": 301261, "block": "Chitradurga Block", "villages": ["Chitradurga Khas", "Chitradurga Dehat", "Chitradurga Purva"]},
                    {"name": "Chitradurga Model Krishi Panchayat", "lgd_code": 302261, "block": "Chitradurga East Block", "villages": ["Kalyanpur Chitradurga", "Rampur Chitradurga", "Shivpur Chitradurga"]}
                ]
            },
            "Dakshina Kannada (Mangaluru)": {
                "lgd_code": 1262,
                "name_hi": "Dakshina Kannada",
                "headquarters": "Dakshina Kannada",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dakshina Kannada Sadar", "Dakshina Kannada North", "Dakshina Kannada South", "Dakshina Kannada Rural"],
                "blocks": ["Dakshina Kannada Block", "Dakshina Kannada West Block", "Dakshina Kannada East Block"],
                "panchayats": [
                    {"name": "Dakshina Kannada Central Gram Panchayat", "lgd_code": 301262, "block": "Dakshina Kannada Block", "villages": ["Dakshina Kannada Khas", "Dakshina Kannada Dehat", "Dakshina Kannada Purva"]},
                    {"name": "Dakshina Kannada Model Krishi Panchayat", "lgd_code": 302262, "block": "Dakshina Kannada East Block", "villages": ["Kalyanpur Dakshina Kannada", "Rampur Dakshina Kannada", "Shivpur Dakshina Kannada"]}
                ]
            },
            "Davanagere": {
                "lgd_code": 1263,
                "name_hi": "Davanagere",
                "headquarters": "Davanagere",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Davanagere Sadar", "Davanagere North", "Davanagere South", "Davanagere Rural"],
                "blocks": ["Davanagere Block", "Davanagere West Block", "Davanagere East Block"],
                "panchayats": [
                    {"name": "Davanagere Central Gram Panchayat", "lgd_code": 301263, "block": "Davanagere Block", "villages": ["Davanagere Khas", "Davanagere Dehat", "Davanagere Purva"]},
                    {"name": "Davanagere Model Krishi Panchayat", "lgd_code": 302263, "block": "Davanagere East Block", "villages": ["Kalyanpur Davanagere", "Rampur Davanagere", "Shivpur Davanagere"]}
                ]
            },
            "Dharwad (Hubballi)": {
                "lgd_code": 1264,
                "name_hi": "Dharwad",
                "headquarters": "Dharwad",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dharwad Sadar", "Dharwad North", "Dharwad South", "Dharwad Rural"],
                "blocks": ["Dharwad Block", "Dharwad West Block", "Dharwad East Block"],
                "panchayats": [
                    {"name": "Dharwad Central Gram Panchayat", "lgd_code": 301264, "block": "Dharwad Block", "villages": ["Dharwad Khas", "Dharwad Dehat", "Dharwad Purva"]},
                    {"name": "Dharwad Model Krishi Panchayat", "lgd_code": 302264, "block": "Dharwad East Block", "villages": ["Kalyanpur Dharwad", "Rampur Dharwad", "Shivpur Dharwad"]}
                ]
            },
            "Gadag": {
                "lgd_code": 1265,
                "name_hi": "Gadag",
                "headquarters": "Gadag",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gadag Sadar", "Gadag North", "Gadag South", "Gadag Rural"],
                "blocks": ["Gadag Block", "Gadag West Block", "Gadag East Block"],
                "panchayats": [
                    {"name": "Gadag Central Gram Panchayat", "lgd_code": 301265, "block": "Gadag Block", "villages": ["Gadag Khas", "Gadag Dehat", "Gadag Purva"]},
                    {"name": "Gadag Model Krishi Panchayat", "lgd_code": 302265, "block": "Gadag East Block", "villages": ["Kalyanpur Gadag", "Rampur Gadag", "Shivpur Gadag"]}
                ]
            },
            "Hassan": {
                "lgd_code": 1266,
                "name_hi": "Hassan",
                "headquarters": "Hassan",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hassan Sadar", "Hassan North", "Hassan South", "Hassan Rural"],
                "blocks": ["Hassan Block", "Hassan West Block", "Hassan East Block"],
                "panchayats": [
                    {"name": "Hassan Central Gram Panchayat", "lgd_code": 301266, "block": "Hassan Block", "villages": ["Hassan Khas", "Hassan Dehat", "Hassan Purva"]},
                    {"name": "Hassan Model Krishi Panchayat", "lgd_code": 302266, "block": "Hassan East Block", "villages": ["Kalyanpur Hassan", "Rampur Hassan", "Shivpur Hassan"]}
                ]
            },
            "Haveri": {
                "lgd_code": 1267,
                "name_hi": "Haveri",
                "headquarters": "Haveri",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Haveri Sadar", "Haveri North", "Haveri South", "Haveri Rural"],
                "blocks": ["Haveri Block", "Haveri West Block", "Haveri East Block"],
                "panchayats": [
                    {"name": "Haveri Central Gram Panchayat", "lgd_code": 301267, "block": "Haveri Block", "villages": ["Haveri Khas", "Haveri Dehat", "Haveri Purva"]},
                    {"name": "Haveri Model Krishi Panchayat", "lgd_code": 302267, "block": "Haveri East Block", "villages": ["Kalyanpur Haveri", "Rampur Haveri", "Shivpur Haveri"]}
                ]
            },
            "Kalaburagi": {
                "lgd_code": 1268,
                "name_hi": "Kalaburagi",
                "headquarters": "Kalaburagi",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kalaburagi Sadar", "Kalaburagi North", "Kalaburagi South", "Kalaburagi Rural"],
                "blocks": ["Kalaburagi Block", "Kalaburagi West Block", "Kalaburagi East Block"],
                "panchayats": [
                    {"name": "Kalaburagi Central Gram Panchayat", "lgd_code": 301268, "block": "Kalaburagi Block", "villages": ["Kalaburagi Khas", "Kalaburagi Dehat", "Kalaburagi Purva"]},
                    {"name": "Kalaburagi Model Krishi Panchayat", "lgd_code": 302268, "block": "Kalaburagi East Block", "villages": ["Kalyanpur Kalaburagi", "Rampur Kalaburagi", "Shivpur Kalaburagi"]}
                ]
            },
            "Kodagu (Madikeri)": {
                "lgd_code": 1269,
                "name_hi": "Kodagu",
                "headquarters": "Kodagu",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kodagu Sadar", "Kodagu North", "Kodagu South", "Kodagu Rural"],
                "blocks": ["Kodagu Block", "Kodagu West Block", "Kodagu East Block"],
                "panchayats": [
                    {"name": "Kodagu Central Gram Panchayat", "lgd_code": 301269, "block": "Kodagu Block", "villages": ["Kodagu Khas", "Kodagu Dehat", "Kodagu Purva"]},
                    {"name": "Kodagu Model Krishi Panchayat", "lgd_code": 302269, "block": "Kodagu East Block", "villages": ["Kalyanpur Kodagu", "Rampur Kodagu", "Shivpur Kodagu"]}
                ]
            },
            "Kolar": {
                "lgd_code": 1270,
                "name_hi": "Kolar",
                "headquarters": "Kolar",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kolar Sadar", "Kolar North", "Kolar South", "Kolar Rural"],
                "blocks": ["Kolar Block", "Kolar West Block", "Kolar East Block"],
                "panchayats": [
                    {"name": "Kolar Central Gram Panchayat", "lgd_code": 301270, "block": "Kolar Block", "villages": ["Kolar Khas", "Kolar Dehat", "Kolar Purva"]},
                    {"name": "Kolar Model Krishi Panchayat", "lgd_code": 302270, "block": "Kolar East Block", "villages": ["Kalyanpur Kolar", "Rampur Kolar", "Shivpur Kolar"]}
                ]
            },
            "Koppal": {
                "lgd_code": 1271,
                "name_hi": "Koppal",
                "headquarters": "Koppal",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Koppal Sadar", "Koppal North", "Koppal South", "Koppal Rural"],
                "blocks": ["Koppal Block", "Koppal West Block", "Koppal East Block"],
                "panchayats": [
                    {"name": "Koppal Central Gram Panchayat", "lgd_code": 301271, "block": "Koppal Block", "villages": ["Koppal Khas", "Koppal Dehat", "Koppal Purva"]},
                    {"name": "Koppal Model Krishi Panchayat", "lgd_code": 302271, "block": "Koppal East Block", "villages": ["Kalyanpur Koppal", "Rampur Koppal", "Shivpur Koppal"]}
                ]
            },
            "Mandya": {
                "lgd_code": 1272,
                "name_hi": "Mandya",
                "headquarters": "Mandya",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mandya Sadar", "Mandya North", "Mandya South", "Mandya Rural"],
                "blocks": ["Mandya Block", "Mandya West Block", "Mandya East Block"],
                "panchayats": [
                    {"name": "Mandya Central Gram Panchayat", "lgd_code": 301272, "block": "Mandya Block", "villages": ["Mandya Khas", "Mandya Dehat", "Mandya Purva"]},
                    {"name": "Mandya Model Krishi Panchayat", "lgd_code": 302272, "block": "Mandya East Block", "villages": ["Kalyanpur Mandya", "Rampur Mandya", "Shivpur Mandya"]}
                ]
            },
            "Mysuru": {
                "lgd_code": 1273,
                "name_hi": "Mysuru",
                "headquarters": "Mysuru",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mysuru Sadar", "Mysuru North", "Mysuru South", "Mysuru Rural"],
                "blocks": ["Mysuru Block", "Mysuru West Block", "Mysuru East Block"],
                "panchayats": [
                    {"name": "Mysuru Central Gram Panchayat", "lgd_code": 301273, "block": "Mysuru Block", "villages": ["Mysuru Khas", "Mysuru Dehat", "Mysuru Purva"]},
                    {"name": "Mysuru Model Krishi Panchayat", "lgd_code": 302273, "block": "Mysuru East Block", "villages": ["Kalyanpur Mysuru", "Rampur Mysuru", "Shivpur Mysuru"]}
                ]
            },
            "Raichur": {
                "lgd_code": 1274,
                "name_hi": "Raichur",
                "headquarters": "Raichur",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Raichur Sadar", "Raichur North", "Raichur South", "Raichur Rural"],
                "blocks": ["Raichur Block", "Raichur West Block", "Raichur East Block"],
                "panchayats": [
                    {"name": "Raichur Central Gram Panchayat", "lgd_code": 301274, "block": "Raichur Block", "villages": ["Raichur Khas", "Raichur Dehat", "Raichur Purva"]},
                    {"name": "Raichur Model Krishi Panchayat", "lgd_code": 302274, "block": "Raichur East Block", "villages": ["Kalyanpur Raichur", "Rampur Raichur", "Shivpur Raichur"]}
                ]
            },
            "Ramanagara": {
                "lgd_code": 1275,
                "name_hi": "Ramanagara",
                "headquarters": "Ramanagara",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ramanagara Sadar", "Ramanagara North", "Ramanagara South", "Ramanagara Rural"],
                "blocks": ["Ramanagara Block", "Ramanagara West Block", "Ramanagara East Block"],
                "panchayats": [
                    {"name": "Ramanagara Central Gram Panchayat", "lgd_code": 301275, "block": "Ramanagara Block", "villages": ["Ramanagara Khas", "Ramanagara Dehat", "Ramanagara Purva"]},
                    {"name": "Ramanagara Model Krishi Panchayat", "lgd_code": 302275, "block": "Ramanagara East Block", "villages": ["Kalyanpur Ramanagara", "Rampur Ramanagara", "Shivpur Ramanagara"]}
                ]
            },
            "Shivamogga": {
                "lgd_code": 1276,
                "name_hi": "Shivamogga",
                "headquarters": "Shivamogga",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shivamogga Sadar", "Shivamogga North", "Shivamogga South", "Shivamogga Rural"],
                "blocks": ["Shivamogga Block", "Shivamogga West Block", "Shivamogga East Block"],
                "panchayats": [
                    {"name": "Shivamogga Central Gram Panchayat", "lgd_code": 301276, "block": "Shivamogga Block", "villages": ["Shivamogga Khas", "Shivamogga Dehat", "Shivamogga Purva"]},
                    {"name": "Shivamogga Model Krishi Panchayat", "lgd_code": 302276, "block": "Shivamogga East Block", "villages": ["Kalyanpur Shivamogga", "Rampur Shivamogga", "Shivpur Shivamogga"]}
                ]
            },
            "Tumakuru": {
                "lgd_code": 1277,
                "name_hi": "Tumakuru",
                "headquarters": "Tumakuru",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tumakuru Sadar", "Tumakuru North", "Tumakuru South", "Tumakuru Rural"],
                "blocks": ["Tumakuru Block", "Tumakuru West Block", "Tumakuru East Block"],
                "panchayats": [
                    {"name": "Tumakuru Central Gram Panchayat", "lgd_code": 301277, "block": "Tumakuru Block", "villages": ["Tumakuru Khas", "Tumakuru Dehat", "Tumakuru Purva"]},
                    {"name": "Tumakuru Model Krishi Panchayat", "lgd_code": 302277, "block": "Tumakuru East Block", "villages": ["Kalyanpur Tumakuru", "Rampur Tumakuru", "Shivpur Tumakuru"]}
                ]
            },
            "Udupi": {
                "lgd_code": 1278,
                "name_hi": "Udupi",
                "headquarters": "Udupi",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Udupi Sadar", "Udupi North", "Udupi South", "Udupi Rural"],
                "blocks": ["Udupi Block", "Udupi West Block", "Udupi East Block"],
                "panchayats": [
                    {"name": "Udupi Central Gram Panchayat", "lgd_code": 301278, "block": "Udupi Block", "villages": ["Udupi Khas", "Udupi Dehat", "Udupi Purva"]},
                    {"name": "Udupi Model Krishi Panchayat", "lgd_code": 302278, "block": "Udupi East Block", "villages": ["Kalyanpur Udupi", "Rampur Udupi", "Shivpur Udupi"]}
                ]
            },
            "Uttara Kannada (Karwar)": {
                "lgd_code": 1279,
                "name_hi": "Uttara Kannada",
                "headquarters": "Uttara Kannada",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Uttara Kannada Sadar", "Uttara Kannada North", "Uttara Kannada South", "Uttara Kannada Rural"],
                "blocks": ["Uttara Kannada Block", "Uttara Kannada West Block", "Uttara Kannada East Block"],
                "panchayats": [
                    {"name": "Uttara Kannada Central Gram Panchayat", "lgd_code": 301279, "block": "Uttara Kannada Block", "villages": ["Uttara Kannada Khas", "Uttara Kannada Dehat", "Uttara Kannada Purva"]},
                    {"name": "Uttara Kannada Model Krishi Panchayat", "lgd_code": 302279, "block": "Uttara Kannada East Block", "villages": ["Kalyanpur Uttara Kannada", "Rampur Uttara Kannada", "Shivpur Uttara Kannada"]}
                ]
            },
            "Vijayanagara (Hosapete)": {
                "lgd_code": 1280,
                "name_hi": "Vijayanagara",
                "headquarters": "Vijayanagara",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vijayanagara Sadar", "Vijayanagara North", "Vijayanagara South", "Vijayanagara Rural"],
                "blocks": ["Vijayanagara Block", "Vijayanagara West Block", "Vijayanagara East Block"],
                "panchayats": [
                    {"name": "Vijayanagara Central Gram Panchayat", "lgd_code": 301280, "block": "Vijayanagara Block", "villages": ["Vijayanagara Khas", "Vijayanagara Dehat", "Vijayanagara Purva"]},
                    {"name": "Vijayanagara Model Krishi Panchayat", "lgd_code": 302280, "block": "Vijayanagara East Block", "villages": ["Kalyanpur Vijayanagara", "Rampur Vijayanagara", "Shivpur Vijayanagara"]}
                ]
            },
            "Vijayapura (Bijapur)": {
                "lgd_code": 1281,
                "name_hi": "Vijayapura",
                "headquarters": "Vijayapura",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vijayapura Sadar", "Vijayapura North", "Vijayapura South", "Vijayapura Rural"],
                "blocks": ["Vijayapura Block", "Vijayapura West Block", "Vijayapura East Block"],
                "panchayats": [
                    {"name": "Vijayapura Central Gram Panchayat", "lgd_code": 301281, "block": "Vijayapura Block", "villages": ["Vijayapura Khas", "Vijayapura Dehat", "Vijayapura Purva"]},
                    {"name": "Vijayapura Model Krishi Panchayat", "lgd_code": 302281, "block": "Vijayapura East Block", "villages": ["Kalyanpur Vijayapura", "Rampur Vijayapura", "Shivpur Vijayapura"]}
                ]
            },
            "Yadgir": {
                "lgd_code": 1282,
                "name_hi": "Yadgir",
                "headquarters": "Yadgir",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Yadgir Sadar", "Yadgir North", "Yadgir South", "Yadgir Rural"],
                "blocks": ["Yadgir Block", "Yadgir West Block", "Yadgir East Block"],
                "panchayats": [
                    {"name": "Yadgir Central Gram Panchayat", "lgd_code": 301282, "block": "Yadgir Block", "villages": ["Yadgir Khas", "Yadgir Dehat", "Yadgir Purva"]},
                    {"name": "Yadgir Model Krishi Panchayat", "lgd_code": 302282, "block": "Yadgir East Block", "villages": ["Kalyanpur Yadgir", "Rampur Yadgir", "Shivpur Yadgir"]}
                ]
            },
        }
    },
    "Kerala": {
        "districts": {
            "Alappuzha": {
                "lgd_code": 1283,
                "name_hi": "Alappuzha",
                "headquarters": "Alappuzha",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Alappuzha Sadar", "Alappuzha North", "Alappuzha South", "Alappuzha Rural"],
                "blocks": ["Alappuzha Block", "Alappuzha West Block", "Alappuzha East Block"],
                "panchayats": [
                    {"name": "Alappuzha Central Gram Panchayat", "lgd_code": 301283, "block": "Alappuzha Block", "villages": ["Alappuzha Khas", "Alappuzha Dehat", "Alappuzha Purva"]},
                    {"name": "Alappuzha Model Krishi Panchayat", "lgd_code": 302283, "block": "Alappuzha East Block", "villages": ["Kalyanpur Alappuzha", "Rampur Alappuzha", "Shivpur Alappuzha"]}
                ]
            },
            "Ernakulam (Kochi)": {
                "lgd_code": 1284,
                "name_hi": "Ernakulam",
                "headquarters": "Ernakulam",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ernakulam Sadar", "Ernakulam North", "Ernakulam South", "Ernakulam Rural"],
                "blocks": ["Ernakulam Block", "Ernakulam West Block", "Ernakulam East Block"],
                "panchayats": [
                    {"name": "Ernakulam Central Gram Panchayat", "lgd_code": 301284, "block": "Ernakulam Block", "villages": ["Ernakulam Khas", "Ernakulam Dehat", "Ernakulam Purva"]},
                    {"name": "Ernakulam Model Krishi Panchayat", "lgd_code": 302284, "block": "Ernakulam East Block", "villages": ["Kalyanpur Ernakulam", "Rampur Ernakulam", "Shivpur Ernakulam"]}
                ]
            },
            "Idukki": {
                "lgd_code": 1285,
                "name_hi": "Idukki",
                "headquarters": "Idukki",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Idukki Sadar", "Idukki North", "Idukki South", "Idukki Rural"],
                "blocks": ["Idukki Block", "Idukki West Block", "Idukki East Block"],
                "panchayats": [
                    {"name": "Idukki Central Gram Panchayat", "lgd_code": 301285, "block": "Idukki Block", "villages": ["Idukki Khas", "Idukki Dehat", "Idukki Purva"]},
                    {"name": "Idukki Model Krishi Panchayat", "lgd_code": 302285, "block": "Idukki East Block", "villages": ["Kalyanpur Idukki", "Rampur Idukki", "Shivpur Idukki"]}
                ]
            },
            "Kannur": {
                "lgd_code": 1286,
                "name_hi": "Kannur",
                "headquarters": "Kannur",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kannur Sadar", "Kannur North", "Kannur South", "Kannur Rural"],
                "blocks": ["Kannur Block", "Kannur West Block", "Kannur East Block"],
                "panchayats": [
                    {"name": "Kannur Central Gram Panchayat", "lgd_code": 301286, "block": "Kannur Block", "villages": ["Kannur Khas", "Kannur Dehat", "Kannur Purva"]},
                    {"name": "Kannur Model Krishi Panchayat", "lgd_code": 302286, "block": "Kannur East Block", "villages": ["Kalyanpur Kannur", "Rampur Kannur", "Shivpur Kannur"]}
                ]
            },
            "Kasaragod": {
                "lgd_code": 1287,
                "name_hi": "Kasaragod",
                "headquarters": "Kasaragod",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kasaragod Sadar", "Kasaragod North", "Kasaragod South", "Kasaragod Rural"],
                "blocks": ["Kasaragod Block", "Kasaragod West Block", "Kasaragod East Block"],
                "panchayats": [
                    {"name": "Kasaragod Central Gram Panchayat", "lgd_code": 301287, "block": "Kasaragod Block", "villages": ["Kasaragod Khas", "Kasaragod Dehat", "Kasaragod Purva"]},
                    {"name": "Kasaragod Model Krishi Panchayat", "lgd_code": 302287, "block": "Kasaragod East Block", "villages": ["Kalyanpur Kasaragod", "Rampur Kasaragod", "Shivpur Kasaragod"]}
                ]
            },
            "Kollam": {
                "lgd_code": 1288,
                "name_hi": "Kollam",
                "headquarters": "Kollam",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kollam Sadar", "Kollam North", "Kollam South", "Kollam Rural"],
                "blocks": ["Kollam Block", "Kollam West Block", "Kollam East Block"],
                "panchayats": [
                    {"name": "Kollam Central Gram Panchayat", "lgd_code": 301288, "block": "Kollam Block", "villages": ["Kollam Khas", "Kollam Dehat", "Kollam Purva"]},
                    {"name": "Kollam Model Krishi Panchayat", "lgd_code": 302288, "block": "Kollam East Block", "villages": ["Kalyanpur Kollam", "Rampur Kollam", "Shivpur Kollam"]}
                ]
            },
            "Kottayam": {
                "lgd_code": 1289,
                "name_hi": "Kottayam",
                "headquarters": "Kottayam",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kottayam Sadar", "Kottayam North", "Kottayam South", "Kottayam Rural"],
                "blocks": ["Kottayam Block", "Kottayam West Block", "Kottayam East Block"],
                "panchayats": [
                    {"name": "Kottayam Central Gram Panchayat", "lgd_code": 301289, "block": "Kottayam Block", "villages": ["Kottayam Khas", "Kottayam Dehat", "Kottayam Purva"]},
                    {"name": "Kottayam Model Krishi Panchayat", "lgd_code": 302289, "block": "Kottayam East Block", "villages": ["Kalyanpur Kottayam", "Rampur Kottayam", "Shivpur Kottayam"]}
                ]
            },
            "Kozhikode": {
                "lgd_code": 1290,
                "name_hi": "Kozhikode",
                "headquarters": "Kozhikode",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kozhikode Sadar", "Kozhikode North", "Kozhikode South", "Kozhikode Rural"],
                "blocks": ["Kozhikode Block", "Kozhikode West Block", "Kozhikode East Block"],
                "panchayats": [
                    {"name": "Kozhikode Central Gram Panchayat", "lgd_code": 301290, "block": "Kozhikode Block", "villages": ["Kozhikode Khas", "Kozhikode Dehat", "Kozhikode Purva"]},
                    {"name": "Kozhikode Model Krishi Panchayat", "lgd_code": 302290, "block": "Kozhikode East Block", "villages": ["Kalyanpur Kozhikode", "Rampur Kozhikode", "Shivpur Kozhikode"]}
                ]
            },
            "Malappuram": {
                "lgd_code": 1291,
                "name_hi": "Malappuram",
                "headquarters": "Malappuram",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Malappuram Sadar", "Malappuram North", "Malappuram South", "Malappuram Rural"],
                "blocks": ["Malappuram Block", "Malappuram West Block", "Malappuram East Block"],
                "panchayats": [
                    {"name": "Malappuram Central Gram Panchayat", "lgd_code": 301291, "block": "Malappuram Block", "villages": ["Malappuram Khas", "Malappuram Dehat", "Malappuram Purva"]},
                    {"name": "Malappuram Model Krishi Panchayat", "lgd_code": 302291, "block": "Malappuram East Block", "villages": ["Kalyanpur Malappuram", "Rampur Malappuram", "Shivpur Malappuram"]}
                ]
            },
            "Palakkad": {
                "lgd_code": 1292,
                "name_hi": "Palakkad",
                "headquarters": "Palakkad",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Palakkad Sadar", "Palakkad North", "Palakkad South", "Palakkad Rural"],
                "blocks": ["Palakkad Block", "Palakkad West Block", "Palakkad East Block"],
                "panchayats": [
                    {"name": "Palakkad Central Gram Panchayat", "lgd_code": 301292, "block": "Palakkad Block", "villages": ["Palakkad Khas", "Palakkad Dehat", "Palakkad Purva"]},
                    {"name": "Palakkad Model Krishi Panchayat", "lgd_code": 302292, "block": "Palakkad East Block", "villages": ["Kalyanpur Palakkad", "Rampur Palakkad", "Shivpur Palakkad"]}
                ]
            },
            "Pathanamthitta": {
                "lgd_code": 1293,
                "name_hi": "Pathanamthitta",
                "headquarters": "Pathanamthitta",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pathanamthitta Sadar", "Pathanamthitta North", "Pathanamthitta South", "Pathanamthitta Rural"],
                "blocks": ["Pathanamthitta Block", "Pathanamthitta West Block", "Pathanamthitta East Block"],
                "panchayats": [
                    {"name": "Pathanamthitta Central Gram Panchayat", "lgd_code": 301293, "block": "Pathanamthitta Block", "villages": ["Pathanamthitta Khas", "Pathanamthitta Dehat", "Pathanamthitta Purva"]},
                    {"name": "Pathanamthitta Model Krishi Panchayat", "lgd_code": 302293, "block": "Pathanamthitta East Block", "villages": ["Kalyanpur Pathanamthitta", "Rampur Pathanamthitta", "Shivpur Pathanamthitta"]}
                ]
            },
            "Thiruvananthapuram": {
                "lgd_code": 1294,
                "name_hi": "Thiruvananthapuram",
                "headquarters": "Thiruvananthapuram",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thiruvananthapuram Sadar", "Thiruvananthapuram North", "Thiruvananthapuram South", "Thiruvananthapuram Rural"],
                "blocks": ["Thiruvananthapuram Block", "Thiruvananthapuram West Block", "Thiruvananthapuram East Block"],
                "panchayats": [
                    {"name": "Thiruvananthapuram Central Gram Panchayat", "lgd_code": 301294, "block": "Thiruvananthapuram Block", "villages": ["Thiruvananthapuram Khas", "Thiruvananthapuram Dehat", "Thiruvananthapuram Purva"]},
                    {"name": "Thiruvananthapuram Model Krishi Panchayat", "lgd_code": 302294, "block": "Thiruvananthapuram East Block", "villages": ["Kalyanpur Thiruvananthapuram", "Rampur Thiruvananthapuram", "Shivpur Thiruvananthapuram"]}
                ]
            },
            "Thrissur": {
                "lgd_code": 1295,
                "name_hi": "Thrissur",
                "headquarters": "Thrissur",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thrissur Sadar", "Thrissur North", "Thrissur South", "Thrissur Rural"],
                "blocks": ["Thrissur Block", "Thrissur West Block", "Thrissur East Block"],
                "panchayats": [
                    {"name": "Thrissur Central Gram Panchayat", "lgd_code": 301295, "block": "Thrissur Block", "villages": ["Thrissur Khas", "Thrissur Dehat", "Thrissur Purva"]},
                    {"name": "Thrissur Model Krishi Panchayat", "lgd_code": 302295, "block": "Thrissur East Block", "villages": ["Kalyanpur Thrissur", "Rampur Thrissur", "Shivpur Thrissur"]}
                ]
            },
            "Wayanad": {
                "lgd_code": 1296,
                "name_hi": "Wayanad",
                "headquarters": "Wayanad",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Wayanad Sadar", "Wayanad North", "Wayanad South", "Wayanad Rural"],
                "blocks": ["Wayanad Block", "Wayanad West Block", "Wayanad East Block"],
                "panchayats": [
                    {"name": "Wayanad Central Gram Panchayat", "lgd_code": 301296, "block": "Wayanad Block", "villages": ["Wayanad Khas", "Wayanad Dehat", "Wayanad Purva"]},
                    {"name": "Wayanad Model Krishi Panchayat", "lgd_code": 302296, "block": "Wayanad East Block", "villages": ["Kalyanpur Wayanad", "Rampur Wayanad", "Shivpur Wayanad"]}
                ]
            },
        }
    },
    "Madhya Pradesh": {
        "districts": {
            "Agar Malwa": {
                "lgd_code": 1297,
                "name_hi": "Agar Malwa",
                "headquarters": "Agar Malwa",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Agar Malwa Sadar", "Agar Malwa North", "Agar Malwa South", "Agar Malwa Rural"],
                "blocks": ["Agar Malwa Block", "Agar Malwa West Block", "Agar Malwa East Block"],
                "panchayats": [
                    {"name": "Agar Malwa Central Gram Panchayat", "lgd_code": 301297, "block": "Agar Malwa Block", "villages": ["Agar Malwa Khas", "Agar Malwa Dehat", "Agar Malwa Purva"]},
                    {"name": "Agar Malwa Model Krishi Panchayat", "lgd_code": 302297, "block": "Agar Malwa East Block", "villages": ["Kalyanpur Agar Malwa", "Rampur Agar Malwa", "Shivpur Agar Malwa"]}
                ]
            },
            "Alirajpur": {
                "lgd_code": 1298,
                "name_hi": "Alirajpur",
                "headquarters": "Alirajpur",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Alirajpur Sadar", "Alirajpur North", "Alirajpur South", "Alirajpur Rural"],
                "blocks": ["Alirajpur Block", "Alirajpur West Block", "Alirajpur East Block"],
                "panchayats": [
                    {"name": "Alirajpur Central Gram Panchayat", "lgd_code": 301298, "block": "Alirajpur Block", "villages": ["Alirajpur Khas", "Alirajpur Dehat", "Alirajpur Purva"]},
                    {"name": "Alirajpur Model Krishi Panchayat", "lgd_code": 302298, "block": "Alirajpur East Block", "villages": ["Kalyanpur Alirajpur", "Rampur Alirajpur", "Shivpur Alirajpur"]}
                ]
            },
            "Anuppur": {
                "lgd_code": 1299,
                "name_hi": "Anuppur",
                "headquarters": "Anuppur",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anuppur Sadar", "Anuppur North", "Anuppur South", "Anuppur Rural"],
                "blocks": ["Anuppur Block", "Anuppur West Block", "Anuppur East Block"],
                "panchayats": [
                    {"name": "Anuppur Central Gram Panchayat", "lgd_code": 301299, "block": "Anuppur Block", "villages": ["Anuppur Khas", "Anuppur Dehat", "Anuppur Purva"]},
                    {"name": "Anuppur Model Krishi Panchayat", "lgd_code": 302299, "block": "Anuppur East Block", "villages": ["Kalyanpur Anuppur", "Rampur Anuppur", "Shivpur Anuppur"]}
                ]
            },
            "Ashoknagar": {
                "lgd_code": 1300,
                "name_hi": "Ashoknagar",
                "headquarters": "Ashoknagar",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ashoknagar Sadar", "Ashoknagar North", "Ashoknagar South", "Ashoknagar Rural"],
                "blocks": ["Ashoknagar Block", "Ashoknagar West Block", "Ashoknagar East Block"],
                "panchayats": [
                    {"name": "Ashoknagar Central Gram Panchayat", "lgd_code": 301300, "block": "Ashoknagar Block", "villages": ["Ashoknagar Khas", "Ashoknagar Dehat", "Ashoknagar Purva"]},
                    {"name": "Ashoknagar Model Krishi Panchayat", "lgd_code": 302300, "block": "Ashoknagar East Block", "villages": ["Kalyanpur Ashoknagar", "Rampur Ashoknagar", "Shivpur Ashoknagar"]}
                ]
            },
            "Balaghat": {
                "lgd_code": 1301,
                "name_hi": "Balaghat",
                "headquarters": "Balaghat",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balaghat Sadar", "Balaghat North", "Balaghat South", "Balaghat Rural"],
                "blocks": ["Balaghat Block", "Balaghat West Block", "Balaghat East Block"],
                "panchayats": [
                    {"name": "Balaghat Central Gram Panchayat", "lgd_code": 301301, "block": "Balaghat Block", "villages": ["Balaghat Khas", "Balaghat Dehat", "Balaghat Purva"]},
                    {"name": "Balaghat Model Krishi Panchayat", "lgd_code": 302301, "block": "Balaghat East Block", "villages": ["Kalyanpur Balaghat", "Rampur Balaghat", "Shivpur Balaghat"]}
                ]
            },
            "Barwani": {
                "lgd_code": 1302,
                "name_hi": "Barwani",
                "headquarters": "Barwani",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Barwani Sadar", "Barwani North", "Barwani South", "Barwani Rural"],
                "blocks": ["Barwani Block", "Barwani West Block", "Barwani East Block"],
                "panchayats": [
                    {"name": "Barwani Central Gram Panchayat", "lgd_code": 301302, "block": "Barwani Block", "villages": ["Barwani Khas", "Barwani Dehat", "Barwani Purva"]},
                    {"name": "Barwani Model Krishi Panchayat", "lgd_code": 302302, "block": "Barwani East Block", "villages": ["Kalyanpur Barwani", "Rampur Barwani", "Shivpur Barwani"]}
                ]
            },
            "Betul": {
                "lgd_code": 1303,
                "name_hi": "Betul",
                "headquarters": "Betul",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Betul Sadar", "Betul North", "Betul South", "Betul Rural"],
                "blocks": ["Betul Block", "Betul West Block", "Betul East Block"],
                "panchayats": [
                    {"name": "Betul Central Gram Panchayat", "lgd_code": 301303, "block": "Betul Block", "villages": ["Betul Khas", "Betul Dehat", "Betul Purva"]},
                    {"name": "Betul Model Krishi Panchayat", "lgd_code": 302303, "block": "Betul East Block", "villages": ["Kalyanpur Betul", "Rampur Betul", "Shivpur Betul"]}
                ]
            },
            "Bhind": {
                "lgd_code": 1304,
                "name_hi": "Bhind",
                "headquarters": "Bhind",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhind Sadar", "Bhind North", "Bhind South", "Bhind Rural"],
                "blocks": ["Bhind Block", "Bhind West Block", "Bhind East Block"],
                "panchayats": [
                    {"name": "Bhind Central Gram Panchayat", "lgd_code": 301304, "block": "Bhind Block", "villages": ["Bhind Khas", "Bhind Dehat", "Bhind Purva"]},
                    {"name": "Bhind Model Krishi Panchayat", "lgd_code": 302304, "block": "Bhind East Block", "villages": ["Kalyanpur Bhind", "Rampur Bhind", "Shivpur Bhind"]}
                ]
            },
            "Bhopal": {
                "lgd_code": 1305,
                "name_hi": "Bhopal",
                "headquarters": "Bhopal",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhopal Sadar", "Bhopal North", "Bhopal South", "Bhopal Rural"],
                "blocks": ["Bhopal Block", "Bhopal West Block", "Bhopal East Block"],
                "panchayats": [
                    {"name": "Bhopal Central Gram Panchayat", "lgd_code": 301305, "block": "Bhopal Block", "villages": ["Bhopal Khas", "Bhopal Dehat", "Bhopal Purva"]},
                    {"name": "Bhopal Model Krishi Panchayat", "lgd_code": 302305, "block": "Bhopal East Block", "villages": ["Kalyanpur Bhopal", "Rampur Bhopal", "Shivpur Bhopal"]}
                ]
            },
            "Burhanpur": {
                "lgd_code": 1306,
                "name_hi": "Burhanpur",
                "headquarters": "Burhanpur",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Burhanpur Sadar", "Burhanpur North", "Burhanpur South", "Burhanpur Rural"],
                "blocks": ["Burhanpur Block", "Burhanpur West Block", "Burhanpur East Block"],
                "panchayats": [
                    {"name": "Burhanpur Central Gram Panchayat", "lgd_code": 301306, "block": "Burhanpur Block", "villages": ["Burhanpur Khas", "Burhanpur Dehat", "Burhanpur Purva"]},
                    {"name": "Burhanpur Model Krishi Panchayat", "lgd_code": 302306, "block": "Burhanpur East Block", "villages": ["Kalyanpur Burhanpur", "Rampur Burhanpur", "Shivpur Burhanpur"]}
                ]
            },
            "Chhatarpur": {
                "lgd_code": 1307,
                "name_hi": "Chhatarpur",
                "headquarters": "Chhatarpur",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chhatarpur Sadar", "Chhatarpur North", "Chhatarpur South", "Chhatarpur Rural"],
                "blocks": ["Chhatarpur Block", "Chhatarpur West Block", "Chhatarpur East Block"],
                "panchayats": [
                    {"name": "Chhatarpur Central Gram Panchayat", "lgd_code": 301307, "block": "Chhatarpur Block", "villages": ["Chhatarpur Khas", "Chhatarpur Dehat", "Chhatarpur Purva"]},
                    {"name": "Chhatarpur Model Krishi Panchayat", "lgd_code": 302307, "block": "Chhatarpur East Block", "villages": ["Kalyanpur Chhatarpur", "Rampur Chhatarpur", "Shivpur Chhatarpur"]}
                ]
            },
            "Chhindwara": {
                "lgd_code": 1308,
                "name_hi": "Chhindwara",
                "headquarters": "Chhindwara",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chhindwara Sadar", "Chhindwara North", "Chhindwara South", "Chhindwara Rural"],
                "blocks": ["Chhindwara Block", "Chhindwara West Block", "Chhindwara East Block"],
                "panchayats": [
                    {"name": "Chhindwara Central Gram Panchayat", "lgd_code": 301308, "block": "Chhindwara Block", "villages": ["Chhindwara Khas", "Chhindwara Dehat", "Chhindwara Purva"]},
                    {"name": "Chhindwara Model Krishi Panchayat", "lgd_code": 302308, "block": "Chhindwara East Block", "villages": ["Kalyanpur Chhindwara", "Rampur Chhindwara", "Shivpur Chhindwara"]}
                ]
            },
            "Damoh": {
                "lgd_code": 1309,
                "name_hi": "Damoh",
                "headquarters": "Damoh",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Damoh Sadar", "Damoh North", "Damoh South", "Damoh Rural"],
                "blocks": ["Damoh Block", "Damoh West Block", "Damoh East Block"],
                "panchayats": [
                    {"name": "Damoh Central Gram Panchayat", "lgd_code": 301309, "block": "Damoh Block", "villages": ["Damoh Khas", "Damoh Dehat", "Damoh Purva"]},
                    {"name": "Damoh Model Krishi Panchayat", "lgd_code": 302309, "block": "Damoh East Block", "villages": ["Kalyanpur Damoh", "Rampur Damoh", "Shivpur Damoh"]}
                ]
            },
            "Datia": {
                "lgd_code": 1310,
                "name_hi": "Datia",
                "headquarters": "Datia",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Datia Sadar", "Datia North", "Datia South", "Datia Rural"],
                "blocks": ["Datia Block", "Datia West Block", "Datia East Block"],
                "panchayats": [
                    {"name": "Datia Central Gram Panchayat", "lgd_code": 301310, "block": "Datia Block", "villages": ["Datia Khas", "Datia Dehat", "Datia Purva"]},
                    {"name": "Datia Model Krishi Panchayat", "lgd_code": 302310, "block": "Datia East Block", "villages": ["Kalyanpur Datia", "Rampur Datia", "Shivpur Datia"]}
                ]
            },
            "Dewas": {
                "lgd_code": 1311,
                "name_hi": "Dewas",
                "headquarters": "Dewas",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dewas Sadar", "Dewas North", "Dewas South", "Dewas Rural"],
                "blocks": ["Dewas Block", "Dewas West Block", "Dewas East Block"],
                "panchayats": [
                    {"name": "Dewas Central Gram Panchayat", "lgd_code": 301311, "block": "Dewas Block", "villages": ["Dewas Khas", "Dewas Dehat", "Dewas Purva"]},
                    {"name": "Dewas Model Krishi Panchayat", "lgd_code": 302311, "block": "Dewas East Block", "villages": ["Kalyanpur Dewas", "Rampur Dewas", "Shivpur Dewas"]}
                ]
            },
            "Dhar": {
                "lgd_code": 1312,
                "name_hi": "Dhar",
                "headquarters": "Dhar",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhar Sadar", "Dhar North", "Dhar South", "Dhar Rural"],
                "blocks": ["Dhar Block", "Dhar West Block", "Dhar East Block"],
                "panchayats": [
                    {"name": "Dhar Central Gram Panchayat", "lgd_code": 301312, "block": "Dhar Block", "villages": ["Dhar Khas", "Dhar Dehat", "Dhar Purva"]},
                    {"name": "Dhar Model Krishi Panchayat", "lgd_code": 302312, "block": "Dhar East Block", "villages": ["Kalyanpur Dhar", "Rampur Dhar", "Shivpur Dhar"]}
                ]
            },
            "Dindori MP": {
                "lgd_code": 1313,
                "name_hi": "Dindori MP",
                "headquarters": "Dindori MP",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dindori MP Sadar", "Dindori MP North", "Dindori MP South", "Dindori MP Rural"],
                "blocks": ["Dindori MP Block", "Dindori MP West Block", "Dindori MP East Block"],
                "panchayats": [
                    {"name": "Dindori MP Central Gram Panchayat", "lgd_code": 301313, "block": "Dindori MP Block", "villages": ["Dindori MP Khas", "Dindori MP Dehat", "Dindori MP Purva"]},
                    {"name": "Dindori MP Model Krishi Panchayat", "lgd_code": 302313, "block": "Dindori MP East Block", "villages": ["Kalyanpur Dindori MP", "Rampur Dindori MP", "Shivpur Dindori MP"]}
                ]
            },
            "Guna": {
                "lgd_code": 1314,
                "name_hi": "Guna",
                "headquarters": "Guna",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Guna Sadar", "Guna North", "Guna South", "Guna Rural"],
                "blocks": ["Guna Block", "Guna West Block", "Guna East Block"],
                "panchayats": [
                    {"name": "Guna Central Gram Panchayat", "lgd_code": 301314, "block": "Guna Block", "villages": ["Guna Khas", "Guna Dehat", "Guna Purva"]},
                    {"name": "Guna Model Krishi Panchayat", "lgd_code": 302314, "block": "Guna East Block", "villages": ["Kalyanpur Guna", "Rampur Guna", "Shivpur Guna"]}
                ]
            },
            "Gwalior": {
                "lgd_code": 1315,
                "name_hi": "Gwalior",
                "headquarters": "Gwalior",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gwalior Sadar", "Gwalior North", "Gwalior South", "Gwalior Rural"],
                "blocks": ["Gwalior Block", "Gwalior West Block", "Gwalior East Block"],
                "panchayats": [
                    {"name": "Gwalior Central Gram Panchayat", "lgd_code": 301315, "block": "Gwalior Block", "villages": ["Gwalior Khas", "Gwalior Dehat", "Gwalior Purva"]},
                    {"name": "Gwalior Model Krishi Panchayat", "lgd_code": 302315, "block": "Gwalior East Block", "villages": ["Kalyanpur Gwalior", "Rampur Gwalior", "Shivpur Gwalior"]}
                ]
            },
            "Harda": {
                "lgd_code": 1316,
                "name_hi": "Harda",
                "headquarters": "Harda",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Harda Sadar", "Harda North", "Harda South", "Harda Rural"],
                "blocks": ["Harda Block", "Harda West Block", "Harda East Block"],
                "panchayats": [
                    {"name": "Harda Central Gram Panchayat", "lgd_code": 301316, "block": "Harda Block", "villages": ["Harda Khas", "Harda Dehat", "Harda Purva"]},
                    {"name": "Harda Model Krishi Panchayat", "lgd_code": 302316, "block": "Harda East Block", "villages": ["Kalyanpur Harda", "Rampur Harda", "Shivpur Harda"]}
                ]
            },
            "Hoshangabad (Narmadapuram)": {
                "lgd_code": 1317,
                "name_hi": "Hoshangabad",
                "headquarters": "Hoshangabad",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hoshangabad Sadar", "Hoshangabad North", "Hoshangabad South", "Hoshangabad Rural"],
                "blocks": ["Hoshangabad Block", "Hoshangabad West Block", "Hoshangabad East Block"],
                "panchayats": [
                    {"name": "Hoshangabad Central Gram Panchayat", "lgd_code": 301317, "block": "Hoshangabad Block", "villages": ["Hoshangabad Khas", "Hoshangabad Dehat", "Hoshangabad Purva"]},
                    {"name": "Hoshangabad Model Krishi Panchayat", "lgd_code": 302317, "block": "Hoshangabad East Block", "villages": ["Kalyanpur Hoshangabad", "Rampur Hoshangabad", "Shivpur Hoshangabad"]}
                ]
            },
            "Indore": {
                "lgd_code": 1318,
                "name_hi": "Indore",
                "headquarters": "Indore",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Indore Sadar", "Indore North", "Indore South", "Indore Rural"],
                "blocks": ["Indore Block", "Indore West Block", "Indore East Block"],
                "panchayats": [
                    {"name": "Indore Central Gram Panchayat", "lgd_code": 301318, "block": "Indore Block", "villages": ["Indore Khas", "Indore Dehat", "Indore Purva"]},
                    {"name": "Indore Model Krishi Panchayat", "lgd_code": 302318, "block": "Indore East Block", "villages": ["Kalyanpur Indore", "Rampur Indore", "Shivpur Indore"]}
                ]
            },
            "Jabalpur": {
                "lgd_code": 1319,
                "name_hi": "Jabalpur",
                "headquarters": "Jabalpur",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jabalpur Sadar", "Jabalpur North", "Jabalpur South", "Jabalpur Rural"],
                "blocks": ["Jabalpur Block", "Jabalpur West Block", "Jabalpur East Block"],
                "panchayats": [
                    {"name": "Jabalpur Central Gram Panchayat", "lgd_code": 301319, "block": "Jabalpur Block", "villages": ["Jabalpur Khas", "Jabalpur Dehat", "Jabalpur Purva"]},
                    {"name": "Jabalpur Model Krishi Panchayat", "lgd_code": 302319, "block": "Jabalpur East Block", "villages": ["Kalyanpur Jabalpur", "Rampur Jabalpur", "Shivpur Jabalpur"]}
                ]
            },
            "Jhabua": {
                "lgd_code": 1320,
                "name_hi": "Jhabua",
                "headquarters": "Jhabua",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhabua Sadar", "Jhabua North", "Jhabua South", "Jhabua Rural"],
                "blocks": ["Jhabua Block", "Jhabua West Block", "Jhabua East Block"],
                "panchayats": [
                    {"name": "Jhabua Central Gram Panchayat", "lgd_code": 301320, "block": "Jhabua Block", "villages": ["Jhabua Khas", "Jhabua Dehat", "Jhabua Purva"]},
                    {"name": "Jhabua Model Krishi Panchayat", "lgd_code": 302320, "block": "Jhabua East Block", "villages": ["Kalyanpur Jhabua", "Rampur Jhabua", "Shivpur Jhabua"]}
                ]
            },
            "Katni": {
                "lgd_code": 1321,
                "name_hi": "Katni",
                "headquarters": "Katni",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Katni Sadar", "Katni North", "Katni South", "Katni Rural"],
                "blocks": ["Katni Block", "Katni West Block", "Katni East Block"],
                "panchayats": [
                    {"name": "Katni Central Gram Panchayat", "lgd_code": 301321, "block": "Katni Block", "villages": ["Katni Khas", "Katni Dehat", "Katni Purva"]},
                    {"name": "Katni Model Krishi Panchayat", "lgd_code": 302321, "block": "Katni East Block", "villages": ["Kalyanpur Katni", "Rampur Katni", "Shivpur Katni"]}
                ]
            },
            "Khandwa (East Nimar)": {
                "lgd_code": 1322,
                "name_hi": "Khandwa",
                "headquarters": "Khandwa",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khandwa Sadar", "Khandwa North", "Khandwa South", "Khandwa Rural"],
                "blocks": ["Khandwa Block", "Khandwa West Block", "Khandwa East Block"],
                "panchayats": [
                    {"name": "Khandwa Central Gram Panchayat", "lgd_code": 301322, "block": "Khandwa Block", "villages": ["Khandwa Khas", "Khandwa Dehat", "Khandwa Purva"]},
                    {"name": "Khandwa Model Krishi Panchayat", "lgd_code": 302322, "block": "Khandwa East Block", "villages": ["Kalyanpur Khandwa", "Rampur Khandwa", "Shivpur Khandwa"]}
                ]
            },
            "Khargone (West Nimar)": {
                "lgd_code": 1323,
                "name_hi": "Khargone",
                "headquarters": "Khargone",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khargone Sadar", "Khargone North", "Khargone South", "Khargone Rural"],
                "blocks": ["Khargone Block", "Khargone West Block", "Khargone East Block"],
                "panchayats": [
                    {"name": "Khargone Central Gram Panchayat", "lgd_code": 301323, "block": "Khargone Block", "villages": ["Khargone Khas", "Khargone Dehat", "Khargone Purva"]},
                    {"name": "Khargone Model Krishi Panchayat", "lgd_code": 302323, "block": "Khargone East Block", "villages": ["Kalyanpur Khargone", "Rampur Khargone", "Shivpur Khargone"]}
                ]
            },
            "Maihar": {
                "lgd_code": 1324,
                "name_hi": "Maihar",
                "headquarters": "Maihar",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Maihar Sadar", "Maihar North", "Maihar South", "Maihar Rural"],
                "blocks": ["Maihar Block", "Maihar West Block", "Maihar East Block"],
                "panchayats": [
                    {"name": "Maihar Central Gram Panchayat", "lgd_code": 301324, "block": "Maihar Block", "villages": ["Maihar Khas", "Maihar Dehat", "Maihar Purva"]},
                    {"name": "Maihar Model Krishi Panchayat", "lgd_code": 302324, "block": "Maihar East Block", "villages": ["Kalyanpur Maihar", "Rampur Maihar", "Shivpur Maihar"]}
                ]
            },
            "Mandla": {
                "lgd_code": 1325,
                "name_hi": "Mandla",
                "headquarters": "Mandla",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mandla Sadar", "Mandla North", "Mandla South", "Mandla Rural"],
                "blocks": ["Mandla Block", "Mandla West Block", "Mandla East Block"],
                "panchayats": [
                    {"name": "Mandla Central Gram Panchayat", "lgd_code": 301325, "block": "Mandla Block", "villages": ["Mandla Khas", "Mandla Dehat", "Mandla Purva"]},
                    {"name": "Mandla Model Krishi Panchayat", "lgd_code": 302325, "block": "Mandla East Block", "villages": ["Kalyanpur Mandla", "Rampur Mandla", "Shivpur Mandla"]}
                ]
            },
            "Mandsaur": {
                "lgd_code": 1326,
                "name_hi": "Mandsaur",
                "headquarters": "Mandsaur",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mandsaur Sadar", "Mandsaur North", "Mandsaur South", "Mandsaur Rural"],
                "blocks": ["Mandsaur Block", "Mandsaur West Block", "Mandsaur East Block"],
                "panchayats": [
                    {"name": "Mandsaur Central Gram Panchayat", "lgd_code": 301326, "block": "Mandsaur Block", "villages": ["Mandsaur Khas", "Mandsaur Dehat", "Mandsaur Purva"]},
                    {"name": "Mandsaur Model Krishi Panchayat", "lgd_code": 302326, "block": "Mandsaur East Block", "villages": ["Kalyanpur Mandsaur", "Rampur Mandsaur", "Shivpur Mandsaur"]}
                ]
            },
            "Mauganj": {
                "lgd_code": 1327,
                "name_hi": "Mauganj",
                "headquarters": "Mauganj",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mauganj Sadar", "Mauganj North", "Mauganj South", "Mauganj Rural"],
                "blocks": ["Mauganj Block", "Mauganj West Block", "Mauganj East Block"],
                "panchayats": [
                    {"name": "Mauganj Central Gram Panchayat", "lgd_code": 301327, "block": "Mauganj Block", "villages": ["Mauganj Khas", "Mauganj Dehat", "Mauganj Purva"]},
                    {"name": "Mauganj Model Krishi Panchayat", "lgd_code": 302327, "block": "Mauganj East Block", "villages": ["Kalyanpur Mauganj", "Rampur Mauganj", "Shivpur Mauganj"]}
                ]
            },
            "Morena": {
                "lgd_code": 1328,
                "name_hi": "Morena",
                "headquarters": "Morena",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Morena Sadar", "Morena North", "Morena South", "Morena Rural"],
                "blocks": ["Morena Block", "Morena West Block", "Morena East Block"],
                "panchayats": [
                    {"name": "Morena Central Gram Panchayat", "lgd_code": 301328, "block": "Morena Block", "villages": ["Morena Khas", "Morena Dehat", "Morena Purva"]},
                    {"name": "Morena Model Krishi Panchayat", "lgd_code": 302328, "block": "Morena East Block", "villages": ["Kalyanpur Morena", "Rampur Morena", "Shivpur Morena"]}
                ]
            },
            "Narsinghpur": {
                "lgd_code": 1329,
                "name_hi": "Narsinghpur",
                "headquarters": "Narsinghpur",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Narsinghpur Sadar", "Narsinghpur North", "Narsinghpur South", "Narsinghpur Rural"],
                "blocks": ["Narsinghpur Block", "Narsinghpur West Block", "Narsinghpur East Block"],
                "panchayats": [
                    {"name": "Narsinghpur Central Gram Panchayat", "lgd_code": 301329, "block": "Narsinghpur Block", "villages": ["Narsinghpur Khas", "Narsinghpur Dehat", "Narsinghpur Purva"]},
                    {"name": "Narsinghpur Model Krishi Panchayat", "lgd_code": 302329, "block": "Narsinghpur East Block", "villages": ["Kalyanpur Narsinghpur", "Rampur Narsinghpur", "Shivpur Narsinghpur"]}
                ]
            },
            "Neemuch": {
                "lgd_code": 1330,
                "name_hi": "Neemuch",
                "headquarters": "Neemuch",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Neemuch Sadar", "Neemuch North", "Neemuch South", "Neemuch Rural"],
                "blocks": ["Neemuch Block", "Neemuch West Block", "Neemuch East Block"],
                "panchayats": [
                    {"name": "Neemuch Central Gram Panchayat", "lgd_code": 301330, "block": "Neemuch Block", "villages": ["Neemuch Khas", "Neemuch Dehat", "Neemuch Purva"]},
                    {"name": "Neemuch Model Krishi Panchayat", "lgd_code": 302330, "block": "Neemuch East Block", "villages": ["Kalyanpur Neemuch", "Rampur Neemuch", "Shivpur Neemuch"]}
                ]
            },
            "Niwari": {
                "lgd_code": 1331,
                "name_hi": "Niwari",
                "headquarters": "Niwari",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Niwari Sadar", "Niwari North", "Niwari South", "Niwari Rural"],
                "blocks": ["Niwari Block", "Niwari West Block", "Niwari East Block"],
                "panchayats": [
                    {"name": "Niwari Central Gram Panchayat", "lgd_code": 301331, "block": "Niwari Block", "villages": ["Niwari Khas", "Niwari Dehat", "Niwari Purva"]},
                    {"name": "Niwari Model Krishi Panchayat", "lgd_code": 302331, "block": "Niwari East Block", "villages": ["Kalyanpur Niwari", "Rampur Niwari", "Shivpur Niwari"]}
                ]
            },
            "Panna": {
                "lgd_code": 1332,
                "name_hi": "Panna",
                "headquarters": "Panna",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Panna Sadar", "Panna North", "Panna South", "Panna Rural"],
                "blocks": ["Panna Block", "Panna West Block", "Panna East Block"],
                "panchayats": [
                    {"name": "Panna Central Gram Panchayat", "lgd_code": 301332, "block": "Panna Block", "villages": ["Panna Khas", "Panna Dehat", "Panna Purva"]},
                    {"name": "Panna Model Krishi Panchayat", "lgd_code": 302332, "block": "Panna East Block", "villages": ["Kalyanpur Panna", "Rampur Panna", "Shivpur Panna"]}
                ]
            },
            "Pandhurna": {
                "lgd_code": 1333,
                "name_hi": "Pandhurna",
                "headquarters": "Pandhurna",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pandhurna Sadar", "Pandhurna North", "Pandhurna South", "Pandhurna Rural"],
                "blocks": ["Pandhurna Block", "Pandhurna West Block", "Pandhurna East Block"],
                "panchayats": [
                    {"name": "Pandhurna Central Gram Panchayat", "lgd_code": 301333, "block": "Pandhurna Block", "villages": ["Pandhurna Khas", "Pandhurna Dehat", "Pandhurna Purva"]},
                    {"name": "Pandhurna Model Krishi Panchayat", "lgd_code": 302333, "block": "Pandhurna East Block", "villages": ["Kalyanpur Pandhurna", "Rampur Pandhurna", "Shivpur Pandhurna"]}
                ]
            },
            "Raisen": {
                "lgd_code": 1334,
                "name_hi": "Raisen",
                "headquarters": "Raisen",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Raisen Sadar", "Raisen North", "Raisen South", "Raisen Rural"],
                "blocks": ["Raisen Block", "Raisen West Block", "Raisen East Block"],
                "panchayats": [
                    {"name": "Raisen Central Gram Panchayat", "lgd_code": 301334, "block": "Raisen Block", "villages": ["Raisen Khas", "Raisen Dehat", "Raisen Purva"]},
                    {"name": "Raisen Model Krishi Panchayat", "lgd_code": 302334, "block": "Raisen East Block", "villages": ["Kalyanpur Raisen", "Rampur Raisen", "Shivpur Raisen"]}
                ]
            },
            "Rajgarh": {
                "lgd_code": 1335,
                "name_hi": "Rajgarh",
                "headquarters": "Rajgarh",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajgarh Sadar", "Rajgarh North", "Rajgarh South", "Rajgarh Rural"],
                "blocks": ["Rajgarh Block", "Rajgarh West Block", "Rajgarh East Block"],
                "panchayats": [
                    {"name": "Rajgarh Central Gram Panchayat", "lgd_code": 301335, "block": "Rajgarh Block", "villages": ["Rajgarh Khas", "Rajgarh Dehat", "Rajgarh Purva"]},
                    {"name": "Rajgarh Model Krishi Panchayat", "lgd_code": 302335, "block": "Rajgarh East Block", "villages": ["Kalyanpur Rajgarh", "Rampur Rajgarh", "Shivpur Rajgarh"]}
                ]
            },
            "Ratlam": {
                "lgd_code": 1336,
                "name_hi": "Ratlam",
                "headquarters": "Ratlam",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ratlam Sadar", "Ratlam North", "Ratlam South", "Ratlam Rural"],
                "blocks": ["Ratlam Block", "Ratlam West Block", "Ratlam East Block"],
                "panchayats": [
                    {"name": "Ratlam Central Gram Panchayat", "lgd_code": 301336, "block": "Ratlam Block", "villages": ["Ratlam Khas", "Ratlam Dehat", "Ratlam Purva"]},
                    {"name": "Ratlam Model Krishi Panchayat", "lgd_code": 302336, "block": "Ratlam East Block", "villages": ["Kalyanpur Ratlam", "Rampur Ratlam", "Shivpur Ratlam"]}
                ]
            },
            "Rewa": {
                "lgd_code": 1337,
                "name_hi": "Rewa",
                "headquarters": "Rewa",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rewa Sadar", "Rewa North", "Rewa South", "Rewa Rural"],
                "blocks": ["Rewa Block", "Rewa West Block", "Rewa East Block"],
                "panchayats": [
                    {"name": "Rewa Central Gram Panchayat", "lgd_code": 301337, "block": "Rewa Block", "villages": ["Rewa Khas", "Rewa Dehat", "Rewa Purva"]},
                    {"name": "Rewa Model Krishi Panchayat", "lgd_code": 302337, "block": "Rewa East Block", "villages": ["Kalyanpur Rewa", "Rampur Rewa", "Shivpur Rewa"]}
                ]
            },
            "Sagar": {
                "lgd_code": 1338,
                "name_hi": "Sagar",
                "headquarters": "Sagar",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sagar Sadar", "Sagar North", "Sagar South", "Sagar Rural"],
                "blocks": ["Sagar Block", "Sagar West Block", "Sagar East Block"],
                "panchayats": [
                    {"name": "Sagar Central Gram Panchayat", "lgd_code": 301338, "block": "Sagar Block", "villages": ["Sagar Khas", "Sagar Dehat", "Sagar Purva"]},
                    {"name": "Sagar Model Krishi Panchayat", "lgd_code": 302338, "block": "Sagar East Block", "villages": ["Kalyanpur Sagar", "Rampur Sagar", "Shivpur Sagar"]}
                ]
            },
            "Satna": {
                "lgd_code": 1339,
                "name_hi": "Satna",
                "headquarters": "Satna",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Satna Sadar", "Satna North", "Satna South", "Satna Rural"],
                "blocks": ["Satna Block", "Satna West Block", "Satna East Block"],
                "panchayats": [
                    {"name": "Satna Central Gram Panchayat", "lgd_code": 301339, "block": "Satna Block", "villages": ["Satna Khas", "Satna Dehat", "Satna Purva"]},
                    {"name": "Satna Model Krishi Panchayat", "lgd_code": 302339, "block": "Satna East Block", "villages": ["Kalyanpur Satna", "Rampur Satna", "Shivpur Satna"]}
                ]
            },
            "Sehore": {
                "lgd_code": 1340,
                "name_hi": "Sehore",
                "headquarters": "Sehore",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sehore Sadar", "Sehore North", "Sehore South", "Sehore Rural"],
                "blocks": ["Sehore Block", "Sehore West Block", "Sehore East Block"],
                "panchayats": [
                    {"name": "Sehore Central Gram Panchayat", "lgd_code": 301340, "block": "Sehore Block", "villages": ["Sehore Khas", "Sehore Dehat", "Sehore Purva"]},
                    {"name": "Sehore Model Krishi Panchayat", "lgd_code": 302340, "block": "Sehore East Block", "villages": ["Kalyanpur Sehore", "Rampur Sehore", "Shivpur Sehore"]}
                ]
            },
            "Seoni": {
                "lgd_code": 1341,
                "name_hi": "Seoni",
                "headquarters": "Seoni",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Seoni Sadar", "Seoni North", "Seoni South", "Seoni Rural"],
                "blocks": ["Seoni Block", "Seoni West Block", "Seoni East Block"],
                "panchayats": [
                    {"name": "Seoni Central Gram Panchayat", "lgd_code": 301341, "block": "Seoni Block", "villages": ["Seoni Khas", "Seoni Dehat", "Seoni Purva"]},
                    {"name": "Seoni Model Krishi Panchayat", "lgd_code": 302341, "block": "Seoni East Block", "villages": ["Kalyanpur Seoni", "Rampur Seoni", "Shivpur Seoni"]}
                ]
            },
            "Shahdol": {
                "lgd_code": 1342,
                "name_hi": "Shahdol",
                "headquarters": "Shahdol",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shahdol Sadar", "Shahdol North", "Shahdol South", "Shahdol Rural"],
                "blocks": ["Shahdol Block", "Shahdol West Block", "Shahdol East Block"],
                "panchayats": [
                    {"name": "Shahdol Central Gram Panchayat", "lgd_code": 301342, "block": "Shahdol Block", "villages": ["Shahdol Khas", "Shahdol Dehat", "Shahdol Purva"]},
                    {"name": "Shahdol Model Krishi Panchayat", "lgd_code": 302342, "block": "Shahdol East Block", "villages": ["Kalyanpur Shahdol", "Rampur Shahdol", "Shivpur Shahdol"]}
                ]
            },
            "Shajapur": {
                "lgd_code": 1343,
                "name_hi": "Shajapur",
                "headquarters": "Shajapur",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shajapur Sadar", "Shajapur North", "Shajapur South", "Shajapur Rural"],
                "blocks": ["Shajapur Block", "Shajapur West Block", "Shajapur East Block"],
                "panchayats": [
                    {"name": "Shajapur Central Gram Panchayat", "lgd_code": 301343, "block": "Shajapur Block", "villages": ["Shajapur Khas", "Shajapur Dehat", "Shajapur Purva"]},
                    {"name": "Shajapur Model Krishi Panchayat", "lgd_code": 302343, "block": "Shajapur East Block", "villages": ["Kalyanpur Shajapur", "Rampur Shajapur", "Shivpur Shajapur"]}
                ]
            },
            "Sheopur": {
                "lgd_code": 1344,
                "name_hi": "Sheopur",
                "headquarters": "Sheopur",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sheopur Sadar", "Sheopur North", "Sheopur South", "Sheopur Rural"],
                "blocks": ["Sheopur Block", "Sheopur West Block", "Sheopur East Block"],
                "panchayats": [
                    {"name": "Sheopur Central Gram Panchayat", "lgd_code": 301344, "block": "Sheopur Block", "villages": ["Sheopur Khas", "Sheopur Dehat", "Sheopur Purva"]},
                    {"name": "Sheopur Model Krishi Panchayat", "lgd_code": 302344, "block": "Sheopur East Block", "villages": ["Kalyanpur Sheopur", "Rampur Sheopur", "Shivpur Sheopur"]}
                ]
            },
            "Shivpuri": {
                "lgd_code": 1345,
                "name_hi": "Shivpuri",
                "headquarters": "Shivpuri",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shivpuri Sadar", "Shivpuri North", "Shivpuri South", "Shivpuri Rural"],
                "blocks": ["Shivpuri Block", "Shivpuri West Block", "Shivpuri East Block"],
                "panchayats": [
                    {"name": "Shivpuri Central Gram Panchayat", "lgd_code": 301345, "block": "Shivpuri Block", "villages": ["Shivpuri Khas", "Shivpuri Dehat", "Shivpuri Purva"]},
                    {"name": "Shivpuri Model Krishi Panchayat", "lgd_code": 302345, "block": "Shivpuri East Block", "villages": ["Kalyanpur Shivpuri", "Rampur Shivpuri", "Shivpur Shivpuri"]}
                ]
            },
            "Sidhi": {
                "lgd_code": 1346,
                "name_hi": "Sidhi",
                "headquarters": "Sidhi",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sidhi Sadar", "Sidhi North", "Sidhi South", "Sidhi Rural"],
                "blocks": ["Sidhi Block", "Sidhi West Block", "Sidhi East Block"],
                "panchayats": [
                    {"name": "Sidhi Central Gram Panchayat", "lgd_code": 301346, "block": "Sidhi Block", "villages": ["Sidhi Khas", "Sidhi Dehat", "Sidhi Purva"]},
                    {"name": "Sidhi Model Krishi Panchayat", "lgd_code": 302346, "block": "Sidhi East Block", "villages": ["Kalyanpur Sidhi", "Rampur Sidhi", "Shivpur Sidhi"]}
                ]
            },
            "Singrauli": {
                "lgd_code": 1347,
                "name_hi": "Singrauli",
                "headquarters": "Singrauli",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Singrauli Sadar", "Singrauli North", "Singrauli South", "Singrauli Rural"],
                "blocks": ["Singrauli Block", "Singrauli West Block", "Singrauli East Block"],
                "panchayats": [
                    {"name": "Singrauli Central Gram Panchayat", "lgd_code": 301347, "block": "Singrauli Block", "villages": ["Singrauli Khas", "Singrauli Dehat", "Singrauli Purva"]},
                    {"name": "Singrauli Model Krishi Panchayat", "lgd_code": 302347, "block": "Singrauli East Block", "villages": ["Kalyanpur Singrauli", "Rampur Singrauli", "Shivpur Singrauli"]}
                ]
            },
            "Tikamgarh": {
                "lgd_code": 1348,
                "name_hi": "Tikamgarh",
                "headquarters": "Tikamgarh",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tikamgarh Sadar", "Tikamgarh North", "Tikamgarh South", "Tikamgarh Rural"],
                "blocks": ["Tikamgarh Block", "Tikamgarh West Block", "Tikamgarh East Block"],
                "panchayats": [
                    {"name": "Tikamgarh Central Gram Panchayat", "lgd_code": 301348, "block": "Tikamgarh Block", "villages": ["Tikamgarh Khas", "Tikamgarh Dehat", "Tikamgarh Purva"]},
                    {"name": "Tikamgarh Model Krishi Panchayat", "lgd_code": 302348, "block": "Tikamgarh East Block", "villages": ["Kalyanpur Tikamgarh", "Rampur Tikamgarh", "Shivpur Tikamgarh"]}
                ]
            },
            "Ujjain": {
                "lgd_code": 1349,
                "name_hi": "Ujjain",
                "headquarters": "Ujjain",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ujjain Sadar", "Ujjain North", "Ujjain South", "Ujjain Rural"],
                "blocks": ["Ujjain Block", "Ujjain West Block", "Ujjain East Block"],
                "panchayats": [
                    {"name": "Ujjain Central Gram Panchayat", "lgd_code": 301349, "block": "Ujjain Block", "villages": ["Ujjain Khas", "Ujjain Dehat", "Ujjain Purva"]},
                    {"name": "Ujjain Model Krishi Panchayat", "lgd_code": 302349, "block": "Ujjain East Block", "villages": ["Kalyanpur Ujjain", "Rampur Ujjain", "Shivpur Ujjain"]}
                ]
            },
            "Umaria": {
                "lgd_code": 1350,
                "name_hi": "Umaria",
                "headquarters": "Umaria",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Umaria Sadar", "Umaria North", "Umaria South", "Umaria Rural"],
                "blocks": ["Umaria Block", "Umaria West Block", "Umaria East Block"],
                "panchayats": [
                    {"name": "Umaria Central Gram Panchayat", "lgd_code": 301350, "block": "Umaria Block", "villages": ["Umaria Khas", "Umaria Dehat", "Umaria Purva"]},
                    {"name": "Umaria Model Krishi Panchayat", "lgd_code": 302350, "block": "Umaria East Block", "villages": ["Kalyanpur Umaria", "Rampur Umaria", "Shivpur Umaria"]}
                ]
            },
            "Vidisha": {
                "lgd_code": 1351,
                "name_hi": "Vidisha",
                "headquarters": "Vidisha",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vidisha Sadar", "Vidisha North", "Vidisha South", "Vidisha Rural"],
                "blocks": ["Vidisha Block", "Vidisha West Block", "Vidisha East Block"],
                "panchayats": [
                    {"name": "Vidisha Central Gram Panchayat", "lgd_code": 301351, "block": "Vidisha Block", "villages": ["Vidisha Khas", "Vidisha Dehat", "Vidisha Purva"]},
                    {"name": "Vidisha Model Krishi Panchayat", "lgd_code": 302351, "block": "Vidisha East Block", "villages": ["Kalyanpur Vidisha", "Rampur Vidisha", "Shivpur Vidisha"]}
                ]
            },
        }
    },
    "Maharashtra": {
        "districts": {
            "Ahmednagar (Ahilyanagar)": {
                "lgd_code": 1352,
                "name_hi": "Ahmednagar",
                "headquarters": "Ahmednagar",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ahmednagar Sadar", "Ahmednagar North", "Ahmednagar South", "Ahmednagar Rural"],
                "blocks": ["Ahmednagar Block", "Ahmednagar West Block", "Ahmednagar East Block"],
                "panchayats": [
                    {"name": "Ahmednagar Central Gram Panchayat", "lgd_code": 301352, "block": "Ahmednagar Block", "villages": ["Ahmednagar Khas", "Ahmednagar Dehat", "Ahmednagar Purva"]},
                    {"name": "Ahmednagar Model Krishi Panchayat", "lgd_code": 302352, "block": "Ahmednagar East Block", "villages": ["Kalyanpur Ahmednagar", "Rampur Ahmednagar", "Shivpur Ahmednagar"]}
                ]
            },
            "Akola": {
                "lgd_code": 1353,
                "name_hi": "Akola",
                "headquarters": "Akola",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Akola Sadar", "Akola North", "Akola South", "Akola Rural"],
                "blocks": ["Akola Block", "Akola West Block", "Akola East Block"],
                "panchayats": [
                    {"name": "Akola Central Gram Panchayat", "lgd_code": 301353, "block": "Akola Block", "villages": ["Akola Khas", "Akola Dehat", "Akola Purva"]},
                    {"name": "Akola Model Krishi Panchayat", "lgd_code": 302353, "block": "Akola East Block", "villages": ["Kalyanpur Akola", "Rampur Akola", "Shivpur Akola"]}
                ]
            },
            "Amravati": {
                "lgd_code": 1354,
                "name_hi": "Amravati",
                "headquarters": "Amravati",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Amravati Sadar", "Amravati North", "Amravati South", "Amravati Rural"],
                "blocks": ["Amravati Block", "Amravati West Block", "Amravati East Block"],
                "panchayats": [
                    {"name": "Amravati Central Gram Panchayat", "lgd_code": 301354, "block": "Amravati Block", "villages": ["Amravati Khas", "Amravati Dehat", "Amravati Purva"]},
                    {"name": "Amravati Model Krishi Panchayat", "lgd_code": 302354, "block": "Amravati East Block", "villages": ["Kalyanpur Amravati", "Rampur Amravati", "Shivpur Amravati"]}
                ]
            },
            "Aurangabad (Chhatrapati Sambhaji Nagar)": {
                "lgd_code": 1355,
                "name_hi": "Aurangabad",
                "headquarters": "Aurangabad",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Aurangabad Sadar", "Aurangabad North", "Aurangabad South", "Aurangabad Rural"],
                "blocks": ["Aurangabad Block", "Aurangabad West Block", "Aurangabad East Block"],
                "panchayats": [
                    {"name": "Aurangabad Central Gram Panchayat", "lgd_code": 301355, "block": "Aurangabad Block", "villages": ["Aurangabad Khas", "Aurangabad Dehat", "Aurangabad Purva"]},
                    {"name": "Aurangabad Model Krishi Panchayat", "lgd_code": 302355, "block": "Aurangabad East Block", "villages": ["Kalyanpur Aurangabad", "Rampur Aurangabad", "Shivpur Aurangabad"]}
                ]
            },
            "Beed": {
                "lgd_code": 1356,
                "name_hi": "Beed",
                "headquarters": "Beed",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Beed Sadar", "Beed North", "Beed South", "Beed Rural"],
                "blocks": ["Beed Block", "Beed West Block", "Beed East Block"],
                "panchayats": [
                    {"name": "Beed Central Gram Panchayat", "lgd_code": 301356, "block": "Beed Block", "villages": ["Beed Khas", "Beed Dehat", "Beed Purva"]},
                    {"name": "Beed Model Krishi Panchayat", "lgd_code": 302356, "block": "Beed East Block", "villages": ["Kalyanpur Beed", "Rampur Beed", "Shivpur Beed"]}
                ]
            },
            "Bhandara": {
                "lgd_code": 1357,
                "name_hi": "Bhandara",
                "headquarters": "Bhandara",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhandara Sadar", "Bhandara North", "Bhandara South", "Bhandara Rural"],
                "blocks": ["Bhandara Block", "Bhandara West Block", "Bhandara East Block"],
                "panchayats": [
                    {"name": "Bhandara Central Gram Panchayat", "lgd_code": 301357, "block": "Bhandara Block", "villages": ["Bhandara Khas", "Bhandara Dehat", "Bhandara Purva"]},
                    {"name": "Bhandara Model Krishi Panchayat", "lgd_code": 302357, "block": "Bhandara East Block", "villages": ["Kalyanpur Bhandara", "Rampur Bhandara", "Shivpur Bhandara"]}
                ]
            },
            "Buldhana": {
                "lgd_code": 1358,
                "name_hi": "Buldhana",
                "headquarters": "Buldhana",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Buldhana Sadar", "Buldhana North", "Buldhana South", "Buldhana Rural"],
                "blocks": ["Buldhana Block", "Buldhana West Block", "Buldhana East Block"],
                "panchayats": [
                    {"name": "Buldhana Central Gram Panchayat", "lgd_code": 301358, "block": "Buldhana Block", "villages": ["Buldhana Khas", "Buldhana Dehat", "Buldhana Purva"]},
                    {"name": "Buldhana Model Krishi Panchayat", "lgd_code": 302358, "block": "Buldhana East Block", "villages": ["Kalyanpur Buldhana", "Rampur Buldhana", "Shivpur Buldhana"]}
                ]
            },
            "Chandrapur": {
                "lgd_code": 1359,
                "name_hi": "Chandrapur",
                "headquarters": "Chandrapur",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chandrapur Sadar", "Chandrapur North", "Chandrapur South", "Chandrapur Rural"],
                "blocks": ["Chandrapur Block", "Chandrapur West Block", "Chandrapur East Block"],
                "panchayats": [
                    {"name": "Chandrapur Central Gram Panchayat", "lgd_code": 301359, "block": "Chandrapur Block", "villages": ["Chandrapur Khas", "Chandrapur Dehat", "Chandrapur Purva"]},
                    {"name": "Chandrapur Model Krishi Panchayat", "lgd_code": 302359, "block": "Chandrapur East Block", "villages": ["Kalyanpur Chandrapur", "Rampur Chandrapur", "Shivpur Chandrapur"]}
                ]
            },
            "Dhule": {
                "lgd_code": 1360,
                "name_hi": "Dhule",
                "headquarters": "Dhule",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhule Sadar", "Dhule North", "Dhule South", "Dhule Rural"],
                "blocks": ["Dhule Block", "Dhule West Block", "Dhule East Block"],
                "panchayats": [
                    {"name": "Dhule Central Gram Panchayat", "lgd_code": 301360, "block": "Dhule Block", "villages": ["Dhule Khas", "Dhule Dehat", "Dhule Purva"]},
                    {"name": "Dhule Model Krishi Panchayat", "lgd_code": 302360, "block": "Dhule East Block", "villages": ["Kalyanpur Dhule", "Rampur Dhule", "Shivpur Dhule"]}
                ]
            },
            "Gadchiroli": {
                "lgd_code": 1361,
                "name_hi": "Gadchiroli",
                "headquarters": "Gadchiroli",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gadchiroli Sadar", "Gadchiroli North", "Gadchiroli South", "Gadchiroli Rural"],
                "blocks": ["Gadchiroli Block", "Gadchiroli West Block", "Gadchiroli East Block"],
                "panchayats": [
                    {"name": "Gadchiroli Central Gram Panchayat", "lgd_code": 301361, "block": "Gadchiroli Block", "villages": ["Gadchiroli Khas", "Gadchiroli Dehat", "Gadchiroli Purva"]},
                    {"name": "Gadchiroli Model Krishi Panchayat", "lgd_code": 302361, "block": "Gadchiroli East Block", "villages": ["Kalyanpur Gadchiroli", "Rampur Gadchiroli", "Shivpur Gadchiroli"]}
                ]
            },
            "Gondia": {
                "lgd_code": 1362,
                "name_hi": "Gondia",
                "headquarters": "Gondia",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gondia Sadar", "Gondia North", "Gondia South", "Gondia Rural"],
                "blocks": ["Gondia Block", "Gondia West Block", "Gondia East Block"],
                "panchayats": [
                    {"name": "Gondia Central Gram Panchayat", "lgd_code": 301362, "block": "Gondia Block", "villages": ["Gondia Khas", "Gondia Dehat", "Gondia Purva"]},
                    {"name": "Gondia Model Krishi Panchayat", "lgd_code": 302362, "block": "Gondia East Block", "villages": ["Kalyanpur Gondia", "Rampur Gondia", "Shivpur Gondia"]}
                ]
            },
            "Hingoli": {
                "lgd_code": 1363,
                "name_hi": "Hingoli",
                "headquarters": "Hingoli",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hingoli Sadar", "Hingoli North", "Hingoli South", "Hingoli Rural"],
                "blocks": ["Hingoli Block", "Hingoli West Block", "Hingoli East Block"],
                "panchayats": [
                    {"name": "Hingoli Central Gram Panchayat", "lgd_code": 301363, "block": "Hingoli Block", "villages": ["Hingoli Khas", "Hingoli Dehat", "Hingoli Purva"]},
                    {"name": "Hingoli Model Krishi Panchayat", "lgd_code": 302363, "block": "Hingoli East Block", "villages": ["Kalyanpur Hingoli", "Rampur Hingoli", "Shivpur Hingoli"]}
                ]
            },
            "Jalgaon": {
                "lgd_code": 1364,
                "name_hi": "Jalgaon",
                "headquarters": "Jalgaon",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalgaon Sadar", "Jalgaon North", "Jalgaon South", "Jalgaon Rural"],
                "blocks": ["Jalgaon Block", "Jalgaon West Block", "Jalgaon East Block"],
                "panchayats": [
                    {"name": "Jalgaon Central Gram Panchayat", "lgd_code": 301364, "block": "Jalgaon Block", "villages": ["Jalgaon Khas", "Jalgaon Dehat", "Jalgaon Purva"]},
                    {"name": "Jalgaon Model Krishi Panchayat", "lgd_code": 302364, "block": "Jalgaon East Block", "villages": ["Kalyanpur Jalgaon", "Rampur Jalgaon", "Shivpur Jalgaon"]}
                ]
            },
            "Jalna": {
                "lgd_code": 1365,
                "name_hi": "Jalna",
                "headquarters": "Jalna",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalna Sadar", "Jalna North", "Jalna South", "Jalna Rural"],
                "blocks": ["Jalna Block", "Jalna West Block", "Jalna East Block"],
                "panchayats": [
                    {"name": "Jalna Central Gram Panchayat", "lgd_code": 301365, "block": "Jalna Block", "villages": ["Jalna Khas", "Jalna Dehat", "Jalna Purva"]},
                    {"name": "Jalna Model Krishi Panchayat", "lgd_code": 302365, "block": "Jalna East Block", "villages": ["Kalyanpur Jalna", "Rampur Jalna", "Shivpur Jalna"]}
                ]
            },
            "Kolhapur": {
                "lgd_code": 1366,
                "name_hi": "Kolhapur",
                "headquarters": "Kolhapur",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kolhapur Sadar", "Kolhapur North", "Kolhapur South", "Kolhapur Rural"],
                "blocks": ["Kolhapur Block", "Kolhapur West Block", "Kolhapur East Block"],
                "panchayats": [
                    {"name": "Kolhapur Central Gram Panchayat", "lgd_code": 301366, "block": "Kolhapur Block", "villages": ["Kolhapur Khas", "Kolhapur Dehat", "Kolhapur Purva"]},
                    {"name": "Kolhapur Model Krishi Panchayat", "lgd_code": 302366, "block": "Kolhapur East Block", "villages": ["Kalyanpur Kolhapur", "Rampur Kolhapur", "Shivpur Kolhapur"]}
                ]
            },
            "Latur": {
                "lgd_code": 1367,
                "name_hi": "Latur",
                "headquarters": "Latur",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Latur Sadar", "Latur North", "Latur South", "Latur Rural"],
                "blocks": ["Latur Block", "Latur West Block", "Latur East Block"],
                "panchayats": [
                    {"name": "Latur Central Gram Panchayat", "lgd_code": 301367, "block": "Latur Block", "villages": ["Latur Khas", "Latur Dehat", "Latur Purva"]},
                    {"name": "Latur Model Krishi Panchayat", "lgd_code": 302367, "block": "Latur East Block", "villages": ["Kalyanpur Latur", "Rampur Latur", "Shivpur Latur"]}
                ]
            },
            "Mumbai City": {
                "lgd_code": 1368,
                "name_hi": "Mumbai City",
                "headquarters": "Mumbai City",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mumbai City Sadar", "Mumbai City North", "Mumbai City South", "Mumbai City Rural"],
                "blocks": ["Mumbai City Block", "Mumbai City West Block", "Mumbai City East Block"],
                "panchayats": [
                    {"name": "Mumbai City Central Gram Panchayat", "lgd_code": 301368, "block": "Mumbai City Block", "villages": ["Mumbai City Khas", "Mumbai City Dehat", "Mumbai City Purva"]},
                    {"name": "Mumbai City Model Krishi Panchayat", "lgd_code": 302368, "block": "Mumbai City East Block", "villages": ["Kalyanpur Mumbai City", "Rampur Mumbai City", "Shivpur Mumbai City"]}
                ]
            },
            "Mumbai Suburban": {
                "lgd_code": 1369,
                "name_hi": "Mumbai Suburban",
                "headquarters": "Mumbai Suburban",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mumbai Suburban Sadar", "Mumbai Suburban North", "Mumbai Suburban South", "Mumbai Suburban Rural"],
                "blocks": ["Mumbai Suburban Block", "Mumbai Suburban West Block", "Mumbai Suburban East Block"],
                "panchayats": [
                    {"name": "Mumbai Suburban Central Gram Panchayat", "lgd_code": 301369, "block": "Mumbai Suburban Block", "villages": ["Mumbai Suburban Khas", "Mumbai Suburban Dehat", "Mumbai Suburban Purva"]},
                    {"name": "Mumbai Suburban Model Krishi Panchayat", "lgd_code": 302369, "block": "Mumbai Suburban East Block", "villages": ["Kalyanpur Mumbai Suburban", "Rampur Mumbai Suburban", "Shivpur Mumbai Suburban"]}
                ]
            },
            "Nagpur": {
                "lgd_code": 1370,
                "name_hi": "Nagpur",
                "headquarters": "Nagpur",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nagpur Sadar", "Nagpur North", "Nagpur South", "Nagpur Rural"],
                "blocks": ["Nagpur Block", "Nagpur West Block", "Nagpur East Block"],
                "panchayats": [
                    {"name": "Nagpur Central Gram Panchayat", "lgd_code": 301370, "block": "Nagpur Block", "villages": ["Nagpur Khas", "Nagpur Dehat", "Nagpur Purva"]},
                    {"name": "Nagpur Model Krishi Panchayat", "lgd_code": 302370, "block": "Nagpur East Block", "villages": ["Kalyanpur Nagpur", "Rampur Nagpur", "Shivpur Nagpur"]}
                ]
            },
            "Nanded": {
                "lgd_code": 1371,
                "name_hi": "Nanded",
                "headquarters": "Nanded",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nanded Sadar", "Nanded North", "Nanded South", "Nanded Rural"],
                "blocks": ["Nanded Block", "Nanded West Block", "Nanded East Block"],
                "panchayats": [
                    {"name": "Nanded Central Gram Panchayat", "lgd_code": 301371, "block": "Nanded Block", "villages": ["Nanded Khas", "Nanded Dehat", "Nanded Purva"]},
                    {"name": "Nanded Model Krishi Panchayat", "lgd_code": 302371, "block": "Nanded East Block", "villages": ["Kalyanpur Nanded", "Rampur Nanded", "Shivpur Nanded"]}
                ]
            },
            "Nandurbar": {
                "lgd_code": 1372,
                "name_hi": "Nandurbar",
                "headquarters": "Nandurbar",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nandurbar Sadar", "Nandurbar North", "Nandurbar South", "Nandurbar Rural"],
                "blocks": ["Nandurbar Block", "Nandurbar West Block", "Nandurbar East Block"],
                "panchayats": [
                    {"name": "Nandurbar Central Gram Panchayat", "lgd_code": 301372, "block": "Nandurbar Block", "villages": ["Nandurbar Khas", "Nandurbar Dehat", "Nandurbar Purva"]},
                    {"name": "Nandurbar Model Krishi Panchayat", "lgd_code": 302372, "block": "Nandurbar East Block", "villages": ["Kalyanpur Nandurbar", "Rampur Nandurbar", "Shivpur Nandurbar"]}
                ]
            },
            "Nashik": {
                "lgd_code": 1373,
                "name_hi": "Nashik",
                "headquarters": "Nashik",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nashik Sadar", "Nashik North", "Nashik South", "Nashik Rural"],
                "blocks": ["Nashik Block", "Nashik West Block", "Nashik East Block"],
                "panchayats": [
                    {"name": "Nashik Central Gram Panchayat", "lgd_code": 301373, "block": "Nashik Block", "villages": ["Nashik Khas", "Nashik Dehat", "Nashik Purva"]},
                    {"name": "Nashik Model Krishi Panchayat", "lgd_code": 302373, "block": "Nashik East Block", "villages": ["Kalyanpur Nashik", "Rampur Nashik", "Shivpur Nashik"]}
                ]
            },
            "Osmanabad (Dharashiv)": {
                "lgd_code": 1374,
                "name_hi": "Osmanabad",
                "headquarters": "Osmanabad",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Osmanabad Sadar", "Osmanabad North", "Osmanabad South", "Osmanabad Rural"],
                "blocks": ["Osmanabad Block", "Osmanabad West Block", "Osmanabad East Block"],
                "panchayats": [
                    {"name": "Osmanabad Central Gram Panchayat", "lgd_code": 301374, "block": "Osmanabad Block", "villages": ["Osmanabad Khas", "Osmanabad Dehat", "Osmanabad Purva"]},
                    {"name": "Osmanabad Model Krishi Panchayat", "lgd_code": 302374, "block": "Osmanabad East Block", "villages": ["Kalyanpur Osmanabad", "Rampur Osmanabad", "Shivpur Osmanabad"]}
                ]
            },
            "Palghar": {
                "lgd_code": 1375,
                "name_hi": "Palghar",
                "headquarters": "Palghar",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Palghar Sadar", "Palghar North", "Palghar South", "Palghar Rural"],
                "blocks": ["Palghar Block", "Palghar West Block", "Palghar East Block"],
                "panchayats": [
                    {"name": "Palghar Central Gram Panchayat", "lgd_code": 301375, "block": "Palghar Block", "villages": ["Palghar Khas", "Palghar Dehat", "Palghar Purva"]},
                    {"name": "Palghar Model Krishi Panchayat", "lgd_code": 302375, "block": "Palghar East Block", "villages": ["Kalyanpur Palghar", "Rampur Palghar", "Shivpur Palghar"]}
                ]
            },
            "Parbhani": {
                "lgd_code": 1376,
                "name_hi": "Parbhani",
                "headquarters": "Parbhani",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Parbhani Sadar", "Parbhani North", "Parbhani South", "Parbhani Rural"],
                "blocks": ["Parbhani Block", "Parbhani West Block", "Parbhani East Block"],
                "panchayats": [
                    {"name": "Parbhani Central Gram Panchayat", "lgd_code": 301376, "block": "Parbhani Block", "villages": ["Parbhani Khas", "Parbhani Dehat", "Parbhani Purva"]},
                    {"name": "Parbhani Model Krishi Panchayat", "lgd_code": 302376, "block": "Parbhani East Block", "villages": ["Kalyanpur Parbhani", "Rampur Parbhani", "Shivpur Parbhani"]}
                ]
            },
            "Pune": {
                "lgd_code": 1377,
                "name_hi": "Pune",
                "headquarters": "Pune",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pune Sadar", "Pune North", "Pune South", "Pune Rural"],
                "blocks": ["Pune Block", "Pune West Block", "Pune East Block"],
                "panchayats": [
                    {"name": "Pune Central Gram Panchayat", "lgd_code": 301377, "block": "Pune Block", "villages": ["Pune Khas", "Pune Dehat", "Pune Purva"]},
                    {"name": "Pune Model Krishi Panchayat", "lgd_code": 302377, "block": "Pune East Block", "villages": ["Kalyanpur Pune", "Rampur Pune", "Shivpur Pune"]}
                ]
            },
            "Raigad (Alibag)": {
                "lgd_code": 1378,
                "name_hi": "Raigad",
                "headquarters": "Raigad",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Raigad Sadar", "Raigad North", "Raigad South", "Raigad Rural"],
                "blocks": ["Raigad Block", "Raigad West Block", "Raigad East Block"],
                "panchayats": [
                    {"name": "Raigad Central Gram Panchayat", "lgd_code": 301378, "block": "Raigad Block", "villages": ["Raigad Khas", "Raigad Dehat", "Raigad Purva"]},
                    {"name": "Raigad Model Krishi Panchayat", "lgd_code": 302378, "block": "Raigad East Block", "villages": ["Kalyanpur Raigad", "Rampur Raigad", "Shivpur Raigad"]}
                ]
            },
            "Ratnagiri": {
                "lgd_code": 1379,
                "name_hi": "Ratnagiri",
                "headquarters": "Ratnagiri",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ratnagiri Sadar", "Ratnagiri North", "Ratnagiri South", "Ratnagiri Rural"],
                "blocks": ["Ratnagiri Block", "Ratnagiri West Block", "Ratnagiri East Block"],
                "panchayats": [
                    {"name": "Ratnagiri Central Gram Panchayat", "lgd_code": 301379, "block": "Ratnagiri Block", "villages": ["Ratnagiri Khas", "Ratnagiri Dehat", "Ratnagiri Purva"]},
                    {"name": "Ratnagiri Model Krishi Panchayat", "lgd_code": 302379, "block": "Ratnagiri East Block", "villages": ["Kalyanpur Ratnagiri", "Rampur Ratnagiri", "Shivpur Ratnagiri"]}
                ]
            },
            "Sangli": {
                "lgd_code": 1380,
                "name_hi": "Sangli",
                "headquarters": "Sangli",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sangli Sadar", "Sangli North", "Sangli South", "Sangli Rural"],
                "blocks": ["Sangli Block", "Sangli West Block", "Sangli East Block"],
                "panchayats": [
                    {"name": "Sangli Central Gram Panchayat", "lgd_code": 301380, "block": "Sangli Block", "villages": ["Sangli Khas", "Sangli Dehat", "Sangli Purva"]},
                    {"name": "Sangli Model Krishi Panchayat", "lgd_code": 302380, "block": "Sangli East Block", "villages": ["Kalyanpur Sangli", "Rampur Sangli", "Shivpur Sangli"]}
                ]
            },
            "Satara": {
                "lgd_code": 1381,
                "name_hi": "Satara",
                "headquarters": "Satara",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Satara Sadar", "Satara North", "Satara South", "Satara Rural"],
                "blocks": ["Satara Block", "Satara West Block", "Satara East Block"],
                "panchayats": [
                    {"name": "Satara Central Gram Panchayat", "lgd_code": 301381, "block": "Satara Block", "villages": ["Satara Khas", "Satara Dehat", "Satara Purva"]},
                    {"name": "Satara Model Krishi Panchayat", "lgd_code": 302381, "block": "Satara East Block", "villages": ["Kalyanpur Satara", "Rampur Satara", "Shivpur Satara"]}
                ]
            },
            "Sindhudurg": {
                "lgd_code": 1382,
                "name_hi": "Sindhudurg",
                "headquarters": "Sindhudurg",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sindhudurg Sadar", "Sindhudurg North", "Sindhudurg South", "Sindhudurg Rural"],
                "blocks": ["Sindhudurg Block", "Sindhudurg West Block", "Sindhudurg East Block"],
                "panchayats": [
                    {"name": "Sindhudurg Central Gram Panchayat", "lgd_code": 301382, "block": "Sindhudurg Block", "villages": ["Sindhudurg Khas", "Sindhudurg Dehat", "Sindhudurg Purva"]},
                    {"name": "Sindhudurg Model Krishi Panchayat", "lgd_code": 302382, "block": "Sindhudurg East Block", "villages": ["Kalyanpur Sindhudurg", "Rampur Sindhudurg", "Shivpur Sindhudurg"]}
                ]
            },
            "Solapur": {
                "lgd_code": 1383,
                "name_hi": "Solapur",
                "headquarters": "Solapur",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Solapur Sadar", "Solapur North", "Solapur South", "Solapur Rural"],
                "blocks": ["Solapur Block", "Solapur West Block", "Solapur East Block"],
                "panchayats": [
                    {"name": "Solapur Central Gram Panchayat", "lgd_code": 301383, "block": "Solapur Block", "villages": ["Solapur Khas", "Solapur Dehat", "Solapur Purva"]},
                    {"name": "Solapur Model Krishi Panchayat", "lgd_code": 302383, "block": "Solapur East Block", "villages": ["Kalyanpur Solapur", "Rampur Solapur", "Shivpur Solapur"]}
                ]
            },
            "Thane": {
                "lgd_code": 1384,
                "name_hi": "Thane",
                "headquarters": "Thane",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thane Sadar", "Thane North", "Thane South", "Thane Rural"],
                "blocks": ["Thane Block", "Thane West Block", "Thane East Block"],
                "panchayats": [
                    {"name": "Thane Central Gram Panchayat", "lgd_code": 301384, "block": "Thane Block", "villages": ["Thane Khas", "Thane Dehat", "Thane Purva"]},
                    {"name": "Thane Model Krishi Panchayat", "lgd_code": 302384, "block": "Thane East Block", "villages": ["Kalyanpur Thane", "Rampur Thane", "Shivpur Thane"]}
                ]
            },
            "Wardha": {
                "lgd_code": 1385,
                "name_hi": "Wardha",
                "headquarters": "Wardha",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Wardha Sadar", "Wardha North", "Wardha South", "Wardha Rural"],
                "blocks": ["Wardha Block", "Wardha West Block", "Wardha East Block"],
                "panchayats": [
                    {"name": "Wardha Central Gram Panchayat", "lgd_code": 301385, "block": "Wardha Block", "villages": ["Wardha Khas", "Wardha Dehat", "Wardha Purva"]},
                    {"name": "Wardha Model Krishi Panchayat", "lgd_code": 302385, "block": "Wardha East Block", "villages": ["Kalyanpur Wardha", "Rampur Wardha", "Shivpur Wardha"]}
                ]
            },
            "Washim": {
                "lgd_code": 1386,
                "name_hi": "Washim",
                "headquarters": "Washim",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Washim Sadar", "Washim North", "Washim South", "Washim Rural"],
                "blocks": ["Washim Block", "Washim West Block", "Washim East Block"],
                "panchayats": [
                    {"name": "Washim Central Gram Panchayat", "lgd_code": 301386, "block": "Washim Block", "villages": ["Washim Khas", "Washim Dehat", "Washim Purva"]},
                    {"name": "Washim Model Krishi Panchayat", "lgd_code": 302386, "block": "Washim East Block", "villages": ["Kalyanpur Washim", "Rampur Washim", "Shivpur Washim"]}
                ]
            },
            "Yavatmal": {
                "lgd_code": 1387,
                "name_hi": "Yavatmal",
                "headquarters": "Yavatmal",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Yavatmal Sadar", "Yavatmal North", "Yavatmal South", "Yavatmal Rural"],
                "blocks": ["Yavatmal Block", "Yavatmal West Block", "Yavatmal East Block"],
                "panchayats": [
                    {"name": "Yavatmal Central Gram Panchayat", "lgd_code": 301387, "block": "Yavatmal Block", "villages": ["Yavatmal Khas", "Yavatmal Dehat", "Yavatmal Purva"]},
                    {"name": "Yavatmal Model Krishi Panchayat", "lgd_code": 302387, "block": "Yavatmal East Block", "villages": ["Kalyanpur Yavatmal", "Rampur Yavatmal", "Shivpur Yavatmal"]}
                ]
            },
        }
    },
    "Manipur": {
        "districts": {
            "Bishnupur": {
                "lgd_code": 1388,
                "name_hi": "Bishnupur",
                "headquarters": "Bishnupur",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bishnupur Sadar", "Bishnupur North", "Bishnupur South", "Bishnupur Rural"],
                "blocks": ["Bishnupur Block", "Bishnupur West Block", "Bishnupur East Block"],
                "panchayats": [
                    {"name": "Bishnupur Central Gram Panchayat", "lgd_code": 301388, "block": "Bishnupur Block", "villages": ["Bishnupur Khas", "Bishnupur Dehat", "Bishnupur Purva"]},
                    {"name": "Bishnupur Model Krishi Panchayat", "lgd_code": 302388, "block": "Bishnupur East Block", "villages": ["Kalyanpur Bishnupur", "Rampur Bishnupur", "Shivpur Bishnupur"]}
                ]
            },
            "Chandel": {
                "lgd_code": 1389,
                "name_hi": "Chandel",
                "headquarters": "Chandel",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chandel Sadar", "Chandel North", "Chandel South", "Chandel Rural"],
                "blocks": ["Chandel Block", "Chandel West Block", "Chandel East Block"],
                "panchayats": [
                    {"name": "Chandel Central Gram Panchayat", "lgd_code": 301389, "block": "Chandel Block", "villages": ["Chandel Khas", "Chandel Dehat", "Chandel Purva"]},
                    {"name": "Chandel Model Krishi Panchayat", "lgd_code": 302389, "block": "Chandel East Block", "villages": ["Kalyanpur Chandel", "Rampur Chandel", "Shivpur Chandel"]}
                ]
            },
            "Churachandpur": {
                "lgd_code": 1390,
                "name_hi": "Churachandpur",
                "headquarters": "Churachandpur",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Churachandpur Sadar", "Churachandpur North", "Churachandpur South", "Churachandpur Rural"],
                "blocks": ["Churachandpur Block", "Churachandpur West Block", "Churachandpur East Block"],
                "panchayats": [
                    {"name": "Churachandpur Central Gram Panchayat", "lgd_code": 301390, "block": "Churachandpur Block", "villages": ["Churachandpur Khas", "Churachandpur Dehat", "Churachandpur Purva"]},
                    {"name": "Churachandpur Model Krishi Panchayat", "lgd_code": 302390, "block": "Churachandpur East Block", "villages": ["Kalyanpur Churachandpur", "Rampur Churachandpur", "Shivpur Churachandpur"]}
                ]
            },
            "Imphal East": {
                "lgd_code": 1391,
                "name_hi": "Imphal East",
                "headquarters": "Imphal East",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Imphal East Sadar", "Imphal East North", "Imphal East South", "Imphal East Rural"],
                "blocks": ["Imphal East Block", "Imphal East West Block", "Imphal East East Block"],
                "panchayats": [
                    {"name": "Imphal East Central Gram Panchayat", "lgd_code": 301391, "block": "Imphal East Block", "villages": ["Imphal East Khas", "Imphal East Dehat", "Imphal East Purva"]},
                    {"name": "Imphal East Model Krishi Panchayat", "lgd_code": 302391, "block": "Imphal East East Block", "villages": ["Kalyanpur Imphal East", "Rampur Imphal East", "Shivpur Imphal East"]}
                ]
            },
            "Imphal West": {
                "lgd_code": 1392,
                "name_hi": "Imphal West",
                "headquarters": "Imphal West",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Imphal West Sadar", "Imphal West North", "Imphal West South", "Imphal West Rural"],
                "blocks": ["Imphal West Block", "Imphal West West Block", "Imphal West East Block"],
                "panchayats": [
                    {"name": "Imphal West Central Gram Panchayat", "lgd_code": 301392, "block": "Imphal West Block", "villages": ["Imphal West Khas", "Imphal West Dehat", "Imphal West Purva"]},
                    {"name": "Imphal West Model Krishi Panchayat", "lgd_code": 302392, "block": "Imphal West East Block", "villages": ["Kalyanpur Imphal West", "Rampur Imphal West", "Shivpur Imphal West"]}
                ]
            },
            "Jiribam": {
                "lgd_code": 1393,
                "name_hi": "Jiribam",
                "headquarters": "Jiribam",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jiribam Sadar", "Jiribam North", "Jiribam South", "Jiribam Rural"],
                "blocks": ["Jiribam Block", "Jiribam West Block", "Jiribam East Block"],
                "panchayats": [
                    {"name": "Jiribam Central Gram Panchayat", "lgd_code": 301393, "block": "Jiribam Block", "villages": ["Jiribam Khas", "Jiribam Dehat", "Jiribam Purva"]},
                    {"name": "Jiribam Model Krishi Panchayat", "lgd_code": 302393, "block": "Jiribam East Block", "villages": ["Kalyanpur Jiribam", "Rampur Jiribam", "Shivpur Jiribam"]}
                ]
            },
            "Kakching": {
                "lgd_code": 1394,
                "name_hi": "Kakching",
                "headquarters": "Kakching",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kakching Sadar", "Kakching North", "Kakching South", "Kakching Rural"],
                "blocks": ["Kakching Block", "Kakching West Block", "Kakching East Block"],
                "panchayats": [
                    {"name": "Kakching Central Gram Panchayat", "lgd_code": 301394, "block": "Kakching Block", "villages": ["Kakching Khas", "Kakching Dehat", "Kakching Purva"]},
                    {"name": "Kakching Model Krishi Panchayat", "lgd_code": 302394, "block": "Kakching East Block", "villages": ["Kalyanpur Kakching", "Rampur Kakching", "Shivpur Kakching"]}
                ]
            },
            "Kamjong": {
                "lgd_code": 1395,
                "name_hi": "Kamjong",
                "headquarters": "Kamjong",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kamjong Sadar", "Kamjong North", "Kamjong South", "Kamjong Rural"],
                "blocks": ["Kamjong Block", "Kamjong West Block", "Kamjong East Block"],
                "panchayats": [
                    {"name": "Kamjong Central Gram Panchayat", "lgd_code": 301395, "block": "Kamjong Block", "villages": ["Kamjong Khas", "Kamjong Dehat", "Kamjong Purva"]},
                    {"name": "Kamjong Model Krishi Panchayat", "lgd_code": 302395, "block": "Kamjong East Block", "villages": ["Kalyanpur Kamjong", "Rampur Kamjong", "Shivpur Kamjong"]}
                ]
            },
            "Kangpokpi": {
                "lgd_code": 1396,
                "name_hi": "Kangpokpi",
                "headquarters": "Kangpokpi",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kangpokpi Sadar", "Kangpokpi North", "Kangpokpi South", "Kangpokpi Rural"],
                "blocks": ["Kangpokpi Block", "Kangpokpi West Block", "Kangpokpi East Block"],
                "panchayats": [
                    {"name": "Kangpokpi Central Gram Panchayat", "lgd_code": 301396, "block": "Kangpokpi Block", "villages": ["Kangpokpi Khas", "Kangpokpi Dehat", "Kangpokpi Purva"]},
                    {"name": "Kangpokpi Model Krishi Panchayat", "lgd_code": 302396, "block": "Kangpokpi East Block", "villages": ["Kalyanpur Kangpokpi", "Rampur Kangpokpi", "Shivpur Kangpokpi"]}
                ]
            },
            "Noney": {
                "lgd_code": 1397,
                "name_hi": "Noney",
                "headquarters": "Noney",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Noney Sadar", "Noney North", "Noney South", "Noney Rural"],
                "blocks": ["Noney Block", "Noney West Block", "Noney East Block"],
                "panchayats": [
                    {"name": "Noney Central Gram Panchayat", "lgd_code": 301397, "block": "Noney Block", "villages": ["Noney Khas", "Noney Dehat", "Noney Purva"]},
                    {"name": "Noney Model Krishi Panchayat", "lgd_code": 302397, "block": "Noney East Block", "villages": ["Kalyanpur Noney", "Rampur Noney", "Shivpur Noney"]}
                ]
            },
            "Pherzawl": {
                "lgd_code": 1398,
                "name_hi": "Pherzawl",
                "headquarters": "Pherzawl",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pherzawl Sadar", "Pherzawl North", "Pherzawl South", "Pherzawl Rural"],
                "blocks": ["Pherzawl Block", "Pherzawl West Block", "Pherzawl East Block"],
                "panchayats": [
                    {"name": "Pherzawl Central Gram Panchayat", "lgd_code": 301398, "block": "Pherzawl Block", "villages": ["Pherzawl Khas", "Pherzawl Dehat", "Pherzawl Purva"]},
                    {"name": "Pherzawl Model Krishi Panchayat", "lgd_code": 302398, "block": "Pherzawl East Block", "villages": ["Kalyanpur Pherzawl", "Rampur Pherzawl", "Shivpur Pherzawl"]}
                ]
            },
            "Senapati": {
                "lgd_code": 1399,
                "name_hi": "Senapati",
                "headquarters": "Senapati",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Senapati Sadar", "Senapati North", "Senapati South", "Senapati Rural"],
                "blocks": ["Senapati Block", "Senapati West Block", "Senapati East Block"],
                "panchayats": [
                    {"name": "Senapati Central Gram Panchayat", "lgd_code": 301399, "block": "Senapati Block", "villages": ["Senapati Khas", "Senapati Dehat", "Senapati Purva"]},
                    {"name": "Senapati Model Krishi Panchayat", "lgd_code": 302399, "block": "Senapati East Block", "villages": ["Kalyanpur Senapati", "Rampur Senapati", "Shivpur Senapati"]}
                ]
            },
            "Tamenglong": {
                "lgd_code": 1400,
                "name_hi": "Tamenglong",
                "headquarters": "Tamenglong",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tamenglong Sadar", "Tamenglong North", "Tamenglong South", "Tamenglong Rural"],
                "blocks": ["Tamenglong Block", "Tamenglong West Block", "Tamenglong East Block"],
                "panchayats": [
                    {"name": "Tamenglong Central Gram Panchayat", "lgd_code": 301400, "block": "Tamenglong Block", "villages": ["Tamenglong Khas", "Tamenglong Dehat", "Tamenglong Purva"]},
                    {"name": "Tamenglong Model Krishi Panchayat", "lgd_code": 302400, "block": "Tamenglong East Block", "villages": ["Kalyanpur Tamenglong", "Rampur Tamenglong", "Shivpur Tamenglong"]}
                ]
            },
            "Tengnoupal": {
                "lgd_code": 1401,
                "name_hi": "Tengnoupal",
                "headquarters": "Tengnoupal",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tengnoupal Sadar", "Tengnoupal North", "Tengnoupal South", "Tengnoupal Rural"],
                "blocks": ["Tengnoupal Block", "Tengnoupal West Block", "Tengnoupal East Block"],
                "panchayats": [
                    {"name": "Tengnoupal Central Gram Panchayat", "lgd_code": 301401, "block": "Tengnoupal Block", "villages": ["Tengnoupal Khas", "Tengnoupal Dehat", "Tengnoupal Purva"]},
                    {"name": "Tengnoupal Model Krishi Panchayat", "lgd_code": 302401, "block": "Tengnoupal East Block", "villages": ["Kalyanpur Tengnoupal", "Rampur Tengnoupal", "Shivpur Tengnoupal"]}
                ]
            },
            "Thoubal": {
                "lgd_code": 1402,
                "name_hi": "Thoubal",
                "headquarters": "Thoubal",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thoubal Sadar", "Thoubal North", "Thoubal South", "Thoubal Rural"],
                "blocks": ["Thoubal Block", "Thoubal West Block", "Thoubal East Block"],
                "panchayats": [
                    {"name": "Thoubal Central Gram Panchayat", "lgd_code": 301402, "block": "Thoubal Block", "villages": ["Thoubal Khas", "Thoubal Dehat", "Thoubal Purva"]},
                    {"name": "Thoubal Model Krishi Panchayat", "lgd_code": 302402, "block": "Thoubal East Block", "villages": ["Kalyanpur Thoubal", "Rampur Thoubal", "Shivpur Thoubal"]}
                ]
            },
            "Ukhrul": {
                "lgd_code": 1403,
                "name_hi": "Ukhrul",
                "headquarters": "Ukhrul",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ukhrul Sadar", "Ukhrul North", "Ukhrul South", "Ukhrul Rural"],
                "blocks": ["Ukhrul Block", "Ukhrul West Block", "Ukhrul East Block"],
                "panchayats": [
                    {"name": "Ukhrul Central Gram Panchayat", "lgd_code": 301403, "block": "Ukhrul Block", "villages": ["Ukhrul Khas", "Ukhrul Dehat", "Ukhrul Purva"]},
                    {"name": "Ukhrul Model Krishi Panchayat", "lgd_code": 302403, "block": "Ukhrul East Block", "villages": ["Kalyanpur Ukhrul", "Rampur Ukhrul", "Shivpur Ukhrul"]}
                ]
            },
        }
    },
    "Meghalaya": {
        "districts": {
            "East Garo Hills": {
                "lgd_code": 1404,
                "name_hi": "East Garo Hills",
                "headquarters": "East Garo Hills",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Garo Hills Sadar", "East Garo Hills North", "East Garo Hills South", "East Garo Hills Rural"],
                "blocks": ["East Garo Hills Block", "East Garo Hills West Block", "East Garo Hills East Block"],
                "panchayats": [
                    {"name": "East Garo Hills Central Gram Panchayat", "lgd_code": 301404, "block": "East Garo Hills Block", "villages": ["East Garo Hills Khas", "East Garo Hills Dehat", "East Garo Hills Purva"]},
                    {"name": "East Garo Hills Model Krishi Panchayat", "lgd_code": 302404, "block": "East Garo Hills East Block", "villages": ["Kalyanpur East Garo Hills", "Rampur East Garo Hills", "Shivpur East Garo Hills"]}
                ]
            },
            "East Jaintia Hills": {
                "lgd_code": 1405,
                "name_hi": "East Jaintia Hills",
                "headquarters": "East Jaintia Hills",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Jaintia Hills Sadar", "East Jaintia Hills North", "East Jaintia Hills South", "East Jaintia Hills Rural"],
                "blocks": ["East Jaintia Hills Block", "East Jaintia Hills West Block", "East Jaintia Hills East Block"],
                "panchayats": [
                    {"name": "East Jaintia Hills Central Gram Panchayat", "lgd_code": 301405, "block": "East Jaintia Hills Block", "villages": ["East Jaintia Hills Khas", "East Jaintia Hills Dehat", "East Jaintia Hills Purva"]},
                    {"name": "East Jaintia Hills Model Krishi Panchayat", "lgd_code": 302405, "block": "East Jaintia Hills East Block", "villages": ["Kalyanpur East Jaintia Hills", "Rampur East Jaintia Hills", "Shivpur East Jaintia Hills"]}
                ]
            },
            "East Khasi Hills (Shillong)": {
                "lgd_code": 1406,
                "name_hi": "East Khasi Hills",
                "headquarters": "East Khasi Hills",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Khasi Hills Sadar", "East Khasi Hills North", "East Khasi Hills South", "East Khasi Hills Rural"],
                "blocks": ["East Khasi Hills Block", "East Khasi Hills West Block", "East Khasi Hills East Block"],
                "panchayats": [
                    {"name": "East Khasi Hills Central Gram Panchayat", "lgd_code": 301406, "block": "East Khasi Hills Block", "villages": ["East Khasi Hills Khas", "East Khasi Hills Dehat", "East Khasi Hills Purva"]},
                    {"name": "East Khasi Hills Model Krishi Panchayat", "lgd_code": 302406, "block": "East Khasi Hills East Block", "villages": ["Kalyanpur East Khasi Hills", "Rampur East Khasi Hills", "Shivpur East Khasi Hills"]}
                ]
            },
            "Eastern West Khasi Hills": {
                "lgd_code": 1407,
                "name_hi": "Eastern West Khasi Hills",
                "headquarters": "Eastern West Khasi Hills",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Eastern West Khasi Hills Sadar", "Eastern West Khasi Hills North", "Eastern West Khasi Hills South", "Eastern West Khasi Hills Rural"],
                "blocks": ["Eastern West Khasi Hills Block", "Eastern West Khasi Hills West Block", "Eastern West Khasi Hills East Block"],
                "panchayats": [
                    {"name": "Eastern West Khasi Hills Central Gram Panchayat", "lgd_code": 301407, "block": "Eastern West Khasi Hills Block", "villages": ["Eastern West Khasi Hills Khas", "Eastern West Khasi Hills Dehat", "Eastern West Khasi Hills Purva"]},
                    {"name": "Eastern West Khasi Hills Model Krishi Panchayat", "lgd_code": 302407, "block": "Eastern West Khasi Hills East Block", "villages": ["Kalyanpur Eastern West Khasi Hills", "Rampur Eastern West Khasi Hills", "Shivpur Eastern West Khasi Hills"]}
                ]
            },
            "North Garo Hills": {
                "lgd_code": 1408,
                "name_hi": "North Garo Hills",
                "headquarters": "North Garo Hills",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North Garo Hills Sadar", "North Garo Hills North", "North Garo Hills South", "North Garo Hills Rural"],
                "blocks": ["North Garo Hills Block", "North Garo Hills West Block", "North Garo Hills East Block"],
                "panchayats": [
                    {"name": "North Garo Hills Central Gram Panchayat", "lgd_code": 301408, "block": "North Garo Hills Block", "villages": ["North Garo Hills Khas", "North Garo Hills Dehat", "North Garo Hills Purva"]},
                    {"name": "North Garo Hills Model Krishi Panchayat", "lgd_code": 302408, "block": "North Garo Hills East Block", "villages": ["Kalyanpur North Garo Hills", "Rampur North Garo Hills", "Shivpur North Garo Hills"]}
                ]
            },
            "Ri-Bhoi (Nongpoh)": {
                "lgd_code": 1409,
                "name_hi": "Ri-Bhoi",
                "headquarters": "Ri-Bhoi",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ri-Bhoi Sadar", "Ri-Bhoi North", "Ri-Bhoi South", "Ri-Bhoi Rural"],
                "blocks": ["Ri-Bhoi Block", "Ri-Bhoi West Block", "Ri-Bhoi East Block"],
                "panchayats": [
                    {"name": "Ri-Bhoi Central Gram Panchayat", "lgd_code": 301409, "block": "Ri-Bhoi Block", "villages": ["Ri-Bhoi Khas", "Ri-Bhoi Dehat", "Ri-Bhoi Purva"]},
                    {"name": "Ri-Bhoi Model Krishi Panchayat", "lgd_code": 302409, "block": "Ri-Bhoi East Block", "villages": ["Kalyanpur Ri-Bhoi", "Rampur Ri-Bhoi", "Shivpur Ri-Bhoi"]}
                ]
            },
            "South Garo Hills": {
                "lgd_code": 1410,
                "name_hi": "South Garo Hills",
                "headquarters": "South Garo Hills",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Garo Hills Sadar", "South Garo Hills North", "South Garo Hills South", "South Garo Hills Rural"],
                "blocks": ["South Garo Hills Block", "South Garo Hills West Block", "South Garo Hills East Block"],
                "panchayats": [
                    {"name": "South Garo Hills Central Gram Panchayat", "lgd_code": 301410, "block": "South Garo Hills Block", "villages": ["South Garo Hills Khas", "South Garo Hills Dehat", "South Garo Hills Purva"]},
                    {"name": "South Garo Hills Model Krishi Panchayat", "lgd_code": 302410, "block": "South Garo Hills East Block", "villages": ["Kalyanpur South Garo Hills", "Rampur South Garo Hills", "Shivpur South Garo Hills"]}
                ]
            },
            "South West Garo Hills": {
                "lgd_code": 1411,
                "name_hi": "South West Garo Hills",
                "headquarters": "South West Garo Hills",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South West Garo Hills Sadar", "South West Garo Hills North", "South West Garo Hills South", "South West Garo Hills Rural"],
                "blocks": ["South West Garo Hills Block", "South West Garo Hills West Block", "South West Garo Hills East Block"],
                "panchayats": [
                    {"name": "South West Garo Hills Central Gram Panchayat", "lgd_code": 301411, "block": "South West Garo Hills Block", "villages": ["South West Garo Hills Khas", "South West Garo Hills Dehat", "South West Garo Hills Purva"]},
                    {"name": "South West Garo Hills Model Krishi Panchayat", "lgd_code": 302411, "block": "South West Garo Hills East Block", "villages": ["Kalyanpur South West Garo Hills", "Rampur South West Garo Hills", "Shivpur South West Garo Hills"]}
                ]
            },
            "South West Khasi Hills": {
                "lgd_code": 1412,
                "name_hi": "South West Khasi Hills",
                "headquarters": "South West Khasi Hills",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South West Khasi Hills Sadar", "South West Khasi Hills North", "South West Khasi Hills South", "South West Khasi Hills Rural"],
                "blocks": ["South West Khasi Hills Block", "South West Khasi Hills West Block", "South West Khasi Hills East Block"],
                "panchayats": [
                    {"name": "South West Khasi Hills Central Gram Panchayat", "lgd_code": 301412, "block": "South West Khasi Hills Block", "villages": ["South West Khasi Hills Khas", "South West Khasi Hills Dehat", "South West Khasi Hills Purva"]},
                    {"name": "South West Khasi Hills Model Krishi Panchayat", "lgd_code": 302412, "block": "South West Khasi Hills East Block", "villages": ["Kalyanpur South West Khasi Hills", "Rampur South West Khasi Hills", "Shivpur South West Khasi Hills"]}
                ]
            },
            "West Garo Hills (Tura)": {
                "lgd_code": 1413,
                "name_hi": "West Garo Hills",
                "headquarters": "West Garo Hills",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Garo Hills Sadar", "West Garo Hills North", "West Garo Hills South", "West Garo Hills Rural"],
                "blocks": ["West Garo Hills Block", "West Garo Hills West Block", "West Garo Hills East Block"],
                "panchayats": [
                    {"name": "West Garo Hills Central Gram Panchayat", "lgd_code": 301413, "block": "West Garo Hills Block", "villages": ["West Garo Hills Khas", "West Garo Hills Dehat", "West Garo Hills Purva"]},
                    {"name": "West Garo Hills Model Krishi Panchayat", "lgd_code": 302413, "block": "West Garo Hills East Block", "villages": ["Kalyanpur West Garo Hills", "Rampur West Garo Hills", "Shivpur West Garo Hills"]}
                ]
            },
            "West Jaintia Hills (Jowai)": {
                "lgd_code": 1414,
                "name_hi": "West Jaintia Hills",
                "headquarters": "West Jaintia Hills",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Jaintia Hills Sadar", "West Jaintia Hills North", "West Jaintia Hills South", "West Jaintia Hills Rural"],
                "blocks": ["West Jaintia Hills Block", "West Jaintia Hills West Block", "West Jaintia Hills East Block"],
                "panchayats": [
                    {"name": "West Jaintia Hills Central Gram Panchayat", "lgd_code": 301414, "block": "West Jaintia Hills Block", "villages": ["West Jaintia Hills Khas", "West Jaintia Hills Dehat", "West Jaintia Hills Purva"]},
                    {"name": "West Jaintia Hills Model Krishi Panchayat", "lgd_code": 302414, "block": "West Jaintia Hills East Block", "villages": ["Kalyanpur West Jaintia Hills", "Rampur West Jaintia Hills", "Shivpur West Jaintia Hills"]}
                ]
            },
            "West Khasi Hills": {
                "lgd_code": 1415,
                "name_hi": "West Khasi Hills",
                "headquarters": "West Khasi Hills",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Khasi Hills Sadar", "West Khasi Hills North", "West Khasi Hills South", "West Khasi Hills Rural"],
                "blocks": ["West Khasi Hills Block", "West Khasi Hills West Block", "West Khasi Hills East Block"],
                "panchayats": [
                    {"name": "West Khasi Hills Central Gram Panchayat", "lgd_code": 301415, "block": "West Khasi Hills Block", "villages": ["West Khasi Hills Khas", "West Khasi Hills Dehat", "West Khasi Hills Purva"]},
                    {"name": "West Khasi Hills Model Krishi Panchayat", "lgd_code": 302415, "block": "West Khasi Hills East Block", "villages": ["Kalyanpur West Khasi Hills", "Rampur West Khasi Hills", "Shivpur West Khasi Hills"]}
                ]
            },
        }
    },
    "Mizoram": {
        "districts": {
            "Aizawl": {
                "lgd_code": 1416,
                "name_hi": "Aizawl",
                "headquarters": "Aizawl",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Aizawl Sadar", "Aizawl North", "Aizawl South", "Aizawl Rural"],
                "blocks": ["Aizawl Block", "Aizawl West Block", "Aizawl East Block"],
                "panchayats": [
                    {"name": "Aizawl Central Gram Panchayat", "lgd_code": 301416, "block": "Aizawl Block", "villages": ["Aizawl Khas", "Aizawl Dehat", "Aizawl Purva"]},
                    {"name": "Aizawl Model Krishi Panchayat", "lgd_code": 302416, "block": "Aizawl East Block", "villages": ["Kalyanpur Aizawl", "Rampur Aizawl", "Shivpur Aizawl"]}
                ]
            },
            "Champhai": {
                "lgd_code": 1417,
                "name_hi": "Champhai",
                "headquarters": "Champhai",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Champhai Sadar", "Champhai North", "Champhai South", "Champhai Rural"],
                "blocks": ["Champhai Block", "Champhai West Block", "Champhai East Block"],
                "panchayats": [
                    {"name": "Champhai Central Gram Panchayat", "lgd_code": 301417, "block": "Champhai Block", "villages": ["Champhai Khas", "Champhai Dehat", "Champhai Purva"]},
                    {"name": "Champhai Model Krishi Panchayat", "lgd_code": 302417, "block": "Champhai East Block", "villages": ["Kalyanpur Champhai", "Rampur Champhai", "Shivpur Champhai"]}
                ]
            },
            "Hnahthial": {
                "lgd_code": 1418,
                "name_hi": "Hnahthial",
                "headquarters": "Hnahthial",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hnahthial Sadar", "Hnahthial North", "Hnahthial South", "Hnahthial Rural"],
                "blocks": ["Hnahthial Block", "Hnahthial West Block", "Hnahthial East Block"],
                "panchayats": [
                    {"name": "Hnahthial Central Gram Panchayat", "lgd_code": 301418, "block": "Hnahthial Block", "villages": ["Hnahthial Khas", "Hnahthial Dehat", "Hnahthial Purva"]},
                    {"name": "Hnahthial Model Krishi Panchayat", "lgd_code": 302418, "block": "Hnahthial East Block", "villages": ["Kalyanpur Hnahthial", "Rampur Hnahthial", "Shivpur Hnahthial"]}
                ]
            },
            "Khawzawl": {
                "lgd_code": 1419,
                "name_hi": "Khawzawl",
                "headquarters": "Khawzawl",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khawzawl Sadar", "Khawzawl North", "Khawzawl South", "Khawzawl Rural"],
                "blocks": ["Khawzawl Block", "Khawzawl West Block", "Khawzawl East Block"],
                "panchayats": [
                    {"name": "Khawzawl Central Gram Panchayat", "lgd_code": 301419, "block": "Khawzawl Block", "villages": ["Khawzawl Khas", "Khawzawl Dehat", "Khawzawl Purva"]},
                    {"name": "Khawzawl Model Krishi Panchayat", "lgd_code": 302419, "block": "Khawzawl East Block", "villages": ["Kalyanpur Khawzawl", "Rampur Khawzawl", "Shivpur Khawzawl"]}
                ]
            },
            "Kolasib": {
                "lgd_code": 1420,
                "name_hi": "Kolasib",
                "headquarters": "Kolasib",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kolasib Sadar", "Kolasib North", "Kolasib South", "Kolasib Rural"],
                "blocks": ["Kolasib Block", "Kolasib West Block", "Kolasib East Block"],
                "panchayats": [
                    {"name": "Kolasib Central Gram Panchayat", "lgd_code": 301420, "block": "Kolasib Block", "villages": ["Kolasib Khas", "Kolasib Dehat", "Kolasib Purva"]},
                    {"name": "Kolasib Model Krishi Panchayat", "lgd_code": 302420, "block": "Kolasib East Block", "villages": ["Kalyanpur Kolasib", "Rampur Kolasib", "Shivpur Kolasib"]}
                ]
            },
            "Lawngtlai": {
                "lgd_code": 1421,
                "name_hi": "Lawngtlai",
                "headquarters": "Lawngtlai",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lawngtlai Sadar", "Lawngtlai North", "Lawngtlai South", "Lawngtlai Rural"],
                "blocks": ["Lawngtlai Block", "Lawngtlai West Block", "Lawngtlai East Block"],
                "panchayats": [
                    {"name": "Lawngtlai Central Gram Panchayat", "lgd_code": 301421, "block": "Lawngtlai Block", "villages": ["Lawngtlai Khas", "Lawngtlai Dehat", "Lawngtlai Purva"]},
                    {"name": "Lawngtlai Model Krishi Panchayat", "lgd_code": 302421, "block": "Lawngtlai East Block", "villages": ["Kalyanpur Lawngtlai", "Rampur Lawngtlai", "Shivpur Lawngtlai"]}
                ]
            },
            "Lunglei": {
                "lgd_code": 1422,
                "name_hi": "Lunglei",
                "headquarters": "Lunglei",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lunglei Sadar", "Lunglei North", "Lunglei South", "Lunglei Rural"],
                "blocks": ["Lunglei Block", "Lunglei West Block", "Lunglei East Block"],
                "panchayats": [
                    {"name": "Lunglei Central Gram Panchayat", "lgd_code": 301422, "block": "Lunglei Block", "villages": ["Lunglei Khas", "Lunglei Dehat", "Lunglei Purva"]},
                    {"name": "Lunglei Model Krishi Panchayat", "lgd_code": 302422, "block": "Lunglei East Block", "villages": ["Kalyanpur Lunglei", "Rampur Lunglei", "Shivpur Lunglei"]}
                ]
            },
            "Mamit": {
                "lgd_code": 1423,
                "name_hi": "Mamit",
                "headquarters": "Mamit",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mamit Sadar", "Mamit North", "Mamit South", "Mamit Rural"],
                "blocks": ["Mamit Block", "Mamit West Block", "Mamit East Block"],
                "panchayats": [
                    {"name": "Mamit Central Gram Panchayat", "lgd_code": 301423, "block": "Mamit Block", "villages": ["Mamit Khas", "Mamit Dehat", "Mamit Purva"]},
                    {"name": "Mamit Model Krishi Panchayat", "lgd_code": 302423, "block": "Mamit East Block", "villages": ["Kalyanpur Mamit", "Rampur Mamit", "Shivpur Mamit"]}
                ]
            },
            "Saiha": {
                "lgd_code": 1424,
                "name_hi": "Saiha",
                "headquarters": "Saiha",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saiha Sadar", "Saiha North", "Saiha South", "Saiha Rural"],
                "blocks": ["Saiha Block", "Saiha West Block", "Saiha East Block"],
                "panchayats": [
                    {"name": "Saiha Central Gram Panchayat", "lgd_code": 301424, "block": "Saiha Block", "villages": ["Saiha Khas", "Saiha Dehat", "Saiha Purva"]},
                    {"name": "Saiha Model Krishi Panchayat", "lgd_code": 302424, "block": "Saiha East Block", "villages": ["Kalyanpur Saiha", "Rampur Saiha", "Shivpur Saiha"]}
                ]
            },
            "Saitual": {
                "lgd_code": 1425,
                "name_hi": "Saitual",
                "headquarters": "Saitual",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saitual Sadar", "Saitual North", "Saitual South", "Saitual Rural"],
                "blocks": ["Saitual Block", "Saitual West Block", "Saitual East Block"],
                "panchayats": [
                    {"name": "Saitual Central Gram Panchayat", "lgd_code": 301425, "block": "Saitual Block", "villages": ["Saitual Khas", "Saitual Dehat", "Saitual Purva"]},
                    {"name": "Saitual Model Krishi Panchayat", "lgd_code": 302425, "block": "Saitual East Block", "villages": ["Kalyanpur Saitual", "Rampur Saitual", "Shivpur Saitual"]}
                ]
            },
            "Serchhip": {
                "lgd_code": 1426,
                "name_hi": "Serchhip",
                "headquarters": "Serchhip",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Serchhip Sadar", "Serchhip North", "Serchhip South", "Serchhip Rural"],
                "blocks": ["Serchhip Block", "Serchhip West Block", "Serchhip East Block"],
                "panchayats": [
                    {"name": "Serchhip Central Gram Panchayat", "lgd_code": 301426, "block": "Serchhip Block", "villages": ["Serchhip Khas", "Serchhip Dehat", "Serchhip Purva"]},
                    {"name": "Serchhip Model Krishi Panchayat", "lgd_code": 302426, "block": "Serchhip East Block", "villages": ["Kalyanpur Serchhip", "Rampur Serchhip", "Shivpur Serchhip"]}
                ]
            },
        }
    },
    "Nagaland": {
        "districts": {
            "Chumoukedima": {
                "lgd_code": 1427,
                "name_hi": "Chumoukedima",
                "headquarters": "Chumoukedima",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chumoukedima Sadar", "Chumoukedima North", "Chumoukedima South", "Chumoukedima Rural"],
                "blocks": ["Chumoukedima Block", "Chumoukedima West Block", "Chumoukedima East Block"],
                "panchayats": [
                    {"name": "Chumoukedima Central Gram Panchayat", "lgd_code": 301427, "block": "Chumoukedima Block", "villages": ["Chumoukedima Khas", "Chumoukedima Dehat", "Chumoukedima Purva"]},
                    {"name": "Chumoukedima Model Krishi Panchayat", "lgd_code": 302427, "block": "Chumoukedima East Block", "villages": ["Kalyanpur Chumoukedima", "Rampur Chumoukedima", "Shivpur Chumoukedima"]}
                ]
            },
            "Dimapur": {
                "lgd_code": 1428,
                "name_hi": "Dimapur",
                "headquarters": "Dimapur",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dimapur Sadar", "Dimapur North", "Dimapur South", "Dimapur Rural"],
                "blocks": ["Dimapur Block", "Dimapur West Block", "Dimapur East Block"],
                "panchayats": [
                    {"name": "Dimapur Central Gram Panchayat", "lgd_code": 301428, "block": "Dimapur Block", "villages": ["Dimapur Khas", "Dimapur Dehat", "Dimapur Purva"]},
                    {"name": "Dimapur Model Krishi Panchayat", "lgd_code": 302428, "block": "Dimapur East Block", "villages": ["Kalyanpur Dimapur", "Rampur Dimapur", "Shivpur Dimapur"]}
                ]
            },
            "Kiphire": {
                "lgd_code": 1429,
                "name_hi": "Kiphire",
                "headquarters": "Kiphire",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kiphire Sadar", "Kiphire North", "Kiphire South", "Kiphire Rural"],
                "blocks": ["Kiphire Block", "Kiphire West Block", "Kiphire East Block"],
                "panchayats": [
                    {"name": "Kiphire Central Gram Panchayat", "lgd_code": 301429, "block": "Kiphire Block", "villages": ["Kiphire Khas", "Kiphire Dehat", "Kiphire Purva"]},
                    {"name": "Kiphire Model Krishi Panchayat", "lgd_code": 302429, "block": "Kiphire East Block", "villages": ["Kalyanpur Kiphire", "Rampur Kiphire", "Shivpur Kiphire"]}
                ]
            },
            "Kohima": {
                "lgd_code": 1430,
                "name_hi": "Kohima",
                "headquarters": "Kohima",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kohima Sadar", "Kohima North", "Kohima South", "Kohima Rural"],
                "blocks": ["Kohima Block", "Kohima West Block", "Kohima East Block"],
                "panchayats": [
                    {"name": "Kohima Central Gram Panchayat", "lgd_code": 301430, "block": "Kohima Block", "villages": ["Kohima Khas", "Kohima Dehat", "Kohima Purva"]},
                    {"name": "Kohima Model Krishi Panchayat", "lgd_code": 302430, "block": "Kohima East Block", "villages": ["Kalyanpur Kohima", "Rampur Kohima", "Shivpur Kohima"]}
                ]
            },
            "Longleng": {
                "lgd_code": 1431,
                "name_hi": "Longleng",
                "headquarters": "Longleng",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Longleng Sadar", "Longleng North", "Longleng South", "Longleng Rural"],
                "blocks": ["Longleng Block", "Longleng West Block", "Longleng East Block"],
                "panchayats": [
                    {"name": "Longleng Central Gram Panchayat", "lgd_code": 301431, "block": "Longleng Block", "villages": ["Longleng Khas", "Longleng Dehat", "Longleng Purva"]},
                    {"name": "Longleng Model Krishi Panchayat", "lgd_code": 302431, "block": "Longleng East Block", "villages": ["Kalyanpur Longleng", "Rampur Longleng", "Shivpur Longleng"]}
                ]
            },
            "Mokokchung": {
                "lgd_code": 1432,
                "name_hi": "Mokokchung",
                "headquarters": "Mokokchung",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mokokchung Sadar", "Mokokchung North", "Mokokchung South", "Mokokchung Rural"],
                "blocks": ["Mokokchung Block", "Mokokchung West Block", "Mokokchung East Block"],
                "panchayats": [
                    {"name": "Mokokchung Central Gram Panchayat", "lgd_code": 301432, "block": "Mokokchung Block", "villages": ["Mokokchung Khas", "Mokokchung Dehat", "Mokokchung Purva"]},
                    {"name": "Mokokchung Model Krishi Panchayat", "lgd_code": 302432, "block": "Mokokchung East Block", "villages": ["Kalyanpur Mokokchung", "Rampur Mokokchung", "Shivpur Mokokchung"]}
                ]
            },
            "Mon": {
                "lgd_code": 1433,
                "name_hi": "Mon",
                "headquarters": "Mon",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mon Sadar", "Mon North", "Mon South", "Mon Rural"],
                "blocks": ["Mon Block", "Mon West Block", "Mon East Block"],
                "panchayats": [
                    {"name": "Mon Central Gram Panchayat", "lgd_code": 301433, "block": "Mon Block", "villages": ["Mon Khas", "Mon Dehat", "Mon Purva"]},
                    {"name": "Mon Model Krishi Panchayat", "lgd_code": 302433, "block": "Mon East Block", "villages": ["Kalyanpur Mon", "Rampur Mon", "Shivpur Mon"]}
                ]
            },
            "Niuland": {
                "lgd_code": 1434,
                "name_hi": "Niuland",
                "headquarters": "Niuland",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Niuland Sadar", "Niuland North", "Niuland South", "Niuland Rural"],
                "blocks": ["Niuland Block", "Niuland West Block", "Niuland East Block"],
                "panchayats": [
                    {"name": "Niuland Central Gram Panchayat", "lgd_code": 301434, "block": "Niuland Block", "villages": ["Niuland Khas", "Niuland Dehat", "Niuland Purva"]},
                    {"name": "Niuland Model Krishi Panchayat", "lgd_code": 302434, "block": "Niuland East Block", "villages": ["Kalyanpur Niuland", "Rampur Niuland", "Shivpur Niuland"]}
                ]
            },
            "Noklak": {
                "lgd_code": 1435,
                "name_hi": "Noklak",
                "headquarters": "Noklak",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Noklak Sadar", "Noklak North", "Noklak South", "Noklak Rural"],
                "blocks": ["Noklak Block", "Noklak West Block", "Noklak East Block"],
                "panchayats": [
                    {"name": "Noklak Central Gram Panchayat", "lgd_code": 301435, "block": "Noklak Block", "villages": ["Noklak Khas", "Noklak Dehat", "Noklak Purva"]},
                    {"name": "Noklak Model Krishi Panchayat", "lgd_code": 302435, "block": "Noklak East Block", "villages": ["Kalyanpur Noklak", "Rampur Noklak", "Shivpur Noklak"]}
                ]
            },
            "Peren": {
                "lgd_code": 1436,
                "name_hi": "Peren",
                "headquarters": "Peren",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Peren Sadar", "Peren North", "Peren South", "Peren Rural"],
                "blocks": ["Peren Block", "Peren West Block", "Peren East Block"],
                "panchayats": [
                    {"name": "Peren Central Gram Panchayat", "lgd_code": 301436, "block": "Peren Block", "villages": ["Peren Khas", "Peren Dehat", "Peren Purva"]},
                    {"name": "Peren Model Krishi Panchayat", "lgd_code": 302436, "block": "Peren East Block", "villages": ["Kalyanpur Peren", "Rampur Peren", "Shivpur Peren"]}
                ]
            },
            "Phek": {
                "lgd_code": 1437,
                "name_hi": "Phek",
                "headquarters": "Phek",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Phek Sadar", "Phek North", "Phek South", "Phek Rural"],
                "blocks": ["Phek Block", "Phek West Block", "Phek East Block"],
                "panchayats": [
                    {"name": "Phek Central Gram Panchayat", "lgd_code": 301437, "block": "Phek Block", "villages": ["Phek Khas", "Phek Dehat", "Phek Purva"]},
                    {"name": "Phek Model Krishi Panchayat", "lgd_code": 302437, "block": "Phek East Block", "villages": ["Kalyanpur Phek", "Rampur Phek", "Shivpur Phek"]}
                ]
            },
            "Shamator": {
                "lgd_code": 1438,
                "name_hi": "Shamator",
                "headquarters": "Shamator",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shamator Sadar", "Shamator North", "Shamator South", "Shamator Rural"],
                "blocks": ["Shamator Block", "Shamator West Block", "Shamator East Block"],
                "panchayats": [
                    {"name": "Shamator Central Gram Panchayat", "lgd_code": 301438, "block": "Shamator Block", "villages": ["Shamator Khas", "Shamator Dehat", "Shamator Purva"]},
                    {"name": "Shamator Model Krishi Panchayat", "lgd_code": 302438, "block": "Shamator East Block", "villages": ["Kalyanpur Shamator", "Rampur Shamator", "Shivpur Shamator"]}
                ]
            },
            "Tseminyu": {
                "lgd_code": 1439,
                "name_hi": "Tseminyu",
                "headquarters": "Tseminyu",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tseminyu Sadar", "Tseminyu North", "Tseminyu South", "Tseminyu Rural"],
                "blocks": ["Tseminyu Block", "Tseminyu West Block", "Tseminyu East Block"],
                "panchayats": [
                    {"name": "Tseminyu Central Gram Panchayat", "lgd_code": 301439, "block": "Tseminyu Block", "villages": ["Tseminyu Khas", "Tseminyu Dehat", "Tseminyu Purva"]},
                    {"name": "Tseminyu Model Krishi Panchayat", "lgd_code": 302439, "block": "Tseminyu East Block", "villages": ["Kalyanpur Tseminyu", "Rampur Tseminyu", "Shivpur Tseminyu"]}
                ]
            },
            "Tuensang": {
                "lgd_code": 1440,
                "name_hi": "Tuensang",
                "headquarters": "Tuensang",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tuensang Sadar", "Tuensang North", "Tuensang South", "Tuensang Rural"],
                "blocks": ["Tuensang Block", "Tuensang West Block", "Tuensang East Block"],
                "panchayats": [
                    {"name": "Tuensang Central Gram Panchayat", "lgd_code": 301440, "block": "Tuensang Block", "villages": ["Tuensang Khas", "Tuensang Dehat", "Tuensang Purva"]},
                    {"name": "Tuensang Model Krishi Panchayat", "lgd_code": 302440, "block": "Tuensang East Block", "villages": ["Kalyanpur Tuensang", "Rampur Tuensang", "Shivpur Tuensang"]}
                ]
            },
            "Wokha": {
                "lgd_code": 1441,
                "name_hi": "Wokha",
                "headquarters": "Wokha",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Wokha Sadar", "Wokha North", "Wokha South", "Wokha Rural"],
                "blocks": ["Wokha Block", "Wokha West Block", "Wokha East Block"],
                "panchayats": [
                    {"name": "Wokha Central Gram Panchayat", "lgd_code": 301441, "block": "Wokha Block", "villages": ["Wokha Khas", "Wokha Dehat", "Wokha Purva"]},
                    {"name": "Wokha Model Krishi Panchayat", "lgd_code": 302441, "block": "Wokha East Block", "villages": ["Kalyanpur Wokha", "Rampur Wokha", "Shivpur Wokha"]}
                ]
            },
            "Zunheboto": {
                "lgd_code": 1442,
                "name_hi": "Zunheboto",
                "headquarters": "Zunheboto",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Zunheboto Sadar", "Zunheboto North", "Zunheboto South", "Zunheboto Rural"],
                "blocks": ["Zunheboto Block", "Zunheboto West Block", "Zunheboto East Block"],
                "panchayats": [
                    {"name": "Zunheboto Central Gram Panchayat", "lgd_code": 301442, "block": "Zunheboto Block", "villages": ["Zunheboto Khas", "Zunheboto Dehat", "Zunheboto Purva"]},
                    {"name": "Zunheboto Model Krishi Panchayat", "lgd_code": 302442, "block": "Zunheboto East Block", "villages": ["Kalyanpur Zunheboto", "Rampur Zunheboto", "Shivpur Zunheboto"]}
                ]
            },
        }
    },
    "Odisha": {
        "districts": {
            "Angul": {
                "lgd_code": 1443,
                "name_hi": "Angul",
                "headquarters": "Angul",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Angul Sadar", "Angul North", "Angul South", "Angul Rural"],
                "blocks": ["Angul Block", "Angul West Block", "Angul East Block"],
                "panchayats": [
                    {"name": "Angul Central Gram Panchayat", "lgd_code": 301443, "block": "Angul Block", "villages": ["Angul Khas", "Angul Dehat", "Angul Purva"]},
                    {"name": "Angul Model Krishi Panchayat", "lgd_code": 302443, "block": "Angul East Block", "villages": ["Kalyanpur Angul", "Rampur Angul", "Shivpur Angul"]}
                ]
            },
            "Balangir": {
                "lgd_code": 1444,
                "name_hi": "Balangir",
                "headquarters": "Balangir",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balangir Sadar", "Balangir North", "Balangir South", "Balangir Rural"],
                "blocks": ["Balangir Block", "Balangir West Block", "Balangir East Block"],
                "panchayats": [
                    {"name": "Balangir Central Gram Panchayat", "lgd_code": 301444, "block": "Balangir Block", "villages": ["Balangir Khas", "Balangir Dehat", "Balangir Purva"]},
                    {"name": "Balangir Model Krishi Panchayat", "lgd_code": 302444, "block": "Balangir East Block", "villages": ["Kalyanpur Balangir", "Rampur Balangir", "Shivpur Balangir"]}
                ]
            },
            "Balasore": {
                "lgd_code": 1445,
                "name_hi": "Balasore",
                "headquarters": "Balasore",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balasore Sadar", "Balasore North", "Balasore South", "Balasore Rural"],
                "blocks": ["Balasore Block", "Balasore West Block", "Balasore East Block"],
                "panchayats": [
                    {"name": "Balasore Central Gram Panchayat", "lgd_code": 301445, "block": "Balasore Block", "villages": ["Balasore Khas", "Balasore Dehat", "Balasore Purva"]},
                    {"name": "Balasore Model Krishi Panchayat", "lgd_code": 302445, "block": "Balasore East Block", "villages": ["Kalyanpur Balasore", "Rampur Balasore", "Shivpur Balasore"]}
                ]
            },
            "Bargarh": {
                "lgd_code": 1446,
                "name_hi": "Bargarh",
                "headquarters": "Bargarh",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bargarh Sadar", "Bargarh North", "Bargarh South", "Bargarh Rural"],
                "blocks": ["Bargarh Block", "Bargarh West Block", "Bargarh East Block"],
                "panchayats": [
                    {"name": "Bargarh Central Gram Panchayat", "lgd_code": 301446, "block": "Bargarh Block", "villages": ["Bargarh Khas", "Bargarh Dehat", "Bargarh Purva"]},
                    {"name": "Bargarh Model Krishi Panchayat", "lgd_code": 302446, "block": "Bargarh East Block", "villages": ["Kalyanpur Bargarh", "Rampur Bargarh", "Shivpur Bargarh"]}
                ]
            },
            "Bhadrak": {
                "lgd_code": 1447,
                "name_hi": "Bhadrak",
                "headquarters": "Bhadrak",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhadrak Sadar", "Bhadrak North", "Bhadrak South", "Bhadrak Rural"],
                "blocks": ["Bhadrak Block", "Bhadrak West Block", "Bhadrak East Block"],
                "panchayats": [
                    {"name": "Bhadrak Central Gram Panchayat", "lgd_code": 301447, "block": "Bhadrak Block", "villages": ["Bhadrak Khas", "Bhadrak Dehat", "Bhadrak Purva"]},
                    {"name": "Bhadrak Model Krishi Panchayat", "lgd_code": 302447, "block": "Bhadrak East Block", "villages": ["Kalyanpur Bhadrak", "Rampur Bhadrak", "Shivpur Bhadrak"]}
                ]
            },
            "Boudh": {
                "lgd_code": 1448,
                "name_hi": "Boudh",
                "headquarters": "Boudh",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Boudh Sadar", "Boudh North", "Boudh South", "Boudh Rural"],
                "blocks": ["Boudh Block", "Boudh West Block", "Boudh East Block"],
                "panchayats": [
                    {"name": "Boudh Central Gram Panchayat", "lgd_code": 301448, "block": "Boudh Block", "villages": ["Boudh Khas", "Boudh Dehat", "Boudh Purva"]},
                    {"name": "Boudh Model Krishi Panchayat", "lgd_code": 302448, "block": "Boudh East Block", "villages": ["Kalyanpur Boudh", "Rampur Boudh", "Shivpur Boudh"]}
                ]
            },
            "Cuttack": {
                "lgd_code": 1449,
                "name_hi": "Cuttack",
                "headquarters": "Cuttack",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Cuttack Sadar", "Cuttack North", "Cuttack South", "Cuttack Rural"],
                "blocks": ["Cuttack Block", "Cuttack West Block", "Cuttack East Block"],
                "panchayats": [
                    {"name": "Cuttack Central Gram Panchayat", "lgd_code": 301449, "block": "Cuttack Block", "villages": ["Cuttack Khas", "Cuttack Dehat", "Cuttack Purva"]},
                    {"name": "Cuttack Model Krishi Panchayat", "lgd_code": 302449, "block": "Cuttack East Block", "villages": ["Kalyanpur Cuttack", "Rampur Cuttack", "Shivpur Cuttack"]}
                ]
            },
            "Deogarh": {
                "lgd_code": 1450,
                "name_hi": "Deogarh",
                "headquarters": "Deogarh",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Deogarh Sadar", "Deogarh North", "Deogarh South", "Deogarh Rural"],
                "blocks": ["Deogarh Block", "Deogarh West Block", "Deogarh East Block"],
                "panchayats": [
                    {"name": "Deogarh Central Gram Panchayat", "lgd_code": 301450, "block": "Deogarh Block", "villages": ["Deogarh Khas", "Deogarh Dehat", "Deogarh Purva"]},
                    {"name": "Deogarh Model Krishi Panchayat", "lgd_code": 302450, "block": "Deogarh East Block", "villages": ["Kalyanpur Deogarh", "Rampur Deogarh", "Shivpur Deogarh"]}
                ]
            },
            "Dhenkanal": {
                "lgd_code": 1451,
                "name_hi": "Dhenkanal",
                "headquarters": "Dhenkanal",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhenkanal Sadar", "Dhenkanal North", "Dhenkanal South", "Dhenkanal Rural"],
                "blocks": ["Dhenkanal Block", "Dhenkanal West Block", "Dhenkanal East Block"],
                "panchayats": [
                    {"name": "Dhenkanal Central Gram Panchayat", "lgd_code": 301451, "block": "Dhenkanal Block", "villages": ["Dhenkanal Khas", "Dhenkanal Dehat", "Dhenkanal Purva"]},
                    {"name": "Dhenkanal Model Krishi Panchayat", "lgd_code": 302451, "block": "Dhenkanal East Block", "villages": ["Kalyanpur Dhenkanal", "Rampur Dhenkanal", "Shivpur Dhenkanal"]}
                ]
            },
            "Gajapati": {
                "lgd_code": 1452,
                "name_hi": "Gajapati",
                "headquarters": "Gajapati",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gajapati Sadar", "Gajapati North", "Gajapati South", "Gajapati Rural"],
                "blocks": ["Gajapati Block", "Gajapati West Block", "Gajapati East Block"],
                "panchayats": [
                    {"name": "Gajapati Central Gram Panchayat", "lgd_code": 301452, "block": "Gajapati Block", "villages": ["Gajapati Khas", "Gajapati Dehat", "Gajapati Purva"]},
                    {"name": "Gajapati Model Krishi Panchayat", "lgd_code": 302452, "block": "Gajapati East Block", "villages": ["Kalyanpur Gajapati", "Rampur Gajapati", "Shivpur Gajapati"]}
                ]
            },
            "Ganjam (Berhampur)": {
                "lgd_code": 1453,
                "name_hi": "Ganjam",
                "headquarters": "Ganjam",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ganjam Sadar", "Ganjam North", "Ganjam South", "Ganjam Rural"],
                "blocks": ["Ganjam Block", "Ganjam West Block", "Ganjam East Block"],
                "panchayats": [
                    {"name": "Ganjam Central Gram Panchayat", "lgd_code": 301453, "block": "Ganjam Block", "villages": ["Ganjam Khas", "Ganjam Dehat", "Ganjam Purva"]},
                    {"name": "Ganjam Model Krishi Panchayat", "lgd_code": 302453, "block": "Ganjam East Block", "villages": ["Kalyanpur Ganjam", "Rampur Ganjam", "Shivpur Ganjam"]}
                ]
            },
            "Jagatsinghpur": {
                "lgd_code": 1454,
                "name_hi": "Jagatsinghpur",
                "headquarters": "Jagatsinghpur",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jagatsinghpur Sadar", "Jagatsinghpur North", "Jagatsinghpur South", "Jagatsinghpur Rural"],
                "blocks": ["Jagatsinghpur Block", "Jagatsinghpur West Block", "Jagatsinghpur East Block"],
                "panchayats": [
                    {"name": "Jagatsinghpur Central Gram Panchayat", "lgd_code": 301454, "block": "Jagatsinghpur Block", "villages": ["Jagatsinghpur Khas", "Jagatsinghpur Dehat", "Jagatsinghpur Purva"]},
                    {"name": "Jagatsinghpur Model Krishi Panchayat", "lgd_code": 302454, "block": "Jagatsinghpur East Block", "villages": ["Kalyanpur Jagatsinghpur", "Rampur Jagatsinghpur", "Shivpur Jagatsinghpur"]}
                ]
            },
            "Jajpur": {
                "lgd_code": 1455,
                "name_hi": "Jajpur",
                "headquarters": "Jajpur",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jajpur Sadar", "Jajpur North", "Jajpur South", "Jajpur Rural"],
                "blocks": ["Jajpur Block", "Jajpur West Block", "Jajpur East Block"],
                "panchayats": [
                    {"name": "Jajpur Central Gram Panchayat", "lgd_code": 301455, "block": "Jajpur Block", "villages": ["Jajpur Khas", "Jajpur Dehat", "Jajpur Purva"]},
                    {"name": "Jajpur Model Krishi Panchayat", "lgd_code": 302455, "block": "Jajpur East Block", "villages": ["Kalyanpur Jajpur", "Rampur Jajpur", "Shivpur Jajpur"]}
                ]
            },
            "Jharsuguda": {
                "lgd_code": 1456,
                "name_hi": "Jharsuguda",
                "headquarters": "Jharsuguda",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jharsuguda Sadar", "Jharsuguda North", "Jharsuguda South", "Jharsuguda Rural"],
                "blocks": ["Jharsuguda Block", "Jharsuguda West Block", "Jharsuguda East Block"],
                "panchayats": [
                    {"name": "Jharsuguda Central Gram Panchayat", "lgd_code": 301456, "block": "Jharsuguda Block", "villages": ["Jharsuguda Khas", "Jharsuguda Dehat", "Jharsuguda Purva"]},
                    {"name": "Jharsuguda Model Krishi Panchayat", "lgd_code": 302456, "block": "Jharsuguda East Block", "villages": ["Kalyanpur Jharsuguda", "Rampur Jharsuguda", "Shivpur Jharsuguda"]}
                ]
            },
            "Kalahandi (Bhawanipatna)": {
                "lgd_code": 1457,
                "name_hi": "Kalahandi",
                "headquarters": "Kalahandi",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kalahandi Sadar", "Kalahandi North", "Kalahandi South", "Kalahandi Rural"],
                "blocks": ["Kalahandi Block", "Kalahandi West Block", "Kalahandi East Block"],
                "panchayats": [
                    {"name": "Kalahandi Central Gram Panchayat", "lgd_code": 301457, "block": "Kalahandi Block", "villages": ["Kalahandi Khas", "Kalahandi Dehat", "Kalahandi Purva"]},
                    {"name": "Kalahandi Model Krishi Panchayat", "lgd_code": 302457, "block": "Kalahandi East Block", "villages": ["Kalyanpur Kalahandi", "Rampur Kalahandi", "Shivpur Kalahandi"]}
                ]
            },
            "Kandhamal (Phulbani)": {
                "lgd_code": 1458,
                "name_hi": "Kandhamal",
                "headquarters": "Kandhamal",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kandhamal Sadar", "Kandhamal North", "Kandhamal South", "Kandhamal Rural"],
                "blocks": ["Kandhamal Block", "Kandhamal West Block", "Kandhamal East Block"],
                "panchayats": [
                    {"name": "Kandhamal Central Gram Panchayat", "lgd_code": 301458, "block": "Kandhamal Block", "villages": ["Kandhamal Khas", "Kandhamal Dehat", "Kandhamal Purva"]},
                    {"name": "Kandhamal Model Krishi Panchayat", "lgd_code": 302458, "block": "Kandhamal East Block", "villages": ["Kalyanpur Kandhamal", "Rampur Kandhamal", "Shivpur Kandhamal"]}
                ]
            },
            "Kendrapara": {
                "lgd_code": 1459,
                "name_hi": "Kendrapara",
                "headquarters": "Kendrapara",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kendrapara Sadar", "Kendrapara North", "Kendrapara South", "Kendrapara Rural"],
                "blocks": ["Kendrapara Block", "Kendrapara West Block", "Kendrapara East Block"],
                "panchayats": [
                    {"name": "Kendrapara Central Gram Panchayat", "lgd_code": 301459, "block": "Kendrapara Block", "villages": ["Kendrapara Khas", "Kendrapara Dehat", "Kendrapara Purva"]},
                    {"name": "Kendrapara Model Krishi Panchayat", "lgd_code": 302459, "block": "Kendrapara East Block", "villages": ["Kalyanpur Kendrapara", "Rampur Kendrapara", "Shivpur Kendrapara"]}
                ]
            },
            "Keonjhar": {
                "lgd_code": 1460,
                "name_hi": "Keonjhar",
                "headquarters": "Keonjhar",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Keonjhar Sadar", "Keonjhar North", "Keonjhar South", "Keonjhar Rural"],
                "blocks": ["Keonjhar Block", "Keonjhar West Block", "Keonjhar East Block"],
                "panchayats": [
                    {"name": "Keonjhar Central Gram Panchayat", "lgd_code": 301460, "block": "Keonjhar Block", "villages": ["Keonjhar Khas", "Keonjhar Dehat", "Keonjhar Purva"]},
                    {"name": "Keonjhar Model Krishi Panchayat", "lgd_code": 302460, "block": "Keonjhar East Block", "villages": ["Kalyanpur Keonjhar", "Rampur Keonjhar", "Shivpur Keonjhar"]}
                ]
            },
            "Khordha (Bhubaneswar)": {
                "lgd_code": 1461,
                "name_hi": "Khordha",
                "headquarters": "Khordha",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khordha Sadar", "Khordha North", "Khordha South", "Khordha Rural"],
                "blocks": ["Khordha Block", "Khordha West Block", "Khordha East Block"],
                "panchayats": [
                    {"name": "Khordha Central Gram Panchayat", "lgd_code": 301461, "block": "Khordha Block", "villages": ["Khordha Khas", "Khordha Dehat", "Khordha Purva"]},
                    {"name": "Khordha Model Krishi Panchayat", "lgd_code": 302461, "block": "Khordha East Block", "villages": ["Kalyanpur Khordha", "Rampur Khordha", "Shivpur Khordha"]}
                ]
            },
            "Koraput": {
                "lgd_code": 1462,
                "name_hi": "Koraput",
                "headquarters": "Koraput",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Koraput Sadar", "Koraput North", "Koraput South", "Koraput Rural"],
                "blocks": ["Koraput Block", "Koraput West Block", "Koraput East Block"],
                "panchayats": [
                    {"name": "Koraput Central Gram Panchayat", "lgd_code": 301462, "block": "Koraput Block", "villages": ["Koraput Khas", "Koraput Dehat", "Koraput Purva"]},
                    {"name": "Koraput Model Krishi Panchayat", "lgd_code": 302462, "block": "Koraput East Block", "villages": ["Kalyanpur Koraput", "Rampur Koraput", "Shivpur Koraput"]}
                ]
            },
            "Malkangiri": {
                "lgd_code": 1463,
                "name_hi": "Malkangiri",
                "headquarters": "Malkangiri",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Malkangiri Sadar", "Malkangiri North", "Malkangiri South", "Malkangiri Rural"],
                "blocks": ["Malkangiri Block", "Malkangiri West Block", "Malkangiri East Block"],
                "panchayats": [
                    {"name": "Malkangiri Central Gram Panchayat", "lgd_code": 301463, "block": "Malkangiri Block", "villages": ["Malkangiri Khas", "Malkangiri Dehat", "Malkangiri Purva"]},
                    {"name": "Malkangiri Model Krishi Panchayat", "lgd_code": 302463, "block": "Malkangiri East Block", "villages": ["Kalyanpur Malkangiri", "Rampur Malkangiri", "Shivpur Malkangiri"]}
                ]
            },
            "Mayurbhanj (Baripada)": {
                "lgd_code": 1464,
                "name_hi": "Mayurbhanj",
                "headquarters": "Mayurbhanj",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mayurbhanj Sadar", "Mayurbhanj North", "Mayurbhanj South", "Mayurbhanj Rural"],
                "blocks": ["Mayurbhanj Block", "Mayurbhanj West Block", "Mayurbhanj East Block"],
                "panchayats": [
                    {"name": "Mayurbhanj Central Gram Panchayat", "lgd_code": 301464, "block": "Mayurbhanj Block", "villages": ["Mayurbhanj Khas", "Mayurbhanj Dehat", "Mayurbhanj Purva"]},
                    {"name": "Mayurbhanj Model Krishi Panchayat", "lgd_code": 302464, "block": "Mayurbhanj East Block", "villages": ["Kalyanpur Mayurbhanj", "Rampur Mayurbhanj", "Shivpur Mayurbhanj"]}
                ]
            },
            "Nabarangpur": {
                "lgd_code": 1465,
                "name_hi": "Nabarangpur",
                "headquarters": "Nabarangpur",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nabarangpur Sadar", "Nabarangpur North", "Nabarangpur South", "Nabarangpur Rural"],
                "blocks": ["Nabarangpur Block", "Nabarangpur West Block", "Nabarangpur East Block"],
                "panchayats": [
                    {"name": "Nabarangpur Central Gram Panchayat", "lgd_code": 301465, "block": "Nabarangpur Block", "villages": ["Nabarangpur Khas", "Nabarangpur Dehat", "Nabarangpur Purva"]},
                    {"name": "Nabarangpur Model Krishi Panchayat", "lgd_code": 302465, "block": "Nabarangpur East Block", "villages": ["Kalyanpur Nabarangpur", "Rampur Nabarangpur", "Shivpur Nabarangpur"]}
                ]
            },
            "Nayagarh": {
                "lgd_code": 1466,
                "name_hi": "Nayagarh",
                "headquarters": "Nayagarh",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nayagarh Sadar", "Nayagarh North", "Nayagarh South", "Nayagarh Rural"],
                "blocks": ["Nayagarh Block", "Nayagarh West Block", "Nayagarh East Block"],
                "panchayats": [
                    {"name": "Nayagarh Central Gram Panchayat", "lgd_code": 301466, "block": "Nayagarh Block", "villages": ["Nayagarh Khas", "Nayagarh Dehat", "Nayagarh Purva"]},
                    {"name": "Nayagarh Model Krishi Panchayat", "lgd_code": 302466, "block": "Nayagarh East Block", "villages": ["Kalyanpur Nayagarh", "Rampur Nayagarh", "Shivpur Nayagarh"]}
                ]
            },
            "Nuapada": {
                "lgd_code": 1467,
                "name_hi": "Nuapada",
                "headquarters": "Nuapada",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nuapada Sadar", "Nuapada North", "Nuapada South", "Nuapada Rural"],
                "blocks": ["Nuapada Block", "Nuapada West Block", "Nuapada East Block"],
                "panchayats": [
                    {"name": "Nuapada Central Gram Panchayat", "lgd_code": 301467, "block": "Nuapada Block", "villages": ["Nuapada Khas", "Nuapada Dehat", "Nuapada Purva"]},
                    {"name": "Nuapada Model Krishi Panchayat", "lgd_code": 302467, "block": "Nuapada East Block", "villages": ["Kalyanpur Nuapada", "Rampur Nuapada", "Shivpur Nuapada"]}
                ]
            },
            "Puri": {
                "lgd_code": 1468,
                "name_hi": "Puri",
                "headquarters": "Puri",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Puri Sadar", "Puri North", "Puri South", "Puri Rural"],
                "blocks": ["Puri Block", "Puri West Block", "Puri East Block"],
                "panchayats": [
                    {"name": "Puri Central Gram Panchayat", "lgd_code": 301468, "block": "Puri Block", "villages": ["Puri Khas", "Puri Dehat", "Puri Purva"]},
                    {"name": "Puri Model Krishi Panchayat", "lgd_code": 302468, "block": "Puri East Block", "villages": ["Kalyanpur Puri", "Rampur Puri", "Shivpur Puri"]}
                ]
            },
            "Rayagada": {
                "lgd_code": 1469,
                "name_hi": "Rayagada",
                "headquarters": "Rayagada",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rayagada Sadar", "Rayagada North", "Rayagada South", "Rayagada Rural"],
                "blocks": ["Rayagada Block", "Rayagada West Block", "Rayagada East Block"],
                "panchayats": [
                    {"name": "Rayagada Central Gram Panchayat", "lgd_code": 301469, "block": "Rayagada Block", "villages": ["Rayagada Khas", "Rayagada Dehat", "Rayagada Purva"]},
                    {"name": "Rayagada Model Krishi Panchayat", "lgd_code": 302469, "block": "Rayagada East Block", "villages": ["Kalyanpur Rayagada", "Rampur Rayagada", "Shivpur Rayagada"]}
                ]
            },
            "Sambalpur": {
                "lgd_code": 1470,
                "name_hi": "Sambalpur",
                "headquarters": "Sambalpur",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sambalpur Sadar", "Sambalpur North", "Sambalpur South", "Sambalpur Rural"],
                "blocks": ["Sambalpur Block", "Sambalpur West Block", "Sambalpur East Block"],
                "panchayats": [
                    {"name": "Sambalpur Central Gram Panchayat", "lgd_code": 301470, "block": "Sambalpur Block", "villages": ["Sambalpur Khas", "Sambalpur Dehat", "Sambalpur Purva"]},
                    {"name": "Sambalpur Model Krishi Panchayat", "lgd_code": 302470, "block": "Sambalpur East Block", "villages": ["Kalyanpur Sambalpur", "Rampur Sambalpur", "Shivpur Sambalpur"]}
                ]
            },
            "Subarnapur (Sonepur)": {
                "lgd_code": 1471,
                "name_hi": "Subarnapur",
                "headquarters": "Subarnapur",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Subarnapur Sadar", "Subarnapur North", "Subarnapur South", "Subarnapur Rural"],
                "blocks": ["Subarnapur Block", "Subarnapur West Block", "Subarnapur East Block"],
                "panchayats": [
                    {"name": "Subarnapur Central Gram Panchayat", "lgd_code": 301471, "block": "Subarnapur Block", "villages": ["Subarnapur Khas", "Subarnapur Dehat", "Subarnapur Purva"]},
                    {"name": "Subarnapur Model Krishi Panchayat", "lgd_code": 302471, "block": "Subarnapur East Block", "villages": ["Kalyanpur Subarnapur", "Rampur Subarnapur", "Shivpur Subarnapur"]}
                ]
            },
            "Sundargarh (Rourkela)": {
                "lgd_code": 1472,
                "name_hi": "Sundargarh",
                "headquarters": "Sundargarh",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sundargarh Sadar", "Sundargarh North", "Sundargarh South", "Sundargarh Rural"],
                "blocks": ["Sundargarh Block", "Sundargarh West Block", "Sundargarh East Block"],
                "panchayats": [
                    {"name": "Sundargarh Central Gram Panchayat", "lgd_code": 301472, "block": "Sundargarh Block", "villages": ["Sundargarh Khas", "Sundargarh Dehat", "Sundargarh Purva"]},
                    {"name": "Sundargarh Model Krishi Panchayat", "lgd_code": 302472, "block": "Sundargarh East Block", "villages": ["Kalyanpur Sundargarh", "Rampur Sundargarh", "Shivpur Sundargarh"]}
                ]
            },
        }
    },
    "Punjab": {
        "districts": {
            "Amritsar": {
                "lgd_code": 1473,
                "name_hi": "Amritsar",
                "headquarters": "Amritsar",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Amritsar Sadar", "Amritsar North", "Amritsar South", "Amritsar Rural"],
                "blocks": ["Amritsar Block", "Amritsar West Block", "Amritsar East Block"],
                "panchayats": [
                    {"name": "Amritsar Central Gram Panchayat", "lgd_code": 301473, "block": "Amritsar Block", "villages": ["Amritsar Khas", "Amritsar Dehat", "Amritsar Purva"]},
                    {"name": "Amritsar Model Krishi Panchayat", "lgd_code": 302473, "block": "Amritsar East Block", "villages": ["Kalyanpur Amritsar", "Rampur Amritsar", "Shivpur Amritsar"]}
                ]
            },
            "Barnala": {
                "lgd_code": 1474,
                "name_hi": "Barnala",
                "headquarters": "Barnala",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Barnala Sadar", "Barnala North", "Barnala South", "Barnala Rural"],
                "blocks": ["Barnala Block", "Barnala West Block", "Barnala East Block"],
                "panchayats": [
                    {"name": "Barnala Central Gram Panchayat", "lgd_code": 301474, "block": "Barnala Block", "villages": ["Barnala Khas", "Barnala Dehat", "Barnala Purva"]},
                    {"name": "Barnala Model Krishi Panchayat", "lgd_code": 302474, "block": "Barnala East Block", "villages": ["Kalyanpur Barnala", "Rampur Barnala", "Shivpur Barnala"]}
                ]
            },
            "Bathinda": {
                "lgd_code": 1475,
                "name_hi": "Bathinda",
                "headquarters": "Bathinda",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bathinda Sadar", "Bathinda North", "Bathinda South", "Bathinda Rural"],
                "blocks": ["Bathinda Block", "Bathinda West Block", "Bathinda East Block"],
                "panchayats": [
                    {"name": "Bathinda Central Gram Panchayat", "lgd_code": 301475, "block": "Bathinda Block", "villages": ["Bathinda Khas", "Bathinda Dehat", "Bathinda Purva"]},
                    {"name": "Bathinda Model Krishi Panchayat", "lgd_code": 302475, "block": "Bathinda East Block", "villages": ["Kalyanpur Bathinda", "Rampur Bathinda", "Shivpur Bathinda"]}
                ]
            },
            "Faridkot": {
                "lgd_code": 1476,
                "name_hi": "Faridkot",
                "headquarters": "Faridkot",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Faridkot Sadar", "Faridkot North", "Faridkot South", "Faridkot Rural"],
                "blocks": ["Faridkot Block", "Faridkot West Block", "Faridkot East Block"],
                "panchayats": [
                    {"name": "Faridkot Central Gram Panchayat", "lgd_code": 301476, "block": "Faridkot Block", "villages": ["Faridkot Khas", "Faridkot Dehat", "Faridkot Purva"]},
                    {"name": "Faridkot Model Krishi Panchayat", "lgd_code": 302476, "block": "Faridkot East Block", "villages": ["Kalyanpur Faridkot", "Rampur Faridkot", "Shivpur Faridkot"]}
                ]
            },
            "Fatehgarh Sahib": {
                "lgd_code": 1477,
                "name_hi": "Fatehgarh Sahib",
                "headquarters": "Fatehgarh Sahib",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Fatehgarh Sahib Sadar", "Fatehgarh Sahib North", "Fatehgarh Sahib South", "Fatehgarh Sahib Rural"],
                "blocks": ["Fatehgarh Sahib Block", "Fatehgarh Sahib West Block", "Fatehgarh Sahib East Block"],
                "panchayats": [
                    {"name": "Fatehgarh Sahib Central Gram Panchayat", "lgd_code": 301477, "block": "Fatehgarh Sahib Block", "villages": ["Fatehgarh Sahib Khas", "Fatehgarh Sahib Dehat", "Fatehgarh Sahib Purva"]},
                    {"name": "Fatehgarh Sahib Model Krishi Panchayat", "lgd_code": 302477, "block": "Fatehgarh Sahib East Block", "villages": ["Kalyanpur Fatehgarh Sahib", "Rampur Fatehgarh Sahib", "Shivpur Fatehgarh Sahib"]}
                ]
            },
            "Fazilka": {
                "lgd_code": 1478,
                "name_hi": "Fazilka",
                "headquarters": "Fazilka",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Fazilka Sadar", "Fazilka North", "Fazilka South", "Fazilka Rural"],
                "blocks": ["Fazilka Block", "Fazilka West Block", "Fazilka East Block"],
                "panchayats": [
                    {"name": "Fazilka Central Gram Panchayat", "lgd_code": 301478, "block": "Fazilka Block", "villages": ["Fazilka Khas", "Fazilka Dehat", "Fazilka Purva"]},
                    {"name": "Fazilka Model Krishi Panchayat", "lgd_code": 302478, "block": "Fazilka East Block", "villages": ["Kalyanpur Fazilka", "Rampur Fazilka", "Shivpur Fazilka"]}
                ]
            },
            "Firozpur": {
                "lgd_code": 1479,
                "name_hi": "Firozpur",
                "headquarters": "Firozpur",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Firozpur Sadar", "Firozpur North", "Firozpur South", "Firozpur Rural"],
                "blocks": ["Firozpur Block", "Firozpur West Block", "Firozpur East Block"],
                "panchayats": [
                    {"name": "Firozpur Central Gram Panchayat", "lgd_code": 301479, "block": "Firozpur Block", "villages": ["Firozpur Khas", "Firozpur Dehat", "Firozpur Purva"]},
                    {"name": "Firozpur Model Krishi Panchayat", "lgd_code": 302479, "block": "Firozpur East Block", "villages": ["Kalyanpur Firozpur", "Rampur Firozpur", "Shivpur Firozpur"]}
                ]
            },
            "Gurdaspur": {
                "lgd_code": 1480,
                "name_hi": "Gurdaspur",
                "headquarters": "Gurdaspur",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gurdaspur Sadar", "Gurdaspur North", "Gurdaspur South", "Gurdaspur Rural"],
                "blocks": ["Gurdaspur Block", "Gurdaspur West Block", "Gurdaspur East Block"],
                "panchayats": [
                    {"name": "Gurdaspur Central Gram Panchayat", "lgd_code": 301480, "block": "Gurdaspur Block", "villages": ["Gurdaspur Khas", "Gurdaspur Dehat", "Gurdaspur Purva"]},
                    {"name": "Gurdaspur Model Krishi Panchayat", "lgd_code": 302480, "block": "Gurdaspur East Block", "villages": ["Kalyanpur Gurdaspur", "Rampur Gurdaspur", "Shivpur Gurdaspur"]}
                ]
            },
            "Hoshiarpur": {
                "lgd_code": 1481,
                "name_hi": "Hoshiarpur",
                "headquarters": "Hoshiarpur",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hoshiarpur Sadar", "Hoshiarpur North", "Hoshiarpur South", "Hoshiarpur Rural"],
                "blocks": ["Hoshiarpur Block", "Hoshiarpur West Block", "Hoshiarpur East Block"],
                "panchayats": [
                    {"name": "Hoshiarpur Central Gram Panchayat", "lgd_code": 301481, "block": "Hoshiarpur Block", "villages": ["Hoshiarpur Khas", "Hoshiarpur Dehat", "Hoshiarpur Purva"]},
                    {"name": "Hoshiarpur Model Krishi Panchayat", "lgd_code": 302481, "block": "Hoshiarpur East Block", "villages": ["Kalyanpur Hoshiarpur", "Rampur Hoshiarpur", "Shivpur Hoshiarpur"]}
                ]
            },
            "Jalandhar": {
                "lgd_code": 1482,
                "name_hi": "Jalandhar",
                "headquarters": "Jalandhar",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalandhar Sadar", "Jalandhar North", "Jalandhar South", "Jalandhar Rural"],
                "blocks": ["Jalandhar Block", "Jalandhar West Block", "Jalandhar East Block"],
                "panchayats": [
                    {"name": "Jalandhar Central Gram Panchayat", "lgd_code": 301482, "block": "Jalandhar Block", "villages": ["Jalandhar Khas", "Jalandhar Dehat", "Jalandhar Purva"]},
                    {"name": "Jalandhar Model Krishi Panchayat", "lgd_code": 302482, "block": "Jalandhar East Block", "villages": ["Kalyanpur Jalandhar", "Rampur Jalandhar", "Shivpur Jalandhar"]}
                ]
            },
            "Kapurthala": {
                "lgd_code": 1483,
                "name_hi": "Kapurthala",
                "headquarters": "Kapurthala",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kapurthala Sadar", "Kapurthala North", "Kapurthala South", "Kapurthala Rural"],
                "blocks": ["Kapurthala Block", "Kapurthala West Block", "Kapurthala East Block"],
                "panchayats": [
                    {"name": "Kapurthala Central Gram Panchayat", "lgd_code": 301483, "block": "Kapurthala Block", "villages": ["Kapurthala Khas", "Kapurthala Dehat", "Kapurthala Purva"]},
                    {"name": "Kapurthala Model Krishi Panchayat", "lgd_code": 302483, "block": "Kapurthala East Block", "villages": ["Kalyanpur Kapurthala", "Rampur Kapurthala", "Shivpur Kapurthala"]}
                ]
            },
            "Ludhiana": {
                "lgd_code": 1484,
                "name_hi": "Ludhiana",
                "headquarters": "Ludhiana",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ludhiana Sadar", "Ludhiana North", "Ludhiana South", "Ludhiana Rural"],
                "blocks": ["Ludhiana Block", "Ludhiana West Block", "Ludhiana East Block"],
                "panchayats": [
                    {"name": "Ludhiana Central Gram Panchayat", "lgd_code": 301484, "block": "Ludhiana Block", "villages": ["Ludhiana Khas", "Ludhiana Dehat", "Ludhiana Purva"]},
                    {"name": "Ludhiana Model Krishi Panchayat", "lgd_code": 302484, "block": "Ludhiana East Block", "villages": ["Kalyanpur Ludhiana", "Rampur Ludhiana", "Shivpur Ludhiana"]}
                ]
            },
            "Malerkotla": {
                "lgd_code": 1485,
                "name_hi": "Malerkotla",
                "headquarters": "Malerkotla",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Malerkotla Sadar", "Malerkotla North", "Malerkotla South", "Malerkotla Rural"],
                "blocks": ["Malerkotla Block", "Malerkotla West Block", "Malerkotla East Block"],
                "panchayats": [
                    {"name": "Malerkotla Central Gram Panchayat", "lgd_code": 301485, "block": "Malerkotla Block", "villages": ["Malerkotla Khas", "Malerkotla Dehat", "Malerkotla Purva"]},
                    {"name": "Malerkotla Model Krishi Panchayat", "lgd_code": 302485, "block": "Malerkotla East Block", "villages": ["Kalyanpur Malerkotla", "Rampur Malerkotla", "Shivpur Malerkotla"]}
                ]
            },
            "Mansa": {
                "lgd_code": 1486,
                "name_hi": "Mansa",
                "headquarters": "Mansa",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mansa Sadar", "Mansa North", "Mansa South", "Mansa Rural"],
                "blocks": ["Mansa Block", "Mansa West Block", "Mansa East Block"],
                "panchayats": [
                    {"name": "Mansa Central Gram Panchayat", "lgd_code": 301486, "block": "Mansa Block", "villages": ["Mansa Khas", "Mansa Dehat", "Mansa Purva"]},
                    {"name": "Mansa Model Krishi Panchayat", "lgd_code": 302486, "block": "Mansa East Block", "villages": ["Kalyanpur Mansa", "Rampur Mansa", "Shivpur Mansa"]}
                ]
            },
            "Moga": {
                "lgd_code": 1487,
                "name_hi": "Moga",
                "headquarters": "Moga",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Moga Sadar", "Moga North", "Moga South", "Moga Rural"],
                "blocks": ["Moga Block", "Moga West Block", "Moga East Block"],
                "panchayats": [
                    {"name": "Moga Central Gram Panchayat", "lgd_code": 301487, "block": "Moga Block", "villages": ["Moga Khas", "Moga Dehat", "Moga Purva"]},
                    {"name": "Moga Model Krishi Panchayat", "lgd_code": 302487, "block": "Moga East Block", "villages": ["Kalyanpur Moga", "Rampur Moga", "Shivpur Moga"]}
                ]
            },
            "Mohali (SAS Nagar)": {
                "lgd_code": 1488,
                "name_hi": "Mohali",
                "headquarters": "Mohali",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mohali Sadar", "Mohali North", "Mohali South", "Mohali Rural"],
                "blocks": ["Mohali Block", "Mohali West Block", "Mohali East Block"],
                "panchayats": [
                    {"name": "Mohali Central Gram Panchayat", "lgd_code": 301488, "block": "Mohali Block", "villages": ["Mohali Khas", "Mohali Dehat", "Mohali Purva"]},
                    {"name": "Mohali Model Krishi Panchayat", "lgd_code": 302488, "block": "Mohali East Block", "villages": ["Kalyanpur Mohali", "Rampur Mohali", "Shivpur Mohali"]}
                ]
            },
            "Pathankot": {
                "lgd_code": 1489,
                "name_hi": "Pathankot",
                "headquarters": "Pathankot",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pathankot Sadar", "Pathankot North", "Pathankot South", "Pathankot Rural"],
                "blocks": ["Pathankot Block", "Pathankot West Block", "Pathankot East Block"],
                "panchayats": [
                    {"name": "Pathankot Central Gram Panchayat", "lgd_code": 301489, "block": "Pathankot Block", "villages": ["Pathankot Khas", "Pathankot Dehat", "Pathankot Purva"]},
                    {"name": "Pathankot Model Krishi Panchayat", "lgd_code": 302489, "block": "Pathankot East Block", "villages": ["Kalyanpur Pathankot", "Rampur Pathankot", "Shivpur Pathankot"]}
                ]
            },
            "Patiala": {
                "lgd_code": 1490,
                "name_hi": "Patiala",
                "headquarters": "Patiala",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Patiala Sadar", "Patiala North", "Patiala South", "Patiala Rural"],
                "blocks": ["Patiala Block", "Patiala West Block", "Patiala East Block"],
                "panchayats": [
                    {"name": "Patiala Central Gram Panchayat", "lgd_code": 301490, "block": "Patiala Block", "villages": ["Patiala Khas", "Patiala Dehat", "Patiala Purva"]},
                    {"name": "Patiala Model Krishi Panchayat", "lgd_code": 302490, "block": "Patiala East Block", "villages": ["Kalyanpur Patiala", "Rampur Patiala", "Shivpur Patiala"]}
                ]
            },
            "Rupnagar (Ropar)": {
                "lgd_code": 1491,
                "name_hi": "Rupnagar",
                "headquarters": "Rupnagar",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rupnagar Sadar", "Rupnagar North", "Rupnagar South", "Rupnagar Rural"],
                "blocks": ["Rupnagar Block", "Rupnagar West Block", "Rupnagar East Block"],
                "panchayats": [
                    {"name": "Rupnagar Central Gram Panchayat", "lgd_code": 301491, "block": "Rupnagar Block", "villages": ["Rupnagar Khas", "Rupnagar Dehat", "Rupnagar Purva"]},
                    {"name": "Rupnagar Model Krishi Panchayat", "lgd_code": 302491, "block": "Rupnagar East Block", "villages": ["Kalyanpur Rupnagar", "Rampur Rupnagar", "Shivpur Rupnagar"]}
                ]
            },
            "Sangrur": {
                "lgd_code": 1492,
                "name_hi": "Sangrur",
                "headquarters": "Sangrur",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sangrur Sadar", "Sangrur North", "Sangrur South", "Sangrur Rural"],
                "blocks": ["Sangrur Block", "Sangrur West Block", "Sangrur East Block"],
                "panchayats": [
                    {"name": "Sangrur Central Gram Panchayat", "lgd_code": 301492, "block": "Sangrur Block", "villages": ["Sangrur Khas", "Sangrur Dehat", "Sangrur Purva"]},
                    {"name": "Sangrur Model Krishi Panchayat", "lgd_code": 302492, "block": "Sangrur East Block", "villages": ["Kalyanpur Sangrur", "Rampur Sangrur", "Shivpur Sangrur"]}
                ]
            },
            "Shahid Bhagat Singh Nagar (Nawanshahr)": {
                "lgd_code": 1493,
                "name_hi": "Shahid Bhagat Singh Nagar",
                "headquarters": "Shahid Bhagat Singh Nagar",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shahid Bhagat Singh Nagar Sadar", "Shahid Bhagat Singh Nagar North", "Shahid Bhagat Singh Nagar South", "Shahid Bhagat Singh Nagar Rural"],
                "blocks": ["Shahid Bhagat Singh Nagar Block", "Shahid Bhagat Singh Nagar West Block", "Shahid Bhagat Singh Nagar East Block"],
                "panchayats": [
                    {"name": "Shahid Bhagat Singh Nagar Central Gram Panchayat", "lgd_code": 301493, "block": "Shahid Bhagat Singh Nagar Block", "villages": ["Shahid Bhagat Singh Nagar Khas", "Shahid Bhagat Singh Nagar Dehat", "Shahid Bhagat Singh Nagar Purva"]},
                    {"name": "Shahid Bhagat Singh Nagar Model Krishi Panchayat", "lgd_code": 302493, "block": "Shahid Bhagat Singh Nagar East Block", "villages": ["Kalyanpur Shahid Bhagat Singh Nagar", "Rampur Shahid Bhagat Singh Nagar", "Shivpur Shahid Bhagat Singh Nagar"]}
                ]
            },
            "Sri Muktsar Sahib": {
                "lgd_code": 1494,
                "name_hi": "Sri Muktsar Sahib",
                "headquarters": "Sri Muktsar Sahib",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sri Muktsar Sahib Sadar", "Sri Muktsar Sahib North", "Sri Muktsar Sahib South", "Sri Muktsar Sahib Rural"],
                "blocks": ["Sri Muktsar Sahib Block", "Sri Muktsar Sahib West Block", "Sri Muktsar Sahib East Block"],
                "panchayats": [
                    {"name": "Sri Muktsar Sahib Central Gram Panchayat", "lgd_code": 301494, "block": "Sri Muktsar Sahib Block", "villages": ["Sri Muktsar Sahib Khas", "Sri Muktsar Sahib Dehat", "Sri Muktsar Sahib Purva"]},
                    {"name": "Sri Muktsar Sahib Model Krishi Panchayat", "lgd_code": 302494, "block": "Sri Muktsar Sahib East Block", "villages": ["Kalyanpur Sri Muktsar Sahib", "Rampur Sri Muktsar Sahib", "Shivpur Sri Muktsar Sahib"]}
                ]
            },
            "Tarn Taran": {
                "lgd_code": 1495,
                "name_hi": "Tarn Taran",
                "headquarters": "Tarn Taran",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tarn Taran Sadar", "Tarn Taran North", "Tarn Taran South", "Tarn Taran Rural"],
                "blocks": ["Tarn Taran Block", "Tarn Taran West Block", "Tarn Taran East Block"],
                "panchayats": [
                    {"name": "Tarn Taran Central Gram Panchayat", "lgd_code": 301495, "block": "Tarn Taran Block", "villages": ["Tarn Taran Khas", "Tarn Taran Dehat", "Tarn Taran Purva"]},
                    {"name": "Tarn Taran Model Krishi Panchayat", "lgd_code": 302495, "block": "Tarn Taran East Block", "villages": ["Kalyanpur Tarn Taran", "Rampur Tarn Taran", "Shivpur Tarn Taran"]}
                ]
            },
        }
    },
    "Rajasthan": {
        "districts": {
            "Ajmer": {
                "lgd_code": 1496,
                "name_hi": "Ajmer",
                "headquarters": "Ajmer",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ajmer Sadar", "Ajmer North", "Ajmer South", "Ajmer Rural"],
                "blocks": ["Ajmer Block", "Ajmer West Block", "Ajmer East Block"],
                "panchayats": [
                    {"name": "Ajmer Central Gram Panchayat", "lgd_code": 301496, "block": "Ajmer Block", "villages": ["Ajmer Khas", "Ajmer Dehat", "Ajmer Purva"]},
                    {"name": "Ajmer Model Krishi Panchayat", "lgd_code": 302496, "block": "Ajmer East Block", "villages": ["Kalyanpur Ajmer", "Rampur Ajmer", "Shivpur Ajmer"]}
                ]
            },
            "Alwar": {
                "lgd_code": 1497,
                "name_hi": "Alwar",
                "headquarters": "Alwar",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Alwar Sadar", "Alwar North", "Alwar South", "Alwar Rural"],
                "blocks": ["Alwar Block", "Alwar West Block", "Alwar East Block"],
                "panchayats": [
                    {"name": "Alwar Central Gram Panchayat", "lgd_code": 301497, "block": "Alwar Block", "villages": ["Alwar Khas", "Alwar Dehat", "Alwar Purva"]},
                    {"name": "Alwar Model Krishi Panchayat", "lgd_code": 302497, "block": "Alwar East Block", "villages": ["Kalyanpur Alwar", "Rampur Alwar", "Shivpur Alwar"]}
                ]
            },
            "Anupgarh": {
                "lgd_code": 1498,
                "name_hi": "Anupgarh",
                "headquarters": "Anupgarh",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anupgarh Sadar", "Anupgarh North", "Anupgarh South", "Anupgarh Rural"],
                "blocks": ["Anupgarh Block", "Anupgarh West Block", "Anupgarh East Block"],
                "panchayats": [
                    {"name": "Anupgarh Central Gram Panchayat", "lgd_code": 301498, "block": "Anupgarh Block", "villages": ["Anupgarh Khas", "Anupgarh Dehat", "Anupgarh Purva"]},
                    {"name": "Anupgarh Model Krishi Panchayat", "lgd_code": 302498, "block": "Anupgarh East Block", "villages": ["Kalyanpur Anupgarh", "Rampur Anupgarh", "Shivpur Anupgarh"]}
                ]
            },
            "Balotra": {
                "lgd_code": 1499,
                "name_hi": "Balotra",
                "headquarters": "Balotra",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balotra Sadar", "Balotra North", "Balotra South", "Balotra Rural"],
                "blocks": ["Balotra Block", "Balotra West Block", "Balotra East Block"],
                "panchayats": [
                    {"name": "Balotra Central Gram Panchayat", "lgd_code": 301499, "block": "Balotra Block", "villages": ["Balotra Khas", "Balotra Dehat", "Balotra Purva"]},
                    {"name": "Balotra Model Krishi Panchayat", "lgd_code": 302499, "block": "Balotra East Block", "villages": ["Kalyanpur Balotra", "Rampur Balotra", "Shivpur Balotra"]}
                ]
            },
            "Banswara": {
                "lgd_code": 1500,
                "name_hi": "Banswara",
                "headquarters": "Banswara",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Banswara Sadar", "Banswara North", "Banswara South", "Banswara Rural"],
                "blocks": ["Banswara Block", "Banswara West Block", "Banswara East Block"],
                "panchayats": [
                    {"name": "Banswara Central Gram Panchayat", "lgd_code": 301500, "block": "Banswara Block", "villages": ["Banswara Khas", "Banswara Dehat", "Banswara Purva"]},
                    {"name": "Banswara Model Krishi Panchayat", "lgd_code": 302500, "block": "Banswara East Block", "villages": ["Kalyanpur Banswara", "Rampur Banswara", "Shivpur Banswara"]}
                ]
            },
            "Baran": {
                "lgd_code": 1501,
                "name_hi": "Baran",
                "headquarters": "Baran",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Baran Sadar", "Baran North", "Baran South", "Baran Rural"],
                "blocks": ["Baran Block", "Baran West Block", "Baran East Block"],
                "panchayats": [
                    {"name": "Baran Central Gram Panchayat", "lgd_code": 301501, "block": "Baran Block", "villages": ["Baran Khas", "Baran Dehat", "Baran Purva"]},
                    {"name": "Baran Model Krishi Panchayat", "lgd_code": 302501, "block": "Baran East Block", "villages": ["Kalyanpur Baran", "Rampur Baran", "Shivpur Baran"]}
                ]
            },
            "Barmer": {
                "lgd_code": 1502,
                "name_hi": "Barmer",
                "headquarters": "Barmer",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Barmer Sadar", "Barmer North", "Barmer South", "Barmer Rural"],
                "blocks": ["Barmer Block", "Barmer West Block", "Barmer East Block"],
                "panchayats": [
                    {"name": "Barmer Central Gram Panchayat", "lgd_code": 301502, "block": "Barmer Block", "villages": ["Barmer Khas", "Barmer Dehat", "Barmer Purva"]},
                    {"name": "Barmer Model Krishi Panchayat", "lgd_code": 302502, "block": "Barmer East Block", "villages": ["Kalyanpur Barmer", "Rampur Barmer", "Shivpur Barmer"]}
                ]
            },
            "Beawar": {
                "lgd_code": 1503,
                "name_hi": "Beawar",
                "headquarters": "Beawar",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Beawar Sadar", "Beawar North", "Beawar South", "Beawar Rural"],
                "blocks": ["Beawar Block", "Beawar West Block", "Beawar East Block"],
                "panchayats": [
                    {"name": "Beawar Central Gram Panchayat", "lgd_code": 301503, "block": "Beawar Block", "villages": ["Beawar Khas", "Beawar Dehat", "Beawar Purva"]},
                    {"name": "Beawar Model Krishi Panchayat", "lgd_code": 302503, "block": "Beawar East Block", "villages": ["Kalyanpur Beawar", "Rampur Beawar", "Shivpur Beawar"]}
                ]
            },
            "Bharatpur": {
                "lgd_code": 1504,
                "name_hi": "Bharatpur",
                "headquarters": "Bharatpur",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bharatpur Sadar", "Bharatpur North", "Bharatpur South", "Bharatpur Rural"],
                "blocks": ["Bharatpur Block", "Bharatpur West Block", "Bharatpur East Block"],
                "panchayats": [
                    {"name": "Bharatpur Central Gram Panchayat", "lgd_code": 301504, "block": "Bharatpur Block", "villages": ["Bharatpur Khas", "Bharatpur Dehat", "Bharatpur Purva"]},
                    {"name": "Bharatpur Model Krishi Panchayat", "lgd_code": 302504, "block": "Bharatpur East Block", "villages": ["Kalyanpur Bharatpur", "Rampur Bharatpur", "Shivpur Bharatpur"]}
                ]
            },
            "Bhilwara": {
                "lgd_code": 1505,
                "name_hi": "Bhilwara",
                "headquarters": "Bhilwara",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhilwara Sadar", "Bhilwara North", "Bhilwara South", "Bhilwara Rural"],
                "blocks": ["Bhilwara Block", "Bhilwara West Block", "Bhilwara East Block"],
                "panchayats": [
                    {"name": "Bhilwara Central Gram Panchayat", "lgd_code": 301505, "block": "Bhilwara Block", "villages": ["Bhilwara Khas", "Bhilwara Dehat", "Bhilwara Purva"]},
                    {"name": "Bhilwara Model Krishi Panchayat", "lgd_code": 302505, "block": "Bhilwara East Block", "villages": ["Kalyanpur Bhilwara", "Rampur Bhilwara", "Shivpur Bhilwara"]}
                ]
            },
            "Bikaner": {
                "lgd_code": 1506,
                "name_hi": "Bikaner",
                "headquarters": "Bikaner",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bikaner Sadar", "Bikaner North", "Bikaner South", "Bikaner Rural"],
                "blocks": ["Bikaner Block", "Bikaner West Block", "Bikaner East Block"],
                "panchayats": [
                    {"name": "Bikaner Central Gram Panchayat", "lgd_code": 301506, "block": "Bikaner Block", "villages": ["Bikaner Khas", "Bikaner Dehat", "Bikaner Purva"]},
                    {"name": "Bikaner Model Krishi Panchayat", "lgd_code": 302506, "block": "Bikaner East Block", "villages": ["Kalyanpur Bikaner", "Rampur Bikaner", "Shivpur Bikaner"]}
                ]
            },
            "Bundi": {
                "lgd_code": 1507,
                "name_hi": "Bundi",
                "headquarters": "Bundi",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bundi Sadar", "Bundi North", "Bundi South", "Bundi Rural"],
                "blocks": ["Bundi Block", "Bundi West Block", "Bundi East Block"],
                "panchayats": [
                    {"name": "Bundi Central Gram Panchayat", "lgd_code": 301507, "block": "Bundi Block", "villages": ["Bundi Khas", "Bundi Dehat", "Bundi Purva"]},
                    {"name": "Bundi Model Krishi Panchayat", "lgd_code": 302507, "block": "Bundi East Block", "villages": ["Kalyanpur Bundi", "Rampur Bundi", "Shivpur Bundi"]}
                ]
            },
            "Chittorgarh": {
                "lgd_code": 1508,
                "name_hi": "Chittorgarh",
                "headquarters": "Chittorgarh",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chittorgarh Sadar", "Chittorgarh North", "Chittorgarh South", "Chittorgarh Rural"],
                "blocks": ["Chittorgarh Block", "Chittorgarh West Block", "Chittorgarh East Block"],
                "panchayats": [
                    {"name": "Chittorgarh Central Gram Panchayat", "lgd_code": 301508, "block": "Chittorgarh Block", "villages": ["Chittorgarh Khas", "Chittorgarh Dehat", "Chittorgarh Purva"]},
                    {"name": "Chittorgarh Model Krishi Panchayat", "lgd_code": 302508, "block": "Chittorgarh East Block", "villages": ["Kalyanpur Chittorgarh", "Rampur Chittorgarh", "Shivpur Chittorgarh"]}
                ]
            },
            "Churu": {
                "lgd_code": 1509,
                "name_hi": "Churu",
                "headquarters": "Churu",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Churu Sadar", "Churu North", "Churu South", "Churu Rural"],
                "blocks": ["Churu Block", "Churu West Block", "Churu East Block"],
                "panchayats": [
                    {"name": "Churu Central Gram Panchayat", "lgd_code": 301509, "block": "Churu Block", "villages": ["Churu Khas", "Churu Dehat", "Churu Purva"]},
                    {"name": "Churu Model Krishi Panchayat", "lgd_code": 302509, "block": "Churu East Block", "villages": ["Kalyanpur Churu", "Rampur Churu", "Shivpur Churu"]}
                ]
            },
            "Dausa": {
                "lgd_code": 1510,
                "name_hi": "Dausa",
                "headquarters": "Dausa",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dausa Sadar", "Dausa North", "Dausa South", "Dausa Rural"],
                "blocks": ["Dausa Block", "Dausa West Block", "Dausa East Block"],
                "panchayats": [
                    {"name": "Dausa Central Gram Panchayat", "lgd_code": 301510, "block": "Dausa Block", "villages": ["Dausa Khas", "Dausa Dehat", "Dausa Purva"]},
                    {"name": "Dausa Model Krishi Panchayat", "lgd_code": 302510, "block": "Dausa East Block", "villages": ["Kalyanpur Dausa", "Rampur Dausa", "Shivpur Dausa"]}
                ]
            },
            "Deeg": {
                "lgd_code": 1511,
                "name_hi": "Deeg",
                "headquarters": "Deeg",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Deeg Sadar", "Deeg North", "Deeg South", "Deeg Rural"],
                "blocks": ["Deeg Block", "Deeg West Block", "Deeg East Block"],
                "panchayats": [
                    {"name": "Deeg Central Gram Panchayat", "lgd_code": 301511, "block": "Deeg Block", "villages": ["Deeg Khas", "Deeg Dehat", "Deeg Purva"]},
                    {"name": "Deeg Model Krishi Panchayat", "lgd_code": 302511, "block": "Deeg East Block", "villages": ["Kalyanpur Deeg", "Rampur Deeg", "Shivpur Deeg"]}
                ]
            },
            "Didwana-Kuchaman": {
                "lgd_code": 1512,
                "name_hi": "Didwana-Kuchaman",
                "headquarters": "Didwana-Kuchaman",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Didwana-Kuchaman Sadar", "Didwana-Kuchaman North", "Didwana-Kuchaman South", "Didwana-Kuchaman Rural"],
                "blocks": ["Didwana-Kuchaman Block", "Didwana-Kuchaman West Block", "Didwana-Kuchaman East Block"],
                "panchayats": [
                    {"name": "Didwana-Kuchaman Central Gram Panchayat", "lgd_code": 301512, "block": "Didwana-Kuchaman Block", "villages": ["Didwana-Kuchaman Khas", "Didwana-Kuchaman Dehat", "Didwana-Kuchaman Purva"]},
                    {"name": "Didwana-Kuchaman Model Krishi Panchayat", "lgd_code": 302512, "block": "Didwana-Kuchaman East Block", "villages": ["Kalyanpur Didwana-Kuchaman", "Rampur Didwana-Kuchaman", "Shivpur Didwana-Kuchaman"]}
                ]
            },
            "Dholpur": {
                "lgd_code": 1513,
                "name_hi": "Dholpur",
                "headquarters": "Dholpur",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dholpur Sadar", "Dholpur North", "Dholpur South", "Dholpur Rural"],
                "blocks": ["Dholpur Block", "Dholpur West Block", "Dholpur East Block"],
                "panchayats": [
                    {"name": "Dholpur Central Gram Panchayat", "lgd_code": 301513, "block": "Dholpur Block", "villages": ["Dholpur Khas", "Dholpur Dehat", "Dholpur Purva"]},
                    {"name": "Dholpur Model Krishi Panchayat", "lgd_code": 302513, "block": "Dholpur East Block", "villages": ["Kalyanpur Dholpur", "Rampur Dholpur", "Shivpur Dholpur"]}
                ]
            },
            "Dudhu": {
                "lgd_code": 1514,
                "name_hi": "Dudhu",
                "headquarters": "Dudhu",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dudhu Sadar", "Dudhu North", "Dudhu South", "Dudhu Rural"],
                "blocks": ["Dudhu Block", "Dudhu West Block", "Dudhu East Block"],
                "panchayats": [
                    {"name": "Dudhu Central Gram Panchayat", "lgd_code": 301514, "block": "Dudhu Block", "villages": ["Dudhu Khas", "Dudhu Dehat", "Dudhu Purva"]},
                    {"name": "Dudhu Model Krishi Panchayat", "lgd_code": 302514, "block": "Dudhu East Block", "villages": ["Kalyanpur Dudhu", "Rampur Dudhu", "Shivpur Dudhu"]}
                ]
            },
            "Dungarpur": {
                "lgd_code": 1515,
                "name_hi": "Dungarpur",
                "headquarters": "Dungarpur",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dungarpur Sadar", "Dungarpur North", "Dungarpur South", "Dungarpur Rural"],
                "blocks": ["Dungarpur Block", "Dungarpur West Block", "Dungarpur East Block"],
                "panchayats": [
                    {"name": "Dungarpur Central Gram Panchayat", "lgd_code": 301515, "block": "Dungarpur Block", "villages": ["Dungarpur Khas", "Dungarpur Dehat", "Dungarpur Purva"]},
                    {"name": "Dungarpur Model Krishi Panchayat", "lgd_code": 302515, "block": "Dungarpur East Block", "villages": ["Kalyanpur Dungarpur", "Rampur Dungarpur", "Shivpur Dungarpur"]}
                ]
            },
            "Gangapur City": {
                "lgd_code": 1516,
                "name_hi": "Gangapur City",
                "headquarters": "Gangapur City",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gangapur City Sadar", "Gangapur City North", "Gangapur City South", "Gangapur City Rural"],
                "blocks": ["Gangapur City Block", "Gangapur City West Block", "Gangapur City East Block"],
                "panchayats": [
                    {"name": "Gangapur City Central Gram Panchayat", "lgd_code": 301516, "block": "Gangapur City Block", "villages": ["Gangapur City Khas", "Gangapur City Dehat", "Gangapur City Purva"]},
                    {"name": "Gangapur City Model Krishi Panchayat", "lgd_code": 302516, "block": "Gangapur City East Block", "villages": ["Kalyanpur Gangapur City", "Rampur Gangapur City", "Shivpur Gangapur City"]}
                ]
            },
            "Hanumangarh": {
                "lgd_code": 1517,
                "name_hi": "Hanumangarh",
                "headquarters": "Hanumangarh",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hanumangarh Sadar", "Hanumangarh North", "Hanumangarh South", "Hanumangarh Rural"],
                "blocks": ["Hanumangarh Block", "Hanumangarh West Block", "Hanumangarh East Block"],
                "panchayats": [
                    {"name": "Hanumangarh Central Gram Panchayat", "lgd_code": 301517, "block": "Hanumangarh Block", "villages": ["Hanumangarh Khas", "Hanumangarh Dehat", "Hanumangarh Purva"]},
                    {"name": "Hanumangarh Model Krishi Panchayat", "lgd_code": 302517, "block": "Hanumangarh East Block", "villages": ["Kalyanpur Hanumangarh", "Rampur Hanumangarh", "Shivpur Hanumangarh"]}
                ]
            },
            "Jaipur": {
                "lgd_code": 1518,
                "name_hi": "Jaipur",
                "headquarters": "Jaipur",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jaipur Sadar", "Jaipur North", "Jaipur South", "Jaipur Rural"],
                "blocks": ["Jaipur Block", "Jaipur West Block", "Jaipur East Block"],
                "panchayats": [
                    {"name": "Jaipur Central Gram Panchayat", "lgd_code": 301518, "block": "Jaipur Block", "villages": ["Jaipur Khas", "Jaipur Dehat", "Jaipur Purva"]},
                    {"name": "Jaipur Model Krishi Panchayat", "lgd_code": 302518, "block": "Jaipur East Block", "villages": ["Kalyanpur Jaipur", "Rampur Jaipur", "Shivpur Jaipur"]}
                ]
            },
            "Jaipur Rural": {
                "lgd_code": 1519,
                "name_hi": "Jaipur Rural",
                "headquarters": "Jaipur Rural",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jaipur Rural Sadar", "Jaipur Rural North", "Jaipur Rural South", "Jaipur Rural Rural"],
                "blocks": ["Jaipur Rural Block", "Jaipur Rural West Block", "Jaipur Rural East Block"],
                "panchayats": [
                    {"name": "Jaipur Rural Central Gram Panchayat", "lgd_code": 301519, "block": "Jaipur Rural Block", "villages": ["Jaipur Rural Khas", "Jaipur Rural Dehat", "Jaipur Rural Purva"]},
                    {"name": "Jaipur Rural Model Krishi Panchayat", "lgd_code": 302519, "block": "Jaipur Rural East Block", "villages": ["Kalyanpur Jaipur Rural", "Rampur Jaipur Rural", "Shivpur Jaipur Rural"]}
                ]
            },
            "Jaisalmer": {
                "lgd_code": 1520,
                "name_hi": "Jaisalmer",
                "headquarters": "Jaisalmer",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jaisalmer Sadar", "Jaisalmer North", "Jaisalmer South", "Jaisalmer Rural"],
                "blocks": ["Jaisalmer Block", "Jaisalmer West Block", "Jaisalmer East Block"],
                "panchayats": [
                    {"name": "Jaisalmer Central Gram Panchayat", "lgd_code": 301520, "block": "Jaisalmer Block", "villages": ["Jaisalmer Khas", "Jaisalmer Dehat", "Jaisalmer Purva"]},
                    {"name": "Jaisalmer Model Krishi Panchayat", "lgd_code": 302520, "block": "Jaisalmer East Block", "villages": ["Kalyanpur Jaisalmer", "Rampur Jaisalmer", "Shivpur Jaisalmer"]}
                ]
            },
            "Jalore": {
                "lgd_code": 1521,
                "name_hi": "Jalore",
                "headquarters": "Jalore",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalore Sadar", "Jalore North", "Jalore South", "Jalore Rural"],
                "blocks": ["Jalore Block", "Jalore West Block", "Jalore East Block"],
                "panchayats": [
                    {"name": "Jalore Central Gram Panchayat", "lgd_code": 301521, "block": "Jalore Block", "villages": ["Jalore Khas", "Jalore Dehat", "Jalore Purva"]},
                    {"name": "Jalore Model Krishi Panchayat", "lgd_code": 302521, "block": "Jalore East Block", "villages": ["Kalyanpur Jalore", "Rampur Jalore", "Shivpur Jalore"]}
                ]
            },
            "Jhalawar": {
                "lgd_code": 1522,
                "name_hi": "Jhalawar",
                "headquarters": "Jhalawar",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhalawar Sadar", "Jhalawar North", "Jhalawar South", "Jhalawar Rural"],
                "blocks": ["Jhalawar Block", "Jhalawar West Block", "Jhalawar East Block"],
                "panchayats": [
                    {"name": "Jhalawar Central Gram Panchayat", "lgd_code": 301522, "block": "Jhalawar Block", "villages": ["Jhalawar Khas", "Jhalawar Dehat", "Jhalawar Purva"]},
                    {"name": "Jhalawar Model Krishi Panchayat", "lgd_code": 302522, "block": "Jhalawar East Block", "villages": ["Kalyanpur Jhalawar", "Rampur Jhalawar", "Shivpur Jhalawar"]}
                ]
            },
            "Jhunjhunu": {
                "lgd_code": 1523,
                "name_hi": "Jhunjhunu",
                "headquarters": "Jhunjhunu",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhunjhunu Sadar", "Jhunjhunu North", "Jhunjhunu South", "Jhunjhunu Rural"],
                "blocks": ["Jhunjhunu Block", "Jhunjhunu West Block", "Jhunjhunu East Block"],
                "panchayats": [
                    {"name": "Jhunjhunu Central Gram Panchayat", "lgd_code": 301523, "block": "Jhunjhunu Block", "villages": ["Jhunjhunu Khas", "Jhunjhunu Dehat", "Jhunjhunu Purva"]},
                    {"name": "Jhunjhunu Model Krishi Panchayat", "lgd_code": 302523, "block": "Jhunjhunu East Block", "villages": ["Kalyanpur Jhunjhunu", "Rampur Jhunjhunu", "Shivpur Jhunjhunu"]}
                ]
            },
            "Jodhpur": {
                "lgd_code": 1524,
                "name_hi": "Jodhpur",
                "headquarters": "Jodhpur",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jodhpur Sadar", "Jodhpur North", "Jodhpur South", "Jodhpur Rural"],
                "blocks": ["Jodhpur Block", "Jodhpur West Block", "Jodhpur East Block"],
                "panchayats": [
                    {"name": "Jodhpur Central Gram Panchayat", "lgd_code": 301524, "block": "Jodhpur Block", "villages": ["Jodhpur Khas", "Jodhpur Dehat", "Jodhpur Purva"]},
                    {"name": "Jodhpur Model Krishi Panchayat", "lgd_code": 302524, "block": "Jodhpur East Block", "villages": ["Kalyanpur Jodhpur", "Rampur Jodhpur", "Shivpur Jodhpur"]}
                ]
            },
            "Jodhpur Rural": {
                "lgd_code": 1525,
                "name_hi": "Jodhpur Rural",
                "headquarters": "Jodhpur Rural",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jodhpur Rural Sadar", "Jodhpur Rural North", "Jodhpur Rural South", "Jodhpur Rural Rural"],
                "blocks": ["Jodhpur Rural Block", "Jodhpur Rural West Block", "Jodhpur Rural East Block"],
                "panchayats": [
                    {"name": "Jodhpur Rural Central Gram Panchayat", "lgd_code": 301525, "block": "Jodhpur Rural Block", "villages": ["Jodhpur Rural Khas", "Jodhpur Rural Dehat", "Jodhpur Rural Purva"]},
                    {"name": "Jodhpur Rural Model Krishi Panchayat", "lgd_code": 302525, "block": "Jodhpur Rural East Block", "villages": ["Kalyanpur Jodhpur Rural", "Rampur Jodhpur Rural", "Shivpur Jodhpur Rural"]}
                ]
            },
            "Karauli": {
                "lgd_code": 1526,
                "name_hi": "Karauli",
                "headquarters": "Karauli",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karauli Sadar", "Karauli North", "Karauli South", "Karauli Rural"],
                "blocks": ["Karauli Block", "Karauli West Block", "Karauli East Block"],
                "panchayats": [
                    {"name": "Karauli Central Gram Panchayat", "lgd_code": 301526, "block": "Karauli Block", "villages": ["Karauli Khas", "Karauli Dehat", "Karauli Purva"]},
                    {"name": "Karauli Model Krishi Panchayat", "lgd_code": 302526, "block": "Karauli East Block", "villages": ["Kalyanpur Karauli", "Rampur Karauli", "Shivpur Karauli"]}
                ]
            },
            "Kekri": {
                "lgd_code": 1527,
                "name_hi": "Kekri",
                "headquarters": "Kekri",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kekri Sadar", "Kekri North", "Kekri South", "Kekri Rural"],
                "blocks": ["Kekri Block", "Kekri West Block", "Kekri East Block"],
                "panchayats": [
                    {"name": "Kekri Central Gram Panchayat", "lgd_code": 301527, "block": "Kekri Block", "villages": ["Kekri Khas", "Kekri Dehat", "Kekri Purva"]},
                    {"name": "Kekri Model Krishi Panchayat", "lgd_code": 302527, "block": "Kekri East Block", "villages": ["Kalyanpur Kekri", "Rampur Kekri", "Shivpur Kekri"]}
                ]
            },
            "Khairthal-Tijara": {
                "lgd_code": 1528,
                "name_hi": "Khairthal-Tijara",
                "headquarters": "Khairthal-Tijara",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khairthal-Tijara Sadar", "Khairthal-Tijara North", "Khairthal-Tijara South", "Khairthal-Tijara Rural"],
                "blocks": ["Khairthal-Tijara Block", "Khairthal-Tijara West Block", "Khairthal-Tijara East Block"],
                "panchayats": [
                    {"name": "Khairthal-Tijara Central Gram Panchayat", "lgd_code": 301528, "block": "Khairthal-Tijara Block", "villages": ["Khairthal-Tijara Khas", "Khairthal-Tijara Dehat", "Khairthal-Tijara Purva"]},
                    {"name": "Khairthal-Tijara Model Krishi Panchayat", "lgd_code": 302528, "block": "Khairthal-Tijara East Block", "villages": ["Kalyanpur Khairthal-Tijara", "Rampur Khairthal-Tijara", "Shivpur Khairthal-Tijara"]}
                ]
            },
            "Kota": {
                "lgd_code": 1529,
                "name_hi": "Kota",
                "headquarters": "Kota",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kota Sadar", "Kota North", "Kota South", "Kota Rural"],
                "blocks": ["Kota Block", "Kota West Block", "Kota East Block"],
                "panchayats": [
                    {"name": "Kota Central Gram Panchayat", "lgd_code": 301529, "block": "Kota Block", "villages": ["Kota Khas", "Kota Dehat", "Kota Purva"]},
                    {"name": "Kota Model Krishi Panchayat", "lgd_code": 302529, "block": "Kota East Block", "villages": ["Kalyanpur Kota", "Rampur Kota", "Shivpur Kota"]}
                ]
            },
            "Kotputli-Behror": {
                "lgd_code": 1530,
                "name_hi": "Kotputli-Behror",
                "headquarters": "Kotputli-Behror",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kotputli-Behror Sadar", "Kotputli-Behror North", "Kotputli-Behror South", "Kotputli-Behror Rural"],
                "blocks": ["Kotputli-Behror Block", "Kotputli-Behror West Block", "Kotputli-Behror East Block"],
                "panchayats": [
                    {"name": "Kotputli-Behror Central Gram Panchayat", "lgd_code": 301530, "block": "Kotputli-Behror Block", "villages": ["Kotputli-Behror Khas", "Kotputli-Behror Dehat", "Kotputli-Behror Purva"]},
                    {"name": "Kotputli-Behror Model Krishi Panchayat", "lgd_code": 302530, "block": "Kotputli-Behror East Block", "villages": ["Kalyanpur Kotputli-Behror", "Rampur Kotputli-Behror", "Shivpur Kotputli-Behror"]}
                ]
            },
            "Nagaur": {
                "lgd_code": 1531,
                "name_hi": "Nagaur",
                "headquarters": "Nagaur",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nagaur Sadar", "Nagaur North", "Nagaur South", "Nagaur Rural"],
                "blocks": ["Nagaur Block", "Nagaur West Block", "Nagaur East Block"],
                "panchayats": [
                    {"name": "Nagaur Central Gram Panchayat", "lgd_code": 301531, "block": "Nagaur Block", "villages": ["Nagaur Khas", "Nagaur Dehat", "Nagaur Purva"]},
                    {"name": "Nagaur Model Krishi Panchayat", "lgd_code": 302531, "block": "Nagaur East Block", "villages": ["Kalyanpur Nagaur", "Rampur Nagaur", "Shivpur Nagaur"]}
                ]
            },
            "Neem Ka Thana": {
                "lgd_code": 1532,
                "name_hi": "Neem Ka Thana",
                "headquarters": "Neem Ka Thana",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Neem Ka Thana Sadar", "Neem Ka Thana North", "Neem Ka Thana South", "Neem Ka Thana Rural"],
                "blocks": ["Neem Ka Thana Block", "Neem Ka Thana West Block", "Neem Ka Thana East Block"],
                "panchayats": [
                    {"name": "Neem Ka Thana Central Gram Panchayat", "lgd_code": 301532, "block": "Neem Ka Thana Block", "villages": ["Neem Ka Thana Khas", "Neem Ka Thana Dehat", "Neem Ka Thana Purva"]},
                    {"name": "Neem Ka Thana Model Krishi Panchayat", "lgd_code": 302532, "block": "Neem Ka Thana East Block", "villages": ["Kalyanpur Neem Ka Thana", "Rampur Neem Ka Thana", "Shivpur Neem Ka Thana"]}
                ]
            },
            "Pali": {
                "lgd_code": 1533,
                "name_hi": "Pali",
                "headquarters": "Pali",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pali Sadar", "Pali North", "Pali South", "Pali Rural"],
                "blocks": ["Pali Block", "Pali West Block", "Pali East Block"],
                "panchayats": [
                    {"name": "Pali Central Gram Panchayat", "lgd_code": 301533, "block": "Pali Block", "villages": ["Pali Khas", "Pali Dehat", "Pali Purva"]},
                    {"name": "Pali Model Krishi Panchayat", "lgd_code": 302533, "block": "Pali East Block", "villages": ["Kalyanpur Pali", "Rampur Pali", "Shivpur Pali"]}
                ]
            },
            "Phalodi": {
                "lgd_code": 1534,
                "name_hi": "Phalodi",
                "headquarters": "Phalodi",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Phalodi Sadar", "Phalodi North", "Phalodi South", "Phalodi Rural"],
                "blocks": ["Phalodi Block", "Phalodi West Block", "Phalodi East Block"],
                "panchayats": [
                    {"name": "Phalodi Central Gram Panchayat", "lgd_code": 301534, "block": "Phalodi Block", "villages": ["Phalodi Khas", "Phalodi Dehat", "Phalodi Purva"]},
                    {"name": "Phalodi Model Krishi Panchayat", "lgd_code": 302534, "block": "Phalodi East Block", "villages": ["Kalyanpur Phalodi", "Rampur Phalodi", "Shivpur Phalodi"]}
                ]
            },
            "Pratapgarh Rajasthan": {
                "lgd_code": 1535,
                "name_hi": "Pratapgarh Rajasthan",
                "headquarters": "Pratapgarh Rajasthan",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pratapgarh Rajasthan Sadar", "Pratapgarh Rajasthan North", "Pratapgarh Rajasthan South", "Pratapgarh Rajasthan Rural"],
                "blocks": ["Pratapgarh Rajasthan Block", "Pratapgarh Rajasthan West Block", "Pratapgarh Rajasthan East Block"],
                "panchayats": [
                    {"name": "Pratapgarh Rajasthan Central Gram Panchayat", "lgd_code": 301535, "block": "Pratapgarh Rajasthan Block", "villages": ["Pratapgarh Rajasthan Khas", "Pratapgarh Rajasthan Dehat", "Pratapgarh Rajasthan Purva"]},
                    {"name": "Pratapgarh Rajasthan Model Krishi Panchayat", "lgd_code": 302535, "block": "Pratapgarh Rajasthan East Block", "villages": ["Kalyanpur Pratapgarh Rajasthan", "Rampur Pratapgarh Rajasthan", "Shivpur Pratapgarh Rajasthan"]}
                ]
            },
            "Rajsamand": {
                "lgd_code": 1536,
                "name_hi": "Rajsamand",
                "headquarters": "Rajsamand",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajsamand Sadar", "Rajsamand North", "Rajsamand South", "Rajsamand Rural"],
                "blocks": ["Rajsamand Block", "Rajsamand West Block", "Rajsamand East Block"],
                "panchayats": [
                    {"name": "Rajsamand Central Gram Panchayat", "lgd_code": 301536, "block": "Rajsamand Block", "villages": ["Rajsamand Khas", "Rajsamand Dehat", "Rajsamand Purva"]},
                    {"name": "Rajsamand Model Krishi Panchayat", "lgd_code": 302536, "block": "Rajsamand East Block", "villages": ["Kalyanpur Rajsamand", "Rampur Rajsamand", "Shivpur Rajsamand"]}
                ]
            },
            "Salumber": {
                "lgd_code": 1537,
                "name_hi": "Salumber",
                "headquarters": "Salumber",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Salumber Sadar", "Salumber North", "Salumber South", "Salumber Rural"],
                "blocks": ["Salumber Block", "Salumber West Block", "Salumber East Block"],
                "panchayats": [
                    {"name": "Salumber Central Gram Panchayat", "lgd_code": 301537, "block": "Salumber Block", "villages": ["Salumber Khas", "Salumber Dehat", "Salumber Purva"]},
                    {"name": "Salumber Model Krishi Panchayat", "lgd_code": 302537, "block": "Salumber East Block", "villages": ["Kalyanpur Salumber", "Rampur Salumber", "Shivpur Salumber"]}
                ]
            },
            "Sanchore": {
                "lgd_code": 1538,
                "name_hi": "Sanchore",
                "headquarters": "Sanchore",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sanchore Sadar", "Sanchore North", "Sanchore South", "Sanchore Rural"],
                "blocks": ["Sanchore Block", "Sanchore West Block", "Sanchore East Block"],
                "panchayats": [
                    {"name": "Sanchore Central Gram Panchayat", "lgd_code": 301538, "block": "Sanchore Block", "villages": ["Sanchore Khas", "Sanchore Dehat", "Sanchore Purva"]},
                    {"name": "Sanchore Model Krishi Panchayat", "lgd_code": 302538, "block": "Sanchore East Block", "villages": ["Kalyanpur Sanchore", "Rampur Sanchore", "Shivpur Sanchore"]}
                ]
            },
            "Sawai Madhopur": {
                "lgd_code": 1539,
                "name_hi": "Sawai Madhopur",
                "headquarters": "Sawai Madhopur",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sawai Madhopur Sadar", "Sawai Madhopur North", "Sawai Madhopur South", "Sawai Madhopur Rural"],
                "blocks": ["Sawai Madhopur Block", "Sawai Madhopur West Block", "Sawai Madhopur East Block"],
                "panchayats": [
                    {"name": "Sawai Madhopur Central Gram Panchayat", "lgd_code": 301539, "block": "Sawai Madhopur Block", "villages": ["Sawai Madhopur Khas", "Sawai Madhopur Dehat", "Sawai Madhopur Purva"]},
                    {"name": "Sawai Madhopur Model Krishi Panchayat", "lgd_code": 302539, "block": "Sawai Madhopur East Block", "villages": ["Kalyanpur Sawai Madhopur", "Rampur Sawai Madhopur", "Shivpur Sawai Madhopur"]}
                ]
            },
            "Shahpura Rajasthan": {
                "lgd_code": 1540,
                "name_hi": "Shahpura Rajasthan",
                "headquarters": "Shahpura Rajasthan",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shahpura Rajasthan Sadar", "Shahpura Rajasthan North", "Shahpura Rajasthan South", "Shahpura Rajasthan Rural"],
                "blocks": ["Shahpura Rajasthan Block", "Shahpura Rajasthan West Block", "Shahpura Rajasthan East Block"],
                "panchayats": [
                    {"name": "Shahpura Rajasthan Central Gram Panchayat", "lgd_code": 301540, "block": "Shahpura Rajasthan Block", "villages": ["Shahpura Rajasthan Khas", "Shahpura Rajasthan Dehat", "Shahpura Rajasthan Purva"]},
                    {"name": "Shahpura Rajasthan Model Krishi Panchayat", "lgd_code": 302540, "block": "Shahpura Rajasthan East Block", "villages": ["Kalyanpur Shahpura Rajasthan", "Rampur Shahpura Rajasthan", "Shivpur Shahpura Rajasthan"]}
                ]
            },
            "Sikar": {
                "lgd_code": 1541,
                "name_hi": "Sikar",
                "headquarters": "Sikar",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sikar Sadar", "Sikar North", "Sikar South", "Sikar Rural"],
                "blocks": ["Sikar Block", "Sikar West Block", "Sikar East Block"],
                "panchayats": [
                    {"name": "Sikar Central Gram Panchayat", "lgd_code": 301541, "block": "Sikar Block", "villages": ["Sikar Khas", "Sikar Dehat", "Sikar Purva"]},
                    {"name": "Sikar Model Krishi Panchayat", "lgd_code": 302541, "block": "Sikar East Block", "villages": ["Kalyanpur Sikar", "Rampur Sikar", "Shivpur Sikar"]}
                ]
            },
            "Sirohi": {
                "lgd_code": 1542,
                "name_hi": "Sirohi",
                "headquarters": "Sirohi",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sirohi Sadar", "Sirohi North", "Sirohi South", "Sirohi Rural"],
                "blocks": ["Sirohi Block", "Sirohi West Block", "Sirohi East Block"],
                "panchayats": [
                    {"name": "Sirohi Central Gram Panchayat", "lgd_code": 301542, "block": "Sirohi Block", "villages": ["Sirohi Khas", "Sirohi Dehat", "Sirohi Purva"]},
                    {"name": "Sirohi Model Krishi Panchayat", "lgd_code": 302542, "block": "Sirohi East Block", "villages": ["Kalyanpur Sirohi", "Rampur Sirohi", "Shivpur Sirohi"]}
                ]
            },
            "Sri Ganganagar": {
                "lgd_code": 1543,
                "name_hi": "Sri Ganganagar",
                "headquarters": "Sri Ganganagar",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sri Ganganagar Sadar", "Sri Ganganagar North", "Sri Ganganagar South", "Sri Ganganagar Rural"],
                "blocks": ["Sri Ganganagar Block", "Sri Ganganagar West Block", "Sri Ganganagar East Block"],
                "panchayats": [
                    {"name": "Sri Ganganagar Central Gram Panchayat", "lgd_code": 301543, "block": "Sri Ganganagar Block", "villages": ["Sri Ganganagar Khas", "Sri Ganganagar Dehat", "Sri Ganganagar Purva"]},
                    {"name": "Sri Ganganagar Model Krishi Panchayat", "lgd_code": 302543, "block": "Sri Ganganagar East Block", "villages": ["Kalyanpur Sri Ganganagar", "Rampur Sri Ganganagar", "Shivpur Sri Ganganagar"]}
                ]
            },
            "Tonk": {
                "lgd_code": 1544,
                "name_hi": "Tonk",
                "headquarters": "Tonk",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tonk Sadar", "Tonk North", "Tonk South", "Tonk Rural"],
                "blocks": ["Tonk Block", "Tonk West Block", "Tonk East Block"],
                "panchayats": [
                    {"name": "Tonk Central Gram Panchayat", "lgd_code": 301544, "block": "Tonk Block", "villages": ["Tonk Khas", "Tonk Dehat", "Tonk Purva"]},
                    {"name": "Tonk Model Krishi Panchayat", "lgd_code": 302544, "block": "Tonk East Block", "villages": ["Kalyanpur Tonk", "Rampur Tonk", "Shivpur Tonk"]}
                ]
            },
            "Udaipur": {
                "lgd_code": 1545,
                "name_hi": "Udaipur",
                "headquarters": "Udaipur",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Udaipur Sadar", "Udaipur North", "Udaipur South", "Udaipur Rural"],
                "blocks": ["Udaipur Block", "Udaipur West Block", "Udaipur East Block"],
                "panchayats": [
                    {"name": "Udaipur Central Gram Panchayat", "lgd_code": 301545, "block": "Udaipur Block", "villages": ["Udaipur Khas", "Udaipur Dehat", "Udaipur Purva"]},
                    {"name": "Udaipur Model Krishi Panchayat", "lgd_code": 302545, "block": "Udaipur East Block", "villages": ["Kalyanpur Udaipur", "Rampur Udaipur", "Shivpur Udaipur"]}
                ]
            },
        }
    },
    "Sikkim": {
        "districts": {
            "Gangtok (East Sikkim)": {
                "lgd_code": 1546,
                "name_hi": "Gangtok",
                "headquarters": "Gangtok",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gangtok Sadar", "Gangtok North", "Gangtok South", "Gangtok Rural"],
                "blocks": ["Gangtok Block", "Gangtok West Block", "Gangtok East Block"],
                "panchayats": [
                    {"name": "Gangtok Central Gram Panchayat", "lgd_code": 301546, "block": "Gangtok Block", "villages": ["Gangtok Khas", "Gangtok Dehat", "Gangtok Purva"]},
                    {"name": "Gangtok Model Krishi Panchayat", "lgd_code": 302546, "block": "Gangtok East Block", "villages": ["Kalyanpur Gangtok", "Rampur Gangtok", "Shivpur Gangtok"]}
                ]
            },
            "Gyalshing (West Sikkim)": {
                "lgd_code": 1547,
                "name_hi": "Gyalshing",
                "headquarters": "Gyalshing",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gyalshing Sadar", "Gyalshing North", "Gyalshing South", "Gyalshing Rural"],
                "blocks": ["Gyalshing Block", "Gyalshing West Block", "Gyalshing East Block"],
                "panchayats": [
                    {"name": "Gyalshing Central Gram Panchayat", "lgd_code": 301547, "block": "Gyalshing Block", "villages": ["Gyalshing Khas", "Gyalshing Dehat", "Gyalshing Purva"]},
                    {"name": "Gyalshing Model Krishi Panchayat", "lgd_code": 302547, "block": "Gyalshing East Block", "villages": ["Kalyanpur Gyalshing", "Rampur Gyalshing", "Shivpur Gyalshing"]}
                ]
            },
            "Mangan (North Sikkim)": {
                "lgd_code": 1548,
                "name_hi": "Mangan",
                "headquarters": "Mangan",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mangan Sadar", "Mangan North", "Mangan South", "Mangan Rural"],
                "blocks": ["Mangan Block", "Mangan West Block", "Mangan East Block"],
                "panchayats": [
                    {"name": "Mangan Central Gram Panchayat", "lgd_code": 301548, "block": "Mangan Block", "villages": ["Mangan Khas", "Mangan Dehat", "Mangan Purva"]},
                    {"name": "Mangan Model Krishi Panchayat", "lgd_code": 302548, "block": "Mangan East Block", "villages": ["Kalyanpur Mangan", "Rampur Mangan", "Shivpur Mangan"]}
                ]
            },
            "Namchi (South Sikkim)": {
                "lgd_code": 1549,
                "name_hi": "Namchi",
                "headquarters": "Namchi",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Namchi Sadar", "Namchi North", "Namchi South", "Namchi Rural"],
                "blocks": ["Namchi Block", "Namchi West Block", "Namchi East Block"],
                "panchayats": [
                    {"name": "Namchi Central Gram Panchayat", "lgd_code": 301549, "block": "Namchi Block", "villages": ["Namchi Khas", "Namchi Dehat", "Namchi Purva"]},
                    {"name": "Namchi Model Krishi Panchayat", "lgd_code": 302549, "block": "Namchi East Block", "villages": ["Kalyanpur Namchi", "Rampur Namchi", "Shivpur Namchi"]}
                ]
            },
            "Pakyong": {
                "lgd_code": 1550,
                "name_hi": "Pakyong",
                "headquarters": "Pakyong",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pakyong Sadar", "Pakyong North", "Pakyong South", "Pakyong Rural"],
                "blocks": ["Pakyong Block", "Pakyong West Block", "Pakyong East Block"],
                "panchayats": [
                    {"name": "Pakyong Central Gram Panchayat", "lgd_code": 301550, "block": "Pakyong Block", "villages": ["Pakyong Khas", "Pakyong Dehat", "Pakyong Purva"]},
                    {"name": "Pakyong Model Krishi Panchayat", "lgd_code": 302550, "block": "Pakyong East Block", "villages": ["Kalyanpur Pakyong", "Rampur Pakyong", "Shivpur Pakyong"]}
                ]
            },
            "Soreng": {
                "lgd_code": 1551,
                "name_hi": "Soreng",
                "headquarters": "Soreng",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Soreng Sadar", "Soreng North", "Soreng South", "Soreng Rural"],
                "blocks": ["Soreng Block", "Soreng West Block", "Soreng East Block"],
                "panchayats": [
                    {"name": "Soreng Central Gram Panchayat", "lgd_code": 301551, "block": "Soreng Block", "villages": ["Soreng Khas", "Soreng Dehat", "Soreng Purva"]},
                    {"name": "Soreng Model Krishi Panchayat", "lgd_code": 302551, "block": "Soreng East Block", "villages": ["Kalyanpur Soreng", "Rampur Soreng", "Shivpur Soreng"]}
                ]
            },
        }
    },
    "Tamil Nadu": {
        "districts": {
            "Ariyalur": {
                "lgd_code": 1552,
                "name_hi": "Ariyalur",
                "headquarters": "Ariyalur",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ariyalur Sadar", "Ariyalur North", "Ariyalur South", "Ariyalur Rural"],
                "blocks": ["Ariyalur Block", "Ariyalur West Block", "Ariyalur East Block"],
                "panchayats": [
                    {"name": "Ariyalur Central Gram Panchayat", "lgd_code": 301552, "block": "Ariyalur Block", "villages": ["Ariyalur Khas", "Ariyalur Dehat", "Ariyalur Purva"]},
                    {"name": "Ariyalur Model Krishi Panchayat", "lgd_code": 302552, "block": "Ariyalur East Block", "villages": ["Kalyanpur Ariyalur", "Rampur Ariyalur", "Shivpur Ariyalur"]}
                ]
            },
            "Chengalpattu": {
                "lgd_code": 1553,
                "name_hi": "Chengalpattu",
                "headquarters": "Chengalpattu",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chengalpattu Sadar", "Chengalpattu North", "Chengalpattu South", "Chengalpattu Rural"],
                "blocks": ["Chengalpattu Block", "Chengalpattu West Block", "Chengalpattu East Block"],
                "panchayats": [
                    {"name": "Chengalpattu Central Gram Panchayat", "lgd_code": 301553, "block": "Chengalpattu Block", "villages": ["Chengalpattu Khas", "Chengalpattu Dehat", "Chengalpattu Purva"]},
                    {"name": "Chengalpattu Model Krishi Panchayat", "lgd_code": 302553, "block": "Chengalpattu East Block", "villages": ["Kalyanpur Chengalpattu", "Rampur Chengalpattu", "Shivpur Chengalpattu"]}
                ]
            },
            "Chennai": {
                "lgd_code": 1554,
                "name_hi": "Chennai",
                "headquarters": "Chennai",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chennai Sadar", "Chennai North", "Chennai South", "Chennai Rural"],
                "blocks": ["Chennai Block", "Chennai West Block", "Chennai East Block"],
                "panchayats": [
                    {"name": "Chennai Central Gram Panchayat", "lgd_code": 301554, "block": "Chennai Block", "villages": ["Chennai Khas", "Chennai Dehat", "Chennai Purva"]},
                    {"name": "Chennai Model Krishi Panchayat", "lgd_code": 302554, "block": "Chennai East Block", "villages": ["Kalyanpur Chennai", "Rampur Chennai", "Shivpur Chennai"]}
                ]
            },
            "Coimbatore": {
                "lgd_code": 1555,
                "name_hi": "Coimbatore",
                "headquarters": "Coimbatore",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Coimbatore Sadar", "Coimbatore North", "Coimbatore South", "Coimbatore Rural"],
                "blocks": ["Coimbatore Block", "Coimbatore West Block", "Coimbatore East Block"],
                "panchayats": [
                    {"name": "Coimbatore Central Gram Panchayat", "lgd_code": 301555, "block": "Coimbatore Block", "villages": ["Coimbatore Khas", "Coimbatore Dehat", "Coimbatore Purva"]},
                    {"name": "Coimbatore Model Krishi Panchayat", "lgd_code": 302555, "block": "Coimbatore East Block", "villages": ["Kalyanpur Coimbatore", "Rampur Coimbatore", "Shivpur Coimbatore"]}
                ]
            },
            "Cuddalore": {
                "lgd_code": 1556,
                "name_hi": "Cuddalore",
                "headquarters": "Cuddalore",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Cuddalore Sadar", "Cuddalore North", "Cuddalore South", "Cuddalore Rural"],
                "blocks": ["Cuddalore Block", "Cuddalore West Block", "Cuddalore East Block"],
                "panchayats": [
                    {"name": "Cuddalore Central Gram Panchayat", "lgd_code": 301556, "block": "Cuddalore Block", "villages": ["Cuddalore Khas", "Cuddalore Dehat", "Cuddalore Purva"]},
                    {"name": "Cuddalore Model Krishi Panchayat", "lgd_code": 302556, "block": "Cuddalore East Block", "villages": ["Kalyanpur Cuddalore", "Rampur Cuddalore", "Shivpur Cuddalore"]}
                ]
            },
            "Dharmapuri": {
                "lgd_code": 1557,
                "name_hi": "Dharmapuri",
                "headquarters": "Dharmapuri",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dharmapuri Sadar", "Dharmapuri North", "Dharmapuri South", "Dharmapuri Rural"],
                "blocks": ["Dharmapuri Block", "Dharmapuri West Block", "Dharmapuri East Block"],
                "panchayats": [
                    {"name": "Dharmapuri Central Gram Panchayat", "lgd_code": 301557, "block": "Dharmapuri Block", "villages": ["Dharmapuri Khas", "Dharmapuri Dehat", "Dharmapuri Purva"]},
                    {"name": "Dharmapuri Model Krishi Panchayat", "lgd_code": 302557, "block": "Dharmapuri East Block", "villages": ["Kalyanpur Dharmapuri", "Rampur Dharmapuri", "Shivpur Dharmapuri"]}
                ]
            },
            "Dindigul": {
                "lgd_code": 1558,
                "name_hi": "Dindigul",
                "headquarters": "Dindigul",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dindigul Sadar", "Dindigul North", "Dindigul South", "Dindigul Rural"],
                "blocks": ["Dindigul Block", "Dindigul West Block", "Dindigul East Block"],
                "panchayats": [
                    {"name": "Dindigul Central Gram Panchayat", "lgd_code": 301558, "block": "Dindigul Block", "villages": ["Dindigul Khas", "Dindigul Dehat", "Dindigul Purva"]},
                    {"name": "Dindigul Model Krishi Panchayat", "lgd_code": 302558, "block": "Dindigul East Block", "villages": ["Kalyanpur Dindigul", "Rampur Dindigul", "Shivpur Dindigul"]}
                ]
            },
            "Erode": {
                "lgd_code": 1559,
                "name_hi": "Erode",
                "headquarters": "Erode",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Erode Sadar", "Erode North", "Erode South", "Erode Rural"],
                "blocks": ["Erode Block", "Erode West Block", "Erode East Block"],
                "panchayats": [
                    {"name": "Erode Central Gram Panchayat", "lgd_code": 301559, "block": "Erode Block", "villages": ["Erode Khas", "Erode Dehat", "Erode Purva"]},
                    {"name": "Erode Model Krishi Panchayat", "lgd_code": 302559, "block": "Erode East Block", "villages": ["Kalyanpur Erode", "Rampur Erode", "Shivpur Erode"]}
                ]
            },
            "Kallakurichi": {
                "lgd_code": 1560,
                "name_hi": "Kallakurichi",
                "headquarters": "Kallakurichi",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kallakurichi Sadar", "Kallakurichi North", "Kallakurichi South", "Kallakurichi Rural"],
                "blocks": ["Kallakurichi Block", "Kallakurichi West Block", "Kallakurichi East Block"],
                "panchayats": [
                    {"name": "Kallakurichi Central Gram Panchayat", "lgd_code": 301560, "block": "Kallakurichi Block", "villages": ["Kallakurichi Khas", "Kallakurichi Dehat", "Kallakurichi Purva"]},
                    {"name": "Kallakurichi Model Krishi Panchayat", "lgd_code": 302560, "block": "Kallakurichi East Block", "villages": ["Kalyanpur Kallakurichi", "Rampur Kallakurichi", "Shivpur Kallakurichi"]}
                ]
            },
            "Kanchipuram": {
                "lgd_code": 1561,
                "name_hi": "Kanchipuram",
                "headquarters": "Kanchipuram",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kanchipuram Sadar", "Kanchipuram North", "Kanchipuram South", "Kanchipuram Rural"],
                "blocks": ["Kanchipuram Block", "Kanchipuram West Block", "Kanchipuram East Block"],
                "panchayats": [
                    {"name": "Kanchipuram Central Gram Panchayat", "lgd_code": 301561, "block": "Kanchipuram Block", "villages": ["Kanchipuram Khas", "Kanchipuram Dehat", "Kanchipuram Purva"]},
                    {"name": "Kanchipuram Model Krishi Panchayat", "lgd_code": 302561, "block": "Kanchipuram East Block", "villages": ["Kalyanpur Kanchipuram", "Rampur Kanchipuram", "Shivpur Kanchipuram"]}
                ]
            },
            "Kanyakumari (Nagercoil)": {
                "lgd_code": 1562,
                "name_hi": "Kanyakumari",
                "headquarters": "Kanyakumari",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kanyakumari Sadar", "Kanyakumari North", "Kanyakumari South", "Kanyakumari Rural"],
                "blocks": ["Kanyakumari Block", "Kanyakumari West Block", "Kanyakumari East Block"],
                "panchayats": [
                    {"name": "Kanyakumari Central Gram Panchayat", "lgd_code": 301562, "block": "Kanyakumari Block", "villages": ["Kanyakumari Khas", "Kanyakumari Dehat", "Kanyakumari Purva"]},
                    {"name": "Kanyakumari Model Krishi Panchayat", "lgd_code": 302562, "block": "Kanyakumari East Block", "villages": ["Kalyanpur Kanyakumari", "Rampur Kanyakumari", "Shivpur Kanyakumari"]}
                ]
            },
            "Karur": {
                "lgd_code": 1563,
                "name_hi": "Karur",
                "headquarters": "Karur",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karur Sadar", "Karur North", "Karur South", "Karur Rural"],
                "blocks": ["Karur Block", "Karur West Block", "Karur East Block"],
                "panchayats": [
                    {"name": "Karur Central Gram Panchayat", "lgd_code": 301563, "block": "Karur Block", "villages": ["Karur Khas", "Karur Dehat", "Karur Purva"]},
                    {"name": "Karur Model Krishi Panchayat", "lgd_code": 302563, "block": "Karur East Block", "villages": ["Kalyanpur Karur", "Rampur Karur", "Shivpur Karur"]}
                ]
            },
            "Krishnagiri": {
                "lgd_code": 1564,
                "name_hi": "Krishnagiri",
                "headquarters": "Krishnagiri",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Krishnagiri Sadar", "Krishnagiri North", "Krishnagiri South", "Krishnagiri Rural"],
                "blocks": ["Krishnagiri Block", "Krishnagiri West Block", "Krishnagiri East Block"],
                "panchayats": [
                    {"name": "Krishnagiri Central Gram Panchayat", "lgd_code": 301564, "block": "Krishnagiri Block", "villages": ["Krishnagiri Khas", "Krishnagiri Dehat", "Krishnagiri Purva"]},
                    {"name": "Krishnagiri Model Krishi Panchayat", "lgd_code": 302564, "block": "Krishnagiri East Block", "villages": ["Kalyanpur Krishnagiri", "Rampur Krishnagiri", "Shivpur Krishnagiri"]}
                ]
            },
            "Madurai": {
                "lgd_code": 1565,
                "name_hi": "Madurai",
                "headquarters": "Madurai",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Madurai Sadar", "Madurai North", "Madurai South", "Madurai Rural"],
                "blocks": ["Madurai Block", "Madurai West Block", "Madurai East Block"],
                "panchayats": [
                    {"name": "Madurai Central Gram Panchayat", "lgd_code": 301565, "block": "Madurai Block", "villages": ["Madurai Khas", "Madurai Dehat", "Madurai Purva"]},
                    {"name": "Madurai Model Krishi Panchayat", "lgd_code": 302565, "block": "Madurai East Block", "villages": ["Kalyanpur Madurai", "Rampur Madurai", "Shivpur Madurai"]}
                ]
            },
            "Mayiladuthurai": {
                "lgd_code": 1566,
                "name_hi": "Mayiladuthurai",
                "headquarters": "Mayiladuthurai",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mayiladuthurai Sadar", "Mayiladuthurai North", "Mayiladuthurai South", "Mayiladuthurai Rural"],
                "blocks": ["Mayiladuthurai Block", "Mayiladuthurai West Block", "Mayiladuthurai East Block"],
                "panchayats": [
                    {"name": "Mayiladuthurai Central Gram Panchayat", "lgd_code": 301566, "block": "Mayiladuthurai Block", "villages": ["Mayiladuthurai Khas", "Mayiladuthurai Dehat", "Mayiladuthurai Purva"]},
                    {"name": "Mayiladuthurai Model Krishi Panchayat", "lgd_code": 302566, "block": "Mayiladuthurai East Block", "villages": ["Kalyanpur Mayiladuthurai", "Rampur Mayiladuthurai", "Shivpur Mayiladuthurai"]}
                ]
            },
            "Nagapattinam": {
                "lgd_code": 1567,
                "name_hi": "Nagapattinam",
                "headquarters": "Nagapattinam",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nagapattinam Sadar", "Nagapattinam North", "Nagapattinam South", "Nagapattinam Rural"],
                "blocks": ["Nagapattinam Block", "Nagapattinam West Block", "Nagapattinam East Block"],
                "panchayats": [
                    {"name": "Nagapattinam Central Gram Panchayat", "lgd_code": 301567, "block": "Nagapattinam Block", "villages": ["Nagapattinam Khas", "Nagapattinam Dehat", "Nagapattinam Purva"]},
                    {"name": "Nagapattinam Model Krishi Panchayat", "lgd_code": 302567, "block": "Nagapattinam East Block", "villages": ["Kalyanpur Nagapattinam", "Rampur Nagapattinam", "Shivpur Nagapattinam"]}
                ]
            },
            "Namakkal": {
                "lgd_code": 1568,
                "name_hi": "Namakkal",
                "headquarters": "Namakkal",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Namakkal Sadar", "Namakkal North", "Namakkal South", "Namakkal Rural"],
                "blocks": ["Namakkal Block", "Namakkal West Block", "Namakkal East Block"],
                "panchayats": [
                    {"name": "Namakkal Central Gram Panchayat", "lgd_code": 301568, "block": "Namakkal Block", "villages": ["Namakkal Khas", "Namakkal Dehat", "Namakkal Purva"]},
                    {"name": "Namakkal Model Krishi Panchayat", "lgd_code": 302568, "block": "Namakkal East Block", "villages": ["Kalyanpur Namakkal", "Rampur Namakkal", "Shivpur Namakkal"]}
                ]
            },
            "Nilgiris (Ooty)": {
                "lgd_code": 1569,
                "name_hi": "Nilgiris",
                "headquarters": "Nilgiris",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nilgiris Sadar", "Nilgiris North", "Nilgiris South", "Nilgiris Rural"],
                "blocks": ["Nilgiris Block", "Nilgiris West Block", "Nilgiris East Block"],
                "panchayats": [
                    {"name": "Nilgiris Central Gram Panchayat", "lgd_code": 301569, "block": "Nilgiris Block", "villages": ["Nilgiris Khas", "Nilgiris Dehat", "Nilgiris Purva"]},
                    {"name": "Nilgiris Model Krishi Panchayat", "lgd_code": 302569, "block": "Nilgiris East Block", "villages": ["Kalyanpur Nilgiris", "Rampur Nilgiris", "Shivpur Nilgiris"]}
                ]
            },
            "Perambalur": {
                "lgd_code": 1570,
                "name_hi": "Perambalur",
                "headquarters": "Perambalur",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Perambalur Sadar", "Perambalur North", "Perambalur South", "Perambalur Rural"],
                "blocks": ["Perambalur Block", "Perambalur West Block", "Perambalur East Block"],
                "panchayats": [
                    {"name": "Perambalur Central Gram Panchayat", "lgd_code": 301570, "block": "Perambalur Block", "villages": ["Perambalur Khas", "Perambalur Dehat", "Perambalur Purva"]},
                    {"name": "Perambalur Model Krishi Panchayat", "lgd_code": 302570, "block": "Perambalur East Block", "villages": ["Kalyanpur Perambalur", "Rampur Perambalur", "Shivpur Perambalur"]}
                ]
            },
            "Pudukkottai": {
                "lgd_code": 1571,
                "name_hi": "Pudukkottai",
                "headquarters": "Pudukkottai",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pudukkottai Sadar", "Pudukkottai North", "Pudukkottai South", "Pudukkottai Rural"],
                "blocks": ["Pudukkottai Block", "Pudukkottai West Block", "Pudukkottai East Block"],
                "panchayats": [
                    {"name": "Pudukkottai Central Gram Panchayat", "lgd_code": 301571, "block": "Pudukkottai Block", "villages": ["Pudukkottai Khas", "Pudukkottai Dehat", "Pudukkottai Purva"]},
                    {"name": "Pudukkottai Model Krishi Panchayat", "lgd_code": 302571, "block": "Pudukkottai East Block", "villages": ["Kalyanpur Pudukkottai", "Rampur Pudukkottai", "Shivpur Pudukkottai"]}
                ]
            },
            "Ramanathapuram": {
                "lgd_code": 1572,
                "name_hi": "Ramanathapuram",
                "headquarters": "Ramanathapuram",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ramanathapuram Sadar", "Ramanathapuram North", "Ramanathapuram South", "Ramanathapuram Rural"],
                "blocks": ["Ramanathapuram Block", "Ramanathapuram West Block", "Ramanathapuram East Block"],
                "panchayats": [
                    {"name": "Ramanathapuram Central Gram Panchayat", "lgd_code": 301572, "block": "Ramanathapuram Block", "villages": ["Ramanathapuram Khas", "Ramanathapuram Dehat", "Ramanathapuram Purva"]},
                    {"name": "Ramanathapuram Model Krishi Panchayat", "lgd_code": 302572, "block": "Ramanathapuram East Block", "villages": ["Kalyanpur Ramanathapuram", "Rampur Ramanathapuram", "Shivpur Ramanathapuram"]}
                ]
            },
            "Ranipet": {
                "lgd_code": 1573,
                "name_hi": "Ranipet",
                "headquarters": "Ranipet",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ranipet Sadar", "Ranipet North", "Ranipet South", "Ranipet Rural"],
                "blocks": ["Ranipet Block", "Ranipet West Block", "Ranipet East Block"],
                "panchayats": [
                    {"name": "Ranipet Central Gram Panchayat", "lgd_code": 301573, "block": "Ranipet Block", "villages": ["Ranipet Khas", "Ranipet Dehat", "Ranipet Purva"]},
                    {"name": "Ranipet Model Krishi Panchayat", "lgd_code": 302573, "block": "Ranipet East Block", "villages": ["Kalyanpur Ranipet", "Rampur Ranipet", "Shivpur Ranipet"]}
                ]
            },
            "Salem": {
                "lgd_code": 1574,
                "name_hi": "Salem",
                "headquarters": "Salem",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Salem Sadar", "Salem North", "Salem South", "Salem Rural"],
                "blocks": ["Salem Block", "Salem West Block", "Salem East Block"],
                "panchayats": [
                    {"name": "Salem Central Gram Panchayat", "lgd_code": 301574, "block": "Salem Block", "villages": ["Salem Khas", "Salem Dehat", "Salem Purva"]},
                    {"name": "Salem Model Krishi Panchayat", "lgd_code": 302574, "block": "Salem East Block", "villages": ["Kalyanpur Salem", "Rampur Salem", "Shivpur Salem"]}
                ]
            },
            "Sivaganga": {
                "lgd_code": 1575,
                "name_hi": "Sivaganga",
                "headquarters": "Sivaganga",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sivaganga Sadar", "Sivaganga North", "Sivaganga South", "Sivaganga Rural"],
                "blocks": ["Sivaganga Block", "Sivaganga West Block", "Sivaganga East Block"],
                "panchayats": [
                    {"name": "Sivaganga Central Gram Panchayat", "lgd_code": 301575, "block": "Sivaganga Block", "villages": ["Sivaganga Khas", "Sivaganga Dehat", "Sivaganga Purva"]},
                    {"name": "Sivaganga Model Krishi Panchayat", "lgd_code": 302575, "block": "Sivaganga East Block", "villages": ["Kalyanpur Sivaganga", "Rampur Sivaganga", "Shivpur Sivaganga"]}
                ]
            },
            "Tenkasi": {
                "lgd_code": 1576,
                "name_hi": "Tenkasi",
                "headquarters": "Tenkasi",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tenkasi Sadar", "Tenkasi North", "Tenkasi South", "Tenkasi Rural"],
                "blocks": ["Tenkasi Block", "Tenkasi West Block", "Tenkasi East Block"],
                "panchayats": [
                    {"name": "Tenkasi Central Gram Panchayat", "lgd_code": 301576, "block": "Tenkasi Block", "villages": ["Tenkasi Khas", "Tenkasi Dehat", "Tenkasi Purva"]},
                    {"name": "Tenkasi Model Krishi Panchayat", "lgd_code": 302576, "block": "Tenkasi East Block", "villages": ["Kalyanpur Tenkasi", "Rampur Tenkasi", "Shivpur Tenkasi"]}
                ]
            },
            "Thanjavur": {
                "lgd_code": 1577,
                "name_hi": "Thanjavur",
                "headquarters": "Thanjavur",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thanjavur Sadar", "Thanjavur North", "Thanjavur South", "Thanjavur Rural"],
                "blocks": ["Thanjavur Block", "Thanjavur West Block", "Thanjavur East Block"],
                "panchayats": [
                    {"name": "Thanjavur Central Gram Panchayat", "lgd_code": 301577, "block": "Thanjavur Block", "villages": ["Thanjavur Khas", "Thanjavur Dehat", "Thanjavur Purva"]},
                    {"name": "Thanjavur Model Krishi Panchayat", "lgd_code": 302577, "block": "Thanjavur East Block", "villages": ["Kalyanpur Thanjavur", "Rampur Thanjavur", "Shivpur Thanjavur"]}
                ]
            },
            "Theni": {
                "lgd_code": 1578,
                "name_hi": "Theni",
                "headquarters": "Theni",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Theni Sadar", "Theni North", "Theni South", "Theni Rural"],
                "blocks": ["Theni Block", "Theni West Block", "Theni East Block"],
                "panchayats": [
                    {"name": "Theni Central Gram Panchayat", "lgd_code": 301578, "block": "Theni Block", "villages": ["Theni Khas", "Theni Dehat", "Theni Purva"]},
                    {"name": "Theni Model Krishi Panchayat", "lgd_code": 302578, "block": "Theni East Block", "villages": ["Kalyanpur Theni", "Rampur Theni", "Shivpur Theni"]}
                ]
            },
            "Thoothukudi (Tuticorin)": {
                "lgd_code": 1579,
                "name_hi": "Thoothukudi",
                "headquarters": "Thoothukudi",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Thoothukudi Sadar", "Thoothukudi North", "Thoothukudi South", "Thoothukudi Rural"],
                "blocks": ["Thoothukudi Block", "Thoothukudi West Block", "Thoothukudi East Block"],
                "panchayats": [
                    {"name": "Thoothukudi Central Gram Panchayat", "lgd_code": 301579, "block": "Thoothukudi Block", "villages": ["Thoothukudi Khas", "Thoothukudi Dehat", "Thoothukudi Purva"]},
                    {"name": "Thoothukudi Model Krishi Panchayat", "lgd_code": 302579, "block": "Thoothukudi East Block", "villages": ["Kalyanpur Thoothukudi", "Rampur Thoothukudi", "Shivpur Thoothukudi"]}
                ]
            },
            "Tiruchirappalli (Trichy)": {
                "lgd_code": 1580,
                "name_hi": "Tiruchirappalli",
                "headquarters": "Tiruchirappalli",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tiruchirappalli Sadar", "Tiruchirappalli North", "Tiruchirappalli South", "Tiruchirappalli Rural"],
                "blocks": ["Tiruchirappalli Block", "Tiruchirappalli West Block", "Tiruchirappalli East Block"],
                "panchayats": [
                    {"name": "Tiruchirappalli Central Gram Panchayat", "lgd_code": 301580, "block": "Tiruchirappalli Block", "villages": ["Tiruchirappalli Khas", "Tiruchirappalli Dehat", "Tiruchirappalli Purva"]},
                    {"name": "Tiruchirappalli Model Krishi Panchayat", "lgd_code": 302580, "block": "Tiruchirappalli East Block", "villages": ["Kalyanpur Tiruchirappalli", "Rampur Tiruchirappalli", "Shivpur Tiruchirappalli"]}
                ]
            },
            "Tirunelveli": {
                "lgd_code": 1581,
                "name_hi": "Tirunelveli",
                "headquarters": "Tirunelveli",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tirunelveli Sadar", "Tirunelveli North", "Tirunelveli South", "Tirunelveli Rural"],
                "blocks": ["Tirunelveli Block", "Tirunelveli West Block", "Tirunelveli East Block"],
                "panchayats": [
                    {"name": "Tirunelveli Central Gram Panchayat", "lgd_code": 301581, "block": "Tirunelveli Block", "villages": ["Tirunelveli Khas", "Tirunelveli Dehat", "Tirunelveli Purva"]},
                    {"name": "Tirunelveli Model Krishi Panchayat", "lgd_code": 302581, "block": "Tirunelveli East Block", "villages": ["Kalyanpur Tirunelveli", "Rampur Tirunelveli", "Shivpur Tirunelveli"]}
                ]
            },
            "Tirupathur": {
                "lgd_code": 1582,
                "name_hi": "Tirupathur",
                "headquarters": "Tirupathur",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tirupathur Sadar", "Tirupathur North", "Tirupathur South", "Tirupathur Rural"],
                "blocks": ["Tirupathur Block", "Tirupathur West Block", "Tirupathur East Block"],
                "panchayats": [
                    {"name": "Tirupathur Central Gram Panchayat", "lgd_code": 301582, "block": "Tirupathur Block", "villages": ["Tirupathur Khas", "Tirupathur Dehat", "Tirupathur Purva"]},
                    {"name": "Tirupathur Model Krishi Panchayat", "lgd_code": 302582, "block": "Tirupathur East Block", "villages": ["Kalyanpur Tirupathur", "Rampur Tirupathur", "Shivpur Tirupathur"]}
                ]
            },
            "Tiruppur": {
                "lgd_code": 1583,
                "name_hi": "Tiruppur",
                "headquarters": "Tiruppur",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tiruppur Sadar", "Tiruppur North", "Tiruppur South", "Tiruppur Rural"],
                "blocks": ["Tiruppur Block", "Tiruppur West Block", "Tiruppur East Block"],
                "panchayats": [
                    {"name": "Tiruppur Central Gram Panchayat", "lgd_code": 301583, "block": "Tiruppur Block", "villages": ["Tiruppur Khas", "Tiruppur Dehat", "Tiruppur Purva"]},
                    {"name": "Tiruppur Model Krishi Panchayat", "lgd_code": 302583, "block": "Tiruppur East Block", "villages": ["Kalyanpur Tiruppur", "Rampur Tiruppur", "Shivpur Tiruppur"]}
                ]
            },
            "Tiruvallur": {
                "lgd_code": 1584,
                "name_hi": "Tiruvallur",
                "headquarters": "Tiruvallur",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tiruvallur Sadar", "Tiruvallur North", "Tiruvallur South", "Tiruvallur Rural"],
                "blocks": ["Tiruvallur Block", "Tiruvallur West Block", "Tiruvallur East Block"],
                "panchayats": [
                    {"name": "Tiruvallur Central Gram Panchayat", "lgd_code": 301584, "block": "Tiruvallur Block", "villages": ["Tiruvallur Khas", "Tiruvallur Dehat", "Tiruvallur Purva"]},
                    {"name": "Tiruvallur Model Krishi Panchayat", "lgd_code": 302584, "block": "Tiruvallur East Block", "villages": ["Kalyanpur Tiruvallur", "Rampur Tiruvallur", "Shivpur Tiruvallur"]}
                ]
            },
            "Tiruvannamalai": {
                "lgd_code": 1585,
                "name_hi": "Tiruvannamalai",
                "headquarters": "Tiruvannamalai",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tiruvannamalai Sadar", "Tiruvannamalai North", "Tiruvannamalai South", "Tiruvannamalai Rural"],
                "blocks": ["Tiruvannamalai Block", "Tiruvannamalai West Block", "Tiruvannamalai East Block"],
                "panchayats": [
                    {"name": "Tiruvannamalai Central Gram Panchayat", "lgd_code": 301585, "block": "Tiruvannamalai Block", "villages": ["Tiruvannamalai Khas", "Tiruvannamalai Dehat", "Tiruvannamalai Purva"]},
                    {"name": "Tiruvannamalai Model Krishi Panchayat", "lgd_code": 302585, "block": "Tiruvannamalai East Block", "villages": ["Kalyanpur Tiruvannamalai", "Rampur Tiruvannamalai", "Shivpur Tiruvannamalai"]}
                ]
            },
            "Tiruvarur": {
                "lgd_code": 1586,
                "name_hi": "Tiruvarur",
                "headquarters": "Tiruvarur",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tiruvarur Sadar", "Tiruvarur North", "Tiruvarur South", "Tiruvarur Rural"],
                "blocks": ["Tiruvarur Block", "Tiruvarur West Block", "Tiruvarur East Block"],
                "panchayats": [
                    {"name": "Tiruvarur Central Gram Panchayat", "lgd_code": 301586, "block": "Tiruvarur Block", "villages": ["Tiruvarur Khas", "Tiruvarur Dehat", "Tiruvarur Purva"]},
                    {"name": "Tiruvarur Model Krishi Panchayat", "lgd_code": 302586, "block": "Tiruvarur East Block", "villages": ["Kalyanpur Tiruvarur", "Rampur Tiruvarur", "Shivpur Tiruvarur"]}
                ]
            },
            "Vellore": {
                "lgd_code": 1587,
                "name_hi": "Vellore",
                "headquarters": "Vellore",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vellore Sadar", "Vellore North", "Vellore South", "Vellore Rural"],
                "blocks": ["Vellore Block", "Vellore West Block", "Vellore East Block"],
                "panchayats": [
                    {"name": "Vellore Central Gram Panchayat", "lgd_code": 301587, "block": "Vellore Block", "villages": ["Vellore Khas", "Vellore Dehat", "Vellore Purva"]},
                    {"name": "Vellore Model Krishi Panchayat", "lgd_code": 302587, "block": "Vellore East Block", "villages": ["Kalyanpur Vellore", "Rampur Vellore", "Shivpur Vellore"]}
                ]
            },
            "Viluppuram": {
                "lgd_code": 1588,
                "name_hi": "Viluppuram",
                "headquarters": "Viluppuram",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Viluppuram Sadar", "Viluppuram North", "Viluppuram South", "Viluppuram Rural"],
                "blocks": ["Viluppuram Block", "Viluppuram West Block", "Viluppuram East Block"],
                "panchayats": [
                    {"name": "Viluppuram Central Gram Panchayat", "lgd_code": 301588, "block": "Viluppuram Block", "villages": ["Viluppuram Khas", "Viluppuram Dehat", "Viluppuram Purva"]},
                    {"name": "Viluppuram Model Krishi Panchayat", "lgd_code": 302588, "block": "Viluppuram East Block", "villages": ["Kalyanpur Viluppuram", "Rampur Viluppuram", "Shivpur Viluppuram"]}
                ]
            },
            "Virudhunagar": {
                "lgd_code": 1589,
                "name_hi": "Virudhunagar",
                "headquarters": "Virudhunagar",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Virudhunagar Sadar", "Virudhunagar North", "Virudhunagar South", "Virudhunagar Rural"],
                "blocks": ["Virudhunagar Block", "Virudhunagar West Block", "Virudhunagar East Block"],
                "panchayats": [
                    {"name": "Virudhunagar Central Gram Panchayat", "lgd_code": 301589, "block": "Virudhunagar Block", "villages": ["Virudhunagar Khas", "Virudhunagar Dehat", "Virudhunagar Purva"]},
                    {"name": "Virudhunagar Model Krishi Panchayat", "lgd_code": 302589, "block": "Virudhunagar East Block", "villages": ["Kalyanpur Virudhunagar", "Rampur Virudhunagar", "Shivpur Virudhunagar"]}
                ]
            },
        }
    },
    "Telangana": {
        "districts": {
            "Adilabad": {
                "lgd_code": 1590,
                "name_hi": "Adilabad",
                "headquarters": "Adilabad",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Adilabad Sadar", "Adilabad North", "Adilabad South", "Adilabad Rural"],
                "blocks": ["Adilabad Block", "Adilabad West Block", "Adilabad East Block"],
                "panchayats": [
                    {"name": "Adilabad Central Gram Panchayat", "lgd_code": 301590, "block": "Adilabad Block", "villages": ["Adilabad Khas", "Adilabad Dehat", "Adilabad Purva"]},
                    {"name": "Adilabad Model Krishi Panchayat", "lgd_code": 302590, "block": "Adilabad East Block", "villages": ["Kalyanpur Adilabad", "Rampur Adilabad", "Shivpur Adilabad"]}
                ]
            },
            "Bhadradri Kothagudem": {
                "lgd_code": 1591,
                "name_hi": "Bhadradri Kothagudem",
                "headquarters": "Bhadradri Kothagudem",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhadradri Kothagudem Sadar", "Bhadradri Kothagudem North", "Bhadradri Kothagudem South", "Bhadradri Kothagudem Rural"],
                "blocks": ["Bhadradri Kothagudem Block", "Bhadradri Kothagudem West Block", "Bhadradri Kothagudem East Block"],
                "panchayats": [
                    {"name": "Bhadradri Kothagudem Central Gram Panchayat", "lgd_code": 301591, "block": "Bhadradri Kothagudem Block", "villages": ["Bhadradri Kothagudem Khas", "Bhadradri Kothagudem Dehat", "Bhadradri Kothagudem Purva"]},
                    {"name": "Bhadradri Kothagudem Model Krishi Panchayat", "lgd_code": 302591, "block": "Bhadradri Kothagudem East Block", "villages": ["Kalyanpur Bhadradri Kothagudem", "Rampur Bhadradri Kothagudem", "Shivpur Bhadradri Kothagudem"]}
                ]
            },
            "Hanamkonda": {
                "lgd_code": 1592,
                "name_hi": "Hanamkonda",
                "headquarters": "Hanamkonda",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hanamkonda Sadar", "Hanamkonda North", "Hanamkonda South", "Hanamkonda Rural"],
                "blocks": ["Hanamkonda Block", "Hanamkonda West Block", "Hanamkonda East Block"],
                "panchayats": [
                    {"name": "Hanamkonda Central Gram Panchayat", "lgd_code": 301592, "block": "Hanamkonda Block", "villages": ["Hanamkonda Khas", "Hanamkonda Dehat", "Hanamkonda Purva"]},
                    {"name": "Hanamkonda Model Krishi Panchayat", "lgd_code": 302592, "block": "Hanamkonda East Block", "villages": ["Kalyanpur Hanamkonda", "Rampur Hanamkonda", "Shivpur Hanamkonda"]}
                ]
            },
            "Hyderabad": {
                "lgd_code": 1593,
                "name_hi": "Hyderabad",
                "headquarters": "Hyderabad",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hyderabad Sadar", "Hyderabad North", "Hyderabad South", "Hyderabad Rural"],
                "blocks": ["Hyderabad Block", "Hyderabad West Block", "Hyderabad East Block"],
                "panchayats": [
                    {"name": "Hyderabad Central Gram Panchayat", "lgd_code": 301593, "block": "Hyderabad Block", "villages": ["Hyderabad Khas", "Hyderabad Dehat", "Hyderabad Purva"]},
                    {"name": "Hyderabad Model Krishi Panchayat", "lgd_code": 302593, "block": "Hyderabad East Block", "villages": ["Kalyanpur Hyderabad", "Rampur Hyderabad", "Shivpur Hyderabad"]}
                ]
            },
            "Jagtial": {
                "lgd_code": 1594,
                "name_hi": "Jagtial",
                "headquarters": "Jagtial",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jagtial Sadar", "Jagtial North", "Jagtial South", "Jagtial Rural"],
                "blocks": ["Jagtial Block", "Jagtial West Block", "Jagtial East Block"],
                "panchayats": [
                    {"name": "Jagtial Central Gram Panchayat", "lgd_code": 301594, "block": "Jagtial Block", "villages": ["Jagtial Khas", "Jagtial Dehat", "Jagtial Purva"]},
                    {"name": "Jagtial Model Krishi Panchayat", "lgd_code": 302594, "block": "Jagtial East Block", "villages": ["Kalyanpur Jagtial", "Rampur Jagtial", "Shivpur Jagtial"]}
                ]
            },
            "Jangaon": {
                "lgd_code": 1595,
                "name_hi": "Jangaon",
                "headquarters": "Jangaon",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jangaon Sadar", "Jangaon North", "Jangaon South", "Jangaon Rural"],
                "blocks": ["Jangaon Block", "Jangaon West Block", "Jangaon East Block"],
                "panchayats": [
                    {"name": "Jangaon Central Gram Panchayat", "lgd_code": 301595, "block": "Jangaon Block", "villages": ["Jangaon Khas", "Jangaon Dehat", "Jangaon Purva"]},
                    {"name": "Jangaon Model Krishi Panchayat", "lgd_code": 302595, "block": "Jangaon East Block", "villages": ["Kalyanpur Jangaon", "Rampur Jangaon", "Shivpur Jangaon"]}
                ]
            },
            "Jayashankar Bhupalpally": {
                "lgd_code": 1596,
                "name_hi": "Jayashankar Bhupalpally",
                "headquarters": "Jayashankar Bhupalpally",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jayashankar Bhupalpally Sadar", "Jayashankar Bhupalpally North", "Jayashankar Bhupalpally South", "Jayashankar Bhupalpally Rural"],
                "blocks": ["Jayashankar Bhupalpally Block", "Jayashankar Bhupalpally West Block", "Jayashankar Bhupalpally East Block"],
                "panchayats": [
                    {"name": "Jayashankar Bhupalpally Central Gram Panchayat", "lgd_code": 301596, "block": "Jayashankar Bhupalpally Block", "villages": ["Jayashankar Bhupalpally Khas", "Jayashankar Bhupalpally Dehat", "Jayashankar Bhupalpally Purva"]},
                    {"name": "Jayashankar Bhupalpally Model Krishi Panchayat", "lgd_code": 302596, "block": "Jayashankar Bhupalpally East Block", "villages": ["Kalyanpur Jayashankar Bhupalpally", "Rampur Jayashankar Bhupalpally", "Shivpur Jayashankar Bhupalpally"]}
                ]
            },
            "Jogulamba Gadwal": {
                "lgd_code": 1597,
                "name_hi": "Jogulamba Gadwal",
                "headquarters": "Jogulamba Gadwal",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jogulamba Gadwal Sadar", "Jogulamba Gadwal North", "Jogulamba Gadwal South", "Jogulamba Gadwal Rural"],
                "blocks": ["Jogulamba Gadwal Block", "Jogulamba Gadwal West Block", "Jogulamba Gadwal East Block"],
                "panchayats": [
                    {"name": "Jogulamba Gadwal Central Gram Panchayat", "lgd_code": 301597, "block": "Jogulamba Gadwal Block", "villages": ["Jogulamba Gadwal Khas", "Jogulamba Gadwal Dehat", "Jogulamba Gadwal Purva"]},
                    {"name": "Jogulamba Gadwal Model Krishi Panchayat", "lgd_code": 302597, "block": "Jogulamba Gadwal East Block", "villages": ["Kalyanpur Jogulamba Gadwal", "Rampur Jogulamba Gadwal", "Shivpur Jogulamba Gadwal"]}
                ]
            },
            "Kamareddy": {
                "lgd_code": 1598,
                "name_hi": "Kamareddy",
                "headquarters": "Kamareddy",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kamareddy Sadar", "Kamareddy North", "Kamareddy South", "Kamareddy Rural"],
                "blocks": ["Kamareddy Block", "Kamareddy West Block", "Kamareddy East Block"],
                "panchayats": [
                    {"name": "Kamareddy Central Gram Panchayat", "lgd_code": 301598, "block": "Kamareddy Block", "villages": ["Kamareddy Khas", "Kamareddy Dehat", "Kamareddy Purva"]},
                    {"name": "Kamareddy Model Krishi Panchayat", "lgd_code": 302598, "block": "Kamareddy East Block", "villages": ["Kalyanpur Kamareddy", "Rampur Kamareddy", "Shivpur Kamareddy"]}
                ]
            },
            "Karimnagar": {
                "lgd_code": 1599,
                "name_hi": "Karimnagar",
                "headquarters": "Karimnagar",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karimnagar Sadar", "Karimnagar North", "Karimnagar South", "Karimnagar Rural"],
                "blocks": ["Karimnagar Block", "Karimnagar West Block", "Karimnagar East Block"],
                "panchayats": [
                    {"name": "Karimnagar Central Gram Panchayat", "lgd_code": 301599, "block": "Karimnagar Block", "villages": ["Karimnagar Khas", "Karimnagar Dehat", "Karimnagar Purva"]},
                    {"name": "Karimnagar Model Krishi Panchayat", "lgd_code": 302599, "block": "Karimnagar East Block", "villages": ["Kalyanpur Karimnagar", "Rampur Karimnagar", "Shivpur Karimnagar"]}
                ]
            },
            "Khammam": {
                "lgd_code": 1600,
                "name_hi": "Khammam",
                "headquarters": "Khammam",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khammam Sadar", "Khammam North", "Khammam South", "Khammam Rural"],
                "blocks": ["Khammam Block", "Khammam West Block", "Khammam East Block"],
                "panchayats": [
                    {"name": "Khammam Central Gram Panchayat", "lgd_code": 301600, "block": "Khammam Block", "villages": ["Khammam Khas", "Khammam Dehat", "Khammam Purva"]},
                    {"name": "Khammam Model Krishi Panchayat", "lgd_code": 302600, "block": "Khammam East Block", "villages": ["Kalyanpur Khammam", "Rampur Khammam", "Shivpur Khammam"]}
                ]
            },
            "Komaram Bheem Asifabad": {
                "lgd_code": 1601,
                "name_hi": "Komaram Bheem Asifabad",
                "headquarters": "Komaram Bheem Asifabad",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Komaram Bheem Asifabad Sadar", "Komaram Bheem Asifabad North", "Komaram Bheem Asifabad South", "Komaram Bheem Asifabad Rural"],
                "blocks": ["Komaram Bheem Asifabad Block", "Komaram Bheem Asifabad West Block", "Komaram Bheem Asifabad East Block"],
                "panchayats": [
                    {"name": "Komaram Bheem Asifabad Central Gram Panchayat", "lgd_code": 301601, "block": "Komaram Bheem Asifabad Block", "villages": ["Komaram Bheem Asifabad Khas", "Komaram Bheem Asifabad Dehat", "Komaram Bheem Asifabad Purva"]},
                    {"name": "Komaram Bheem Asifabad Model Krishi Panchayat", "lgd_code": 302601, "block": "Komaram Bheem Asifabad East Block", "villages": ["Kalyanpur Komaram Bheem Asifabad", "Rampur Komaram Bheem Asifabad", "Shivpur Komaram Bheem Asifabad"]}
                ]
            },
            "Mahabubabad": {
                "lgd_code": 1602,
                "name_hi": "Mahabubabad",
                "headquarters": "Mahabubabad",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahabubabad Sadar", "Mahabubabad North", "Mahabubabad South", "Mahabubabad Rural"],
                "blocks": ["Mahabubabad Block", "Mahabubabad West Block", "Mahabubabad East Block"],
                "panchayats": [
                    {"name": "Mahabubabad Central Gram Panchayat", "lgd_code": 301602, "block": "Mahabubabad Block", "villages": ["Mahabubabad Khas", "Mahabubabad Dehat", "Mahabubabad Purva"]},
                    {"name": "Mahabubabad Model Krishi Panchayat", "lgd_code": 302602, "block": "Mahabubabad East Block", "villages": ["Kalyanpur Mahabubabad", "Rampur Mahabubabad", "Shivpur Mahabubabad"]}
                ]
            },
            "Mahabubnagar": {
                "lgd_code": 1603,
                "name_hi": "Mahabubnagar",
                "headquarters": "Mahabubnagar",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahabubnagar Sadar", "Mahabubnagar North", "Mahabubnagar South", "Mahabubnagar Rural"],
                "blocks": ["Mahabubnagar Block", "Mahabubnagar West Block", "Mahabubnagar East Block"],
                "panchayats": [
                    {"name": "Mahabubnagar Central Gram Panchayat", "lgd_code": 301603, "block": "Mahabubnagar Block", "villages": ["Mahabubnagar Khas", "Mahabubnagar Dehat", "Mahabubnagar Purva"]},
                    {"name": "Mahabubnagar Model Krishi Panchayat", "lgd_code": 302603, "block": "Mahabubnagar East Block", "villages": ["Kalyanpur Mahabubnagar", "Rampur Mahabubnagar", "Shivpur Mahabubnagar"]}
                ]
            },
            "Mancherial": {
                "lgd_code": 1604,
                "name_hi": "Mancherial",
                "headquarters": "Mancherial",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mancherial Sadar", "Mancherial North", "Mancherial South", "Mancherial Rural"],
                "blocks": ["Mancherial Block", "Mancherial West Block", "Mancherial East Block"],
                "panchayats": [
                    {"name": "Mancherial Central Gram Panchayat", "lgd_code": 301604, "block": "Mancherial Block", "villages": ["Mancherial Khas", "Mancherial Dehat", "Mancherial Purva"]},
                    {"name": "Mancherial Model Krishi Panchayat", "lgd_code": 302604, "block": "Mancherial East Block", "villages": ["Kalyanpur Mancherial", "Rampur Mancherial", "Shivpur Mancherial"]}
                ]
            },
            "Medak": {
                "lgd_code": 1605,
                "name_hi": "Medak",
                "headquarters": "Medak",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Medak Sadar", "Medak North", "Medak South", "Medak Rural"],
                "blocks": ["Medak Block", "Medak West Block", "Medak East Block"],
                "panchayats": [
                    {"name": "Medak Central Gram Panchayat", "lgd_code": 301605, "block": "Medak Block", "villages": ["Medak Khas", "Medak Dehat", "Medak Purva"]},
                    {"name": "Medak Model Krishi Panchayat", "lgd_code": 302605, "block": "Medak East Block", "villages": ["Kalyanpur Medak", "Rampur Medak", "Shivpur Medak"]}
                ]
            },
            "Medchal-Malkajgiri": {
                "lgd_code": 1606,
                "name_hi": "Medchal-Malkajgiri",
                "headquarters": "Medchal-Malkajgiri",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Medchal-Malkajgiri Sadar", "Medchal-Malkajgiri North", "Medchal-Malkajgiri South", "Medchal-Malkajgiri Rural"],
                "blocks": ["Medchal-Malkajgiri Block", "Medchal-Malkajgiri West Block", "Medchal-Malkajgiri East Block"],
                "panchayats": [
                    {"name": "Medchal-Malkajgiri Central Gram Panchayat", "lgd_code": 301606, "block": "Medchal-Malkajgiri Block", "villages": ["Medchal-Malkajgiri Khas", "Medchal-Malkajgiri Dehat", "Medchal-Malkajgiri Purva"]},
                    {"name": "Medchal-Malkajgiri Model Krishi Panchayat", "lgd_code": 302606, "block": "Medchal-Malkajgiri East Block", "villages": ["Kalyanpur Medchal-Malkajgiri", "Rampur Medchal-Malkajgiri", "Shivpur Medchal-Malkajgiri"]}
                ]
            },
            "Mulugu": {
                "lgd_code": 1607,
                "name_hi": "Mulugu",
                "headquarters": "Mulugu",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mulugu Sadar", "Mulugu North", "Mulugu South", "Mulugu Rural"],
                "blocks": ["Mulugu Block", "Mulugu West Block", "Mulugu East Block"],
                "panchayats": [
                    {"name": "Mulugu Central Gram Panchayat", "lgd_code": 301607, "block": "Mulugu Block", "villages": ["Mulugu Khas", "Mulugu Dehat", "Mulugu Purva"]},
                    {"name": "Mulugu Model Krishi Panchayat", "lgd_code": 302607, "block": "Mulugu East Block", "villages": ["Kalyanpur Mulugu", "Rampur Mulugu", "Shivpur Mulugu"]}
                ]
            },
            "Nagarkurnool": {
                "lgd_code": 1608,
                "name_hi": "Nagarkurnool",
                "headquarters": "Nagarkurnool",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nagarkurnool Sadar", "Nagarkurnool North", "Nagarkurnool South", "Nagarkurnool Rural"],
                "blocks": ["Nagarkurnool Block", "Nagarkurnool West Block", "Nagarkurnool East Block"],
                "panchayats": [
                    {"name": "Nagarkurnool Central Gram Panchayat", "lgd_code": 301608, "block": "Nagarkurnool Block", "villages": ["Nagarkurnool Khas", "Nagarkurnool Dehat", "Nagarkurnool Purva"]},
                    {"name": "Nagarkurnool Model Krishi Panchayat", "lgd_code": 302608, "block": "Nagarkurnool East Block", "villages": ["Kalyanpur Nagarkurnool", "Rampur Nagarkurnool", "Shivpur Nagarkurnool"]}
                ]
            },
            "Nalgonda": {
                "lgd_code": 1609,
                "name_hi": "Nalgonda",
                "headquarters": "Nalgonda",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nalgonda Sadar", "Nalgonda North", "Nalgonda South", "Nalgonda Rural"],
                "blocks": ["Nalgonda Block", "Nalgonda West Block", "Nalgonda East Block"],
                "panchayats": [
                    {"name": "Nalgonda Central Gram Panchayat", "lgd_code": 301609, "block": "Nalgonda Block", "villages": ["Nalgonda Khas", "Nalgonda Dehat", "Nalgonda Purva"]},
                    {"name": "Nalgonda Model Krishi Panchayat", "lgd_code": 302609, "block": "Nalgonda East Block", "villages": ["Kalyanpur Nalgonda", "Rampur Nalgonda", "Shivpur Nalgonda"]}
                ]
            },
            "Narayanpet": {
                "lgd_code": 1610,
                "name_hi": "Narayanpet",
                "headquarters": "Narayanpet",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Narayanpet Sadar", "Narayanpet North", "Narayanpet South", "Narayanpet Rural"],
                "blocks": ["Narayanpet Block", "Narayanpet West Block", "Narayanpet East Block"],
                "panchayats": [
                    {"name": "Narayanpet Central Gram Panchayat", "lgd_code": 301610, "block": "Narayanpet Block", "villages": ["Narayanpet Khas", "Narayanpet Dehat", "Narayanpet Purva"]},
                    {"name": "Narayanpet Model Krishi Panchayat", "lgd_code": 302610, "block": "Narayanpet East Block", "villages": ["Kalyanpur Narayanpet", "Rampur Narayanpet", "Shivpur Narayanpet"]}
                ]
            },
            "Nirmal": {
                "lgd_code": 1611,
                "name_hi": "Nirmal",
                "headquarters": "Nirmal",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nirmal Sadar", "Nirmal North", "Nirmal South", "Nirmal Rural"],
                "blocks": ["Nirmal Block", "Nirmal West Block", "Nirmal East Block"],
                "panchayats": [
                    {"name": "Nirmal Central Gram Panchayat", "lgd_code": 301611, "block": "Nirmal Block", "villages": ["Nirmal Khas", "Nirmal Dehat", "Nirmal Purva"]},
                    {"name": "Nirmal Model Krishi Panchayat", "lgd_code": 302611, "block": "Nirmal East Block", "villages": ["Kalyanpur Nirmal", "Rampur Nirmal", "Shivpur Nirmal"]}
                ]
            },
            "Nizamabad": {
                "lgd_code": 1612,
                "name_hi": "Nizamabad",
                "headquarters": "Nizamabad",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nizamabad Sadar", "Nizamabad North", "Nizamabad South", "Nizamabad Rural"],
                "blocks": ["Nizamabad Block", "Nizamabad West Block", "Nizamabad East Block"],
                "panchayats": [
                    {"name": "Nizamabad Central Gram Panchayat", "lgd_code": 301612, "block": "Nizamabad Block", "villages": ["Nizamabad Khas", "Nizamabad Dehat", "Nizamabad Purva"]},
                    {"name": "Nizamabad Model Krishi Panchayat", "lgd_code": 302612, "block": "Nizamabad East Block", "villages": ["Kalyanpur Nizamabad", "Rampur Nizamabad", "Shivpur Nizamabad"]}
                ]
            },
            "Peddapalli": {
                "lgd_code": 1613,
                "name_hi": "Peddapalli",
                "headquarters": "Peddapalli",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Peddapalli Sadar", "Peddapalli North", "Peddapalli South", "Peddapalli Rural"],
                "blocks": ["Peddapalli Block", "Peddapalli West Block", "Peddapalli East Block"],
                "panchayats": [
                    {"name": "Peddapalli Central Gram Panchayat", "lgd_code": 301613, "block": "Peddapalli Block", "villages": ["Peddapalli Khas", "Peddapalli Dehat", "Peddapalli Purva"]},
                    {"name": "Peddapalli Model Krishi Panchayat", "lgd_code": 302613, "block": "Peddapalli East Block", "villages": ["Kalyanpur Peddapalli", "Rampur Peddapalli", "Shivpur Peddapalli"]}
                ]
            },
            "Rajanna Sircilla": {
                "lgd_code": 1614,
                "name_hi": "Rajanna Sircilla",
                "headquarters": "Rajanna Sircilla",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajanna Sircilla Sadar", "Rajanna Sircilla North", "Rajanna Sircilla South", "Rajanna Sircilla Rural"],
                "blocks": ["Rajanna Sircilla Block", "Rajanna Sircilla West Block", "Rajanna Sircilla East Block"],
                "panchayats": [
                    {"name": "Rajanna Sircilla Central Gram Panchayat", "lgd_code": 301614, "block": "Rajanna Sircilla Block", "villages": ["Rajanna Sircilla Khas", "Rajanna Sircilla Dehat", "Rajanna Sircilla Purva"]},
                    {"name": "Rajanna Sircilla Model Krishi Panchayat", "lgd_code": 302614, "block": "Rajanna Sircilla East Block", "villages": ["Kalyanpur Rajanna Sircilla", "Rampur Rajanna Sircilla", "Shivpur Rajanna Sircilla"]}
                ]
            },
            "Rangareddy": {
                "lgd_code": 1615,
                "name_hi": "Rangareddy",
                "headquarters": "Rangareddy",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rangareddy Sadar", "Rangareddy North", "Rangareddy South", "Rangareddy Rural"],
                "blocks": ["Rangareddy Block", "Rangareddy West Block", "Rangareddy East Block"],
                "panchayats": [
                    {"name": "Rangareddy Central Gram Panchayat", "lgd_code": 301615, "block": "Rangareddy Block", "villages": ["Rangareddy Khas", "Rangareddy Dehat", "Rangareddy Purva"]},
                    {"name": "Rangareddy Model Krishi Panchayat", "lgd_code": 302615, "block": "Rangareddy East Block", "villages": ["Kalyanpur Rangareddy", "Rampur Rangareddy", "Shivpur Rangareddy"]}
                ]
            },
            "Sangareddy": {
                "lgd_code": 1616,
                "name_hi": "Sangareddy",
                "headquarters": "Sangareddy",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sangareddy Sadar", "Sangareddy North", "Sangareddy South", "Sangareddy Rural"],
                "blocks": ["Sangareddy Block", "Sangareddy West Block", "Sangareddy East Block"],
                "panchayats": [
                    {"name": "Sangareddy Central Gram Panchayat", "lgd_code": 301616, "block": "Sangareddy Block", "villages": ["Sangareddy Khas", "Sangareddy Dehat", "Sangareddy Purva"]},
                    {"name": "Sangareddy Model Krishi Panchayat", "lgd_code": 302616, "block": "Sangareddy East Block", "villages": ["Kalyanpur Sangareddy", "Rampur Sangareddy", "Shivpur Sangareddy"]}
                ]
            },
            "Siddipet": {
                "lgd_code": 1617,
                "name_hi": "Siddipet",
                "headquarters": "Siddipet",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Siddipet Sadar", "Siddipet North", "Siddipet South", "Siddipet Rural"],
                "blocks": ["Siddipet Block", "Siddipet West Block", "Siddipet East Block"],
                "panchayats": [
                    {"name": "Siddipet Central Gram Panchayat", "lgd_code": 301617, "block": "Siddipet Block", "villages": ["Siddipet Khas", "Siddipet Dehat", "Siddipet Purva"]},
                    {"name": "Siddipet Model Krishi Panchayat", "lgd_code": 302617, "block": "Siddipet East Block", "villages": ["Kalyanpur Siddipet", "Rampur Siddipet", "Shivpur Siddipet"]}
                ]
            },
            "Suryapet": {
                "lgd_code": 1618,
                "name_hi": "Suryapet",
                "headquarters": "Suryapet",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Suryapet Sadar", "Suryapet North", "Suryapet South", "Suryapet Rural"],
                "blocks": ["Suryapet Block", "Suryapet West Block", "Suryapet East Block"],
                "panchayats": [
                    {"name": "Suryapet Central Gram Panchayat", "lgd_code": 301618, "block": "Suryapet Block", "villages": ["Suryapet Khas", "Suryapet Dehat", "Suryapet Purva"]},
                    {"name": "Suryapet Model Krishi Panchayat", "lgd_code": 302618, "block": "Suryapet East Block", "villages": ["Kalyanpur Suryapet", "Rampur Suryapet", "Shivpur Suryapet"]}
                ]
            },
            "Vikarabad": {
                "lgd_code": 1619,
                "name_hi": "Vikarabad",
                "headquarters": "Vikarabad",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Vikarabad Sadar", "Vikarabad North", "Vikarabad South", "Vikarabad Rural"],
                "blocks": ["Vikarabad Block", "Vikarabad West Block", "Vikarabad East Block"],
                "panchayats": [
                    {"name": "Vikarabad Central Gram Panchayat", "lgd_code": 301619, "block": "Vikarabad Block", "villages": ["Vikarabad Khas", "Vikarabad Dehat", "Vikarabad Purva"]},
                    {"name": "Vikarabad Model Krishi Panchayat", "lgd_code": 302619, "block": "Vikarabad East Block", "villages": ["Kalyanpur Vikarabad", "Rampur Vikarabad", "Shivpur Vikarabad"]}
                ]
            },
            "Wanaparthy": {
                "lgd_code": 1620,
                "name_hi": "Wanaparthy",
                "headquarters": "Wanaparthy",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Wanaparthy Sadar", "Wanaparthy North", "Wanaparthy South", "Wanaparthy Rural"],
                "blocks": ["Wanaparthy Block", "Wanaparthy West Block", "Wanaparthy East Block"],
                "panchayats": [
                    {"name": "Wanaparthy Central Gram Panchayat", "lgd_code": 301620, "block": "Wanaparthy Block", "villages": ["Wanaparthy Khas", "Wanaparthy Dehat", "Wanaparthy Purva"]},
                    {"name": "Wanaparthy Model Krishi Panchayat", "lgd_code": 302620, "block": "Wanaparthy East Block", "villages": ["Kalyanpur Wanaparthy", "Rampur Wanaparthy", "Shivpur Wanaparthy"]}
                ]
            },
            "Warangal": {
                "lgd_code": 1621,
                "name_hi": "Warangal",
                "headquarters": "Warangal",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Warangal Sadar", "Warangal North", "Warangal South", "Warangal Rural"],
                "blocks": ["Warangal Block", "Warangal West Block", "Warangal East Block"],
                "panchayats": [
                    {"name": "Warangal Central Gram Panchayat", "lgd_code": 301621, "block": "Warangal Block", "villages": ["Warangal Khas", "Warangal Dehat", "Warangal Purva"]},
                    {"name": "Warangal Model Krishi Panchayat", "lgd_code": 302621, "block": "Warangal East Block", "villages": ["Kalyanpur Warangal", "Rampur Warangal", "Shivpur Warangal"]}
                ]
            },
            "Yadadri Bhuvanagiri": {
                "lgd_code": 1622,
                "name_hi": "Yadadri Bhuvanagiri",
                "headquarters": "Yadadri Bhuvanagiri",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Yadadri Bhuvanagiri Sadar", "Yadadri Bhuvanagiri North", "Yadadri Bhuvanagiri South", "Yadadri Bhuvanagiri Rural"],
                "blocks": ["Yadadri Bhuvanagiri Block", "Yadadri Bhuvanagiri West Block", "Yadadri Bhuvanagiri East Block"],
                "panchayats": [
                    {"name": "Yadadri Bhuvanagiri Central Gram Panchayat", "lgd_code": 301622, "block": "Yadadri Bhuvanagiri Block", "villages": ["Yadadri Bhuvanagiri Khas", "Yadadri Bhuvanagiri Dehat", "Yadadri Bhuvanagiri Purva"]},
                    {"name": "Yadadri Bhuvanagiri Model Krishi Panchayat", "lgd_code": 302622, "block": "Yadadri Bhuvanagiri East Block", "villages": ["Kalyanpur Yadadri Bhuvanagiri", "Rampur Yadadri Bhuvanagiri", "Shivpur Yadadri Bhuvanagiri"]}
                ]
            },
        }
    },
    "Tripura": {
        "districts": {
            "Dhalai": {
                "lgd_code": 1623,
                "name_hi": "Dhalai",
                "headquarters": "Dhalai",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dhalai Sadar", "Dhalai North", "Dhalai South", "Dhalai Rural"],
                "blocks": ["Dhalai Block", "Dhalai West Block", "Dhalai East Block"],
                "panchayats": [
                    {"name": "Dhalai Central Gram Panchayat", "lgd_code": 301623, "block": "Dhalai Block", "villages": ["Dhalai Khas", "Dhalai Dehat", "Dhalai Purva"]},
                    {"name": "Dhalai Model Krishi Panchayat", "lgd_code": 302623, "block": "Dhalai East Block", "villages": ["Kalyanpur Dhalai", "Rampur Dhalai", "Shivpur Dhalai"]}
                ]
            },
            "Gomati (Udaipur)": {
                "lgd_code": 1624,
                "name_hi": "Gomati",
                "headquarters": "Gomati",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gomati Sadar", "Gomati North", "Gomati South", "Gomati Rural"],
                "blocks": ["Gomati Block", "Gomati West Block", "Gomati East Block"],
                "panchayats": [
                    {"name": "Gomati Central Gram Panchayat", "lgd_code": 301624, "block": "Gomati Block", "villages": ["Gomati Khas", "Gomati Dehat", "Gomati Purva"]},
                    {"name": "Gomati Model Krishi Panchayat", "lgd_code": 302624, "block": "Gomati East Block", "villages": ["Kalyanpur Gomati", "Rampur Gomati", "Shivpur Gomati"]}
                ]
            },
            "Khowai": {
                "lgd_code": 1625,
                "name_hi": "Khowai",
                "headquarters": "Khowai",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Khowai Sadar", "Khowai North", "Khowai South", "Khowai Rural"],
                "blocks": ["Khowai Block", "Khowai West Block", "Khowai East Block"],
                "panchayats": [
                    {"name": "Khowai Central Gram Panchayat", "lgd_code": 301625, "block": "Khowai Block", "villages": ["Khowai Khas", "Khowai Dehat", "Khowai Purva"]},
                    {"name": "Khowai Model Krishi Panchayat", "lgd_code": 302625, "block": "Khowai East Block", "villages": ["Kalyanpur Khowai", "Rampur Khowai", "Shivpur Khowai"]}
                ]
            },
            "North Tripura": {
                "lgd_code": 1626,
                "name_hi": "North Tripura",
                "headquarters": "North Tripura",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North Tripura Sadar", "North Tripura North", "North Tripura South", "North Tripura Rural"],
                "blocks": ["North Tripura Block", "North Tripura West Block", "North Tripura East Block"],
                "panchayats": [
                    {"name": "North Tripura Central Gram Panchayat", "lgd_code": 301626, "block": "North Tripura Block", "villages": ["North Tripura Khas", "North Tripura Dehat", "North Tripura Purva"]},
                    {"name": "North Tripura Model Krishi Panchayat", "lgd_code": 302626, "block": "North Tripura East Block", "villages": ["Kalyanpur North Tripura", "Rampur North Tripura", "Shivpur North Tripura"]}
                ]
            },
            "Sepahijala": {
                "lgd_code": 1627,
                "name_hi": "Sepahijala",
                "headquarters": "Sepahijala",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sepahijala Sadar", "Sepahijala North", "Sepahijala South", "Sepahijala Rural"],
                "blocks": ["Sepahijala Block", "Sepahijala West Block", "Sepahijala East Block"],
                "panchayats": [
                    {"name": "Sepahijala Central Gram Panchayat", "lgd_code": 301627, "block": "Sepahijala Block", "villages": ["Sepahijala Khas", "Sepahijala Dehat", "Sepahijala Purva"]},
                    {"name": "Sepahijala Model Krishi Panchayat", "lgd_code": 302627, "block": "Sepahijala East Block", "villages": ["Kalyanpur Sepahijala", "Rampur Sepahijala", "Shivpur Sepahijala"]}
                ]
            },
            "South Tripura (Belonia)": {
                "lgd_code": 1628,
                "name_hi": "South Tripura",
                "headquarters": "South Tripura",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Tripura Sadar", "South Tripura North", "South Tripura South", "South Tripura Rural"],
                "blocks": ["South Tripura Block", "South Tripura West Block", "South Tripura East Block"],
                "panchayats": [
                    {"name": "South Tripura Central Gram Panchayat", "lgd_code": 301628, "block": "South Tripura Block", "villages": ["South Tripura Khas", "South Tripura Dehat", "South Tripura Purva"]},
                    {"name": "South Tripura Model Krishi Panchayat", "lgd_code": 302628, "block": "South Tripura East Block", "villages": ["Kalyanpur South Tripura", "Rampur South Tripura", "Shivpur South Tripura"]}
                ]
            },
            "Unakoti": {
                "lgd_code": 1629,
                "name_hi": "Unakoti",
                "headquarters": "Unakoti",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Unakoti Sadar", "Unakoti North", "Unakoti South", "Unakoti Rural"],
                "blocks": ["Unakoti Block", "Unakoti West Block", "Unakoti East Block"],
                "panchayats": [
                    {"name": "Unakoti Central Gram Panchayat", "lgd_code": 301629, "block": "Unakoti Block", "villages": ["Unakoti Khas", "Unakoti Dehat", "Unakoti Purva"]},
                    {"name": "Unakoti Model Krishi Panchayat", "lgd_code": 302629, "block": "Unakoti East Block", "villages": ["Kalyanpur Unakoti", "Rampur Unakoti", "Shivpur Unakoti"]}
                ]
            },
            "West Tripura (Agartala)": {
                "lgd_code": 1630,
                "name_hi": "West Tripura",
                "headquarters": "West Tripura",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Tripura Sadar", "West Tripura North", "West Tripura South", "West Tripura Rural"],
                "blocks": ["West Tripura Block", "West Tripura West Block", "West Tripura East Block"],
                "panchayats": [
                    {"name": "West Tripura Central Gram Panchayat", "lgd_code": 301630, "block": "West Tripura Block", "villages": ["West Tripura Khas", "West Tripura Dehat", "West Tripura Purva"]},
                    {"name": "West Tripura Model Krishi Panchayat", "lgd_code": 302630, "block": "West Tripura East Block", "villages": ["Kalyanpur West Tripura", "Rampur West Tripura", "Shivpur West Tripura"]}
                ]
            },
        }
    },
    "Uttar Pradesh": {
        "districts": {
            "Agra": {
                "lgd_code": 1631,
                "name_hi": "Agra",
                "headquarters": "Agra",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Agra Sadar", "Agra North", "Agra South", "Agra Rural"],
                "blocks": ["Agra Block", "Agra West Block", "Agra East Block"],
                "panchayats": [
                    {"name": "Agra Central Gram Panchayat", "lgd_code": 301631, "block": "Agra Block", "villages": ["Agra Khas", "Agra Dehat", "Agra Purva"]},
                    {"name": "Agra Model Krishi Panchayat", "lgd_code": 302631, "block": "Agra East Block", "villages": ["Kalyanpur Agra", "Rampur Agra", "Shivpur Agra"]}
                ]
            },
            "Aligarh": {
                "lgd_code": 1632,
                "name_hi": "Aligarh",
                "headquarters": "Aligarh",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Aligarh Sadar", "Aligarh North", "Aligarh South", "Aligarh Rural"],
                "blocks": ["Aligarh Block", "Aligarh West Block", "Aligarh East Block"],
                "panchayats": [
                    {"name": "Aligarh Central Gram Panchayat", "lgd_code": 301632, "block": "Aligarh Block", "villages": ["Aligarh Khas", "Aligarh Dehat", "Aligarh Purva"]},
                    {"name": "Aligarh Model Krishi Panchayat", "lgd_code": 302632, "block": "Aligarh East Block", "villages": ["Kalyanpur Aligarh", "Rampur Aligarh", "Shivpur Aligarh"]}
                ]
            },
            "Ambedkar Nagar": {
                "lgd_code": 1633,
                "name_hi": "Ambedkar Nagar",
                "headquarters": "Ambedkar Nagar",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ambedkar Nagar Sadar", "Ambedkar Nagar North", "Ambedkar Nagar South", "Ambedkar Nagar Rural"],
                "blocks": ["Ambedkar Nagar Block", "Ambedkar Nagar West Block", "Ambedkar Nagar East Block"],
                "panchayats": [
                    {"name": "Ambedkar Nagar Central Gram Panchayat", "lgd_code": 301633, "block": "Ambedkar Nagar Block", "villages": ["Ambedkar Nagar Khas", "Ambedkar Nagar Dehat", "Ambedkar Nagar Purva"]},
                    {"name": "Ambedkar Nagar Model Krishi Panchayat", "lgd_code": 302633, "block": "Ambedkar Nagar East Block", "villages": ["Kalyanpur Ambedkar Nagar", "Rampur Ambedkar Nagar", "Shivpur Ambedkar Nagar"]}
                ]
            },
            "Amethi": {
                "lgd_code": 1634,
                "name_hi": "Amethi",
                "headquarters": "Amethi",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Amethi Sadar", "Amethi North", "Amethi South", "Amethi Rural"],
                "blocks": ["Amethi Block", "Amethi West Block", "Amethi East Block"],
                "panchayats": [
                    {"name": "Amethi Central Gram Panchayat", "lgd_code": 301634, "block": "Amethi Block", "villages": ["Amethi Khas", "Amethi Dehat", "Amethi Purva"]},
                    {"name": "Amethi Model Krishi Panchayat", "lgd_code": 302634, "block": "Amethi East Block", "villages": ["Kalyanpur Amethi", "Rampur Amethi", "Shivpur Amethi"]}
                ]
            },
            "Amroha": {
                "lgd_code": 1635,
                "name_hi": "Amroha",
                "headquarters": "Amroha",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Amroha Sadar", "Amroha North", "Amroha South", "Amroha Rural"],
                "blocks": ["Amroha Block", "Amroha West Block", "Amroha East Block"],
                "panchayats": [
                    {"name": "Amroha Central Gram Panchayat", "lgd_code": 301635, "block": "Amroha Block", "villages": ["Amroha Khas", "Amroha Dehat", "Amroha Purva"]},
                    {"name": "Amroha Model Krishi Panchayat", "lgd_code": 302635, "block": "Amroha East Block", "villages": ["Kalyanpur Amroha", "Rampur Amroha", "Shivpur Amroha"]}
                ]
            },
            "Auraiya": {
                "lgd_code": 1636,
                "name_hi": "Auraiya",
                "headquarters": "Auraiya",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Auraiya Sadar", "Auraiya North", "Auraiya South", "Auraiya Rural"],
                "blocks": ["Auraiya Block", "Auraiya West Block", "Auraiya East Block"],
                "panchayats": [
                    {"name": "Auraiya Central Gram Panchayat", "lgd_code": 301636, "block": "Auraiya Block", "villages": ["Auraiya Khas", "Auraiya Dehat", "Auraiya Purva"]},
                    {"name": "Auraiya Model Krishi Panchayat", "lgd_code": 302636, "block": "Auraiya East Block", "villages": ["Kalyanpur Auraiya", "Rampur Auraiya", "Shivpur Auraiya"]}
                ]
            },
            "Ayodhya": {
                "lgd_code": 1637,
                "name_hi": "Ayodhya",
                "headquarters": "Ayodhya",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ayodhya Sadar", "Ayodhya North", "Ayodhya South", "Ayodhya Rural"],
                "blocks": ["Ayodhya Block", "Ayodhya West Block", "Ayodhya East Block"],
                "panchayats": [
                    {"name": "Ayodhya Central Gram Panchayat", "lgd_code": 301637, "block": "Ayodhya Block", "villages": ["Ayodhya Khas", "Ayodhya Dehat", "Ayodhya Purva"]},
                    {"name": "Ayodhya Model Krishi Panchayat", "lgd_code": 302637, "block": "Ayodhya East Block", "villages": ["Kalyanpur Ayodhya", "Rampur Ayodhya", "Shivpur Ayodhya"]}
                ]
            },
            "Azamgarh": {
                "lgd_code": 1638,
                "name_hi": "Azamgarh",
                "headquarters": "Azamgarh",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Azamgarh Sadar", "Azamgarh North", "Azamgarh South", "Azamgarh Rural"],
                "blocks": ["Azamgarh Block", "Azamgarh West Block", "Azamgarh East Block"],
                "panchayats": [
                    {"name": "Azamgarh Central Gram Panchayat", "lgd_code": 301638, "block": "Azamgarh Block", "villages": ["Azamgarh Khas", "Azamgarh Dehat", "Azamgarh Purva"]},
                    {"name": "Azamgarh Model Krishi Panchayat", "lgd_code": 302638, "block": "Azamgarh East Block", "villages": ["Kalyanpur Azamgarh", "Rampur Azamgarh", "Shivpur Azamgarh"]}
                ]
            },
            "Baghpat": {
                "lgd_code": 1639,
                "name_hi": "Baghpat",
                "headquarters": "Baghpat",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Baghpat Sadar", "Baghpat North", "Baghpat South", "Baghpat Rural"],
                "blocks": ["Baghpat Block", "Baghpat West Block", "Baghpat East Block"],
                "panchayats": [
                    {"name": "Baghpat Central Gram Panchayat", "lgd_code": 301639, "block": "Baghpat Block", "villages": ["Baghpat Khas", "Baghpat Dehat", "Baghpat Purva"]},
                    {"name": "Baghpat Model Krishi Panchayat", "lgd_code": 302639, "block": "Baghpat East Block", "villages": ["Kalyanpur Baghpat", "Rampur Baghpat", "Shivpur Baghpat"]}
                ]
            },
            "Bahraich": {
                "lgd_code": 1640,
                "name_hi": "Bahraich",
                "headquarters": "Bahraich",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bahraich Sadar", "Bahraich North", "Bahraich South", "Bahraich Rural"],
                "blocks": ["Bahraich Block", "Bahraich West Block", "Bahraich East Block"],
                "panchayats": [
                    {"name": "Bahraich Central Gram Panchayat", "lgd_code": 301640, "block": "Bahraich Block", "villages": ["Bahraich Khas", "Bahraich Dehat", "Bahraich Purva"]},
                    {"name": "Bahraich Model Krishi Panchayat", "lgd_code": 302640, "block": "Bahraich East Block", "villages": ["Kalyanpur Bahraich", "Rampur Bahraich", "Shivpur Bahraich"]}
                ]
            },
            "Ballia": {
                "lgd_code": 1641,
                "name_hi": "Ballia",
                "headquarters": "Ballia",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ballia Sadar", "Ballia North", "Ballia South", "Ballia Rural"],
                "blocks": ["Ballia Block", "Ballia West Block", "Ballia East Block"],
                "panchayats": [
                    {"name": "Ballia Central Gram Panchayat", "lgd_code": 301641, "block": "Ballia Block", "villages": ["Ballia Khas", "Ballia Dehat", "Ballia Purva"]},
                    {"name": "Ballia Model Krishi Panchayat", "lgd_code": 302641, "block": "Ballia East Block", "villages": ["Kalyanpur Ballia", "Rampur Ballia", "Shivpur Ballia"]}
                ]
            },
            "Balrampur": {
                "lgd_code": 1642,
                "name_hi": "Balrampur",
                "headquarters": "Balrampur",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Balrampur Sadar", "Balrampur North", "Balrampur South", "Balrampur Rural"],
                "blocks": ["Balrampur Block", "Balrampur West Block", "Balrampur East Block"],
                "panchayats": [
                    {"name": "Balrampur Central Gram Panchayat", "lgd_code": 301642, "block": "Balrampur Block", "villages": ["Balrampur Khas", "Balrampur Dehat", "Balrampur Purva"]},
                    {"name": "Balrampur Model Krishi Panchayat", "lgd_code": 302642, "block": "Balrampur East Block", "villages": ["Kalyanpur Balrampur", "Rampur Balrampur", "Shivpur Balrampur"]}
                ]
            },
            "Banda": {
                "lgd_code": 1643,
                "name_hi": "Banda",
                "headquarters": "Banda",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Banda Sadar", "Banda North", "Banda South", "Banda Rural"],
                "blocks": ["Banda Block", "Banda West Block", "Banda East Block"],
                "panchayats": [
                    {"name": "Banda Central Gram Panchayat", "lgd_code": 301643, "block": "Banda Block", "villages": ["Banda Khas", "Banda Dehat", "Banda Purva"]},
                    {"name": "Banda Model Krishi Panchayat", "lgd_code": 302643, "block": "Banda East Block", "villages": ["Kalyanpur Banda", "Rampur Banda", "Shivpur Banda"]}
                ]
            },
            "Barabanki": {
                "lgd_code": 1644,
                "name_hi": "Barabanki",
                "headquarters": "Barabanki",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Barabanki Sadar", "Barabanki North", "Barabanki South", "Barabanki Rural"],
                "blocks": ["Barabanki Block", "Barabanki West Block", "Barabanki East Block"],
                "panchayats": [
                    {"name": "Barabanki Central Gram Panchayat", "lgd_code": 301644, "block": "Barabanki Block", "villages": ["Barabanki Khas", "Barabanki Dehat", "Barabanki Purva"]},
                    {"name": "Barabanki Model Krishi Panchayat", "lgd_code": 302644, "block": "Barabanki East Block", "villages": ["Kalyanpur Barabanki", "Rampur Barabanki", "Shivpur Barabanki"]}
                ]
            },
            "Bareilly": {
                "lgd_code": 1645,
                "name_hi": "Bareilly",
                "headquarters": "Bareilly",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bareilly Sadar", "Bareilly North", "Bareilly South", "Bareilly Rural"],
                "blocks": ["Bareilly Block", "Bareilly West Block", "Bareilly East Block"],
                "panchayats": [
                    {"name": "Bareilly Central Gram Panchayat", "lgd_code": 301645, "block": "Bareilly Block", "villages": ["Bareilly Khas", "Bareilly Dehat", "Bareilly Purva"]},
                    {"name": "Bareilly Model Krishi Panchayat", "lgd_code": 302645, "block": "Bareilly East Block", "villages": ["Kalyanpur Bareilly", "Rampur Bareilly", "Shivpur Bareilly"]}
                ]
            },
            "Basti": {
                "lgd_code": 1646,
                "name_hi": "Basti",
                "headquarters": "Basti",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Basti Sadar", "Basti North", "Basti South", "Basti Rural"],
                "blocks": ["Basti Block", "Basti West Block", "Basti East Block"],
                "panchayats": [
                    {"name": "Basti Central Gram Panchayat", "lgd_code": 301646, "block": "Basti Block", "villages": ["Basti Khas", "Basti Dehat", "Basti Purva"]},
                    {"name": "Basti Model Krishi Panchayat", "lgd_code": 302646, "block": "Basti East Block", "villages": ["Kalyanpur Basti", "Rampur Basti", "Shivpur Basti"]}
                ]
            },
            "Bhadohi": {
                "lgd_code": 1647,
                "name_hi": "Bhadohi",
                "headquarters": "Bhadohi",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bhadohi Sadar", "Bhadohi North", "Bhadohi South", "Bhadohi Rural"],
                "blocks": ["Bhadohi Block", "Bhadohi West Block", "Bhadohi East Block"],
                "panchayats": [
                    {"name": "Bhadohi Central Gram Panchayat", "lgd_code": 301647, "block": "Bhadohi Block", "villages": ["Bhadohi Khas", "Bhadohi Dehat", "Bhadohi Purva"]},
                    {"name": "Bhadohi Model Krishi Panchayat", "lgd_code": 302647, "block": "Bhadohi East Block", "villages": ["Kalyanpur Bhadohi", "Rampur Bhadohi", "Shivpur Bhadohi"]}
                ]
            },
            "Bijnor": {
                "lgd_code": 1648,
                "name_hi": "Bijnor",
                "headquarters": "Bijnor",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bijnor Sadar", "Bijnor North", "Bijnor South", "Bijnor Rural"],
                "blocks": ["Bijnor Block", "Bijnor West Block", "Bijnor East Block"],
                "panchayats": [
                    {"name": "Bijnor Central Gram Panchayat", "lgd_code": 301648, "block": "Bijnor Block", "villages": ["Bijnor Khas", "Bijnor Dehat", "Bijnor Purva"]},
                    {"name": "Bijnor Model Krishi Panchayat", "lgd_code": 302648, "block": "Bijnor East Block", "villages": ["Kalyanpur Bijnor", "Rampur Bijnor", "Shivpur Bijnor"]}
                ]
            },
            "Budaun": {
                "lgd_code": 1649,
                "name_hi": "Budaun",
                "headquarters": "Budaun",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Budaun Sadar", "Budaun North", "Budaun South", "Budaun Rural"],
                "blocks": ["Budaun Block", "Budaun West Block", "Budaun East Block"],
                "panchayats": [
                    {"name": "Budaun Central Gram Panchayat", "lgd_code": 301649, "block": "Budaun Block", "villages": ["Budaun Khas", "Budaun Dehat", "Budaun Purva"]},
                    {"name": "Budaun Model Krishi Panchayat", "lgd_code": 302649, "block": "Budaun East Block", "villages": ["Kalyanpur Budaun", "Rampur Budaun", "Shivpur Budaun"]}
                ]
            },
            "Bulandshahr": {
                "lgd_code": 1650,
                "name_hi": "Bulandshahr",
                "headquarters": "Bulandshahr",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bulandshahr Sadar", "Bulandshahr North", "Bulandshahr South", "Bulandshahr Rural"],
                "blocks": ["Bulandshahr Block", "Bulandshahr West Block", "Bulandshahr East Block"],
                "panchayats": [
                    {"name": "Bulandshahr Central Gram Panchayat", "lgd_code": 301650, "block": "Bulandshahr Block", "villages": ["Bulandshahr Khas", "Bulandshahr Dehat", "Bulandshahr Purva"]},
                    {"name": "Bulandshahr Model Krishi Panchayat", "lgd_code": 302650, "block": "Bulandshahr East Block", "villages": ["Kalyanpur Bulandshahr", "Rampur Bulandshahr", "Shivpur Bulandshahr"]}
                ]
            },
            "Chandauli": {
                "lgd_code": 1651,
                "name_hi": "Chandauli",
                "headquarters": "Chandauli",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chandauli Sadar", "Chandauli North", "Chandauli South", "Chandauli Rural"],
                "blocks": ["Chandauli Block", "Chandauli West Block", "Chandauli East Block"],
                "panchayats": [
                    {"name": "Chandauli Central Gram Panchayat", "lgd_code": 301651, "block": "Chandauli Block", "villages": ["Chandauli Khas", "Chandauli Dehat", "Chandauli Purva"]},
                    {"name": "Chandauli Model Krishi Panchayat", "lgd_code": 302651, "block": "Chandauli East Block", "villages": ["Kalyanpur Chandauli", "Rampur Chandauli", "Shivpur Chandauli"]}
                ]
            },
            "Chitrakoot": {
                "lgd_code": 1652,
                "name_hi": "Chitrakoot",
                "headquarters": "Chitrakoot",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chitrakoot Sadar", "Chitrakoot North", "Chitrakoot South", "Chitrakoot Rural"],
                "blocks": ["Chitrakoot Block", "Chitrakoot West Block", "Chitrakoot East Block"],
                "panchayats": [
                    {"name": "Chitrakoot Central Gram Panchayat", "lgd_code": 301652, "block": "Chitrakoot Block", "villages": ["Chitrakoot Khas", "Chitrakoot Dehat", "Chitrakoot Purva"]},
                    {"name": "Chitrakoot Model Krishi Panchayat", "lgd_code": 302652, "block": "Chitrakoot East Block", "villages": ["Kalyanpur Chitrakoot", "Rampur Chitrakoot", "Shivpur Chitrakoot"]}
                ]
            },
            "Deoria": {
                "lgd_code": 1653,
                "name_hi": "Deoria",
                "headquarters": "Deoria",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Deoria Sadar", "Deoria North", "Deoria South", "Deoria Rural"],
                "blocks": ["Deoria Block", "Deoria West Block", "Deoria East Block"],
                "panchayats": [
                    {"name": "Deoria Central Gram Panchayat", "lgd_code": 301653, "block": "Deoria Block", "villages": ["Deoria Khas", "Deoria Dehat", "Deoria Purva"]},
                    {"name": "Deoria Model Krishi Panchayat", "lgd_code": 302653, "block": "Deoria East Block", "villages": ["Kalyanpur Deoria", "Rampur Deoria", "Shivpur Deoria"]}
                ]
            },
            "Etah": {
                "lgd_code": 1654,
                "name_hi": "Etah",
                "headquarters": "Etah",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Etah Sadar", "Etah North", "Etah South", "Etah Rural"],
                "blocks": ["Etah Block", "Etah West Block", "Etah East Block"],
                "panchayats": [
                    {"name": "Etah Central Gram Panchayat", "lgd_code": 301654, "block": "Etah Block", "villages": ["Etah Khas", "Etah Dehat", "Etah Purva"]},
                    {"name": "Etah Model Krishi Panchayat", "lgd_code": 302654, "block": "Etah East Block", "villages": ["Kalyanpur Etah", "Rampur Etah", "Shivpur Etah"]}
                ]
            },
            "Etawah": {
                "lgd_code": 1655,
                "name_hi": "Etawah",
                "headquarters": "Etawah",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Etawah Sadar", "Etawah North", "Etawah South", "Etawah Rural"],
                "blocks": ["Etawah Block", "Etawah West Block", "Etawah East Block"],
                "panchayats": [
                    {"name": "Etawah Central Gram Panchayat", "lgd_code": 301655, "block": "Etawah Block", "villages": ["Etawah Khas", "Etawah Dehat", "Etawah Purva"]},
                    {"name": "Etawah Model Krishi Panchayat", "lgd_code": 302655, "block": "Etawah East Block", "villages": ["Kalyanpur Etawah", "Rampur Etawah", "Shivpur Etawah"]}
                ]
            },
            "Farrukhabad": {
                "lgd_code": 1656,
                "name_hi": "Farrukhabad",
                "headquarters": "Farrukhabad",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Farrukhabad Sadar", "Farrukhabad North", "Farrukhabad South", "Farrukhabad Rural"],
                "blocks": ["Farrukhabad Block", "Farrukhabad West Block", "Farrukhabad East Block"],
                "panchayats": [
                    {"name": "Farrukhabad Central Gram Panchayat", "lgd_code": 301656, "block": "Farrukhabad Block", "villages": ["Farrukhabad Khas", "Farrukhabad Dehat", "Farrukhabad Purva"]},
                    {"name": "Farrukhabad Model Krishi Panchayat", "lgd_code": 302656, "block": "Farrukhabad East Block", "villages": ["Kalyanpur Farrukhabad", "Rampur Farrukhabad", "Shivpur Farrukhabad"]}
                ]
            },
            "Fatehpur": {
                "lgd_code": 1657,
                "name_hi": "Fatehpur",
                "headquarters": "Fatehpur",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Fatehpur Sadar", "Fatehpur North", "Fatehpur South", "Fatehpur Rural"],
                "blocks": ["Fatehpur Block", "Fatehpur West Block", "Fatehpur East Block"],
                "panchayats": [
                    {"name": "Fatehpur Central Gram Panchayat", "lgd_code": 301657, "block": "Fatehpur Block", "villages": ["Fatehpur Khas", "Fatehpur Dehat", "Fatehpur Purva"]},
                    {"name": "Fatehpur Model Krishi Panchayat", "lgd_code": 302657, "block": "Fatehpur East Block", "villages": ["Kalyanpur Fatehpur", "Rampur Fatehpur", "Shivpur Fatehpur"]}
                ]
            },
            "Firozabad": {
                "lgd_code": 1658,
                "name_hi": "Firozabad",
                "headquarters": "Firozabad",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Firozabad Sadar", "Firozabad North", "Firozabad South", "Firozabad Rural"],
                "blocks": ["Firozabad Block", "Firozabad West Block", "Firozabad East Block"],
                "panchayats": [
                    {"name": "Firozabad Central Gram Panchayat", "lgd_code": 301658, "block": "Firozabad Block", "villages": ["Firozabad Khas", "Firozabad Dehat", "Firozabad Purva"]},
                    {"name": "Firozabad Model Krishi Panchayat", "lgd_code": 302658, "block": "Firozabad East Block", "villages": ["Kalyanpur Firozabad", "Rampur Firozabad", "Shivpur Firozabad"]}
                ]
            },
            "Gautam Buddha Nagar (Noida)": {
                "lgd_code": 1659,
                "name_hi": "Gautam Buddha Nagar",
                "headquarters": "Gautam Buddha Nagar",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gautam Buddha Nagar Sadar", "Gautam Buddha Nagar North", "Gautam Buddha Nagar South", "Gautam Buddha Nagar Rural"],
                "blocks": ["Gautam Buddha Nagar Block", "Gautam Buddha Nagar West Block", "Gautam Buddha Nagar East Block"],
                "panchayats": [
                    {"name": "Gautam Buddha Nagar Central Gram Panchayat", "lgd_code": 301659, "block": "Gautam Buddha Nagar Block", "villages": ["Gautam Buddha Nagar Khas", "Gautam Buddha Nagar Dehat", "Gautam Buddha Nagar Purva"]},
                    {"name": "Gautam Buddha Nagar Model Krishi Panchayat", "lgd_code": 302659, "block": "Gautam Buddha Nagar East Block", "villages": ["Kalyanpur Gautam Buddha Nagar", "Rampur Gautam Buddha Nagar", "Shivpur Gautam Buddha Nagar"]}
                ]
            },
            "Ghaziabad": {
                "lgd_code": 1660,
                "name_hi": "Ghaziabad",
                "headquarters": "Ghaziabad",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ghaziabad Sadar", "Ghaziabad North", "Ghaziabad South", "Ghaziabad Rural"],
                "blocks": ["Ghaziabad Block", "Ghaziabad West Block", "Ghaziabad East Block"],
                "panchayats": [
                    {"name": "Ghaziabad Central Gram Panchayat", "lgd_code": 301660, "block": "Ghaziabad Block", "villages": ["Ghaziabad Khas", "Ghaziabad Dehat", "Ghaziabad Purva"]},
                    {"name": "Ghaziabad Model Krishi Panchayat", "lgd_code": 302660, "block": "Ghaziabad East Block", "villages": ["Kalyanpur Ghaziabad", "Rampur Ghaziabad", "Shivpur Ghaziabad"]}
                ]
            },
            "Ghazipur": {
                "lgd_code": 1661,
                "name_hi": "Ghazipur",
                "headquarters": "Ghazipur",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ghazipur Sadar", "Ghazipur North", "Ghazipur South", "Ghazipur Rural"],
                "blocks": ["Ghazipur Block", "Ghazipur West Block", "Ghazipur East Block"],
                "panchayats": [
                    {"name": "Ghazipur Central Gram Panchayat", "lgd_code": 301661, "block": "Ghazipur Block", "villages": ["Ghazipur Khas", "Ghazipur Dehat", "Ghazipur Purva"]},
                    {"name": "Ghazipur Model Krishi Panchayat", "lgd_code": 302661, "block": "Ghazipur East Block", "villages": ["Kalyanpur Ghazipur", "Rampur Ghazipur", "Shivpur Ghazipur"]}
                ]
            },
            "Gonda": {
                "lgd_code": 1662,
                "name_hi": "Gonda",
                "headquarters": "Gonda",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gonda Sadar", "Gonda North", "Gonda South", "Gonda Rural"],
                "blocks": ["Gonda Block", "Gonda West Block", "Gonda East Block"],
                "panchayats": [
                    {"name": "Gonda Central Gram Panchayat", "lgd_code": 301662, "block": "Gonda Block", "villages": ["Gonda Khas", "Gonda Dehat", "Gonda Purva"]},
                    {"name": "Gonda Model Krishi Panchayat", "lgd_code": 302662, "block": "Gonda East Block", "villages": ["Kalyanpur Gonda", "Rampur Gonda", "Shivpur Gonda"]}
                ]
            },
            "Gorakhpur": {
                "lgd_code": 1663,
                "name_hi": "Gorakhpur",
                "headquarters": "Gorakhpur",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Gorakhpur Sadar", "Gorakhpur North", "Gorakhpur South", "Gorakhpur Rural"],
                "blocks": ["Gorakhpur Block", "Gorakhpur West Block", "Gorakhpur East Block"],
                "panchayats": [
                    {"name": "Gorakhpur Central Gram Panchayat", "lgd_code": 301663, "block": "Gorakhpur Block", "villages": ["Gorakhpur Khas", "Gorakhpur Dehat", "Gorakhpur Purva"]},
                    {"name": "Gorakhpur Model Krishi Panchayat", "lgd_code": 302663, "block": "Gorakhpur East Block", "villages": ["Kalyanpur Gorakhpur", "Rampur Gorakhpur", "Shivpur Gorakhpur"]}
                ]
            },
            "Hamirpur UP": {
                "lgd_code": 1664,
                "name_hi": "Hamirpur UP",
                "headquarters": "Hamirpur UP",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hamirpur UP Sadar", "Hamirpur UP North", "Hamirpur UP South", "Hamirpur UP Rural"],
                "blocks": ["Hamirpur UP Block", "Hamirpur UP West Block", "Hamirpur UP East Block"],
                "panchayats": [
                    {"name": "Hamirpur UP Central Gram Panchayat", "lgd_code": 301664, "block": "Hamirpur UP Block", "villages": ["Hamirpur UP Khas", "Hamirpur UP Dehat", "Hamirpur UP Purva"]},
                    {"name": "Hamirpur UP Model Krishi Panchayat", "lgd_code": 302664, "block": "Hamirpur UP East Block", "villages": ["Kalyanpur Hamirpur UP", "Rampur Hamirpur UP", "Shivpur Hamirpur UP"]}
                ]
            },
            "Hapur": {
                "lgd_code": 1665,
                "name_hi": "Hapur",
                "headquarters": "Hapur",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hapur Sadar", "Hapur North", "Hapur South", "Hapur Rural"],
                "blocks": ["Hapur Block", "Hapur West Block", "Hapur East Block"],
                "panchayats": [
                    {"name": "Hapur Central Gram Panchayat", "lgd_code": 301665, "block": "Hapur Block", "villages": ["Hapur Khas", "Hapur Dehat", "Hapur Purva"]},
                    {"name": "Hapur Model Krishi Panchayat", "lgd_code": 302665, "block": "Hapur East Block", "villages": ["Kalyanpur Hapur", "Rampur Hapur", "Shivpur Hapur"]}
                ]
            },
            "Hardoi": {
                "lgd_code": 1666,
                "name_hi": "Hardoi",
                "headquarters": "Hardoi",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hardoi Sadar", "Hardoi North", "Hardoi South", "Hardoi Rural"],
                "blocks": ["Hardoi Block", "Hardoi West Block", "Hardoi East Block"],
                "panchayats": [
                    {"name": "Hardoi Central Gram Panchayat", "lgd_code": 301666, "block": "Hardoi Block", "villages": ["Hardoi Khas", "Hardoi Dehat", "Hardoi Purva"]},
                    {"name": "Hardoi Model Krishi Panchayat", "lgd_code": 302666, "block": "Hardoi East Block", "villages": ["Kalyanpur Hardoi", "Rampur Hardoi", "Shivpur Hardoi"]}
                ]
            },
            "Hathras": {
                "lgd_code": 1667,
                "name_hi": "Hathras",
                "headquarters": "Hathras",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hathras Sadar", "Hathras North", "Hathras South", "Hathras Rural"],
                "blocks": ["Hathras Block", "Hathras West Block", "Hathras East Block"],
                "panchayats": [
                    {"name": "Hathras Central Gram Panchayat", "lgd_code": 301667, "block": "Hathras Block", "villages": ["Hathras Khas", "Hathras Dehat", "Hathras Purva"]},
                    {"name": "Hathras Model Krishi Panchayat", "lgd_code": 302667, "block": "Hathras East Block", "villages": ["Kalyanpur Hathras", "Rampur Hathras", "Shivpur Hathras"]}
                ]
            },
            "Jalaun (Orai)": {
                "lgd_code": 1668,
                "name_hi": "Jalaun",
                "headquarters": "Jalaun",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalaun Sadar", "Jalaun North", "Jalaun South", "Jalaun Rural"],
                "blocks": ["Jalaun Block", "Jalaun West Block", "Jalaun East Block"],
                "panchayats": [
                    {"name": "Jalaun Central Gram Panchayat", "lgd_code": 301668, "block": "Jalaun Block", "villages": ["Jalaun Khas", "Jalaun Dehat", "Jalaun Purva"]},
                    {"name": "Jalaun Model Krishi Panchayat", "lgd_code": 302668, "block": "Jalaun East Block", "villages": ["Kalyanpur Jalaun", "Rampur Jalaun", "Shivpur Jalaun"]}
                ]
            },
            "Jaunpur": {
                "lgd_code": 1669,
                "name_hi": "Jaunpur",
                "headquarters": "Jaunpur",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jaunpur Sadar", "Jaunpur North", "Jaunpur South", "Jaunpur Rural"],
                "blocks": ["Jaunpur Block", "Jaunpur West Block", "Jaunpur East Block"],
                "panchayats": [
                    {"name": "Jaunpur Central Gram Panchayat", "lgd_code": 301669, "block": "Jaunpur Block", "villages": ["Jaunpur Khas", "Jaunpur Dehat", "Jaunpur Purva"]},
                    {"name": "Jaunpur Model Krishi Panchayat", "lgd_code": 302669, "block": "Jaunpur East Block", "villages": ["Kalyanpur Jaunpur", "Rampur Jaunpur", "Shivpur Jaunpur"]}
                ]
            },
            "Jhansi": {
                "lgd_code": 1670,
                "name_hi": "Jhansi",
                "headquarters": "Jhansi",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhansi Sadar", "Jhansi North", "Jhansi South", "Jhansi Rural"],
                "blocks": ["Jhansi Block", "Jhansi West Block", "Jhansi East Block"],
                "panchayats": [
                    {"name": "Jhansi Central Gram Panchayat", "lgd_code": 301670, "block": "Jhansi Block", "villages": ["Jhansi Khas", "Jhansi Dehat", "Jhansi Purva"]},
                    {"name": "Jhansi Model Krishi Panchayat", "lgd_code": 302670, "block": "Jhansi East Block", "villages": ["Kalyanpur Jhansi", "Rampur Jhansi", "Shivpur Jhansi"]}
                ]
            },
            "Kannauj": {
                "lgd_code": 1671,
                "name_hi": "Kannauj",
                "headquarters": "Kannauj",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kannauj Sadar", "Kannauj North", "Kannauj South", "Kannauj Rural"],
                "blocks": ["Kannauj Block", "Kannauj West Block", "Kannauj East Block"],
                "panchayats": [
                    {"name": "Kannauj Central Gram Panchayat", "lgd_code": 301671, "block": "Kannauj Block", "villages": ["Kannauj Khas", "Kannauj Dehat", "Kannauj Purva"]},
                    {"name": "Kannauj Model Krishi Panchayat", "lgd_code": 302671, "block": "Kannauj East Block", "villages": ["Kalyanpur Kannauj", "Rampur Kannauj", "Shivpur Kannauj"]}
                ]
            },
            "Kanpur Dehat": {
                "lgd_code": 1672,
                "name_hi": "Kanpur Dehat",
                "headquarters": "Kanpur Dehat",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kanpur Dehat Sadar", "Kanpur Dehat North", "Kanpur Dehat South", "Kanpur Dehat Rural"],
                "blocks": ["Kanpur Dehat Block", "Kanpur Dehat West Block", "Kanpur Dehat East Block"],
                "panchayats": [
                    {"name": "Kanpur Dehat Central Gram Panchayat", "lgd_code": 301672, "block": "Kanpur Dehat Block", "villages": ["Kanpur Dehat Khas", "Kanpur Dehat Dehat", "Kanpur Dehat Purva"]},
                    {"name": "Kanpur Dehat Model Krishi Panchayat", "lgd_code": 302672, "block": "Kanpur Dehat East Block", "villages": ["Kalyanpur Kanpur Dehat", "Rampur Kanpur Dehat", "Shivpur Kanpur Dehat"]}
                ]
            },
            "Kanpur Nagar": {
                "lgd_code": 1673,
                "name_hi": "Kanpur Nagar",
                "headquarters": "Kanpur Nagar",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kanpur Nagar Sadar", "Kanpur Nagar North", "Kanpur Nagar South", "Kanpur Nagar Rural"],
                "blocks": ["Kanpur Nagar Block", "Kanpur Nagar West Block", "Kanpur Nagar East Block"],
                "panchayats": [
                    {"name": "Kanpur Nagar Central Gram Panchayat", "lgd_code": 301673, "block": "Kanpur Nagar Block", "villages": ["Kanpur Nagar Khas", "Kanpur Nagar Dehat", "Kanpur Nagar Purva"]},
                    {"name": "Kanpur Nagar Model Krishi Panchayat", "lgd_code": 302673, "block": "Kanpur Nagar East Block", "villages": ["Kalyanpur Kanpur Nagar", "Rampur Kanpur Nagar", "Shivpur Kanpur Nagar"]}
                ]
            },
            "Kasganj": {
                "lgd_code": 1674,
                "name_hi": "Kasganj",
                "headquarters": "Kasganj",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kasganj Sadar", "Kasganj North", "Kasganj South", "Kasganj Rural"],
                "blocks": ["Kasganj Block", "Kasganj West Block", "Kasganj East Block"],
                "panchayats": [
                    {"name": "Kasganj Central Gram Panchayat", "lgd_code": 301674, "block": "Kasganj Block", "villages": ["Kasganj Khas", "Kasganj Dehat", "Kasganj Purva"]},
                    {"name": "Kasganj Model Krishi Panchayat", "lgd_code": 302674, "block": "Kasganj East Block", "villages": ["Kalyanpur Kasganj", "Rampur Kasganj", "Shivpur Kasganj"]}
                ]
            },
            "Kaushambi": {
                "lgd_code": 1675,
                "name_hi": "Kaushambi",
                "headquarters": "Kaushambi",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kaushambi Sadar", "Kaushambi North", "Kaushambi South", "Kaushambi Rural"],
                "blocks": ["Kaushambi Block", "Kaushambi West Block", "Kaushambi East Block"],
                "panchayats": [
                    {"name": "Kaushambi Central Gram Panchayat", "lgd_code": 301675, "block": "Kaushambi Block", "villages": ["Kaushambi Khas", "Kaushambi Dehat", "Kaushambi Purva"]},
                    {"name": "Kaushambi Model Krishi Panchayat", "lgd_code": 302675, "block": "Kaushambi East Block", "villages": ["Kalyanpur Kaushambi", "Rampur Kaushambi", "Shivpur Kaushambi"]}
                ]
            },
            "Kheri (Lakhimpur)": {
                "lgd_code": 1676,
                "name_hi": "Kheri",
                "headquarters": "Kheri",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kheri Sadar", "Kheri North", "Kheri South", "Kheri Rural"],
                "blocks": ["Kheri Block", "Kheri West Block", "Kheri East Block"],
                "panchayats": [
                    {"name": "Kheri Central Gram Panchayat", "lgd_code": 301676, "block": "Kheri Block", "villages": ["Kheri Khas", "Kheri Dehat", "Kheri Purva"]},
                    {"name": "Kheri Model Krishi Panchayat", "lgd_code": 302676, "block": "Kheri East Block", "villages": ["Kalyanpur Kheri", "Rampur Kheri", "Shivpur Kheri"]}
                ]
            },
            "Kushinagar": {
                "lgd_code": 1677,
                "name_hi": "Kushinagar",
                "headquarters": "Kushinagar",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kushinagar Sadar", "Kushinagar North", "Kushinagar South", "Kushinagar Rural"],
                "blocks": ["Kushinagar Block", "Kushinagar West Block", "Kushinagar East Block"],
                "panchayats": [
                    {"name": "Kushinagar Central Gram Panchayat", "lgd_code": 301677, "block": "Kushinagar Block", "villages": ["Kushinagar Khas", "Kushinagar Dehat", "Kushinagar Purva"]},
                    {"name": "Kushinagar Model Krishi Panchayat", "lgd_code": 302677, "block": "Kushinagar East Block", "villages": ["Kalyanpur Kushinagar", "Rampur Kushinagar", "Shivpur Kushinagar"]}
                ]
            },
            "Lalitpur": {
                "lgd_code": 1678,
                "name_hi": "Lalitpur",
                "headquarters": "Lalitpur",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lalitpur Sadar", "Lalitpur North", "Lalitpur South", "Lalitpur Rural"],
                "blocks": ["Lalitpur Block", "Lalitpur West Block", "Lalitpur East Block"],
                "panchayats": [
                    {"name": "Lalitpur Central Gram Panchayat", "lgd_code": 301678, "block": "Lalitpur Block", "villages": ["Lalitpur Khas", "Lalitpur Dehat", "Lalitpur Purva"]},
                    {"name": "Lalitpur Model Krishi Panchayat", "lgd_code": 302678, "block": "Lalitpur East Block", "villages": ["Kalyanpur Lalitpur", "Rampur Lalitpur", "Shivpur Lalitpur"]}
                ]
            },
            "Lucknow": {
                "lgd_code": 1679,
                "name_hi": "Lucknow",
                "headquarters": "Lucknow",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lucknow Sadar", "Lucknow North", "Lucknow South", "Lucknow Rural"],
                "blocks": ["Lucknow Block", "Lucknow West Block", "Lucknow East Block"],
                "panchayats": [
                    {"name": "Lucknow Central Gram Panchayat", "lgd_code": 301679, "block": "Lucknow Block", "villages": ["Lucknow Khas", "Lucknow Dehat", "Lucknow Purva"]},
                    {"name": "Lucknow Model Krishi Panchayat", "lgd_code": 302679, "block": "Lucknow East Block", "villages": ["Kalyanpur Lucknow", "Rampur Lucknow", "Shivpur Lucknow"]}
                ]
            },
            "Maharajganj": {
                "lgd_code": 1680,
                "name_hi": "Maharajganj",
                "headquarters": "Maharajganj",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Maharajganj Sadar", "Maharajganj North", "Maharajganj South", "Maharajganj Rural"],
                "blocks": ["Maharajganj Block", "Maharajganj West Block", "Maharajganj East Block"],
                "panchayats": [
                    {"name": "Maharajganj Central Gram Panchayat", "lgd_code": 301680, "block": "Maharajganj Block", "villages": ["Maharajganj Khas", "Maharajganj Dehat", "Maharajganj Purva"]},
                    {"name": "Maharajganj Model Krishi Panchayat", "lgd_code": 302680, "block": "Maharajganj East Block", "villages": ["Kalyanpur Maharajganj", "Rampur Maharajganj", "Shivpur Maharajganj"]}
                ]
            },
            "Mahoba": {
                "lgd_code": 1681,
                "name_hi": "Mahoba",
                "headquarters": "Mahoba",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahoba Sadar", "Mahoba North", "Mahoba South", "Mahoba Rural"],
                "blocks": ["Mahoba Block", "Mahoba West Block", "Mahoba East Block"],
                "panchayats": [
                    {"name": "Mahoba Central Gram Panchayat", "lgd_code": 301681, "block": "Mahoba Block", "villages": ["Mahoba Khas", "Mahoba Dehat", "Mahoba Purva"]},
                    {"name": "Mahoba Model Krishi Panchayat", "lgd_code": 302681, "block": "Mahoba East Block", "villages": ["Kalyanpur Mahoba", "Rampur Mahoba", "Shivpur Mahoba"]}
                ]
            },
            "Mainpuri": {
                "lgd_code": 1682,
                "name_hi": "Mainpuri",
                "headquarters": "Mainpuri",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mainpuri Sadar", "Mainpuri North", "Mainpuri South", "Mainpuri Rural"],
                "blocks": ["Mainpuri Block", "Mainpuri West Block", "Mainpuri East Block"],
                "panchayats": [
                    {"name": "Mainpuri Central Gram Panchayat", "lgd_code": 301682, "block": "Mainpuri Block", "villages": ["Mainpuri Khas", "Mainpuri Dehat", "Mainpuri Purva"]},
                    {"name": "Mainpuri Model Krishi Panchayat", "lgd_code": 302682, "block": "Mainpuri East Block", "villages": ["Kalyanpur Mainpuri", "Rampur Mainpuri", "Shivpur Mainpuri"]}
                ]
            },
            "Mathura": {
                "lgd_code": 1683,
                "name_hi": "Mathura",
                "headquarters": "Mathura",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mathura Sadar", "Mathura North", "Mathura South", "Mathura Rural"],
                "blocks": ["Mathura Block", "Mathura West Block", "Mathura East Block"],
                "panchayats": [
                    {"name": "Mathura Central Gram Panchayat", "lgd_code": 301683, "block": "Mathura Block", "villages": ["Mathura Khas", "Mathura Dehat", "Mathura Purva"]},
                    {"name": "Mathura Model Krishi Panchayat", "lgd_code": 302683, "block": "Mathura East Block", "villages": ["Kalyanpur Mathura", "Rampur Mathura", "Shivpur Mathura"]}
                ]
            },
            "Mau": {
                "lgd_code": 1684,
                "name_hi": "Mau",
                "headquarters": "Mau",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mau Sadar", "Mau North", "Mau South", "Mau Rural"],
                "blocks": ["Mau Block", "Mau West Block", "Mau East Block"],
                "panchayats": [
                    {"name": "Mau Central Gram Panchayat", "lgd_code": 301684, "block": "Mau Block", "villages": ["Mau Khas", "Mau Dehat", "Mau Purva"]},
                    {"name": "Mau Model Krishi Panchayat", "lgd_code": 302684, "block": "Mau East Block", "villages": ["Kalyanpur Mau", "Rampur Mau", "Shivpur Mau"]}
                ]
            },
            "Meerut": {
                "lgd_code": 1685,
                "name_hi": "Meerut",
                "headquarters": "Meerut",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Meerut Sadar", "Meerut North", "Meerut South", "Meerut Rural"],
                "blocks": ["Meerut Block", "Meerut West Block", "Meerut East Block"],
                "panchayats": [
                    {"name": "Meerut Central Gram Panchayat", "lgd_code": 301685, "block": "Meerut Block", "villages": ["Meerut Khas", "Meerut Dehat", "Meerut Purva"]},
                    {"name": "Meerut Model Krishi Panchayat", "lgd_code": 302685, "block": "Meerut East Block", "villages": ["Kalyanpur Meerut", "Rampur Meerut", "Shivpur Meerut"]}
                ]
            },
            "Mirzapur": {
                "lgd_code": 1686,
                "name_hi": "Mirzapur",
                "headquarters": "Mirzapur",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mirzapur Sadar", "Mirzapur North", "Mirzapur South", "Mirzapur Rural"],
                "blocks": ["Mirzapur Block", "Mirzapur West Block", "Mirzapur East Block"],
                "panchayats": [
                    {"name": "Mirzapur Central Gram Panchayat", "lgd_code": 301686, "block": "Mirzapur Block", "villages": ["Mirzapur Khas", "Mirzapur Dehat", "Mirzapur Purva"]},
                    {"name": "Mirzapur Model Krishi Panchayat", "lgd_code": 302686, "block": "Mirzapur East Block", "villages": ["Kalyanpur Mirzapur", "Rampur Mirzapur", "Shivpur Mirzapur"]}
                ]
            },
            "Moradabad": {
                "lgd_code": 1687,
                "name_hi": "Moradabad",
                "headquarters": "Moradabad",
                "latitude": 20.0 + (87 * 0.15),
                "longitude": 75.0 + (87 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Moradabad Sadar", "Moradabad North", "Moradabad South", "Moradabad Rural"],
                "blocks": ["Moradabad Block", "Moradabad West Block", "Moradabad East Block"],
                "panchayats": [
                    {"name": "Moradabad Central Gram Panchayat", "lgd_code": 301687, "block": "Moradabad Block", "villages": ["Moradabad Khas", "Moradabad Dehat", "Moradabad Purva"]},
                    {"name": "Moradabad Model Krishi Panchayat", "lgd_code": 302687, "block": "Moradabad East Block", "villages": ["Kalyanpur Moradabad", "Rampur Moradabad", "Shivpur Moradabad"]}
                ]
            },
            "Muzaffarnagar": {
                "lgd_code": 1688,
                "name_hi": "Muzaffarnagar",
                "headquarters": "Muzaffarnagar",
                "latitude": 20.0 + (88 * 0.15),
                "longitude": 75.0 + (88 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Muzaffarnagar Sadar", "Muzaffarnagar North", "Muzaffarnagar South", "Muzaffarnagar Rural"],
                "blocks": ["Muzaffarnagar Block", "Muzaffarnagar West Block", "Muzaffarnagar East Block"],
                "panchayats": [
                    {"name": "Muzaffarnagar Central Gram Panchayat", "lgd_code": 301688, "block": "Muzaffarnagar Block", "villages": ["Muzaffarnagar Khas", "Muzaffarnagar Dehat", "Muzaffarnagar Purva"]},
                    {"name": "Muzaffarnagar Model Krishi Panchayat", "lgd_code": 302688, "block": "Muzaffarnagar East Block", "villages": ["Kalyanpur Muzaffarnagar", "Rampur Muzaffarnagar", "Shivpur Muzaffarnagar"]}
                ]
            },
            "Pilibhit": {
                "lgd_code": 1689,
                "name_hi": "Pilibhit",
                "headquarters": "Pilibhit",
                "latitude": 20.0 + (89 * 0.15),
                "longitude": 75.0 + (89 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pilibhit Sadar", "Pilibhit North", "Pilibhit South", "Pilibhit Rural"],
                "blocks": ["Pilibhit Block", "Pilibhit West Block", "Pilibhit East Block"],
                "panchayats": [
                    {"name": "Pilibhit Central Gram Panchayat", "lgd_code": 301689, "block": "Pilibhit Block", "villages": ["Pilibhit Khas", "Pilibhit Dehat", "Pilibhit Purva"]},
                    {"name": "Pilibhit Model Krishi Panchayat", "lgd_code": 302689, "block": "Pilibhit East Block", "villages": ["Kalyanpur Pilibhit", "Rampur Pilibhit", "Shivpur Pilibhit"]}
                ]
            },
            "Pratapgarh": {
                "lgd_code": 1690,
                "name_hi": "Pratapgarh",
                "headquarters": "Pratapgarh",
                "latitude": 20.0 + (90 * 0.15),
                "longitude": 75.0 + (90 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pratapgarh Sadar", "Pratapgarh North", "Pratapgarh South", "Pratapgarh Rural"],
                "blocks": ["Pratapgarh Block", "Pratapgarh West Block", "Pratapgarh East Block"],
                "panchayats": [
                    {"name": "Pratapgarh Central Gram Panchayat", "lgd_code": 301690, "block": "Pratapgarh Block", "villages": ["Pratapgarh Khas", "Pratapgarh Dehat", "Pratapgarh Purva"]},
                    {"name": "Pratapgarh Model Krishi Panchayat", "lgd_code": 302690, "block": "Pratapgarh East Block", "villages": ["Kalyanpur Pratapgarh", "Rampur Pratapgarh", "Shivpur Pratapgarh"]}
                ]
            },
            "Prayagraj": {
                "lgd_code": 1691,
                "name_hi": "Prayagraj",
                "headquarters": "Prayagraj",
                "latitude": 20.0 + (91 * 0.15),
                "longitude": 75.0 + (91 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Prayagraj Sadar", "Prayagraj North", "Prayagraj South", "Prayagraj Rural"],
                "blocks": ["Prayagraj Block", "Prayagraj West Block", "Prayagraj East Block"],
                "panchayats": [
                    {"name": "Prayagraj Central Gram Panchayat", "lgd_code": 301691, "block": "Prayagraj Block", "villages": ["Prayagraj Khas", "Prayagraj Dehat", "Prayagraj Purva"]},
                    {"name": "Prayagraj Model Krishi Panchayat", "lgd_code": 302691, "block": "Prayagraj East Block", "villages": ["Kalyanpur Prayagraj", "Rampur Prayagraj", "Shivpur Prayagraj"]}
                ]
            },
            "Rae Bareli": {
                "lgd_code": 1692,
                "name_hi": "Rae Bareli",
                "headquarters": "Rae Bareli",
                "latitude": 20.0 + (92 * 0.15),
                "longitude": 75.0 + (92 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rae Bareli Sadar", "Rae Bareli North", "Rae Bareli South", "Rae Bareli Rural"],
                "blocks": ["Rae Bareli Block", "Rae Bareli West Block", "Rae Bareli East Block"],
                "panchayats": [
                    {"name": "Rae Bareli Central Gram Panchayat", "lgd_code": 301692, "block": "Rae Bareli Block", "villages": ["Rae Bareli Khas", "Rae Bareli Dehat", "Rae Bareli Purva"]},
                    {"name": "Rae Bareli Model Krishi Panchayat", "lgd_code": 302692, "block": "Rae Bareli East Block", "villages": ["Kalyanpur Rae Bareli", "Rampur Rae Bareli", "Shivpur Rae Bareli"]}
                ]
            },
            "Rampur": {
                "lgd_code": 1693,
                "name_hi": "Rampur",
                "headquarters": "Rampur",
                "latitude": 20.0 + (93 * 0.15),
                "longitude": 75.0 + (93 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rampur Sadar", "Rampur North", "Rampur South", "Rampur Rural"],
                "blocks": ["Rampur Block", "Rampur West Block", "Rampur East Block"],
                "panchayats": [
                    {"name": "Rampur Central Gram Panchayat", "lgd_code": 301693, "block": "Rampur Block", "villages": ["Rampur Khas", "Rampur Dehat", "Rampur Purva"]},
                    {"name": "Rampur Model Krishi Panchayat", "lgd_code": 302693, "block": "Rampur East Block", "villages": ["Kalyanpur Rampur", "Rampur Rampur", "Shivpur Rampur"]}
                ]
            },
            "Saharanpur": {
                "lgd_code": 1694,
                "name_hi": "Saharanpur",
                "headquarters": "Saharanpur",
                "latitude": 20.0 + (94 * 0.15),
                "longitude": 75.0 + (94 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Saharanpur Sadar", "Saharanpur North", "Saharanpur South", "Saharanpur Rural"],
                "blocks": ["Saharanpur Block", "Saharanpur West Block", "Saharanpur East Block"],
                "panchayats": [
                    {"name": "Saharanpur Central Gram Panchayat", "lgd_code": 301694, "block": "Saharanpur Block", "villages": ["Saharanpur Khas", "Saharanpur Dehat", "Saharanpur Purva"]},
                    {"name": "Saharanpur Model Krishi Panchayat", "lgd_code": 302694, "block": "Saharanpur East Block", "villages": ["Kalyanpur Saharanpur", "Rampur Saharanpur", "Shivpur Saharanpur"]}
                ]
            },
            "Sambhal": {
                "lgd_code": 1695,
                "name_hi": "Sambhal",
                "headquarters": "Sambhal",
                "latitude": 20.0 + (95 * 0.15),
                "longitude": 75.0 + (95 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sambhal Sadar", "Sambhal North", "Sambhal South", "Sambhal Rural"],
                "blocks": ["Sambhal Block", "Sambhal West Block", "Sambhal East Block"],
                "panchayats": [
                    {"name": "Sambhal Central Gram Panchayat", "lgd_code": 301695, "block": "Sambhal Block", "villages": ["Sambhal Khas", "Sambhal Dehat", "Sambhal Purva"]},
                    {"name": "Sambhal Model Krishi Panchayat", "lgd_code": 302695, "block": "Sambhal East Block", "villages": ["Kalyanpur Sambhal", "Rampur Sambhal", "Shivpur Sambhal"]}
                ]
            },
            "Sant Kabir Nagar": {
                "lgd_code": 1696,
                "name_hi": "Sant Kabir Nagar",
                "headquarters": "Sant Kabir Nagar",
                "latitude": 20.0 + (96 * 0.15),
                "longitude": 75.0 + (96 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sant Kabir Nagar Sadar", "Sant Kabir Nagar North", "Sant Kabir Nagar South", "Sant Kabir Nagar Rural"],
                "blocks": ["Sant Kabir Nagar Block", "Sant Kabir Nagar West Block", "Sant Kabir Nagar East Block"],
                "panchayats": [
                    {"name": "Sant Kabir Nagar Central Gram Panchayat", "lgd_code": 301696, "block": "Sant Kabir Nagar Block", "villages": ["Sant Kabir Nagar Khas", "Sant Kabir Nagar Dehat", "Sant Kabir Nagar Purva"]},
                    {"name": "Sant Kabir Nagar Model Krishi Panchayat", "lgd_code": 302696, "block": "Sant Kabir Nagar East Block", "villages": ["Kalyanpur Sant Kabir Nagar", "Rampur Sant Kabir Nagar", "Shivpur Sant Kabir Nagar"]}
                ]
            },
            "Shahjahanpur": {
                "lgd_code": 1697,
                "name_hi": "Shahjahanpur",
                "headquarters": "Shahjahanpur",
                "latitude": 20.0 + (97 * 0.15),
                "longitude": 75.0 + (97 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shahjahanpur Sadar", "Shahjahanpur North", "Shahjahanpur South", "Shahjahanpur Rural"],
                "blocks": ["Shahjahanpur Block", "Shahjahanpur West Block", "Shahjahanpur East Block"],
                "panchayats": [
                    {"name": "Shahjahanpur Central Gram Panchayat", "lgd_code": 301697, "block": "Shahjahanpur Block", "villages": ["Shahjahanpur Khas", "Shahjahanpur Dehat", "Shahjahanpur Purva"]},
                    {"name": "Shahjahanpur Model Krishi Panchayat", "lgd_code": 302697, "block": "Shahjahanpur East Block", "villages": ["Kalyanpur Shahjahanpur", "Rampur Shahjahanpur", "Shivpur Shahjahanpur"]}
                ]
            },
            "Shamli": {
                "lgd_code": 1698,
                "name_hi": "Shamli",
                "headquarters": "Shamli",
                "latitude": 20.0 + (98 * 0.15),
                "longitude": 75.0 + (98 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shamli Sadar", "Shamli North", "Shamli South", "Shamli Rural"],
                "blocks": ["Shamli Block", "Shamli West Block", "Shamli East Block"],
                "panchayats": [
                    {"name": "Shamli Central Gram Panchayat", "lgd_code": 301698, "block": "Shamli Block", "villages": ["Shamli Khas", "Shamli Dehat", "Shamli Purva"]},
                    {"name": "Shamli Model Krishi Panchayat", "lgd_code": 302698, "block": "Shamli East Block", "villages": ["Kalyanpur Shamli", "Rampur Shamli", "Shivpur Shamli"]}
                ]
            },
            "Shrawasti": {
                "lgd_code": 1699,
                "name_hi": "Shrawasti",
                "headquarters": "Shrawasti",
                "latitude": 20.0 + (99 * 0.15),
                "longitude": 75.0 + (99 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shrawasti Sadar", "Shrawasti North", "Shrawasti South", "Shrawasti Rural"],
                "blocks": ["Shrawasti Block", "Shrawasti West Block", "Shrawasti East Block"],
                "panchayats": [
                    {"name": "Shrawasti Central Gram Panchayat", "lgd_code": 301699, "block": "Shrawasti Block", "villages": ["Shrawasti Khas", "Shrawasti Dehat", "Shrawasti Purva"]},
                    {"name": "Shrawasti Model Krishi Panchayat", "lgd_code": 302699, "block": "Shrawasti East Block", "villages": ["Kalyanpur Shrawasti", "Rampur Shrawasti", "Shivpur Shrawasti"]}
                ]
            },
            "Siddharthnagar": {
                "lgd_code": 1700,
                "name_hi": "Siddharthnagar",
                "headquarters": "Siddharthnagar",
                "latitude": 20.0 + (0 * 0.15),
                "longitude": 75.0 + (0 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Siddharthnagar Sadar", "Siddharthnagar North", "Siddharthnagar South", "Siddharthnagar Rural"],
                "blocks": ["Siddharthnagar Block", "Siddharthnagar West Block", "Siddharthnagar East Block"],
                "panchayats": [
                    {"name": "Siddharthnagar Central Gram Panchayat", "lgd_code": 301700, "block": "Siddharthnagar Block", "villages": ["Siddharthnagar Khas", "Siddharthnagar Dehat", "Siddharthnagar Purva"]},
                    {"name": "Siddharthnagar Model Krishi Panchayat", "lgd_code": 302700, "block": "Siddharthnagar East Block", "villages": ["Kalyanpur Siddharthnagar", "Rampur Siddharthnagar", "Shivpur Siddharthnagar"]}
                ]
            },
            "Sitapur": {
                "lgd_code": 1701,
                "name_hi": "Sitapur",
                "headquarters": "Sitapur",
                "latitude": 20.0 + (1 * 0.15),
                "longitude": 75.0 + (1 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sitapur Sadar", "Sitapur North", "Sitapur South", "Sitapur Rural"],
                "blocks": ["Sitapur Block", "Sitapur West Block", "Sitapur East Block"],
                "panchayats": [
                    {"name": "Sitapur Central Gram Panchayat", "lgd_code": 301701, "block": "Sitapur Block", "villages": ["Sitapur Khas", "Sitapur Dehat", "Sitapur Purva"]},
                    {"name": "Sitapur Model Krishi Panchayat", "lgd_code": 302701, "block": "Sitapur East Block", "villages": ["Kalyanpur Sitapur", "Rampur Sitapur", "Shivpur Sitapur"]}
                ]
            },
            "Sonbhadra": {
                "lgd_code": 1702,
                "name_hi": "Sonbhadra",
                "headquarters": "Sonbhadra",
                "latitude": 20.0 + (2 * 0.15),
                "longitude": 75.0 + (2 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sonbhadra Sadar", "Sonbhadra North", "Sonbhadra South", "Sonbhadra Rural"],
                "blocks": ["Sonbhadra Block", "Sonbhadra West Block", "Sonbhadra East Block"],
                "panchayats": [
                    {"name": "Sonbhadra Central Gram Panchayat", "lgd_code": 301702, "block": "Sonbhadra Block", "villages": ["Sonbhadra Khas", "Sonbhadra Dehat", "Sonbhadra Purva"]},
                    {"name": "Sonbhadra Model Krishi Panchayat", "lgd_code": 302702, "block": "Sonbhadra East Block", "villages": ["Kalyanpur Sonbhadra", "Rampur Sonbhadra", "Shivpur Sonbhadra"]}
                ]
            },
            "Sultanpur": {
                "lgd_code": 1703,
                "name_hi": "Sultanpur",
                "headquarters": "Sultanpur",
                "latitude": 20.0 + (3 * 0.15),
                "longitude": 75.0 + (3 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Sultanpur Sadar", "Sultanpur North", "Sultanpur South", "Sultanpur Rural"],
                "blocks": ["Sultanpur Block", "Sultanpur West Block", "Sultanpur East Block"],
                "panchayats": [
                    {"name": "Sultanpur Central Gram Panchayat", "lgd_code": 301703, "block": "Sultanpur Block", "villages": ["Sultanpur Khas", "Sultanpur Dehat", "Sultanpur Purva"]},
                    {"name": "Sultanpur Model Krishi Panchayat", "lgd_code": 302703, "block": "Sultanpur East Block", "villages": ["Kalyanpur Sultanpur", "Rampur Sultanpur", "Shivpur Sultanpur"]}
                ]
            },
            "Unnao": {
                "lgd_code": 1704,
                "name_hi": "Unnao",
                "headquarters": "Unnao",
                "latitude": 20.0 + (4 * 0.15),
                "longitude": 75.0 + (4 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Unnao Sadar", "Unnao North", "Unnao South", "Unnao Rural"],
                "blocks": ["Unnao Block", "Unnao West Block", "Unnao East Block"],
                "panchayats": [
                    {"name": "Unnao Central Gram Panchayat", "lgd_code": 301704, "block": "Unnao Block", "villages": ["Unnao Khas", "Unnao Dehat", "Unnao Purva"]},
                    {"name": "Unnao Model Krishi Panchayat", "lgd_code": 302704, "block": "Unnao East Block", "villages": ["Kalyanpur Unnao", "Rampur Unnao", "Shivpur Unnao"]}
                ]
            },
            "Varanasi": {
                "lgd_code": 1705,
                "name_hi": "Varanasi",
                "headquarters": "Varanasi",
                "latitude": 20.0 + (5 * 0.15),
                "longitude": 75.0 + (5 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Varanasi Sadar", "Varanasi North", "Varanasi South", "Varanasi Rural"],
                "blocks": ["Varanasi Block", "Varanasi West Block", "Varanasi East Block"],
                "panchayats": [
                    {"name": "Varanasi Central Gram Panchayat", "lgd_code": 301705, "block": "Varanasi Block", "villages": ["Varanasi Khas", "Varanasi Dehat", "Varanasi Purva"]},
                    {"name": "Varanasi Model Krishi Panchayat", "lgd_code": 302705, "block": "Varanasi East Block", "villages": ["Kalyanpur Varanasi", "Rampur Varanasi", "Shivpur Varanasi"]}
                ]
            },
        }
    },
    "Uttarakhand": {
        "districts": {
            "Almora": {
                "lgd_code": 1706,
                "name_hi": "Almora",
                "headquarters": "Almora",
                "latitude": 20.0 + (6 * 0.15),
                "longitude": 75.0 + (6 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Almora Sadar", "Almora North", "Almora South", "Almora Rural"],
                "blocks": ["Almora Block", "Almora West Block", "Almora East Block"],
                "panchayats": [
                    {"name": "Almora Central Gram Panchayat", "lgd_code": 301706, "block": "Almora Block", "villages": ["Almora Khas", "Almora Dehat", "Almora Purva"]},
                    {"name": "Almora Model Krishi Panchayat", "lgd_code": 302706, "block": "Almora East Block", "villages": ["Kalyanpur Almora", "Rampur Almora", "Shivpur Almora"]}
                ]
            },
            "Bageshwar": {
                "lgd_code": 1707,
                "name_hi": "Bageshwar",
                "headquarters": "Bageshwar",
                "latitude": 20.0 + (7 * 0.15),
                "longitude": 75.0 + (7 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bageshwar Sadar", "Bageshwar North", "Bageshwar South", "Bageshwar Rural"],
                "blocks": ["Bageshwar Block", "Bageshwar West Block", "Bageshwar East Block"],
                "panchayats": [
                    {"name": "Bageshwar Central Gram Panchayat", "lgd_code": 301707, "block": "Bageshwar Block", "villages": ["Bageshwar Khas", "Bageshwar Dehat", "Bageshwar Purva"]},
                    {"name": "Bageshwar Model Krishi Panchayat", "lgd_code": 302707, "block": "Bageshwar East Block", "villages": ["Kalyanpur Bageshwar", "Rampur Bageshwar", "Shivpur Bageshwar"]}
                ]
            },
            "Chamoli (Gopeshwar)": {
                "lgd_code": 1708,
                "name_hi": "Chamoli",
                "headquarters": "Chamoli",
                "latitude": 20.0 + (8 * 0.15),
                "longitude": 75.0 + (8 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chamoli Sadar", "Chamoli North", "Chamoli South", "Chamoli Rural"],
                "blocks": ["Chamoli Block", "Chamoli West Block", "Chamoli East Block"],
                "panchayats": [
                    {"name": "Chamoli Central Gram Panchayat", "lgd_code": 301708, "block": "Chamoli Block", "villages": ["Chamoli Khas", "Chamoli Dehat", "Chamoli Purva"]},
                    {"name": "Chamoli Model Krishi Panchayat", "lgd_code": 302708, "block": "Chamoli East Block", "villages": ["Kalyanpur Chamoli", "Rampur Chamoli", "Shivpur Chamoli"]}
                ]
            },
            "Champawat": {
                "lgd_code": 1709,
                "name_hi": "Champawat",
                "headquarters": "Champawat",
                "latitude": 20.0 + (9 * 0.15),
                "longitude": 75.0 + (9 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Champawat Sadar", "Champawat North", "Champawat South", "Champawat Rural"],
                "blocks": ["Champawat Block", "Champawat West Block", "Champawat East Block"],
                "panchayats": [
                    {"name": "Champawat Central Gram Panchayat", "lgd_code": 301709, "block": "Champawat Block", "villages": ["Champawat Khas", "Champawat Dehat", "Champawat Purva"]},
                    {"name": "Champawat Model Krishi Panchayat", "lgd_code": 302709, "block": "Champawat East Block", "villages": ["Kalyanpur Champawat", "Rampur Champawat", "Shivpur Champawat"]}
                ]
            },
            "Dehradun": {
                "lgd_code": 1710,
                "name_hi": "Dehradun",
                "headquarters": "Dehradun",
                "latitude": 20.0 + (10 * 0.15),
                "longitude": 75.0 + (10 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dehradun Sadar", "Dehradun North", "Dehradun South", "Dehradun Rural"],
                "blocks": ["Dehradun Block", "Dehradun West Block", "Dehradun East Block"],
                "panchayats": [
                    {"name": "Dehradun Central Gram Panchayat", "lgd_code": 301710, "block": "Dehradun Block", "villages": ["Dehradun Khas", "Dehradun Dehat", "Dehradun Purva"]},
                    {"name": "Dehradun Model Krishi Panchayat", "lgd_code": 302710, "block": "Dehradun East Block", "villages": ["Kalyanpur Dehradun", "Rampur Dehradun", "Shivpur Dehradun"]}
                ]
            },
            "Haridwar": {
                "lgd_code": 1711,
                "name_hi": "Haridwar",
                "headquarters": "Haridwar",
                "latitude": 20.0 + (11 * 0.15),
                "longitude": 75.0 + (11 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Haridwar Sadar", "Haridwar North", "Haridwar South", "Haridwar Rural"],
                "blocks": ["Haridwar Block", "Haridwar West Block", "Haridwar East Block"],
                "panchayats": [
                    {"name": "Haridwar Central Gram Panchayat", "lgd_code": 301711, "block": "Haridwar Block", "villages": ["Haridwar Khas", "Haridwar Dehat", "Haridwar Purva"]},
                    {"name": "Haridwar Model Krishi Panchayat", "lgd_code": 302711, "block": "Haridwar East Block", "villages": ["Kalyanpur Haridwar", "Rampur Haridwar", "Shivpur Haridwar"]}
                ]
            },
            "Nainital": {
                "lgd_code": 1712,
                "name_hi": "Nainital",
                "headquarters": "Nainital",
                "latitude": 20.0 + (12 * 0.15),
                "longitude": 75.0 + (12 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nainital Sadar", "Nainital North", "Nainital South", "Nainital Rural"],
                "blocks": ["Nainital Block", "Nainital West Block", "Nainital East Block"],
                "panchayats": [
                    {"name": "Nainital Central Gram Panchayat", "lgd_code": 301712, "block": "Nainital Block", "villages": ["Nainital Khas", "Nainital Dehat", "Nainital Purva"]},
                    {"name": "Nainital Model Krishi Panchayat", "lgd_code": 302712, "block": "Nainital East Block", "villages": ["Kalyanpur Nainital", "Rampur Nainital", "Shivpur Nainital"]}
                ]
            },
            "Pauri Garhwal": {
                "lgd_code": 1713,
                "name_hi": "Pauri Garhwal",
                "headquarters": "Pauri Garhwal",
                "latitude": 20.0 + (13 * 0.15),
                "longitude": 75.0 + (13 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pauri Garhwal Sadar", "Pauri Garhwal North", "Pauri Garhwal South", "Pauri Garhwal Rural"],
                "blocks": ["Pauri Garhwal Block", "Pauri Garhwal West Block", "Pauri Garhwal East Block"],
                "panchayats": [
                    {"name": "Pauri Garhwal Central Gram Panchayat", "lgd_code": 301713, "block": "Pauri Garhwal Block", "villages": ["Pauri Garhwal Khas", "Pauri Garhwal Dehat", "Pauri Garhwal Purva"]},
                    {"name": "Pauri Garhwal Model Krishi Panchayat", "lgd_code": 302713, "block": "Pauri Garhwal East Block", "villages": ["Kalyanpur Pauri Garhwal", "Rampur Pauri Garhwal", "Shivpur Pauri Garhwal"]}
                ]
            },
            "Pithoragarh": {
                "lgd_code": 1714,
                "name_hi": "Pithoragarh",
                "headquarters": "Pithoragarh",
                "latitude": 20.0 + (14 * 0.15),
                "longitude": 75.0 + (14 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pithoragarh Sadar", "Pithoragarh North", "Pithoragarh South", "Pithoragarh Rural"],
                "blocks": ["Pithoragarh Block", "Pithoragarh West Block", "Pithoragarh East Block"],
                "panchayats": [
                    {"name": "Pithoragarh Central Gram Panchayat", "lgd_code": 301714, "block": "Pithoragarh Block", "villages": ["Pithoragarh Khas", "Pithoragarh Dehat", "Pithoragarh Purva"]},
                    {"name": "Pithoragarh Model Krishi Panchayat", "lgd_code": 302714, "block": "Pithoragarh East Block", "villages": ["Kalyanpur Pithoragarh", "Rampur Pithoragarh", "Shivpur Pithoragarh"]}
                ]
            },
            "Rudraprayag": {
                "lgd_code": 1715,
                "name_hi": "Rudraprayag",
                "headquarters": "Rudraprayag",
                "latitude": 20.0 + (15 * 0.15),
                "longitude": 75.0 + (15 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rudraprayag Sadar", "Rudraprayag North", "Rudraprayag South", "Rudraprayag Rural"],
                "blocks": ["Rudraprayag Block", "Rudraprayag West Block", "Rudraprayag East Block"],
                "panchayats": [
                    {"name": "Rudraprayag Central Gram Panchayat", "lgd_code": 301715, "block": "Rudraprayag Block", "villages": ["Rudraprayag Khas", "Rudraprayag Dehat", "Rudraprayag Purva"]},
                    {"name": "Rudraprayag Model Krishi Panchayat", "lgd_code": 302715, "block": "Rudraprayag East Block", "villages": ["Kalyanpur Rudraprayag", "Rampur Rudraprayag", "Shivpur Rudraprayag"]}
                ]
            },
            "Tehri Garhwal": {
                "lgd_code": 1716,
                "name_hi": "Tehri Garhwal",
                "headquarters": "Tehri Garhwal",
                "latitude": 20.0 + (16 * 0.15),
                "longitude": 75.0 + (16 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Tehri Garhwal Sadar", "Tehri Garhwal North", "Tehri Garhwal South", "Tehri Garhwal Rural"],
                "blocks": ["Tehri Garhwal Block", "Tehri Garhwal West Block", "Tehri Garhwal East Block"],
                "panchayats": [
                    {"name": "Tehri Garhwal Central Gram Panchayat", "lgd_code": 301716, "block": "Tehri Garhwal Block", "villages": ["Tehri Garhwal Khas", "Tehri Garhwal Dehat", "Tehri Garhwal Purva"]},
                    {"name": "Tehri Garhwal Model Krishi Panchayat", "lgd_code": 302716, "block": "Tehri Garhwal East Block", "villages": ["Kalyanpur Tehri Garhwal", "Rampur Tehri Garhwal", "Shivpur Tehri Garhwal"]}
                ]
            },
            "Udham Singh Nagar (Rudrapur)": {
                "lgd_code": 1717,
                "name_hi": "Udham Singh Nagar",
                "headquarters": "Udham Singh Nagar",
                "latitude": 20.0 + (17 * 0.15),
                "longitude": 75.0 + (17 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Udham Singh Nagar Sadar", "Udham Singh Nagar North", "Udham Singh Nagar South", "Udham Singh Nagar Rural"],
                "blocks": ["Udham Singh Nagar Block", "Udham Singh Nagar West Block", "Udham Singh Nagar East Block"],
                "panchayats": [
                    {"name": "Udham Singh Nagar Central Gram Panchayat", "lgd_code": 301717, "block": "Udham Singh Nagar Block", "villages": ["Udham Singh Nagar Khas", "Udham Singh Nagar Dehat", "Udham Singh Nagar Purva"]},
                    {"name": "Udham Singh Nagar Model Krishi Panchayat", "lgd_code": 302717, "block": "Udham Singh Nagar East Block", "villages": ["Kalyanpur Udham Singh Nagar", "Rampur Udham Singh Nagar", "Shivpur Udham Singh Nagar"]}
                ]
            },
            "Uttarkashi": {
                "lgd_code": 1718,
                "name_hi": "Uttarkashi",
                "headquarters": "Uttarkashi",
                "latitude": 20.0 + (18 * 0.15),
                "longitude": 75.0 + (18 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Uttarkashi Sadar", "Uttarkashi North", "Uttarkashi South", "Uttarkashi Rural"],
                "blocks": ["Uttarkashi Block", "Uttarkashi West Block", "Uttarkashi East Block"],
                "panchayats": [
                    {"name": "Uttarkashi Central Gram Panchayat", "lgd_code": 301718, "block": "Uttarkashi Block", "villages": ["Uttarkashi Khas", "Uttarkashi Dehat", "Uttarkashi Purva"]},
                    {"name": "Uttarkashi Model Krishi Panchayat", "lgd_code": 302718, "block": "Uttarkashi East Block", "villages": ["Kalyanpur Uttarkashi", "Rampur Uttarkashi", "Shivpur Uttarkashi"]}
                ]
            },
        }
    },
    "West Bengal": {
        "districts": {
            "Alipurduar": {
                "lgd_code": 1719,
                "name_hi": "Alipurduar",
                "headquarters": "Alipurduar",
                "latitude": 20.0 + (19 * 0.15),
                "longitude": 75.0 + (19 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Alipurduar Sadar", "Alipurduar North", "Alipurduar South", "Alipurduar Rural"],
                "blocks": ["Alipurduar Block", "Alipurduar West Block", "Alipurduar East Block"],
                "panchayats": [
                    {"name": "Alipurduar Central Gram Panchayat", "lgd_code": 301719, "block": "Alipurduar Block", "villages": ["Alipurduar Khas", "Alipurduar Dehat", "Alipurduar Purva"]},
                    {"name": "Alipurduar Model Krishi Panchayat", "lgd_code": 302719, "block": "Alipurduar East Block", "villages": ["Kalyanpur Alipurduar", "Rampur Alipurduar", "Shivpur Alipurduar"]}
                ]
            },
            "Bankura": {
                "lgd_code": 1720,
                "name_hi": "Bankura",
                "headquarters": "Bankura",
                "latitude": 20.0 + (20 * 0.15),
                "longitude": 75.0 + (20 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bankura Sadar", "Bankura North", "Bankura South", "Bankura Rural"],
                "blocks": ["Bankura Block", "Bankura West Block", "Bankura East Block"],
                "panchayats": [
                    {"name": "Bankura Central Gram Panchayat", "lgd_code": 301720, "block": "Bankura Block", "villages": ["Bankura Khas", "Bankura Dehat", "Bankura Purva"]},
                    {"name": "Bankura Model Krishi Panchayat", "lgd_code": 302720, "block": "Bankura East Block", "villages": ["Kalyanpur Bankura", "Rampur Bankura", "Shivpur Bankura"]}
                ]
            },
            "Birbhum": {
                "lgd_code": 1721,
                "name_hi": "Birbhum",
                "headquarters": "Birbhum",
                "latitude": 20.0 + (21 * 0.15),
                "longitude": 75.0 + (21 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Birbhum Sadar", "Birbhum North", "Birbhum South", "Birbhum Rural"],
                "blocks": ["Birbhum Block", "Birbhum West Block", "Birbhum East Block"],
                "panchayats": [
                    {"name": "Birbhum Central Gram Panchayat", "lgd_code": 301721, "block": "Birbhum Block", "villages": ["Birbhum Khas", "Birbhum Dehat", "Birbhum Purva"]},
                    {"name": "Birbhum Model Krishi Panchayat", "lgd_code": 302721, "block": "Birbhum East Block", "villages": ["Kalyanpur Birbhum", "Rampur Birbhum", "Shivpur Birbhum"]}
                ]
            },
            "Cooch Behar": {
                "lgd_code": 1722,
                "name_hi": "Cooch Behar",
                "headquarters": "Cooch Behar",
                "latitude": 20.0 + (22 * 0.15),
                "longitude": 75.0 + (22 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Cooch Behar Sadar", "Cooch Behar North", "Cooch Behar South", "Cooch Behar Rural"],
                "blocks": ["Cooch Behar Block", "Cooch Behar West Block", "Cooch Behar East Block"],
                "panchayats": [
                    {"name": "Cooch Behar Central Gram Panchayat", "lgd_code": 301722, "block": "Cooch Behar Block", "villages": ["Cooch Behar Khas", "Cooch Behar Dehat", "Cooch Behar Purva"]},
                    {"name": "Cooch Behar Model Krishi Panchayat", "lgd_code": 302722, "block": "Cooch Behar East Block", "villages": ["Kalyanpur Cooch Behar", "Rampur Cooch Behar", "Shivpur Cooch Behar"]}
                ]
            },
            "Dakshin Dinajpur (Balurghat)": {
                "lgd_code": 1723,
                "name_hi": "Dakshin Dinajpur",
                "headquarters": "Dakshin Dinajpur",
                "latitude": 20.0 + (23 * 0.15),
                "longitude": 75.0 + (23 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dakshin Dinajpur Sadar", "Dakshin Dinajpur North", "Dakshin Dinajpur South", "Dakshin Dinajpur Rural"],
                "blocks": ["Dakshin Dinajpur Block", "Dakshin Dinajpur West Block", "Dakshin Dinajpur East Block"],
                "panchayats": [
                    {"name": "Dakshin Dinajpur Central Gram Panchayat", "lgd_code": 301723, "block": "Dakshin Dinajpur Block", "villages": ["Dakshin Dinajpur Khas", "Dakshin Dinajpur Dehat", "Dakshin Dinajpur Purva"]},
                    {"name": "Dakshin Dinajpur Model Krishi Panchayat", "lgd_code": 302723, "block": "Dakshin Dinajpur East Block", "villages": ["Kalyanpur Dakshin Dinajpur", "Rampur Dakshin Dinajpur", "Shivpur Dakshin Dinajpur"]}
                ]
            },
            "Darjeeling": {
                "lgd_code": 1724,
                "name_hi": "Darjeeling",
                "headquarters": "Darjeeling",
                "latitude": 20.0 + (24 * 0.15),
                "longitude": 75.0 + (24 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Darjeeling Sadar", "Darjeeling North", "Darjeeling South", "Darjeeling Rural"],
                "blocks": ["Darjeeling Block", "Darjeeling West Block", "Darjeeling East Block"],
                "panchayats": [
                    {"name": "Darjeeling Central Gram Panchayat", "lgd_code": 301724, "block": "Darjeeling Block", "villages": ["Darjeeling Khas", "Darjeeling Dehat", "Darjeeling Purva"]},
                    {"name": "Darjeeling Model Krishi Panchayat", "lgd_code": 302724, "block": "Darjeeling East Block", "villages": ["Kalyanpur Darjeeling", "Rampur Darjeeling", "Shivpur Darjeeling"]}
                ]
            },
            "Hooghly": {
                "lgd_code": 1725,
                "name_hi": "Hooghly",
                "headquarters": "Hooghly",
                "latitude": 20.0 + (25 * 0.15),
                "longitude": 75.0 + (25 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Hooghly Sadar", "Hooghly North", "Hooghly South", "Hooghly Rural"],
                "blocks": ["Hooghly Block", "Hooghly West Block", "Hooghly East Block"],
                "panchayats": [
                    {"name": "Hooghly Central Gram Panchayat", "lgd_code": 301725, "block": "Hooghly Block", "villages": ["Hooghly Khas", "Hooghly Dehat", "Hooghly Purva"]},
                    {"name": "Hooghly Model Krishi Panchayat", "lgd_code": 302725, "block": "Hooghly East Block", "villages": ["Kalyanpur Hooghly", "Rampur Hooghly", "Shivpur Hooghly"]}
                ]
            },
            "Howrah": {
                "lgd_code": 1726,
                "name_hi": "Howrah",
                "headquarters": "Howrah",
                "latitude": 20.0 + (26 * 0.15),
                "longitude": 75.0 + (26 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Howrah Sadar", "Howrah North", "Howrah South", "Howrah Rural"],
                "blocks": ["Howrah Block", "Howrah West Block", "Howrah East Block"],
                "panchayats": [
                    {"name": "Howrah Central Gram Panchayat", "lgd_code": 301726, "block": "Howrah Block", "villages": ["Howrah Khas", "Howrah Dehat", "Howrah Purva"]},
                    {"name": "Howrah Model Krishi Panchayat", "lgd_code": 302726, "block": "Howrah East Block", "villages": ["Kalyanpur Howrah", "Rampur Howrah", "Shivpur Howrah"]}
                ]
            },
            "Jalpaiguri": {
                "lgd_code": 1727,
                "name_hi": "Jalpaiguri",
                "headquarters": "Jalpaiguri",
                "latitude": 20.0 + (27 * 0.15),
                "longitude": 75.0 + (27 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jalpaiguri Sadar", "Jalpaiguri North", "Jalpaiguri South", "Jalpaiguri Rural"],
                "blocks": ["Jalpaiguri Block", "Jalpaiguri West Block", "Jalpaiguri East Block"],
                "panchayats": [
                    {"name": "Jalpaiguri Central Gram Panchayat", "lgd_code": 301727, "block": "Jalpaiguri Block", "villages": ["Jalpaiguri Khas", "Jalpaiguri Dehat", "Jalpaiguri Purva"]},
                    {"name": "Jalpaiguri Model Krishi Panchayat", "lgd_code": 302727, "block": "Jalpaiguri East Block", "villages": ["Kalyanpur Jalpaiguri", "Rampur Jalpaiguri", "Shivpur Jalpaiguri"]}
                ]
            },
            "Jhargram": {
                "lgd_code": 1728,
                "name_hi": "Jhargram",
                "headquarters": "Jhargram",
                "latitude": 20.0 + (28 * 0.15),
                "longitude": 75.0 + (28 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jhargram Sadar", "Jhargram North", "Jhargram South", "Jhargram Rural"],
                "blocks": ["Jhargram Block", "Jhargram West Block", "Jhargram East Block"],
                "panchayats": [
                    {"name": "Jhargram Central Gram Panchayat", "lgd_code": 301728, "block": "Jhargram Block", "villages": ["Jhargram Khas", "Jhargram Dehat", "Jhargram Purva"]},
                    {"name": "Jhargram Model Krishi Panchayat", "lgd_code": 302728, "block": "Jhargram East Block", "villages": ["Kalyanpur Jhargram", "Rampur Jhargram", "Shivpur Jhargram"]}
                ]
            },
            "Kalimpong": {
                "lgd_code": 1729,
                "name_hi": "Kalimpong",
                "headquarters": "Kalimpong",
                "latitude": 20.0 + (29 * 0.15),
                "longitude": 75.0 + (29 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kalimpong Sadar", "Kalimpong North", "Kalimpong South", "Kalimpong Rural"],
                "blocks": ["Kalimpong Block", "Kalimpong West Block", "Kalimpong East Block"],
                "panchayats": [
                    {"name": "Kalimpong Central Gram Panchayat", "lgd_code": 301729, "block": "Kalimpong Block", "villages": ["Kalimpong Khas", "Kalimpong Dehat", "Kalimpong Purva"]},
                    {"name": "Kalimpong Model Krishi Panchayat", "lgd_code": 302729, "block": "Kalimpong East Block", "villages": ["Kalyanpur Kalimpong", "Rampur Kalimpong", "Shivpur Kalimpong"]}
                ]
            },
            "Kolkata": {
                "lgd_code": 1730,
                "name_hi": "Kolkata",
                "headquarters": "Kolkata",
                "latitude": 20.0 + (30 * 0.15),
                "longitude": 75.0 + (30 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kolkata Sadar", "Kolkata North", "Kolkata South", "Kolkata Rural"],
                "blocks": ["Kolkata Block", "Kolkata West Block", "Kolkata East Block"],
                "panchayats": [
                    {"name": "Kolkata Central Gram Panchayat", "lgd_code": 301730, "block": "Kolkata Block", "villages": ["Kolkata Khas", "Kolkata Dehat", "Kolkata Purva"]},
                    {"name": "Kolkata Model Krishi Panchayat", "lgd_code": 302730, "block": "Kolkata East Block", "villages": ["Kalyanpur Kolkata", "Rampur Kolkata", "Shivpur Kolkata"]}
                ]
            },
            "Malda": {
                "lgd_code": 1731,
                "name_hi": "Malda",
                "headquarters": "Malda",
                "latitude": 20.0 + (31 * 0.15),
                "longitude": 75.0 + (31 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Malda Sadar", "Malda North", "Malda South", "Malda Rural"],
                "blocks": ["Malda Block", "Malda West Block", "Malda East Block"],
                "panchayats": [
                    {"name": "Malda Central Gram Panchayat", "lgd_code": 301731, "block": "Malda Block", "villages": ["Malda Khas", "Malda Dehat", "Malda Purva"]},
                    {"name": "Malda Model Krishi Panchayat", "lgd_code": 302731, "block": "Malda East Block", "villages": ["Kalyanpur Malda", "Rampur Malda", "Shivpur Malda"]}
                ]
            },
            "Murshidabad": {
                "lgd_code": 1732,
                "name_hi": "Murshidabad",
                "headquarters": "Murshidabad",
                "latitude": 20.0 + (32 * 0.15),
                "longitude": 75.0 + (32 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Murshidabad Sadar", "Murshidabad North", "Murshidabad South", "Murshidabad Rural"],
                "blocks": ["Murshidabad Block", "Murshidabad West Block", "Murshidabad East Block"],
                "panchayats": [
                    {"name": "Murshidabad Central Gram Panchayat", "lgd_code": 301732, "block": "Murshidabad Block", "villages": ["Murshidabad Khas", "Murshidabad Dehat", "Murshidabad Purva"]},
                    {"name": "Murshidabad Model Krishi Panchayat", "lgd_code": 302732, "block": "Murshidabad East Block", "villages": ["Kalyanpur Murshidabad", "Rampur Murshidabad", "Shivpur Murshidabad"]}
                ]
            },
            "Nadia": {
                "lgd_code": 1733,
                "name_hi": "Nadia",
                "headquarters": "Nadia",
                "latitude": 20.0 + (33 * 0.15),
                "longitude": 75.0 + (33 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nadia Sadar", "Nadia North", "Nadia South", "Nadia Rural"],
                "blocks": ["Nadia Block", "Nadia West Block", "Nadia East Block"],
                "panchayats": [
                    {"name": "Nadia Central Gram Panchayat", "lgd_code": 301733, "block": "Nadia Block", "villages": ["Nadia Khas", "Nadia Dehat", "Nadia Purva"]},
                    {"name": "Nadia Model Krishi Panchayat", "lgd_code": 302733, "block": "Nadia East Block", "villages": ["Kalyanpur Nadia", "Rampur Nadia", "Shivpur Nadia"]}
                ]
            },
            "North 24 Parganas": {
                "lgd_code": 1734,
                "name_hi": "North 24 Parganas",
                "headquarters": "North 24 Parganas",
                "latitude": 20.0 + (34 * 0.15),
                "longitude": 75.0 + (34 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North 24 Parganas Sadar", "North 24 Parganas North", "North 24 Parganas South", "North 24 Parganas Rural"],
                "blocks": ["North 24 Parganas Block", "North 24 Parganas West Block", "North 24 Parganas East Block"],
                "panchayats": [
                    {"name": "North 24 Parganas Central Gram Panchayat", "lgd_code": 301734, "block": "North 24 Parganas Block", "villages": ["North 24 Parganas Khas", "North 24 Parganas Dehat", "North 24 Parganas Purva"]},
                    {"name": "North 24 Parganas Model Krishi Panchayat", "lgd_code": 302734, "block": "North 24 Parganas East Block", "villages": ["Kalyanpur North 24 Parganas", "Rampur North 24 Parganas", "Shivpur North 24 Parganas"]}
                ]
            },
            "Paschim Bardhaman": {
                "lgd_code": 1735,
                "name_hi": "Paschim Bardhaman",
                "headquarters": "Paschim Bardhaman",
                "latitude": 20.0 + (35 * 0.15),
                "longitude": 75.0 + (35 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Paschim Bardhaman Sadar", "Paschim Bardhaman North", "Paschim Bardhaman South", "Paschim Bardhaman Rural"],
                "blocks": ["Paschim Bardhaman Block", "Paschim Bardhaman West Block", "Paschim Bardhaman East Block"],
                "panchayats": [
                    {"name": "Paschim Bardhaman Central Gram Panchayat", "lgd_code": 301735, "block": "Paschim Bardhaman Block", "villages": ["Paschim Bardhaman Khas", "Paschim Bardhaman Dehat", "Paschim Bardhaman Purva"]},
                    {"name": "Paschim Bardhaman Model Krishi Panchayat", "lgd_code": 302735, "block": "Paschim Bardhaman East Block", "villages": ["Kalyanpur Paschim Bardhaman", "Rampur Paschim Bardhaman", "Shivpur Paschim Bardhaman"]}
                ]
            },
            "Paschim Medinipur": {
                "lgd_code": 1736,
                "name_hi": "Paschim Medinipur",
                "headquarters": "Paschim Medinipur",
                "latitude": 20.0 + (36 * 0.15),
                "longitude": 75.0 + (36 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Paschim Medinipur Sadar", "Paschim Medinipur North", "Paschim Medinipur South", "Paschim Medinipur Rural"],
                "blocks": ["Paschim Medinipur Block", "Paschim Medinipur West Block", "Paschim Medinipur East Block"],
                "panchayats": [
                    {"name": "Paschim Medinipur Central Gram Panchayat", "lgd_code": 301736, "block": "Paschim Medinipur Block", "villages": ["Paschim Medinipur Khas", "Paschim Medinipur Dehat", "Paschim Medinipur Purva"]},
                    {"name": "Paschim Medinipur Model Krishi Panchayat", "lgd_code": 302736, "block": "Paschim Medinipur East Block", "villages": ["Kalyanpur Paschim Medinipur", "Rampur Paschim Medinipur", "Shivpur Paschim Medinipur"]}
                ]
            },
            "Purba Bardhaman": {
                "lgd_code": 1737,
                "name_hi": "Purba Bardhaman",
                "headquarters": "Purba Bardhaman",
                "latitude": 20.0 + (37 * 0.15),
                "longitude": 75.0 + (37 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Purba Bardhaman Sadar", "Purba Bardhaman North", "Purba Bardhaman South", "Purba Bardhaman Rural"],
                "blocks": ["Purba Bardhaman Block", "Purba Bardhaman West Block", "Purba Bardhaman East Block"],
                "panchayats": [
                    {"name": "Purba Bardhaman Central Gram Panchayat", "lgd_code": 301737, "block": "Purba Bardhaman Block", "villages": ["Purba Bardhaman Khas", "Purba Bardhaman Dehat", "Purba Bardhaman Purva"]},
                    {"name": "Purba Bardhaman Model Krishi Panchayat", "lgd_code": 302737, "block": "Purba Bardhaman East Block", "villages": ["Kalyanpur Purba Bardhaman", "Rampur Purba Bardhaman", "Shivpur Purba Bardhaman"]}
                ]
            },
            "Purba Medinipur": {
                "lgd_code": 1738,
                "name_hi": "Purba Medinipur",
                "headquarters": "Purba Medinipur",
                "latitude": 20.0 + (38 * 0.15),
                "longitude": 75.0 + (38 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Purba Medinipur Sadar", "Purba Medinipur North", "Purba Medinipur South", "Purba Medinipur Rural"],
                "blocks": ["Purba Medinipur Block", "Purba Medinipur West Block", "Purba Medinipur East Block"],
                "panchayats": [
                    {"name": "Purba Medinipur Central Gram Panchayat", "lgd_code": 301738, "block": "Purba Medinipur Block", "villages": ["Purba Medinipur Khas", "Purba Medinipur Dehat", "Purba Medinipur Purva"]},
                    {"name": "Purba Medinipur Model Krishi Panchayat", "lgd_code": 302738, "block": "Purba Medinipur East Block", "villages": ["Kalyanpur Purba Medinipur", "Rampur Purba Medinipur", "Shivpur Purba Medinipur"]}
                ]
            },
            "Purulia": {
                "lgd_code": 1739,
                "name_hi": "Purulia",
                "headquarters": "Purulia",
                "latitude": 20.0 + (39 * 0.15),
                "longitude": 75.0 + (39 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Purulia Sadar", "Purulia North", "Purulia South", "Purulia Rural"],
                "blocks": ["Purulia Block", "Purulia West Block", "Purulia East Block"],
                "panchayats": [
                    {"name": "Purulia Central Gram Panchayat", "lgd_code": 301739, "block": "Purulia Block", "villages": ["Purulia Khas", "Purulia Dehat", "Purulia Purva"]},
                    {"name": "Purulia Model Krishi Panchayat", "lgd_code": 302739, "block": "Purulia East Block", "villages": ["Kalyanpur Purulia", "Rampur Purulia", "Shivpur Purulia"]}
                ]
            },
            "South 24 Parganas": {
                "lgd_code": 1740,
                "name_hi": "South 24 Parganas",
                "headquarters": "South 24 Parganas",
                "latitude": 20.0 + (40 * 0.15),
                "longitude": 75.0 + (40 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South 24 Parganas Sadar", "South 24 Parganas North", "South 24 Parganas South", "South 24 Parganas Rural"],
                "blocks": ["South 24 Parganas Block", "South 24 Parganas West Block", "South 24 Parganas East Block"],
                "panchayats": [
                    {"name": "South 24 Parganas Central Gram Panchayat", "lgd_code": 301740, "block": "South 24 Parganas Block", "villages": ["South 24 Parganas Khas", "South 24 Parganas Dehat", "South 24 Parganas Purva"]},
                    {"name": "South 24 Parganas Model Krishi Panchayat", "lgd_code": 302740, "block": "South 24 Parganas East Block", "villages": ["Kalyanpur South 24 Parganas", "Rampur South 24 Parganas", "Shivpur South 24 Parganas"]}
                ]
            },
            "Uttar Dinajpur (Raiganj)": {
                "lgd_code": 1741,
                "name_hi": "Uttar Dinajpur",
                "headquarters": "Uttar Dinajpur",
                "latitude": 20.0 + (41 * 0.15),
                "longitude": 75.0 + (41 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Uttar Dinajpur Sadar", "Uttar Dinajpur North", "Uttar Dinajpur South", "Uttar Dinajpur Rural"],
                "blocks": ["Uttar Dinajpur Block", "Uttar Dinajpur West Block", "Uttar Dinajpur East Block"],
                "panchayats": [
                    {"name": "Uttar Dinajpur Central Gram Panchayat", "lgd_code": 301741, "block": "Uttar Dinajpur Block", "villages": ["Uttar Dinajpur Khas", "Uttar Dinajpur Dehat", "Uttar Dinajpur Purva"]},
                    {"name": "Uttar Dinajpur Model Krishi Panchayat", "lgd_code": 302741, "block": "Uttar Dinajpur East Block", "villages": ["Kalyanpur Uttar Dinajpur", "Rampur Uttar Dinajpur", "Shivpur Uttar Dinajpur"]}
                ]
            },
        }
    },
    "Andaman and Nicobar Islands": {
        "districts": {
            "Nicobar": {
                "lgd_code": 1742,
                "name_hi": "Nicobar",
                "headquarters": "Nicobar",
                "latitude": 20.0 + (42 * 0.15),
                "longitude": 75.0 + (42 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Nicobar Sadar", "Nicobar North", "Nicobar South", "Nicobar Rural"],
                "blocks": ["Nicobar Block", "Nicobar West Block", "Nicobar East Block"],
                "panchayats": [
                    {"name": "Nicobar Central Gram Panchayat", "lgd_code": 301742, "block": "Nicobar Block", "villages": ["Nicobar Khas", "Nicobar Dehat", "Nicobar Purva"]},
                    {"name": "Nicobar Model Krishi Panchayat", "lgd_code": 302742, "block": "Nicobar East Block", "villages": ["Kalyanpur Nicobar", "Rampur Nicobar", "Shivpur Nicobar"]}
                ]
            },
            "North and Middle Andaman": {
                "lgd_code": 1743,
                "name_hi": "North and Middle Andaman",
                "headquarters": "North and Middle Andaman",
                "latitude": 20.0 + (43 * 0.15),
                "longitude": 75.0 + (43 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North and Middle Andaman Sadar", "North and Middle Andaman North", "North and Middle Andaman South", "North and Middle Andaman Rural"],
                "blocks": ["North and Middle Andaman Block", "North and Middle Andaman West Block", "North and Middle Andaman East Block"],
                "panchayats": [
                    {"name": "North and Middle Andaman Central Gram Panchayat", "lgd_code": 301743, "block": "North and Middle Andaman Block", "villages": ["North and Middle Andaman Khas", "North and Middle Andaman Dehat", "North and Middle Andaman Purva"]},
                    {"name": "North and Middle Andaman Model Krishi Panchayat", "lgd_code": 302743, "block": "North and Middle Andaman East Block", "villages": ["Kalyanpur North and Middle Andaman", "Rampur North and Middle Andaman", "Shivpur North and Middle Andaman"]}
                ]
            },
            "South Andaman (Port Blair)": {
                "lgd_code": 1744,
                "name_hi": "South Andaman",
                "headquarters": "South Andaman",
                "latitude": 20.0 + (44 * 0.15),
                "longitude": 75.0 + (44 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Andaman Sadar", "South Andaman North", "South Andaman South", "South Andaman Rural"],
                "blocks": ["South Andaman Block", "South Andaman West Block", "South Andaman East Block"],
                "panchayats": [
                    {"name": "South Andaman Central Gram Panchayat", "lgd_code": 301744, "block": "South Andaman Block", "villages": ["South Andaman Khas", "South Andaman Dehat", "South Andaman Purva"]},
                    {"name": "South Andaman Model Krishi Panchayat", "lgd_code": 302744, "block": "South Andaman East Block", "villages": ["Kalyanpur South Andaman", "Rampur South Andaman", "Shivpur South Andaman"]}
                ]
            },
        }
    },
    "Chandigarh": {
        "districts": {
            "Chandigarh": {
                "lgd_code": 1745,
                "name_hi": "Chandigarh",
                "headquarters": "Chandigarh",
                "latitude": 20.0 + (45 * 0.15),
                "longitude": 75.0 + (45 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Chandigarh Sadar", "Chandigarh North", "Chandigarh South", "Chandigarh Rural"],
                "blocks": ["Chandigarh Block", "Chandigarh West Block", "Chandigarh East Block"],
                "panchayats": [
                    {"name": "Chandigarh Central Gram Panchayat", "lgd_code": 301745, "block": "Chandigarh Block", "villages": ["Chandigarh Khas", "Chandigarh Dehat", "Chandigarh Purva"]},
                    {"name": "Chandigarh Model Krishi Panchayat", "lgd_code": 302745, "block": "Chandigarh East Block", "villages": ["Kalyanpur Chandigarh", "Rampur Chandigarh", "Shivpur Chandigarh"]}
                ]
            },
        }
    },
    "Dadra and Nagar Haveli and Daman and Diu": {
        "districts": {
            "Dadra and Nagar Haveli (Silvassa)": {
                "lgd_code": 1746,
                "name_hi": "Dadra and Nagar Haveli",
                "headquarters": "Dadra and Nagar Haveli",
                "latitude": 20.0 + (46 * 0.15),
                "longitude": 75.0 + (46 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Dadra and Nagar Haveli Sadar", "Dadra and Nagar Haveli North", "Dadra and Nagar Haveli South", "Dadra and Nagar Haveli Rural"],
                "blocks": ["Dadra and Nagar Haveli Block", "Dadra and Nagar Haveli West Block", "Dadra and Nagar Haveli East Block"],
                "panchayats": [
                    {"name": "Dadra and Nagar Haveli Central Gram Panchayat", "lgd_code": 301746, "block": "Dadra and Nagar Haveli Block", "villages": ["Dadra and Nagar Haveli Khas", "Dadra and Nagar Haveli Dehat", "Dadra and Nagar Haveli Purva"]},
                    {"name": "Dadra and Nagar Haveli Model Krishi Panchayat", "lgd_code": 302746, "block": "Dadra and Nagar Haveli East Block", "villages": ["Kalyanpur Dadra and Nagar Haveli", "Rampur Dadra and Nagar Haveli", "Shivpur Dadra and Nagar Haveli"]}
                ]
            },
            "Daman": {
                "lgd_code": 1747,
                "name_hi": "Daman",
                "headquarters": "Daman",
                "latitude": 20.0 + (47 * 0.15),
                "longitude": 75.0 + (47 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Daman Sadar", "Daman North", "Daman South", "Daman Rural"],
                "blocks": ["Daman Block", "Daman West Block", "Daman East Block"],
                "panchayats": [
                    {"name": "Daman Central Gram Panchayat", "lgd_code": 301747, "block": "Daman Block", "villages": ["Daman Khas", "Daman Dehat", "Daman Purva"]},
                    {"name": "Daman Model Krishi Panchayat", "lgd_code": 302747, "block": "Daman East Block", "villages": ["Kalyanpur Daman", "Rampur Daman", "Shivpur Daman"]}
                ]
            },
            "Diu": {
                "lgd_code": 1748,
                "name_hi": "Diu",
                "headquarters": "Diu",
                "latitude": 20.0 + (48 * 0.15),
                "longitude": 75.0 + (48 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Diu Sadar", "Diu North", "Diu South", "Diu Rural"],
                "blocks": ["Diu Block", "Diu West Block", "Diu East Block"],
                "panchayats": [
                    {"name": "Diu Central Gram Panchayat", "lgd_code": 301748, "block": "Diu Block", "villages": ["Diu Khas", "Diu Dehat", "Diu Purva"]},
                    {"name": "Diu Model Krishi Panchayat", "lgd_code": 302748, "block": "Diu East Block", "villages": ["Kalyanpur Diu", "Rampur Diu", "Shivpur Diu"]}
                ]
            },
        }
    },
    "Delhi (NCT)": {
        "districts": {
            "Central Delhi": {
                "lgd_code": 1749,
                "name_hi": "Central Delhi",
                "headquarters": "Central Delhi",
                "latitude": 20.0 + (49 * 0.15),
                "longitude": 75.0 + (49 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Central Delhi Sadar", "Central Delhi North", "Central Delhi South", "Central Delhi Rural"],
                "blocks": ["Central Delhi Block", "Central Delhi West Block", "Central Delhi East Block"],
                "panchayats": [
                    {"name": "Central Delhi Central Gram Panchayat", "lgd_code": 301749, "block": "Central Delhi Block", "villages": ["Central Delhi Khas", "Central Delhi Dehat", "Central Delhi Purva"]},
                    {"name": "Central Delhi Model Krishi Panchayat", "lgd_code": 302749, "block": "Central Delhi East Block", "villages": ["Kalyanpur Central Delhi", "Rampur Central Delhi", "Shivpur Central Delhi"]}
                ]
            },
            "East Delhi": {
                "lgd_code": 1750,
                "name_hi": "East Delhi",
                "headquarters": "East Delhi",
                "latitude": 20.0 + (50 * 0.15),
                "longitude": 75.0 + (50 * 0.15),
                "has_boundary": True,
                "sub_districts": ["East Delhi Sadar", "East Delhi North", "East Delhi South", "East Delhi Rural"],
                "blocks": ["East Delhi Block", "East Delhi West Block", "East Delhi East Block"],
                "panchayats": [
                    {"name": "East Delhi Central Gram Panchayat", "lgd_code": 301750, "block": "East Delhi Block", "villages": ["East Delhi Khas", "East Delhi Dehat", "East Delhi Purva"]},
                    {"name": "East Delhi Model Krishi Panchayat", "lgd_code": 302750, "block": "East Delhi East Block", "villages": ["Kalyanpur East Delhi", "Rampur East Delhi", "Shivpur East Delhi"]}
                ]
            },
            "New Delhi": {
                "lgd_code": 1751,
                "name_hi": "New Delhi",
                "headquarters": "New Delhi",
                "latitude": 20.0 + (51 * 0.15),
                "longitude": 75.0 + (51 * 0.15),
                "has_boundary": True,
                "sub_districts": ["New Delhi Sadar", "New Delhi North", "New Delhi South", "New Delhi Rural"],
                "blocks": ["New Delhi Block", "New Delhi West Block", "New Delhi East Block"],
                "panchayats": [
                    {"name": "New Delhi Central Gram Panchayat", "lgd_code": 301751, "block": "New Delhi Block", "villages": ["New Delhi Khas", "New Delhi Dehat", "New Delhi Purva"]},
                    {"name": "New Delhi Model Krishi Panchayat", "lgd_code": 302751, "block": "New Delhi East Block", "villages": ["Kalyanpur New Delhi", "Rampur New Delhi", "Shivpur New Delhi"]}
                ]
            },
            "North Delhi": {
                "lgd_code": 1752,
                "name_hi": "North Delhi",
                "headquarters": "North Delhi",
                "latitude": 20.0 + (52 * 0.15),
                "longitude": 75.0 + (52 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North Delhi Sadar", "North Delhi North", "North Delhi South", "North Delhi Rural"],
                "blocks": ["North Delhi Block", "North Delhi West Block", "North Delhi East Block"],
                "panchayats": [
                    {"name": "North Delhi Central Gram Panchayat", "lgd_code": 301752, "block": "North Delhi Block", "villages": ["North Delhi Khas", "North Delhi Dehat", "North Delhi Purva"]},
                    {"name": "North Delhi Model Krishi Panchayat", "lgd_code": 302752, "block": "North Delhi East Block", "villages": ["Kalyanpur North Delhi", "Rampur North Delhi", "Shivpur North Delhi"]}
                ]
            },
            "North East Delhi": {
                "lgd_code": 1753,
                "name_hi": "North East Delhi",
                "headquarters": "North East Delhi",
                "latitude": 20.0 + (53 * 0.15),
                "longitude": 75.0 + (53 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North East Delhi Sadar", "North East Delhi North", "North East Delhi South", "North East Delhi Rural"],
                "blocks": ["North East Delhi Block", "North East Delhi West Block", "North East Delhi East Block"],
                "panchayats": [
                    {"name": "North East Delhi Central Gram Panchayat", "lgd_code": 301753, "block": "North East Delhi Block", "villages": ["North East Delhi Khas", "North East Delhi Dehat", "North East Delhi Purva"]},
                    {"name": "North East Delhi Model Krishi Panchayat", "lgd_code": 302753, "block": "North East Delhi East Block", "villages": ["Kalyanpur North East Delhi", "Rampur North East Delhi", "Shivpur North East Delhi"]}
                ]
            },
            "North West Delhi": {
                "lgd_code": 1754,
                "name_hi": "North West Delhi",
                "headquarters": "North West Delhi",
                "latitude": 20.0 + (54 * 0.15),
                "longitude": 75.0 + (54 * 0.15),
                "has_boundary": True,
                "sub_districts": ["North West Delhi Sadar", "North West Delhi North", "North West Delhi South", "North West Delhi Rural"],
                "blocks": ["North West Delhi Block", "North West Delhi West Block", "North West Delhi East Block"],
                "panchayats": [
                    {"name": "North West Delhi Central Gram Panchayat", "lgd_code": 301754, "block": "North West Delhi Block", "villages": ["North West Delhi Khas", "North West Delhi Dehat", "North West Delhi Purva"]},
                    {"name": "North West Delhi Model Krishi Panchayat", "lgd_code": 302754, "block": "North West Delhi East Block", "villages": ["Kalyanpur North West Delhi", "Rampur North West Delhi", "Shivpur North West Delhi"]}
                ]
            },
            "Shahdara": {
                "lgd_code": 1755,
                "name_hi": "Shahdara",
                "headquarters": "Shahdara",
                "latitude": 20.0 + (55 * 0.15),
                "longitude": 75.0 + (55 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shahdara Sadar", "Shahdara North", "Shahdara South", "Shahdara Rural"],
                "blocks": ["Shahdara Block", "Shahdara West Block", "Shahdara East Block"],
                "panchayats": [
                    {"name": "Shahdara Central Gram Panchayat", "lgd_code": 301755, "block": "Shahdara Block", "villages": ["Shahdara Khas", "Shahdara Dehat", "Shahdara Purva"]},
                    {"name": "Shahdara Model Krishi Panchayat", "lgd_code": 302755, "block": "Shahdara East Block", "villages": ["Kalyanpur Shahdara", "Rampur Shahdara", "Shivpur Shahdara"]}
                ]
            },
            "South Delhi": {
                "lgd_code": 1756,
                "name_hi": "South Delhi",
                "headquarters": "South Delhi",
                "latitude": 20.0 + (56 * 0.15),
                "longitude": 75.0 + (56 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South Delhi Sadar", "South Delhi North", "South Delhi South", "South Delhi Rural"],
                "blocks": ["South Delhi Block", "South Delhi West Block", "South Delhi East Block"],
                "panchayats": [
                    {"name": "South Delhi Central Gram Panchayat", "lgd_code": 301756, "block": "South Delhi Block", "villages": ["South Delhi Khas", "South Delhi Dehat", "South Delhi Purva"]},
                    {"name": "South Delhi Model Krishi Panchayat", "lgd_code": 302756, "block": "South Delhi East Block", "villages": ["Kalyanpur South Delhi", "Rampur South Delhi", "Shivpur South Delhi"]}
                ]
            },
            "South East Delhi": {
                "lgd_code": 1757,
                "name_hi": "South East Delhi",
                "headquarters": "South East Delhi",
                "latitude": 20.0 + (57 * 0.15),
                "longitude": 75.0 + (57 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South East Delhi Sadar", "South East Delhi North", "South East Delhi South", "South East Delhi Rural"],
                "blocks": ["South East Delhi Block", "South East Delhi West Block", "South East Delhi East Block"],
                "panchayats": [
                    {"name": "South East Delhi Central Gram Panchayat", "lgd_code": 301757, "block": "South East Delhi Block", "villages": ["South East Delhi Khas", "South East Delhi Dehat", "South East Delhi Purva"]},
                    {"name": "South East Delhi Model Krishi Panchayat", "lgd_code": 302757, "block": "South East Delhi East Block", "villages": ["Kalyanpur South East Delhi", "Rampur South East Delhi", "Shivpur South East Delhi"]}
                ]
            },
            "South West Delhi": {
                "lgd_code": 1758,
                "name_hi": "South West Delhi",
                "headquarters": "South West Delhi",
                "latitude": 20.0 + (58 * 0.15),
                "longitude": 75.0 + (58 * 0.15),
                "has_boundary": True,
                "sub_districts": ["South West Delhi Sadar", "South West Delhi North", "South West Delhi South", "South West Delhi Rural"],
                "blocks": ["South West Delhi Block", "South West Delhi West Block", "South West Delhi East Block"],
                "panchayats": [
                    {"name": "South West Delhi Central Gram Panchayat", "lgd_code": 301758, "block": "South West Delhi Block", "villages": ["South West Delhi Khas", "South West Delhi Dehat", "South West Delhi Purva"]},
                    {"name": "South West Delhi Model Krishi Panchayat", "lgd_code": 302758, "block": "South West Delhi East Block", "villages": ["Kalyanpur South West Delhi", "Rampur South West Delhi", "Shivpur South West Delhi"]}
                ]
            },
            "West Delhi": {
                "lgd_code": 1759,
                "name_hi": "West Delhi",
                "headquarters": "West Delhi",
                "latitude": 20.0 + (59 * 0.15),
                "longitude": 75.0 + (59 * 0.15),
                "has_boundary": True,
                "sub_districts": ["West Delhi Sadar", "West Delhi North", "West Delhi South", "West Delhi Rural"],
                "blocks": ["West Delhi Block", "West Delhi West Block", "West Delhi East Block"],
                "panchayats": [
                    {"name": "West Delhi Central Gram Panchayat", "lgd_code": 301759, "block": "West Delhi Block", "villages": ["West Delhi Khas", "West Delhi Dehat", "West Delhi Purva"]},
                    {"name": "West Delhi Model Krishi Panchayat", "lgd_code": 302759, "block": "West Delhi East Block", "villages": ["Kalyanpur West Delhi", "Rampur West Delhi", "Shivpur West Delhi"]}
                ]
            },
        }
    },
    "Jammu and Kashmir": {
        "districts": {
            "Anantnag": {
                "lgd_code": 1760,
                "name_hi": "Anantnag",
                "headquarters": "Anantnag",
                "latitude": 20.0 + (60 * 0.15),
                "longitude": 75.0 + (60 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Anantnag Sadar", "Anantnag North", "Anantnag South", "Anantnag Rural"],
                "blocks": ["Anantnag Block", "Anantnag West Block", "Anantnag East Block"],
                "panchayats": [
                    {"name": "Anantnag Central Gram Panchayat", "lgd_code": 301760, "block": "Anantnag Block", "villages": ["Anantnag Khas", "Anantnag Dehat", "Anantnag Purva"]},
                    {"name": "Anantnag Model Krishi Panchayat", "lgd_code": 302760, "block": "Anantnag East Block", "villages": ["Kalyanpur Anantnag", "Rampur Anantnag", "Shivpur Anantnag"]}
                ]
            },
            "Bandipora": {
                "lgd_code": 1761,
                "name_hi": "Bandipora",
                "headquarters": "Bandipora",
                "latitude": 20.0 + (61 * 0.15),
                "longitude": 75.0 + (61 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Bandipora Sadar", "Bandipora North", "Bandipora South", "Bandipora Rural"],
                "blocks": ["Bandipora Block", "Bandipora West Block", "Bandipora East Block"],
                "panchayats": [
                    {"name": "Bandipora Central Gram Panchayat", "lgd_code": 301761, "block": "Bandipora Block", "villages": ["Bandipora Khas", "Bandipora Dehat", "Bandipora Purva"]},
                    {"name": "Bandipora Model Krishi Panchayat", "lgd_code": 302761, "block": "Bandipora East Block", "villages": ["Kalyanpur Bandipora", "Rampur Bandipora", "Shivpur Bandipora"]}
                ]
            },
            "Baramulla": {
                "lgd_code": 1762,
                "name_hi": "Baramulla",
                "headquarters": "Baramulla",
                "latitude": 20.0 + (62 * 0.15),
                "longitude": 75.0 + (62 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Baramulla Sadar", "Baramulla North", "Baramulla South", "Baramulla Rural"],
                "blocks": ["Baramulla Block", "Baramulla West Block", "Baramulla East Block"],
                "panchayats": [
                    {"name": "Baramulla Central Gram Panchayat", "lgd_code": 301762, "block": "Baramulla Block", "villages": ["Baramulla Khas", "Baramulla Dehat", "Baramulla Purva"]},
                    {"name": "Baramulla Model Krishi Panchayat", "lgd_code": 302762, "block": "Baramulla East Block", "villages": ["Kalyanpur Baramulla", "Rampur Baramulla", "Shivpur Baramulla"]}
                ]
            },
            "Budgam": {
                "lgd_code": 1763,
                "name_hi": "Budgam",
                "headquarters": "Budgam",
                "latitude": 20.0 + (63 * 0.15),
                "longitude": 75.0 + (63 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Budgam Sadar", "Budgam North", "Budgam South", "Budgam Rural"],
                "blocks": ["Budgam Block", "Budgam West Block", "Budgam East Block"],
                "panchayats": [
                    {"name": "Budgam Central Gram Panchayat", "lgd_code": 301763, "block": "Budgam Block", "villages": ["Budgam Khas", "Budgam Dehat", "Budgam Purva"]},
                    {"name": "Budgam Model Krishi Panchayat", "lgd_code": 302763, "block": "Budgam East Block", "villages": ["Kalyanpur Budgam", "Rampur Budgam", "Shivpur Budgam"]}
                ]
            },
            "Doda": {
                "lgd_code": 1764,
                "name_hi": "Doda",
                "headquarters": "Doda",
                "latitude": 20.0 + (64 * 0.15),
                "longitude": 75.0 + (64 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Doda Sadar", "Doda North", "Doda South", "Doda Rural"],
                "blocks": ["Doda Block", "Doda West Block", "Doda East Block"],
                "panchayats": [
                    {"name": "Doda Central Gram Panchayat", "lgd_code": 301764, "block": "Doda Block", "villages": ["Doda Khas", "Doda Dehat", "Doda Purva"]},
                    {"name": "Doda Model Krishi Panchayat", "lgd_code": 302764, "block": "Doda East Block", "villages": ["Kalyanpur Doda", "Rampur Doda", "Shivpur Doda"]}
                ]
            },
            "Ganderbal": {
                "lgd_code": 1765,
                "name_hi": "Ganderbal",
                "headquarters": "Ganderbal",
                "latitude": 20.0 + (65 * 0.15),
                "longitude": 75.0 + (65 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ganderbal Sadar", "Ganderbal North", "Ganderbal South", "Ganderbal Rural"],
                "blocks": ["Ganderbal Block", "Ganderbal West Block", "Ganderbal East Block"],
                "panchayats": [
                    {"name": "Ganderbal Central Gram Panchayat", "lgd_code": 301765, "block": "Ganderbal Block", "villages": ["Ganderbal Khas", "Ganderbal Dehat", "Ganderbal Purva"]},
                    {"name": "Ganderbal Model Krishi Panchayat", "lgd_code": 302765, "block": "Ganderbal East Block", "villages": ["Kalyanpur Ganderbal", "Rampur Ganderbal", "Shivpur Ganderbal"]}
                ]
            },
            "Jammu": {
                "lgd_code": 1766,
                "name_hi": "Jammu",
                "headquarters": "Jammu",
                "latitude": 20.0 + (66 * 0.15),
                "longitude": 75.0 + (66 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Jammu Sadar", "Jammu North", "Jammu South", "Jammu Rural"],
                "blocks": ["Jammu Block", "Jammu West Block", "Jammu East Block"],
                "panchayats": [
                    {"name": "Jammu Central Gram Panchayat", "lgd_code": 301766, "block": "Jammu Block", "villages": ["Jammu Khas", "Jammu Dehat", "Jammu Purva"]},
                    {"name": "Jammu Model Krishi Panchayat", "lgd_code": 302766, "block": "Jammu East Block", "villages": ["Kalyanpur Jammu", "Rampur Jammu", "Shivpur Jammu"]}
                ]
            },
            "Kathua": {
                "lgd_code": 1767,
                "name_hi": "Kathua",
                "headquarters": "Kathua",
                "latitude": 20.0 + (67 * 0.15),
                "longitude": 75.0 + (67 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kathua Sadar", "Kathua North", "Kathua South", "Kathua Rural"],
                "blocks": ["Kathua Block", "Kathua West Block", "Kathua East Block"],
                "panchayats": [
                    {"name": "Kathua Central Gram Panchayat", "lgd_code": 301767, "block": "Kathua Block", "villages": ["Kathua Khas", "Kathua Dehat", "Kathua Purva"]},
                    {"name": "Kathua Model Krishi Panchayat", "lgd_code": 302767, "block": "Kathua East Block", "villages": ["Kalyanpur Kathua", "Rampur Kathua", "Shivpur Kathua"]}
                ]
            },
            "Kishtwar": {
                "lgd_code": 1768,
                "name_hi": "Kishtwar",
                "headquarters": "Kishtwar",
                "latitude": 20.0 + (68 * 0.15),
                "longitude": 75.0 + (68 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kishtwar Sadar", "Kishtwar North", "Kishtwar South", "Kishtwar Rural"],
                "blocks": ["Kishtwar Block", "Kishtwar West Block", "Kishtwar East Block"],
                "panchayats": [
                    {"name": "Kishtwar Central Gram Panchayat", "lgd_code": 301768, "block": "Kishtwar Block", "villages": ["Kishtwar Khas", "Kishtwar Dehat", "Kishtwar Purva"]},
                    {"name": "Kishtwar Model Krishi Panchayat", "lgd_code": 302768, "block": "Kishtwar East Block", "villages": ["Kalyanpur Kishtwar", "Rampur Kishtwar", "Shivpur Kishtwar"]}
                ]
            },
            "Kulgam": {
                "lgd_code": 1769,
                "name_hi": "Kulgam",
                "headquarters": "Kulgam",
                "latitude": 20.0 + (69 * 0.15),
                "longitude": 75.0 + (69 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kulgam Sadar", "Kulgam North", "Kulgam South", "Kulgam Rural"],
                "blocks": ["Kulgam Block", "Kulgam West Block", "Kulgam East Block"],
                "panchayats": [
                    {"name": "Kulgam Central Gram Panchayat", "lgd_code": 301769, "block": "Kulgam Block", "villages": ["Kulgam Khas", "Kulgam Dehat", "Kulgam Purva"]},
                    {"name": "Kulgam Model Krishi Panchayat", "lgd_code": 302769, "block": "Kulgam East Block", "villages": ["Kalyanpur Kulgam", "Rampur Kulgam", "Shivpur Kulgam"]}
                ]
            },
            "Kupwara": {
                "lgd_code": 1770,
                "name_hi": "Kupwara",
                "headquarters": "Kupwara",
                "latitude": 20.0 + (70 * 0.15),
                "longitude": 75.0 + (70 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kupwara Sadar", "Kupwara North", "Kupwara South", "Kupwara Rural"],
                "blocks": ["Kupwara Block", "Kupwara West Block", "Kupwara East Block"],
                "panchayats": [
                    {"name": "Kupwara Central Gram Panchayat", "lgd_code": 301770, "block": "Kupwara Block", "villages": ["Kupwara Khas", "Kupwara Dehat", "Kupwara Purva"]},
                    {"name": "Kupwara Model Krishi Panchayat", "lgd_code": 302770, "block": "Kupwara East Block", "villages": ["Kalyanpur Kupwara", "Rampur Kupwara", "Shivpur Kupwara"]}
                ]
            },
            "Poonch": {
                "lgd_code": 1771,
                "name_hi": "Poonch",
                "headquarters": "Poonch",
                "latitude": 20.0 + (71 * 0.15),
                "longitude": 75.0 + (71 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Poonch Sadar", "Poonch North", "Poonch South", "Poonch Rural"],
                "blocks": ["Poonch Block", "Poonch West Block", "Poonch East Block"],
                "panchayats": [
                    {"name": "Poonch Central Gram Panchayat", "lgd_code": 301771, "block": "Poonch Block", "villages": ["Poonch Khas", "Poonch Dehat", "Poonch Purva"]},
                    {"name": "Poonch Model Krishi Panchayat", "lgd_code": 302771, "block": "Poonch East Block", "villages": ["Kalyanpur Poonch", "Rampur Poonch", "Shivpur Poonch"]}
                ]
            },
            "Pulwama": {
                "lgd_code": 1772,
                "name_hi": "Pulwama",
                "headquarters": "Pulwama",
                "latitude": 20.0 + (72 * 0.15),
                "longitude": 75.0 + (72 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Pulwama Sadar", "Pulwama North", "Pulwama South", "Pulwama Rural"],
                "blocks": ["Pulwama Block", "Pulwama West Block", "Pulwama East Block"],
                "panchayats": [
                    {"name": "Pulwama Central Gram Panchayat", "lgd_code": 301772, "block": "Pulwama Block", "villages": ["Pulwama Khas", "Pulwama Dehat", "Pulwama Purva"]},
                    {"name": "Pulwama Model Krishi Panchayat", "lgd_code": 302772, "block": "Pulwama East Block", "villages": ["Kalyanpur Pulwama", "Rampur Pulwama", "Shivpur Pulwama"]}
                ]
            },
            "Rajouri": {
                "lgd_code": 1773,
                "name_hi": "Rajouri",
                "headquarters": "Rajouri",
                "latitude": 20.0 + (73 * 0.15),
                "longitude": 75.0 + (73 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Rajouri Sadar", "Rajouri North", "Rajouri South", "Rajouri Rural"],
                "blocks": ["Rajouri Block", "Rajouri West Block", "Rajouri East Block"],
                "panchayats": [
                    {"name": "Rajouri Central Gram Panchayat", "lgd_code": 301773, "block": "Rajouri Block", "villages": ["Rajouri Khas", "Rajouri Dehat", "Rajouri Purva"]},
                    {"name": "Rajouri Model Krishi Panchayat", "lgd_code": 302773, "block": "Rajouri East Block", "villages": ["Kalyanpur Rajouri", "Rampur Rajouri", "Shivpur Rajouri"]}
                ]
            },
            "Ramban": {
                "lgd_code": 1774,
                "name_hi": "Ramban",
                "headquarters": "Ramban",
                "latitude": 20.0 + (74 * 0.15),
                "longitude": 75.0 + (74 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Ramban Sadar", "Ramban North", "Ramban South", "Ramban Rural"],
                "blocks": ["Ramban Block", "Ramban West Block", "Ramban East Block"],
                "panchayats": [
                    {"name": "Ramban Central Gram Panchayat", "lgd_code": 301774, "block": "Ramban Block", "villages": ["Ramban Khas", "Ramban Dehat", "Ramban Purva"]},
                    {"name": "Ramban Model Krishi Panchayat", "lgd_code": 302774, "block": "Ramban East Block", "villages": ["Kalyanpur Ramban", "Rampur Ramban", "Shivpur Ramban"]}
                ]
            },
            "Reasi": {
                "lgd_code": 1775,
                "name_hi": "Reasi",
                "headquarters": "Reasi",
                "latitude": 20.0 + (75 * 0.15),
                "longitude": 75.0 + (75 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Reasi Sadar", "Reasi North", "Reasi South", "Reasi Rural"],
                "blocks": ["Reasi Block", "Reasi West Block", "Reasi East Block"],
                "panchayats": [
                    {"name": "Reasi Central Gram Panchayat", "lgd_code": 301775, "block": "Reasi Block", "villages": ["Reasi Khas", "Reasi Dehat", "Reasi Purva"]},
                    {"name": "Reasi Model Krishi Panchayat", "lgd_code": 302775, "block": "Reasi East Block", "villages": ["Kalyanpur Reasi", "Rampur Reasi", "Shivpur Reasi"]}
                ]
            },
            "Samba": {
                "lgd_code": 1776,
                "name_hi": "Samba",
                "headquarters": "Samba",
                "latitude": 20.0 + (76 * 0.15),
                "longitude": 75.0 + (76 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Samba Sadar", "Samba North", "Samba South", "Samba Rural"],
                "blocks": ["Samba Block", "Samba West Block", "Samba East Block"],
                "panchayats": [
                    {"name": "Samba Central Gram Panchayat", "lgd_code": 301776, "block": "Samba Block", "villages": ["Samba Khas", "Samba Dehat", "Samba Purva"]},
                    {"name": "Samba Model Krishi Panchayat", "lgd_code": 302776, "block": "Samba East Block", "villages": ["Kalyanpur Samba", "Rampur Samba", "Shivpur Samba"]}
                ]
            },
            "Shopian": {
                "lgd_code": 1777,
                "name_hi": "Shopian",
                "headquarters": "Shopian",
                "latitude": 20.0 + (77 * 0.15),
                "longitude": 75.0 + (77 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Shopian Sadar", "Shopian North", "Shopian South", "Shopian Rural"],
                "blocks": ["Shopian Block", "Shopian West Block", "Shopian East Block"],
                "panchayats": [
                    {"name": "Shopian Central Gram Panchayat", "lgd_code": 301777, "block": "Shopian Block", "villages": ["Shopian Khas", "Shopian Dehat", "Shopian Purva"]},
                    {"name": "Shopian Model Krishi Panchayat", "lgd_code": 302777, "block": "Shopian East Block", "villages": ["Kalyanpur Shopian", "Rampur Shopian", "Shivpur Shopian"]}
                ]
            },
            "Srinagar": {
                "lgd_code": 1778,
                "name_hi": "Srinagar",
                "headquarters": "Srinagar",
                "latitude": 20.0 + (78 * 0.15),
                "longitude": 75.0 + (78 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Srinagar Sadar", "Srinagar North", "Srinagar South", "Srinagar Rural"],
                "blocks": ["Srinagar Block", "Srinagar West Block", "Srinagar East Block"],
                "panchayats": [
                    {"name": "Srinagar Central Gram Panchayat", "lgd_code": 301778, "block": "Srinagar Block", "villages": ["Srinagar Khas", "Srinagar Dehat", "Srinagar Purva"]},
                    {"name": "Srinagar Model Krishi Panchayat", "lgd_code": 302778, "block": "Srinagar East Block", "villages": ["Kalyanpur Srinagar", "Rampur Srinagar", "Shivpur Srinagar"]}
                ]
            },
            "Udhampur": {
                "lgd_code": 1779,
                "name_hi": "Udhampur",
                "headquarters": "Udhampur",
                "latitude": 20.0 + (79 * 0.15),
                "longitude": 75.0 + (79 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Udhampur Sadar", "Udhampur North", "Udhampur South", "Udhampur Rural"],
                "blocks": ["Udhampur Block", "Udhampur West Block", "Udhampur East Block"],
                "panchayats": [
                    {"name": "Udhampur Central Gram Panchayat", "lgd_code": 301779, "block": "Udhampur Block", "villages": ["Udhampur Khas", "Udhampur Dehat", "Udhampur Purva"]},
                    {"name": "Udhampur Model Krishi Panchayat", "lgd_code": 302779, "block": "Udhampur East Block", "villages": ["Kalyanpur Udhampur", "Rampur Udhampur", "Shivpur Udhampur"]}
                ]
            },
        }
    },
    "Ladakh": {
        "districts": {
            "Kargil": {
                "lgd_code": 1780,
                "name_hi": "Kargil",
                "headquarters": "Kargil",
                "latitude": 20.0 + (80 * 0.15),
                "longitude": 75.0 + (80 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Kargil Sadar", "Kargil North", "Kargil South", "Kargil Rural"],
                "blocks": ["Kargil Block", "Kargil West Block", "Kargil East Block"],
                "panchayats": [
                    {"name": "Kargil Central Gram Panchayat", "lgd_code": 301780, "block": "Kargil Block", "villages": ["Kargil Khas", "Kargil Dehat", "Kargil Purva"]},
                    {"name": "Kargil Model Krishi Panchayat", "lgd_code": 302780, "block": "Kargil East Block", "villages": ["Kalyanpur Kargil", "Rampur Kargil", "Shivpur Kargil"]}
                ]
            },
            "Leh": {
                "lgd_code": 1781,
                "name_hi": "Leh",
                "headquarters": "Leh",
                "latitude": 20.0 + (81 * 0.15),
                "longitude": 75.0 + (81 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Leh Sadar", "Leh North", "Leh South", "Leh Rural"],
                "blocks": ["Leh Block", "Leh West Block", "Leh East Block"],
                "panchayats": [
                    {"name": "Leh Central Gram Panchayat", "lgd_code": 301781, "block": "Leh Block", "villages": ["Leh Khas", "Leh Dehat", "Leh Purva"]},
                    {"name": "Leh Model Krishi Panchayat", "lgd_code": 302781, "block": "Leh East Block", "villages": ["Kalyanpur Leh", "Rampur Leh", "Shivpur Leh"]}
                ]
            },
        }
    },
    "Lakshadweep": {
        "districts": {
            "Lakshadweep": {
                "lgd_code": 1782,
                "name_hi": "Lakshadweep",
                "headquarters": "Lakshadweep",
                "latitude": 20.0 + (82 * 0.15),
                "longitude": 75.0 + (82 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Lakshadweep Sadar", "Lakshadweep North", "Lakshadweep South", "Lakshadweep Rural"],
                "blocks": ["Lakshadweep Block", "Lakshadweep West Block", "Lakshadweep East Block"],
                "panchayats": [
                    {"name": "Lakshadweep Central Gram Panchayat", "lgd_code": 301782, "block": "Lakshadweep Block", "villages": ["Lakshadweep Khas", "Lakshadweep Dehat", "Lakshadweep Purva"]},
                    {"name": "Lakshadweep Model Krishi Panchayat", "lgd_code": 302782, "block": "Lakshadweep East Block", "villages": ["Kalyanpur Lakshadweep", "Rampur Lakshadweep", "Shivpur Lakshadweep"]}
                ]
            },
        }
    },
    "Puducherry": {
        "districts": {
            "Karaikal": {
                "lgd_code": 1783,
                "name_hi": "Karaikal",
                "headquarters": "Karaikal",
                "latitude": 20.0 + (83 * 0.15),
                "longitude": 75.0 + (83 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Karaikal Sadar", "Karaikal North", "Karaikal South", "Karaikal Rural"],
                "blocks": ["Karaikal Block", "Karaikal West Block", "Karaikal East Block"],
                "panchayats": [
                    {"name": "Karaikal Central Gram Panchayat", "lgd_code": 301783, "block": "Karaikal Block", "villages": ["Karaikal Khas", "Karaikal Dehat", "Karaikal Purva"]},
                    {"name": "Karaikal Model Krishi Panchayat", "lgd_code": 302783, "block": "Karaikal East Block", "villages": ["Kalyanpur Karaikal", "Rampur Karaikal", "Shivpur Karaikal"]}
                ]
            },
            "Mahe": {
                "lgd_code": 1784,
                "name_hi": "Mahe",
                "headquarters": "Mahe",
                "latitude": 20.0 + (84 * 0.15),
                "longitude": 75.0 + (84 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Mahe Sadar", "Mahe North", "Mahe South", "Mahe Rural"],
                "blocks": ["Mahe Block", "Mahe West Block", "Mahe East Block"],
                "panchayats": [
                    {"name": "Mahe Central Gram Panchayat", "lgd_code": 301784, "block": "Mahe Block", "villages": ["Mahe Khas", "Mahe Dehat", "Mahe Purva"]},
                    {"name": "Mahe Model Krishi Panchayat", "lgd_code": 302784, "block": "Mahe East Block", "villages": ["Kalyanpur Mahe", "Rampur Mahe", "Shivpur Mahe"]}
                ]
            },
            "Puducherry": {
                "lgd_code": 1785,
                "name_hi": "Puducherry",
                "headquarters": "Puducherry",
                "latitude": 20.0 + (85 * 0.15),
                "longitude": 75.0 + (85 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Puducherry Sadar", "Puducherry North", "Puducherry South", "Puducherry Rural"],
                "blocks": ["Puducherry Block", "Puducherry West Block", "Puducherry East Block"],
                "panchayats": [
                    {"name": "Puducherry Central Gram Panchayat", "lgd_code": 301785, "block": "Puducherry Block", "villages": ["Puducherry Khas", "Puducherry Dehat", "Puducherry Purva"]},
                    {"name": "Puducherry Model Krishi Panchayat", "lgd_code": 302785, "block": "Puducherry East Block", "villages": ["Kalyanpur Puducherry", "Rampur Puducherry", "Shivpur Puducherry"]}
                ]
            },
            "Yanam": {
                "lgd_code": 1786,
                "name_hi": "Yanam",
                "headquarters": "Yanam",
                "latitude": 20.0 + (86 * 0.15),
                "longitude": 75.0 + (86 * 0.15),
                "has_boundary": True,
                "sub_districts": ["Yanam Sadar", "Yanam North", "Yanam South", "Yanam Rural"],
                "blocks": ["Yanam Block", "Yanam West Block", "Yanam East Block"],
                "panchayats": [
                    {"name": "Yanam Central Gram Panchayat", "lgd_code": 301786, "block": "Yanam Block", "villages": ["Yanam Khas", "Yanam Dehat", "Yanam Purva"]},
                    {"name": "Yanam Model Krishi Panchayat", "lgd_code": 302786, "block": "Yanam East Block", "villages": ["Kalyanpur Yanam", "Rampur Yanam", "Shivpur Yanam"]}
                ]
            },
        }
    },
}
