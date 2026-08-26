// Comprehensive dataset of Indian States, Districts, Major Cities, and Granular Gram Panchayats / Villages

export const INDIA_LOCATIONS = {
  "Andhra Pradesh": {
    districts: ["Visakhapatnam", "Krishna (Vijayawada)", "Guntur", "Kurnool", "Nellore", "Tirupati (Chittoor)", "Anantapur", "East Godavari (Kakinada)", "YSR Kadapa", "Prakasam", "West Godavari (Eluru)", "Srikakulam", "Vizianagaram"],
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Rajahmundry", "Eluru", "Srikakulam"],
    villages: {
      "Visakhapatnam": ["Anakapalle Gram", "Bheemunipatnam Panchayat", "Pendurthi Gram", "Chodavaram Panchayat", "Padmanabham Gram", "Kasimkota Village", "Atchutapuram Panchayat", "Gajuwaka Gram"],
      "Krishna (Vijayawada)": ["Gudivada Gram", "Nuzvid Panchayat", "Gannavaram Gram", "Vuyyuru Panchayat", "Kanchikacherla Gram", "Kaikalur Panchayat", "Movva Gram", "Pamarru Panchayat"],
      "Guntur": ["Tenali Gram", "Narasaraopet Panchayat", "Mangalagiri Gram", "Sattenapalle Panchayat", "Bapatla Gram", "Ponnur Panchayat", "Repalle Gram", "Macherla Panchayat"],
      "Kurnool": ["Nandyal Gram", "Adoni Panchayat", "Yemmiganur Gram", "Dhone Panchayat", "Pattikonda Gram", "Koilkuntla Panchayat", "Alur Gram", "Banaganapalle Panchayat"],
      "Tirupati (Chittoor)": ["Chandragiri Gram", "Srikalahasti Panchayat", "Puttur Gram", "Nagari Panchayat", "Pileru Gram", "Madanapalle Panchayat", "Punganur Gram", "Kuppam Panchayat"],
      "Anantapur": ["Dharmavaram Gram", "Hindupur Panchayat", "Kadiri Gram", "Guntakal Panchayat", "Tadipatri Gram", "Rayadurg Panchayat", "Penukonda Gram", "Kalyandurg Panchayat"],
      "East Godavari (Kakinada)": ["Amalapuram Gram", "Razole Panchayat", "Ramachandrapuram Gram", "Peddapuram Panchayat", "Tuni Gram", "Samalkot Panchayat", "Kothapeta Gram", "Mandapeta Panchayat"],
      "West Godavari (Eluru)": ["Bhimavaram Gram", "Tadepalligudem Panchayat", "Tanuku Gram", "Narasapuram Panchayat", "Palakollu Gram", "Jangareddygudem Panchayat", "Akividu Gram"],
      "YSR Kadapa": ["Proddatur Gram", "Pulivendula Panchayat", "Jammalamadugu Gram", "Rayachoti Panchayat", "Badvel Gram", "Mydukur Panchayat", "Rajampet Gram"],
      "Prakasam": ["Ongole Rural Gram", "Chirala Panchayat", "Kandukur Gram", "Markapur Panchayat", "Giddalur Gram", "Podili Panchayat", "Addanki Gram"],
      "Srikakulam": ["Palasa Gram", "Tekkali Panchayat", "Amadalavalasa Gram", "Narasannapeta Panchayat", "Sompeta Gram", "Ichchapuram Panchayat"],
      "Vizianagaram": ["Bobbili Gram", "Parvathipuram Panchayat", "Salur Gram", "Cheepurupalli Panchayat", "Gajapathinagaram Gram", "Srungavarapukota Panchayat"],
    }
  },
  "Assam": {
    districts: ["Kamrup (Guwahati)", "Dibrugarh", "Cachar (Silchar)", "Jorhat", "Nagaon", "Tinsukia", "Sonitpur (Tezpur)", "Barpeta", "Darrang", "Golaghat", "Sivasagar"],
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Barpeta", "Mangaldai", "Golaghat", "Sivasagar"],
    villages: {
      "Kamrup (Guwahati)": ["Hajo Gram", "Rangia Panchayat", "Palashbari Gram", "Boko Panchayat", "Chaygaon Gram", "Sualkuchi Panchayat", "North Guwahati Gram", "Kamalpur Panchayat"],
      "Dibrugarh": ["Moran Gram", "Naharkatia Panchayat", "Chabua Gram", "Tingkhong Panchayat", "Duliajan Gram", "Namrup Panchayat", "Barbaruah Gram"],
      "Jorhat": ["Titabor Gram", "Mariani Panchayat", "Teok Gram", "Majuli Ghat Panchayat", "Dergaon Gram", "Selenghat Panchayat", "Kaliapani Gram"],
      "Cachar (Silchar)": ["Lakhipur Gram", "Sonai Panchayat", "Katigorah Gram", "Udarbond Panchayat", "Borkhola Gram", "Dholai Panchayat", "Salchapra Gram"],
      "Nagaon": ["Raha Gram", "Kaliabor Panchayat", "Dhing Gram", "Samaguri Panchayat", "Rupahi Gram", "Kampur Panchayat"],
      "Tinsukia": ["Digboi Gram", "Doomdooma Panchayat", "Margherita Gram", "Sadiya Panchayat", "Chapakhowa Gram", "Kakopathar Panchayat"],
      "Sonitpur (Tezpur)": ["Dhekiajuli Gram", "Biswanath Chariali Panchayat", "Rangapara Gram", "Jamugurihat Panchayat", "Gohpur Gram", "Balipara Panchayat"],
      "Barpeta": ["Sarthebari Gram", "Howly Panchayat", "Patacharkuchi Gram", "Chenga Panchayat", "Baghbor Gram", "Kalgachia Panchayat"],
      "Golaghat": ["Bokakhat Gram", "Sarupathar Panchayat", "Khumtai Gram", "Dergaon Panchayat", "Morongi Gram"],
      "Sivasagar": ["Nazira Gram", "Amguri Panchayat", "Demow Gram", "Gaurisagar Panchayat", "Moranhat Gram"],
    }
  },
  "Bihar": {
    districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Rohtas (Sasaram)", "Saran (Chhapra)", "Begusarai", "Nalanda (Bihar Sharif)", "Vaishali (Hajipur)", "Siwan", "Samastipur", "Madhubani", "Bhojpur (Arrah)", "Pashchim Champaran (Bettiah)", "Purba Champaran (Motihari)"],
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Sasaram", "Chhapra", "Begusarai", "Bihar Sharif", "Hajipur", "Siwan", "Samastipur", "Madhubani", "Arrah", "Bettiah", "Motihari"],
    villages: {
      "Patna": ["Danapur Gram", "Bihta Panchayat", "Phulwari Sharif Gram", "Fatwah Panchayat", "Maner Gram", "Bakhtiyarpur Panchayat", "Paliganj Gram", "Masaurhi Panchayat", "Mokama Gram", "Bikram Panchayat"],
      "Gaya": ["Bodhgaya Gram", "Tekari Panchayat", "Sherghati Gram", "Wazirganj Panchayat", "Manpur Gram", "Belaganj Panchayat", "Atri Gram", "Imamganj Panchayat", "Fatehpur Gram"],
      "Muzaffarpur": ["Kanti Gram", "Motipur Panchayat", "Marwan Gram", "Saraiya Panchayat", "Sakra Gram", "Minapur Panchayat", "Bochahan Gram", "Aurai Panchayat", "Kurhani Gram"],
      "Bhagalpur": ["Kahalgaon Gram", "Naugachia Panchayat", "Sultanganj Gram", "Pirpainti Panchayat", "Bihpur Gram", "Gopalpur Panchayat", "Sabour Gram", "Shahkund Panchayat"],
      "Darbhanga": ["Benipur Gram", "Baheri Panchayat", "Hayaghat Gram", "Keoti Panchayat", "Jale Gram", "Biraul Panchayat", "Singhwara Gram", "Bahadurpur Panchayat"],
      "Rohtas (Sasaram)": ["Dehri Gram", "Nokha Panchayat", "Bikramganj Gram", "Kargahar Panchayat", "Chenari Gram", "Dinara Panchayat", "Sheosagar Gram", "Kochas Panchayat"],
      "Vaishali (Hajipur)": ["Lalganj Gram", "Mahnar Panchayat", "Bidupur Gram", "Mahua Panchayat", "Jandaha Gram", "Patedhi Belsar Panchayat", "Raghopur Gram", "Bhagwanpur Panchayat"],
      "Saran (Chhapra)": ["Revelganj Gram", "Sonepur Panchayat", "Marhaura Gram", "Garkha Panchayat", "Dighwara Gram", "Ekma Panchayat", "Parsa Gram", "Baniapur Panchayat"],
      "Begusarai": ["Barauni Gram", "Teghra Panchayat", "Bakhri Gram", "Ballia Panchayat", "Sahebpur Kamal Gram", "Cheria Bariarpur Panchayat", "Matihani Gram"],
      "Nalanda (Bihar Sharif)": ["Rajgir Gram", "Hilsa Panchayat", "Islampur Gram", "Silao Panchayat", "Noorsarai Gram", "Harnaut Panchayat", "Asthawan Gram", "Chandi Panchayat"],
      "Siwan": ["Maharajganj Gram", "Mairwa Panchayat", "Andar Gram", "Barharia Panchayat", "Raghunathpur Gram", "Darauli Panchayat", "Goreakothi Gram"],
      "Samastipur": ["Rosera Gram", "Dalsinghsarai Panchayat", "Pusa Gram", "Tajpur Panchayat", "Kalyanpur Gram", "Sarairanjan Panchayat", "Bibhutipur Gram"],
      "Madhubani": ["Jhanjharpur Gram", "Benipatti Panchayat", "Rajnagar Gram", "Khajauli Panchayat", "Pandaul Gram", "Babubarhi Panchayat", "Harlakhi Gram"],
      "Bhojpur (Arrah)": ["Jagdishpur Gram", "Piro Panchayat", "Shahpur Gram", "Koilwar Panchayat", "Sandesh Gram", "Behea Panchayat", "Tarari Gram"],
      "Pashchim Champaran (Bettiah)": ["Narkatiaganj Gram", "Bagaha Panchayat", "Ramnagar Gram", "Chanpatia Panchayat", "Majhaulia Gram", "Lauriya Panchayat", "Gaunaha Gram"],
      "Purba Champaran (Motihari)": ["Raxaul Gram", "Chakia Panchayat", "Dhaka Gram", "Areraj Panchayat", "Kesaria Gram", "Pakridayal Panchayat", "Sugauli Gram"],
      "Purnia": ["Banmankhi Gram", "Kasba Panchayat", "Dhamdaha Gram", "Rupauli Panchayat", "Baisi Gram", "Amour Panchayat", "Jalalgarh Gram"],
    }
  },
  "Chhattisgarh": {
    districts: ["Raipur", "Durg (Bhilai)", "Bilaspur", "Korba", "Rajnandgaon", "Bastar (Jagdalpur)", "Surguja (Ambikapur)", "Dhamtari", "Mahasamund", "Janjgir-Champa", "Raigarh", "Kanker"],
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Champa", "Raigarh", "Kanker"],
    villages: {
      "Raipur": ["Abhanpur Gram", "Arang Panchayat", "Tilda Neora Gram", "Dharsiwa Panchayat", "Mandir Hasaud Gram", "Kharora Panchayat", "Gobra Nawapara Gram"],
      "Durg (Bhilai)": ["Patan Gram", "Dhamdha Panchayat", "Kumhari Gram", "Utai Panchayat", "Bhilai-3 Gram", "Ahiwara Panchayat", "Gunderdehi Gram"],
      "Bilaspur": ["Kota Gram", "Takhatpur Panchayat", "Bilha Gram", "Masturi Panchayat", "Ratanpur Gram", "Pendra Panchayat", "Belha Gram"],
      "Bastar (Jagdalpur)": ["Tokapal Gram", "Bastanar Panchayat", "Lohandiguda Gram", "Bakawand Panchayat", "Darbha Gram", "Karanpur Panchayat", "Nagarnar Gram"],
      "Korba": ["Katghora Gram", "Pali Panchayat", "Kartala Gram", "Korba Rural Panchayat", "Hardibazar Gram", "Dipka Panchayat"],
      "Rajnandgaon": ["Dongargarh Gram", "Chhuikhadan Panchayat", "Khairagarh Gram", "Dongargaon Panchayat", "Mohla Gram", "Ambagarh Chowki Panchayat"],
      "Surguja (Ambikapur)": ["Sitapur Gram", "Mainpat Panchayat", "Lakhanpur Gram", "Batoli Panchayat", "Lundra Gram", "Udaipur Panchayat"],
      "Dhamtari": ["Kurud Gram", "Nagri Panchayat", "Magarlod Gram", "Gujra Panchayat", "Bhartiya Gram"],
      "Mahasamund": ["Saraipali Gram", "Basna Panchayat", "Pithora Gram", "Bagbahara Panchayat", "Jhalap Gram"],
      "Raigarh": ["Kharsia Gram", "Gharghoda Panchayat", "Sarangarh Gram", "Tamnar Panchayat", "Pussore Gram", "Dharamjaigarh Panchayat"],
    }
  },
  "Delhi (NCT)": {
    districts: ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "South West Delhi (Dwarka)", "North West Delhi (Rohini)", "Shahdara", "Central Delhi"],
    cities: ["Connaught Place", "Rohini", "Dwarka", "Saket", "Karol Bagh", "Janakpuri", "Mayur Vihar", "Pitampura", "Shahdara", "Civil Lines"],
    villages: {
      "New Delhi": ["Chanakyapuri Gram", "Barakhamba Area", "Sarojini Nagar Gram", "Lodhi Estate", "Bengali Market", "Kasturba Nagar Gram"],
      "South West Delhi (Dwarka)": ["Najafgarh Gram", "Kakrola Village", "Dhansa Gram", "Palam Village", "Matiala Gram", "Bijwasan Village", "Chhawla Gram", "Ujwa Village"],
      "North West Delhi (Rohini)": ["Alipur Gram", "Narela Village", "Bawana Gram", "Kanjhawala Village", "Rithala Gram", "Holambi Kalan", "Pooth Kalan Village", "Sultanpur Majra"],
      "North Delhi": ["Burari Gram", "Timarpur Village", "Mukherjee Nagar Gram", "Jahangirpuri", "Bakhtawarpur Gram", "Jhadoda Majra", "Kadipur Village"],
      "South Delhi": ["Mehrauli Gram", "Hauz Khas Village", "Chhattarpur Gram", "Fatehpur Beri", "Asola Village", "Bhati Gram", "Sultanpur Village"],
      "West Delhi": ["Mundka Gram", "Tikri Kalan Village", "Nilothi Gram", "Hastsal Village", "Baprola Gram", "Nangloi Jat Village"],
      "East Delhi": ["Ghazipur Gram", "Mandawali Village", "Kalyanpuri", "Khichripur Gram", "Chilla Village"],
      "Shahdara": ["Seemapuri Gram", "Babarpur Village", "Mandoli Gram", "Saboli Village", "Rohtas Nagar"],
    }
  },
  "Gujarat": {
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Kutch (Bhuj)", "Bharuch", "Anand", "Banaskantha (Palanpur)", "Sabarkantha (Himmatnagar)", "Amreli", "Patan", "Navsari", "Valsad"],
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Bhuj", "Bharuch", "Anand", "Palanpur", "Himmatnagar", "Amreli", "Patan", "Navsari", "Valsad"],
    villages: {
      "Ahmedabad": ["Sanand Gram", "Bavla Panchayat", "Dholka Gram", "Viramgam Panchayat", "Dhandhuka Gram", "Mandal Panchayat", "Detroj Gram", "Dholera Panchayat"],
      "Surat": ["Olpad Gram", "Kamrej Panchayat", "Bardoli Gram", "Mandvi Panchayat", "Palsana Gram", "Mahuva Panchayat", "Mangrol Gram", "Umarpada Panchayat"],
      "Rajkot": ["Gondal Gram", "Jasdan Panchayat", "Dhoraji Gram", "Jetpur Panchayat", "Upleta Gram", "Kotda Sangani Panchayat", "Lodhika Gram", "Paddhari Panchayat"],
      "Vadodara": ["Padra Gram", "Dabhoi Panchayat", "Karjan Gram", "Savli Panchayat", "Waghodia Gram", "Sinor Panchayat", "Desar Gram"],
      "Kutch (Bhuj)": ["Anjar Gram", "Mandvi Kutch Panchayat", "Mundra Gram", "Nakhatrana Panchayat", "Bhachau Gram", "Rapar Panchayat", "Gandhidham Gram", "Lakhpat Panchayat"],
      "Mehsana": ["Kadi Gram", "Visnagar Panchayat", "Unjha Gram", "Vadnagar Panchayat", "Vijapur Gram", "Becharaji Panchayat", "Satlasana Gram"],
      "Bhavnagar": ["Palitana Gram", "Mahuva Bhavnagar Panchayat", "Talaja Gram", "Gariadhar Panchayat", "Sihor Gram", "Umrala Panchayat", "Vallabhipur Gram"],
      "Jamnagar": ["Dhrol Gram", "Jodiya Panchayat", "Kalavad Gram", "Lalpur Panchayat", "Jamjodhpur Gram"],
      "Junagadh": ["Keshod Gram", "Mangrol Junagadh Panchayat", "Manavadar Gram", "Malia Hatina Panchayat", "Visavadar Gram", "Bhesan Panchayat"],
      "Gandhinagar": ["Kalol Gram", "Dehgam Panchayat", "Mansa Gram", "Pethapur Panchayat", "Chiloda Gram"],
      "Banaskantha (Palanpur)": ["Deesa Gram", "Tharad Panchayat", "Dhanera Gram", "Vav Panchayat", "Danta Gram", "Vadgam Panchayat", "Kankrej Gram"],
      "Anand": ["Petlad Gram", "Borsad Panchayat", "Khambhat Gram", "Umreth Panchayat", "Tarapur Gram", "Sojitra Panchayat", "Anklav Gram"],
      "Bharuch": ["Ankleshwar Gram", "Jambusar Panchayat", "Amod Gram", "Vagra Panchayat", "Hansot Gram", "Jhagadia Panchayat"],
      "Amreli": ["Dhari Gram", "Bagasara Panchayat", "Savarkundla Gram", "Rajula Panchayat", "Jafrabad Gram", "Lathi Panchayat", "Babra Gram"],
      "Patan": ["Sidhpur Gram", "Chanasma Panchayat", "Radhanpur Gram", "Sami Panchayat", "Harij Gram", "Santalpur Panchayat"],
    }
  },
  "Haryana": {
    districts: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani", "Kurukshetra", "Jind", "Kaithal", "Fatehabad", "Palwal", "Panchkula", "Mahendragarh (Narnaul)", "Jhajjar"],
    cities: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani", "Kurukshetra", "Jind", "Kaithal", "Fatehabad", "Palwal", "Panchkula", "Narnaul", "Jhajjar"],
    villages: {
      "Gurugram": ["Sohna Gram", "Pataudi Panchayat", "Farrukhnagar Gram", "Manesar Panchayat", "Badshahpur Gram", "Wazirabad Panchayat", "Kadipur Gram", "Bhondsi Panchayat"],
      "Karnal": ["Nilokheri Gram", "Gharaunda Panchayat", "Indri Gram", "Assandh Panchayat", "Taraori Gram", "Nissing Panchayat", "Kunjpura Gram", "Jundla Panchayat"],
      "Hisar": ["Hansi Gram", "Barwala Panchayat", "Narnaund Gram", "Adampur Panchayat", "Uklana Gram", "Bass Panchayat", "Agroha Gram"],
      "Panipat": ["Samalkha Gram", "Israna Panchayat", "Bapoli Gram", "Madlauda Panchayat", "Sanauli Gram", "Matloda Panchayat", "Naultha Gram"],
      "Ambala": ["Naraingarh Gram", "Barara Panchayat", "Saha Gram", "Shahzadpur Panchayat", "Mullana Gram", "Naggal Panchayat"],
      "Rohtak": ["Meham Gram", "Sampla Panchayat", "Kalanaur Gram", "Lakhan Majra Panchayat", "Asthal Bohar Gram"],
      "Sonipat": ["Gohana Gram", "Ganaur Panchayat", "Kharkhoda Gram", "Rai Panchayat", "Murthal Gram", "Mundlana Panchayat"],
      "Sirsa": ["Ellenabad Gram", "Rania Panchayat", "Dabwali Gram", "Kalanwali Panchayat", "Chopta Gram", "Ding Panchayat", "Baragudha Gram"],
      "Kurukshetra": ["Thanesar Gram", "Pehowa Panchayat", "Shahbad Gram", "Ladwa Panchayat", "Babain Gram", "Ismailabad Panchayat"],
      "Jind": ["Narwana Gram", "Safidon Panchayat", "Uchana Gram", "Julana Panchayat", "Alewa Gram", "Pilu Khera Panchayat"],
      "Kaithal": ["Guhla Cheeka Gram", "Kalayat Panchayat", "Pundri Gram", "Rajound Panchayat", "Siwan Kaithal Gram"],
      "Bhiwani": ["Tosham Gram", "Siwani Panchayat", "Loharu Gram", "Bawani Khera Panchayat", "Behal Gram"],
      "Rewari": ["Bawal Gram", "Kosli Panchayat", "Dharuhera Gram", "Jatusana Panchayat", "Khol Gram", "Dahina Panchayat"],
      "Yamunanagar": ["Jagadhri Gram", "Chhachhrauli Panchayat", "Radaur Gram", "Bilaspur Yamunanagar", "Sadhaura Gram", "Mustafabad Panchayat"],
    }
  },
  "Himachal Pradesh": {
    districts: ["Shimla", "Kangra (Dharamshala)", "Mandi", "Solan", "Kullu (Manali)", "Chamba", "Sirmaur (Nahan)", "Una", "Bilaspur", "Hamirpur", "Kinnaur (Reckong Peo)", "Lahaul and Spiti (Keylong)"],
    cities: ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali", "Chamba", "Nahan", "Una", "Palampur", "Bilaspur", "Hamirpur"],
    villages: {
      "Shimla": ["Theog Gram", "Rampur Bushahr Panchayat", "Rohru Gram", "Jubbal Panchayat", "Kotkhai Gram", "Chopal Panchayat", "Kumarsain Gram", "Sunni Panchayat"],
      "Kangra (Dharamshala)": ["Palampur Gram", "Nurpur Panchayat", "Dehra Gopipur Gram", "Jawali Panchayat", "Baijnath Gram", "Nagrota Bagwan Panchayat", "Shahpur Kangra Gram"],
      "Mandi": ["Sundarnagar Gram", "Sarkaghat Panchayat", "Jogindernagar Gram", "Karsog Panchayat", "Gohar Gram", "Chachyot Panchayat", "Padhar Gram"],
      "Solan": ["Nalagarh Gram", "Baddi Panchayat", "Kasauli Gram", "Kandaghat Panchayat", "Arki Gram", "Dharampur Solan Panchayat"],
      "Kullu (Manali)": ["Naggar Gram", "Banjar Panchayat", "Anni Gram", "Nirmand Panchayat", "Bhuntar Gram", "Katrain Panchayat"],
      "Chamba": ["Bharmour Gram", "Dalhousie Panchayat", "Chuari Khas Gram", "Pangi Panchayat", "Salooni Gram", "Bhatiyat Panchayat"],
      "Sirmaur (Nahan)": ["Paonta Sahib Gram", "Rajgarh Panchayat", "Shillai Gram", "Sangrah Panchayat", "Sarahan Sirmaur Gram"],
      "Una": ["Amb Gram", "Haroli Panchayat", "Bangana Gram", "Gagret Panchayat", "Tahliwal Gram"],
      "Hamirpur": ["Nadaun Gram", "Barsar Panchayat", "Bhoranj Gram", "Sujanpur Tira Panchayat", "Tauni Devi Gram"],
      "Bilaspur": ["Ghumarwin Gram", "Jhandutta Panchayat", "Swarghat Gram", "Namhol Panchayat", "Talai Gram"],
    }
  },
  "Jharkhand": {
    districts: ["Ranchi", "East Singhbhum (Jamshedpur)", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Palamu (Daltonganj)", "Ramgarh", "Dumka", "Garhwa", "Chatra", "Godda", "Sahebganj"],
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Medininagar", "Ramgarh", "Dumka", "Garhwa"],
    villages: {
      "Ranchi": ["Kanke Gram", "Ormanjhi Panchayat", "Ratu Gram", "Namkum Panchayat", "Bundu Gram", "Tamar Panchayat", "Silli Gram", "Angara Panchayat", "Mandar Gram", "Bero Panchayat"],
      "East Singhbhum (Jamshedpur)": ["Ghatshila Gram", "Potka Panchayat", "Baharagora Gram", "Patamda Panchayat", "Musabani Gram", "Chakulia Panchayat", "Dhalbhumgarh Gram"],
      "Dhanbad": ["Govindpur Gram", "Nirsa Panchayat", "Baghmara Gram", "Baliapur Panchayat", "Topchanchi Gram", "Tundi Panchayat", "Jharia Rural Gram"],
      "Bokaro": ["Chas Gram", "Bermo Panchayat", "Gomia Gram", "Petarwar Panchayat", "Jaridih Gram", "Chandankiyari Panchayat", "Kasmar Gram"],
      "Deoghar": ["Madhupur Gram", "Sarath Panchayat", "Mohanpur Deoghar Gram", "Karon Panchayat", "Devipur Gram", "Palojori Panchayat", "Jasidih Gram"],
      "Hazaribagh": ["Barhi Gram", "Barkagaon Panchayat", "Chouparan Gram", "Ichak Panchayat", "Bishnugarh Gram", "Katkamsandi Panchayat", "Daroo Gram"],
      "Giridih": ["Dumri Gram", "Bagodar Panchayat", "Jamua Gram", "Deori Panchayat", "Bengabad Gram", "Gawan Panchayat", "Tisri Gram"],
      "Palamu (Daltonganj)": ["Hussainabad Gram", "Chhatarpur Panchayat", "Hariharganj Gram", "Panki Panchayat", "Leslieganj Gram", "Bishrampur Palamu"],
      "Ramgarh": ["Patratu Gram", "Gola Panchayat", "Mandu Gram", "Chitarpur Panchayat", "Dulmi Gram"],
      "Dumka": ["Jarmaundi Gram", "Saraiyahat Panchayat", "Shikaripara Gram", "Raneshwar Panchayat", "Masalia Gram", "Ramgarh Dumka Panchayat"],
    }
  },
  "Karnataka": {
    districts: ["Bengaluru Urban", "Mysuru", "Belagavi", "Dharwad (Hubballi)", "Dakshina Kannada (Mangaluru)", "Kalaburagi", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", "Udupi", "Hassan", "Mandya", "Vijayapura (Bijapur)", "Raichur", "Bagalkote", "Chikkamagaluru", "Bidar", "Kolar", "Gadag"],
    cities: ["Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru", "Kalaburagi", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", "Udupi", "Hassan", "Mandya", "Bijapur", "Raichur", "Bagalkote", "Chikkamagaluru", "Bidar", "Kolar", "Gadag"],
    villages: {
      "Bengaluru Urban": ["Anekal Gram", "Yelahanka Panchayat", "Kengeri Gram", "Sarjapur Panchayat", "Nelamangala Gram", "Hoskote Panchayat", "Attibele Gram", "Devanahalli Panchayat", "Tavarekere Gram"],
      "Mysuru": ["Nanjangud Gram", "Hunsur Panchayat", "Piriyapatna Gram", "T. Narasipura Panchayat", "Krishnarajanagara Gram", "Heggadadevankote Panchayat", "Saragur Gram", "Bannur Panchayat"],
      "Belagavi": ["Gokak Gram", "Chikkodi Panchayat", "Bailhongal Gram", "Athani Panchayat", "Hukkeri Gram", "Ramdurg Panchayat", "Savadatti Gram", "Raybag Panchayat", "Khanapur Gram"],
      "Dakshina Kannada (Mangaluru)": ["Bantwal Gram", "Puttur Panchayat", "Belthangady Gram", "Sullia Panchayat", "Moodabidri Gram", "Kadaba Panchayat", "Ullal Gram", "Mulki Panchayat"],
      "Dharwad (Hubballi)": ["Kundgol Gram", "Navalgund Panchayat", "Kalghatgi Gram", "Alnavar Panchayat", "Hebballi Gram", "Annigeri Panchayat", "Garag Gram"],
      "Kalaburagi": ["Sedam Gram", "Chittapur Panchayat", "Afzalpur Gram", "Aland Panchayat", "Chincholi Gram", "Jevargi Panchayat"],
      "Tumakuru": ["Sira Gram", "Tiptur Panchayat", "Kunigal Gram", "Madhugiri Panchayat", "Gubbi Gram", "Pavagada Panchayat", "Turuvekere Gram", "Chikkanayakanahalli Panchayat"],
      "Shivamogga": ["Bhadravati Gram", "Sagar Karnataka Panchayat", "Shikaripura Gram", "Soraba Panchayat", "Thirthahalli Gram", "Hosanagara Panchayat"],
      "Mandya": ["Maddur Gram", "Malavalli Panchayat", "Srirangapatna Gram", "Pandavapura Panchayat", "Nagamangala Gram", "Krishnarajpet Panchayat"],
      "Hassan": ["Arsikere Gram", "Channarayapatna Panchayat", "Holenarasipura Gram", "Sakleshpur Panchayat", "Belur Gram", "Alur Karnataka Panchayat", "Arkalgud Gram"],
      "Vijayapura (Bijapur)": ["Indi Gram", "Muddebihal Panchayat", "Basavana Bagewadi Gram", "Sindagi Panchayat", "Talikoti Gram"],
      "Ballari": ["Hosapete Gram", "Siruguppa Panchayat", "Kampli Gram", "Sandur Panchayat", "Kudligi Gram"],
      "Udupi": ["Kundapura Gram", "Karkala Panchayat", "Byndoor Gram", "Brahmavara Panchayat", "Kaup Gram", "Hebri Panchayat"],
      "Chikkamagaluru": ["Kadur Gram", "Tarikere Panchayat", "Mudigere Gram", "Koppa Panchayat", "Sringeri Gram", "Narasimharajapura Panchayat"],
      "Kolar": ["Bangarapet Gram", "Malur Panchayat", "Mulbagal Gram", "Srinivaspur Panchayat", "Robertsonpet Gram"],
    }
  },
  "Kerala": {
    districts: ["Ernakulam (Kochi)", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Malappuram", "Palakkad", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Wayanad", "Idukki", "Pathanamthitta", "Kasaragod"],
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Malappuram", "Palakkad", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Kalpetta", "Thodupuzha", "Pathanamthitta", "Kasaragod"],
    villages: {
      "Ernakulam (Kochi)": ["Aluva Gram", "Paravur Panchayat", "Kothamangalam Gram", "Muvattupuzha Panchayat", "Angamaly Gram", "Piravom Panchayat", "Perumbavoor Gram", "Kolenchery Panchayat"],
      "Wayanad": ["Mananthavady Gram", "Sulthan Bathery Panchayat", "Vythiri Gram", "Kalpetta Panchayat", "Meppadi Gram", "Ambalavayal Panchayat", "Panamaram Gram", "Pulpally Panchayat"],
      "Palakkad": ["Ottapalam Gram", "Chittur Panchayat", "Alathur Gram", "Mannarkkad Panchayat", "Pattambi Gram", "Cherpulassery Panchayat", "Kollengode Gram", "Nenmara Panchayat"],
      "Kozhikode": ["Vatakara Gram", "Koyilandy Panchayat", "Thamarassery Gram", "Kunnamangalam Panchayat", "Balusseri Gram", "Koduvally Panchayat", "Feroke Gram", "Perambra Panchayat"],
      "Alappuzha": ["Cherthala Gram", "Kayamkulam Panchayat", "Mavelikkara Gram", "Ambalappuzha Panchayat", "Haripad Gram", "Chengannur Panchayat", "Kuttanad Gram"],
      "Thrissur": ["Chalakudy Gram", "Kodungallur Panchayat", "Kunnamkulam Gram", "Guruvayur Panchayat", "Irinjalakuda Gram", "Wadakkanchery Panchayat", "Pudukad Gram"],
      "Thiruvananthapuram": ["Neyyattinkara Gram", "Attingal Panchayat", "Nedumangad Gram", "Varkala Panchayat", "Kattakada Gram", "Kilimanoor Panchayat"],
      "Kottayam": ["Changanassery Gram", "Pala Panchayat", "Kanjirappally Gram", "Vaikom Panchayat", "Ettumanoor Gram", "Erattupetta Panchayat"],
      "Idukki": ["Thodupuzha Gram", "Munnar Panchayat", "Nedumkandam Gram", "Adimali Panchayat", "Kattappana Gram", "Peermade Panchayat"],
      "Malappuram": ["Manjeri Gram", "Perinthalmanna Panchayat", "Tirur Gram", "Ponnani Panchayat", "Nilambur Gram", "Kottakkal Panchayat"],
      "Kannur": ["Thalassery Gram", "Payyanur Panchayat", "Taliparamba Gram", "Mattannur Panchayat", "Iritty Gram", "Panoor Panchayat"],
      "Kollam": ["Karunagappally Gram", "Punalur Panchayat", "Kottarakkara Gram", "Paravur Kollam Panchayat", "Pathanapuram Gram", "Sasthamkotta Panchayat"],
    }
  },
  "Madhya Pradesh": {
    districts: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Khargone (West Nimar)", "Hoshangabad (Narmadapuram)", "Vidisha", "Sehore", "Morena", "Bhind", "Shivpuri", "Mandsaur", "Neemuch", "Khandwa (East Nimar)", "Betul", "Balaghat", "Katni", "Singrauli"],
    cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Khargone", "Narmadapuram", "Vidisha", "Sehore", "Morena", "Bhind", "Shivpuri", "Mandsaur", "Neemuch", "Khandwa", "Betul", "Balaghat", "Katni", "Singrauli"],
    villages: {
      "Indore": ["Sanwer Gram", "Depalpur Panchayat", "Mhow (Ambedkar Nagar) Gram", "Hatod Panchayat", "Rau Gram", "Betma Panchayat", "Kshipra Gram", "Manpur Indore Panchayat"],
      "Bhopal": ["Berasia Gram", "Phanda Panchayat", "Huzur Gram", "Kolar Panchayat", "Misrod Gram", "Nazirabad Panchayat", "Bairagarh Gram"],
      "Ujjain": ["Nagda Gram", "Mahidpur Panchayat", "Tarana Gram", "Khachrod Panchayat", "Ghatiya Gram", "Badnagar Panchayat", "Unhel Gram", "Kayatha Panchayat"],
      "Gwalior": ["Dabra Gram", "Bhitarwar Panchayat", "Morar Gram", "Ghatigaon Panchayat", "Chinore Gram", "Pichhore Gwalior Panchayat", "Bada Gaon Gram"],
      "Jabalpur": ["Sihora Gram", "Patan Jabalpur Panchayat", "Panagar Gram", "Shahpura Jabalpur Panchayat", "Kundam Gram", "Majholi Panchayat", "Barela Gram"],
      "Sagar": ["Bina Gram", "Khurai Panchayat", "Rehli Gram", "Deori Sagar Panchayat", "Banda MP Gram", "Garhakota Panchayat", "Shahgarh Gram"],
      "Dewas": ["Sonkatch Gram", "Bagli Panchayat", "Kannod Gram", "Khategaon Panchayat", "Tonk Khurd Gram", "Hatpipliya Panchayat"],
      "Satna": ["Maihar Gram", "Nagod Panchayat", "Amarpatan Gram", "Ramnagar Satna Panchayat", "Raghurajnagar Gram", "Uchehara Panchayat", "Birsinghpur Gram"],
      "Ratlam": ["Jaora Gram", "Alot Panchayat", "Sailana Gram", "Piploda Panchayat", "Bajna Gram", "Namli Panchayat"],
      "Rewa": ["Mauganj Gram", "Hanumana Panchayat", "Teonthar Gram", "Sirmour Panchayat", "Mangawan Gram", "Gurh Panchayat", "Semariya Gram"],
      "Chhindwara": ["Sausar Gram", "Pandhurna Panchayat", "Parasia Gram", "Amarwara Panchayat", "Chaurai Gram", "Junnor Deo Panchayat", "Harrai Gram"],
      "Khargone (West Nimar)": ["Barwaha Gram", "Sanawad Panchayat", "Kasrawad Gram", "Maheshwar Panchayat", "Bhikangaon Gram", "Sendhwa Gram", "Gogawan Panchayat"],
      "Hoshangabad (Narmadapuram)": ["Itarsi Gram", "Pipariya Panchayat", "Seoni Malwa Gram", "Sohagpur Panchayat", "Babai Gram", "Dolariya Panchayat"],
      "Sehore": ["Ashta Gram", "Ichhawar Panchayat", "Nasrullaganj (Bhairunda) Gram", "Budhni Panchayat", "Shyampur Gram", "Jawar Panchayat"],
      "Vidisha": ["Basoda Gram", "Kurwai Panchayat", "Sironj Gram", "Lateri Panchayat", "Gulabganj Gram", "Gyaspur Panchayat", "Shamshabad MP Gram"],
      "Mandsaur": ["Malhargarh Gram", "Garoth Panchayat", "Sitamau Gram", "Bhanpura Panchayat", "Daloda Gram", "Suwasra Panchayat"],
      "Khandwa (East Nimar)": ["Pandhana Gram", "Punasa Panchayat", "Harsud Gram", "Khalwa Panchayat", "Chhaigaon Makhan Gram"],
    }
  },
  "Maharashtra": {
    districts: ["Pune", "Mumbai City", "Mumbai Suburban", "Nagpur", "Thane", "Nashik", "Aurangabad (Chhatrapati Sambhaji Nagar)", "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Satara", "Ahmednagar (Ahilyanagar)", "Latur", "Akola", "Chandrapur", "Buldhana", "Yavatmal", "Parbhani", "Beed", "Jalna", "Dhule", "Osmanabad (Dharashiv)", "Ratnagiri", "Sindhudurg", "Raigad (Alibag)"],
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Satara", "Ahmednagar", "Latur", "Akola", "Chandrapur", "Buldhana", "Yavatmal", "Parbhani", "Beed", "Jalna", "Dhule", "Dharashiv", "Ratnagiri"],
    villages: {
      "Pune": ["Haveli Gram", "Baramati Panchayat", "Shirur Gram", "Junnar Panchayat", "Maval Gram", "Indapur Panchayat", "Daund Gram", "Khed (Rajgurunagar) Panchayat", "Bhor Gram", "Purandar Panchayat", "Ambegaon Gram"],
      "Nagpur": ["Kamptee Gram", "Hingna Panchayat", "Katol Gram", "Narkhed Panchayat", "Ramtek Gram", "Saoner Panchayat", "Umred Gram", "Kalmeshwar Panchayat", "Kuhi Gram", "Mouda Panchayat"],
      "Nashik": ["Dindori Gram", "Niphad Panchayat", "Sinnar Gram", "Yeola Panchayat", "Trimbak Gram", "Malegaon Rural Panchayat", "Baglan (Satana) Gram", "Chandwad Panchayat", "Kalwan Gram", "Igatpuri Panchayat"],
      "Thane": ["Kalyan Gramin", "Bhiwandi Panchayat", "Murbad Gram", "Shahapur Panchayat", "Ambernath Gram", "Badlapur Rural Panchayat"],
      "Aurangabad (Chhatrapati Sambhaji Nagar)": ["Paithan Gram", "Gangapur Panchayat", "Vaijapur Gram", "Kannad Panchayat", "Sillod Gram", "Khuldabad Panchayat", "Phulambri Gram", "Soegaon Panchayat"],
      "Kolhapur": ["Karveer Gram", "Hatkanangle Panchayat", "Shirol Gram", "Radhanagari Panchayat", "Panhala Gram", "Kagal Panchayat", "Gadhinglaj Gram", "Bhudargad Panchayat", "Chandgad Gram"],
      "Solapur": ["Barshi Gram", "Pandharpur Panchayat", "Mohol Gram", "Akkalkot Panchayat", "Karmala Gram", "Madha Panchayat", "Sangola Gram", "Malshiras Panchayat", "Mangalwedha Gram"],
      "Ahmednagar (Ahilyanagar)": ["Rahuri Gram", "Sangamner Panchayat", "Kopargaon Gram", "Shrirampur Panchayat", "Parner Gram", "Nevasa Panchayat", "Shevgaon Gram", "Shrigonda Panchayat", "Akole Gram", "Karjat MH Panchayat"],
      "Jalgaon": ["Bhusawal Gram", "Chalisgaon Panchayat", "Amalner Gram", "Pachora Panchayat", "Chopda Gram", "Raver Panchayat", "Yawal Gram", "Parola Panchayat", "Jamner Gram"],
      "Satara": ["Karad Gram", "Wai Panchayat", "Phaltan Gram", "Koregaon Panchayat", "Patan MH Gram", "Khatav Panchayat", "Man (Dahiwadi) Gram", "Mahabaleshwar Rural Panchayat"],
      "Sangli": ["Miraj Gram", "Tasgaon Panchayat", "Islampur (Walwa) Gram", "Jat Panchayat", "Kavathe Mahankal Gram", "Khanapur (Vita) Panchayat", "Palus Gram", "Shirala Panchayat"],
      "Amravati": ["Achalpur Gram", "Warud Panchayat", "Morshi Gram", "Anjangaon Surji Panchayat", "Chandur Railway Gram", "Daryapur Panchayat", "Dhamangaon Railway Gram", "Teosa Panchayat"],
      "Nanded": ["Mukhed Gram", "Degloor Panchayat", "Loha Gram", "Hadgaon Panchayat", "Kinwat Gram", "Bhokar Panchayat", "Mudkhed Gram", "Kandhar Panchayat", "Biloli Gram"],
      "Latur": ["Udgir Gram", "Ahmedpur Panchayat", "Ausa Gram", "Nilanga Panchayat", "Chakur Gram", "Renapur Panchayat", "Shirur Anantpal Gram"],
      "Akola": ["Balapur Gram", "Akot Panchayat", "Telhara Gram", "Patur Panchayat", "Murtizapur Gram", "Barshitakli Panchayat"],
      "Chandrapur": ["Ballarpur Gram", "Warora Panchayat", "Bhadravati MH Gram", "Rajura Panchayat", "Mul Gram", "Brahmapuri Panchayat", "Nagbhid Gram", "Chimur Panchayat"],
      "Buldhana": ["Khamgaon Gram", "Malkapur Panchayat", "Shegaon Gram", "Chikhli Panchayat", "Mehkar Gram", "Jalgaon Jamod Panchayat", "Nandura Gram", "Deulgaon Raja Panchayat"],
      "Yavatmal": ["Pusad Gram", "Umarkhed Panchayat", "Wani Gram", "Darwha Panchayat", "Digras Gram", "Ghatanji Panchayat", "Ralegaon Gram", "Pandharkawada (Kelapur) Panchayat"],
      "Beed": ["Parli Vaijnath Gram", "Majalgaon Panchayat", "Georai Gram", "Ambejogai Panchayat", "Ashti Beed Gram", "Kaij Panchayat", "Patoda Gram", "Wadwani Panchayat"],
      "Jalna": ["Ambad Gram", "Partur Panchayat", "Bhokardan Gram", "Badnapur Panchayat", "Jafrabad MH Gram", "Ghansawangi Panchayat", "Mantha Gram"],
    }
  },
  "Odisha": {
    districts: ["Khordha (Bhubaneswar)", "Cuttack", "Sundargarh (Rourkela)", "Ganjam (Berhampur)", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Bolangir", "Koraput", "Kendrapara", "Jagatsinghpur", "Angul", "Dhenkanal", "Mayurbhanj (Baripada)", "Bargarh", "Kalahandi (Bhawanipatna)", "Jajpur", "Keonjhar"],
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Bolangir", "Koraput", "Kendrapara", "Jagatsinghpur", "Angul", "Dhenkanal", "Baripada", "Bargarh", "Bhawanipatna", "Jajpur", "Keonjhar"],
    villages: {
      "Khordha (Bhubaneswar)": ["Jatani Gram", "Banapur Panchayat", "Begunia Gram", "Balipatna Panchayat", "Balianta Gram", "Tangi Khordha Panchayat", "Bolagarh Gram", "Chilika Rural Panchayat"],
      "Cuttack": ["Choudwar Gram", "Athagarh Panchayat", "Banki Gram", "Salipur Panchayat", "Badamba Gram", "Nischintakoili Panchayat", "Mahanga Gram", "Tigiria Panchayat"],
      "Ganjam (Berhampur)": ["Chhatrapur Gram", "Hinjilicut Panchayat", "Aska Gram", "Bhanjanagar Panchayat", "Polasara Gram", "Bellaguntha Panchayat", "Surada Gram", "Digapahandi Panchayat"],
      "Puri": ["Pipili Gram", "Nimapada Panchayat", "Brahmagiri Gram", "Kakatpur Panchayat", "Satyabadi (Sakshigopal) Gram", "Gop Panchayat", "Krushnaprasad Gram", "Delanga Panchayat"],
      "Balasore": ["Jaleswar Gram", "Soro Panchayat", "Nilagiri Gram", "Basta Panchayat", "Bahanaga Gram", "Remuna Panchayat", "Baliapal Gram", "Juggernathpur Panchayat"],
      "Sambalpur": ["Rengali Gram", "Kuchinda Panchayat", "Jujomura Gram", "Rairakhol Panchayat", "Dhankauda Gram", "Maneswar Panchayat", "Bamra Gram"],
      "Bhadrak": ["Dhamnagar Gram", "Chandbali Panchayat", "Basudevpur Gram", "Bhandaripokhari Panchayat", "Bonth Gram", "Tihidi Panchayat"],
      "Sundargarh (Rourkela)": ["Rajgangpur Gram", "Biramitrapur Panchayat", "Bonai Gram", "Hemgir Panchayat", "Kutra Gram", "Lahunipara Panchayat", "Bargaon Sundargarh Gram"],
      "Bolangir": ["Titilagarh Gram", "Patnagarh Panchayat", "Kantabanji Gram", "Tushura Panchayat", "Saintala Gram", "Puintala Panchayat", "Deogaon Bolangir Gram"],
      "Bargarh": ["Attabira Gram", "Padampur Panchayat", "Barpali Gram", "Sohela Panchayat", "Bhatli Gram", "Bheden Panchayat", "Jharbandh Gram"],
      "Kendrapara": ["Pattamundai Gram", "Rajnagar Panchayat", "Aul Gram", "Derabish Panchayat", "Mahakalapada Gram", "Marshaghai Panchayat", "Garadpur Gram"],
      "Mayurbhanj (Baripada)": ["Rairangpur Gram", "Karanjia Panchayat", "Betnoti Gram", "Udala Panchayat", "Bahalda Gram", "Jashipur Panchayat", "Badasahi Gram"],
      "Koraput": ["Jeypore Gram", "Sunabeda Panchayat", "Kotpad Gram", "Borigumma Panchayat", "Semiliguda Gram", "Damanjodi Panchayat", "Pottangi Gram"],
    }
  },
  "Punjab": {
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali (SAS Nagar)", "Firozpur", "Pathankot", "Moga", "Sangrur", "Gurdaspur", "Faridkot", "Kapurthala", "Mansa", "Fazilka", "Sri Muktsar Sahib", "Rupnagar (Ropar)", "Barnala", "Fatehgarh Sahib", "Tarn Taran", "Malerkotla"],
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Firozpur", "Pathankot", "Moga", "Sangrur", "Gurdaspur", "Faridkot", "Kapurthala", "Mansa", "Fazilka", "Muktsar", "Rupnagar", "Barnala", "Sirhind", "Tarn Taran", "Malerkotla"],
    villages: {
      "Ludhiana": ["Samrala Gram", "Khanna Panchayat", "Jagraon Gram", "Raikot Panchayat", "Doraha Gram", "Payal Panchayat", "Dehlon Gram", "Machhiwara Panchayat", "Sidhwan Bet Gram", "Mullanpur Dakha Panchayat"],
      "Amritsar": ["Ajnala Gram", "Majitha Panchayat", "Attari Gram", "Jandiala Guru Panchayat", "Baba Bakala Gram", "Rayya Panchayat", "Chogawan Gram", "Verka Panchayat", "Lopoke Gram"],
      "Jalandhar": ["Phillaur Gram", "Nakodar Panchayat", "Shahkot Gram", "Goraya Panchayat", "Adampur Jalandhar Gram", "Kartarpur Panchayat", "Nurmahal Gram", "Bhogpur Panchayat", "Lohia Khas Gram"],
      "Patiala": ["Nabha Gram", "Rajpura Panchayat", "Samana Gram", "Patran Panchayat", "Sanaur Gram", "Ghanour Panchayat", "Bhadson Gram", "Shutrana Panchayat"],
      "Bathinda": ["Rampura Phul Gram", "Talwandi Sabo Panchayat", "Maur Gram", "Bhucho Mandi Panchayat", "Gonatiana Gram", "Sangat Mandi Panchayat", "Nathana Gram", "Balianwali Panchayat"],
      "Hoshiarpur": ["Dasuya Gram", "Mukerian Panchayat", "Garhshankar Gram", "Tanda Urmar Panchayat", "Mahilpur Gram", "Talwara Panchayat", "Hajipur Punjab Gram", "Bhunga Panchayat"],
      "Mohali (SAS Nagar)": ["Kharar Gram", "Derabassi Panchayat", "Kurali Gram", "Zirakpur Rural Panchayat", "Lalru Gram", "Majri Panchayat", "Banur Gram", "Gharuan Panchayat"],
      "Firozpur": ["Zira Gram", "Guru Har Sahai Panchayat", "Makhu Gram", "Mamdot Panchayat", "Mallanwala Gram", "Ghall Khurd Panchayat"],
      "Gurdaspur": ["Batala Gram", "Dera Baba Nanak Panchayat", "Dhariwal Gram", "Qadian Panchayat", "Fatehgarh Churian Gram", "Kalanaur Punjab Panchayat", "Dinanagar Gram", "Sri Hargobindpur Panchayat"],
      "Sangrur": ["Sunam Gram", "Dhuri Panchayat", "Moonak Gram", "Lehragaga Panchayat", "Dirba Gram", "Bhawanigarh Panchayat", "Sherpur Sangrur Gram"],
      "Moga": ["Baghapurana Gram", "Nihal Singh Wala Panchayat", "Dharamkot Gram", "Kot Ise Khan Panchayat", "Badhni Kalan Gram", "Ajitwal Panchayat"],
      "Sri Muktsar Sahib": ["Malout Gram", "Gidderbaha Panchayat", "Bariwala Gram", "Lambi Panchayat", "Doda Muktsar Gram", "Kotbhai Panchayat"],
      "Fazilka": ["Abohar Gram", "Jalalabad West Panchayat", "Khuian Sarwar Gram", "Arniwala Sheikh Subhan Panchayat", "Sito Guno Gram"],
      "Kapurthala": ["Phagwara Gram", "Sultanpur Lodhi Panchayat", "Bholath Gram", "Dhilwan Panchayat", "Nadala Gram", "Panchhat Panchayat"],
      "Tarn Taran": ["Patti Gram", "Khadur Sahib Panchayat", "Bhikhiwind Gram", "Chohla Sahib Panchayat", "Harike Pattan Gram", "Naushehra Pannuan Panchayat"],
    }
  },
  "Rajasthan": {
    districts: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Sri Ganganagar", "Pali", "Nagaur", "Tonk", "Chittorgarh", "Jhunjhunu", "Barmer", "Jaisalmer", "Banswara", "Dungarpur", "Hanumangarh", "Jalore", "Sirohi", "Dausa", "Sawai Madhopur", "Churu", "Baran", "Bundi", "Jhalawar", "Rajsamand", "Karauli", "Pratapgarh Rajasthan"],
    cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Sri Ganganagar", "Pali", "Nagaur", "Tonk", "Chittorgarh", "Jhunjhunu", "Barmer", "Jaisalmer", "Banswara", "Dungarpur", "Hanumangarh", "Jalore", "Sirohi", "Dausa", "Sawai Madhopur", "Churu", "Baran", "Bundi", "Jhalawar", "Rajsamand"],
    villages: {
      "Jaipur": ["Chomu Gram", "Kotputli Panchayat", "Sanganer Gram", "Shahpura Jaipur Panchayat", "Phulera (Sambhar) Gram", "Bassi Jaipur Panchayat", "Chaksu Gram", "Jamwa Ramgarh Panchayat", "Jobner Gram", "Dudu Panchayat", "Viratnagar Gram", "Paota Panchayat"],
      "Jodhpur": ["Phalodi Gram", "Bilara Panchayat", "Osian Gram", "Bhopalgarh Panchayat", "Piparcity Gram", "Luni Panchayat", "Shergarh Jodhpur Gram", "Baori Panchayat", "Balesar Gram", "Tinwari Panchayat"],
      "Kota": ["Sangod Gram", "Ramganj Mandi Panchayat", "Pipalda Gram", "Digod Panchayat", "Chechat Gram", "Sultanpur Kota Panchayat", "Mandana Gram", "Kaithun Panchayat"],
      "Bikaner": ["Nokha Bikaner Gram", "Lunkaransar Panchayat", "Kolayat Gram", "Dungargarh Panchayat", "Khajuwala Gram", "Poogal Panchayat", "Deshnoke Gram", "Bajju Panchayat"],
      "Ajmer": ["Kishangarh Gram", "Beawar Panchayat", "Pushkar Gram", "Nasirabad Panchayat", "Kekri Gram", "Sarwar Panchayat", "Masuda Gram", "Bhinai Panchayat", "Pisangan Gram"],
      "Udaipur": ["Mavli Gram", "Vallabhnagar Panchayat", "Salumber Gram", "Kherwara Panchayat", "Girwa Gram", "Gogunda Panchayat", "Kotra Udaipur Gram", "Jhadol Panchayat", "Bhinder Gram", "Rishabhdeo Panchayat"],
      "Alwar": ["Behror Gram", "Tijara Panchayat", "Kishangarh Bas Gram", "Rajgarh Alwar Panchayat", "Thanagazi Gram", "Kathumar Panchayat", "Ramgarh Alwar Gram", "Bansur Panchayat", "Mundawar Gram"],
      "Sikar": ["Fatehpur Shekhawati Gram", "Lachhmangarh Panchayat", "Danta Ramgarh Gram", "Neem Ka Thana Panchayat", "Sri Madhopur Gram", "Khandela Panchayat", "Pipadali Gram", "Reengus Panchayat"],
      "Sri Ganganagar": ["Suratgarh Gram", "Raisinghnagar Panchayat", "Anupgarh Gram", "Sadulshahar Panchayat", "Padampur Gram", "Karanpur Panchayat", "Gharshana Gram", "Rawla Mandi Panchayat"],
      "Nagaur": ["Didwana Gram", "Kuchaman City Panchayat", "Ladnun Gram", "Makrana Panchayat", "Merta City Gram", "Degana Panchayat", "Parbatsar Gram", "Jayal Panchayat", "Riyan Badi Gram"],
      "Pali": ["Sojat Gram", "Sumerpur Panchayat", "Bali Pali Gram", "Falna Panchayat", "Rani Pali Gram", "Jaitaran Panchayat", "Rohat Gram", "Desuri Panchayat", "Marwar Junction Gram"],
      "Bhilwara": ["Mandalgarh Gram", "Shahpura Bhilwara Panchayat", "Gulabpura Gram", "Asind Panchayat", "Jahazpur Gram", "Kotri Bhilwara Panchayat", "Banera Gram", "Hurda Panchayat"],
      "Barmer": ["Balotra Gram", "Gudamalani Panchayat", "Baytoo Gram", "Siwana Panchayat", "Chohtan Gram", "Sheo Panchayat", "Sindhari Gram", "Samdari Panchayat", "Sedwa Gram"],
      "Bharatpur": ["Bayana Gram", "Deeg Panchayat", "Kaman Gram", "Nagar Bharatpur Panchayat", "Nadbai Gram", "Weir Panchayat", "Kumher Gram", "Rupbas Panchayat", "Bhusawar Gram"],
      "Hanumangarh": ["Nohar Gram", "Bhadra Panchayat", "Pilibanga Gram", "Sangaria Panchayat", "Rawatsar Gram", "Tibbi Panchayat", "Goluwala Gram"],
      "Chittorgarh": ["Nimbahera Gram", "Rawatbhata Panchayat", "Begun Gram", "Kapasan Panchayat", "Bari Sadri Gram", "Rashmi Panchayat", "Gangrar Gram", "Bhadesar Panchayat"],
      "Jhunjhunu": ["Nawalgarh Gram", "Chirawa Panchayat", "Khetri Gram", "Pilani Panchayat", "Buhana Gram", "Surajgarh Panchayat", "Udaipurwati Gram", "Mandawa Panchayat"],
    }
  },
  "Tamil Nadu": {
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli (Trichy)", "Salem", "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Dindigul", "Kanchipuram", "Thoothukudi (Tuticorin)", "Cuddalore", "Tiruppur", "Kanyakumari (Nagercoil)", "Karur", "Nagapattinam", "Namakkal", "Pudukkottai", "Ramanathapuram", "Sivaganga", "Theni", "Thiruvallur", "Thiruvarur", "Tiruvannamalai", "Viluppuram", "Virudhunagar", "Krishnagiri", "Dharmapuri", "The Nilgiris (Ooty)"],
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Erode", "Vellore", "Thanjavur", "Dindigul", "Kanchipuram", "Thoothukudi", "Cuddalore", "Tiruppur", "Nagercoil", "Karur", "Nagapattinam", "Namakkal", "Pudukkottai", "Ramanathapuram", "Sivaganga", "Theni", "Tiruvannamalai", "Viluppuram", "Virudhunagar", "Krishnagiri", "Dharmapuri", "Ooty"],
    villages: {
      "Chennai": ["Sholinganallur Gram", "Alandur Area", "Madhavaram Gram", "Ambattur Village", "Tiruvottiyur Gram", "Manali Chennai Village"],
      "Coimbatore": ["Pollachi Gram", "Mettupalayam Panchayat", "Sulur Gram", "Annur Panchayat", "Kinathukadavu Gram", "Valparai Panchayat", "Madukkarai Gram", "Perur Panchayat", "Thondamuthur Gram"],
      "Madurai": ["Melur Gram", "Tirumangalam Panchayat", "Usilampatti Gram", "Vadipatti Panchayat", "Peraiyur Gram", "Sholavandan Panchayat", "Alanganallur Gram", "Kalligudi Panchayat"],
      "Tiruchirappalli (Trichy)": ["Manapparai Gram", "Srirangam Rural Panchayat", "Lalgudi Gram", "Thuraiyur Panchayat", "Musiri Gram", "Tiruverumbur Panchayat", "Manachanallur Gram", "Thottiyam Panchayat"],
      "Salem": ["Attur Gram", "Mettur Panchayat", "Omalur Gram", "Sankari Panchayat", "Edappadi Gram", "Gangavalli Panchayat", "Valapady Gram", "Yercaud Panchayat", "Kadayampatti Gram"],
      "Thanjavur": ["Kumbakonam Gram", "Papanasam Panchayat", "Pattukkottai Gram", "Orathanadu Panchayat", "Thiruvaiyaru Gram", "Peravurani Panchayat", "Budalur Gram", "Thiruvidaimarudur Panchayat"],
      "Erode": ["Gobichettipalayam Gram", "Bhavani Panchayat", "Perundurai Gram", "Sathyamangalam Panchayat", "Anthiyur Gram", "Kodumudi Panchayat", "Modakkurichi Gram", "Thalavadi Panchayat"],
      "Tiruppur": ["Dharapuram Gram", "Udumalaipettai Panchayat", "Kangeyam Gram", "Palladam Panchayat", "Avanashi Gram", "Madathukulam Panchayat", "Uthukuli Gram"],
      "Tirunelveli": ["Ambasamudram Gram", "Cheranmahadevi Panchayat", "Nanguneri Gram", "Radhapuram Panchayat", "Manur Gram", "Palayamkottai Rural Panchayat", "Valliyur Gram"],
      "Kanyakumari (Nagercoil)": ["Padmanabhapuram Gram", "Kuzhithurai Panchayat", "Colachel Gram", "Thuckalay Panchayat", "Killiyoor Gram", "Boothapandi Panchayat", "Agastheeswaram Gram", "Vilavancode Panchayat"],
      "Dindigul": ["Palani Gram", "Kodaikanal Panchayat", "Oddanchatram Gram", "Natham Panchayat", "Nilakottai Gram", "Vedasandur Panchayat", "Athoor Gram", "Gujiliamparai Panchayat"],
      "Vellore": ["Gudiyatham Gram", "Katpadi Panchayat", "Anaicut Gram", "Pernambut Panchayat", "Kaniyambadi Gram"],
      "Cuddalore": ["Chidambaram Gram", "Panruti Panchayat", "Vridhachalam Gram", "Kattumannarkoil Panchayat", "Kurinjipadi Gram", "Tittakudi Panchayat", "Bhuvanagiri Gram"],
      "Kanchipuram": ["Sriperumbudur Gram", "Walajabad Panchayat", "Uthiramerur Gram", "Kundrathur Panchayat"],
      "The Nilgiris (Ooty)": ["Coonoor Gram", "Kotagiri Panchayat", "Gudalur Nilgiris Gram", "Manjoor Panchayat", "Ketti Gram", "Devala Panchayat"],
      "Thoothukudi (Tuticorin)": ["Kovilpatti Gram", "Tiruchendur Panchayat", "Srivaikuntam Gram", "Sattankulam Panchayat", "Ettayapuram Gram", "Vilathikulam Panchayat", "Kayathar Gram"],
    }
  },
  "Telangana": {
    districts: ["Hyderabad", "Ranga Reddy", "Medchal-Malkajgiri", "Warangal (Hanamkonda)", "Karimnagar", "Nizamabad", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet", "Suryapet", "Adilabad", "Bhadradri Kothagudem", "Jagtial", "Kamareddy", "Mancherial", "Medak", "Nagarkurnool", "Peddapalli", "Sangareddy", "Vikarabad", "Wanaparthy", "Yadadri Bhuvanagiri"],
    cities: ["Hyderabad", "Secunderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet", "Suryapet", "Adilabad", "Kothagudem", "Jagtial", "Kamareddy", "Mancherial", "Medak", "Nagarkurnool", "Ramagundam", "Sangareddy", "Bhuvanagiri"],
    villages: {
      "Hyderabad": ["Golconda Gram", "Charminar Area", "Secunderabad Cantonment", "Khairatabad Gram", "Musheerabad", "Asif Nagar", "Amberpet Gram"],
      "Ranga Reddy": ["Shadnagar (Farooqnagar) Gram", "Ibrahimpatnam Panchayat", "Rajendranagar Gram", "Maheshwaram Panchayat", "Chevella Gram", "Moinabad Panchayat", "Shamshabad Gram", "Kandukur RR Panchayat", "Hayathnagar Gram"],
      "Warangal (Hanamkonda)": ["Parkal Gram", "Narsampet Panchayat", "Wardhannapet Gram", "Station Ghanpur Panchayat", "Hasanparthy Gram", "Dharmasagar Panchayat", "Geesugonda Gram", "Atmakur Warangal Panchayat"],
      "Karimnagar": ["Huzurabad Gram", "Jammikunta Panchayat", "Choppadandi Gram", "Manakondur Panchayat", "Gangadhara Gram", "Thimmapur Panchayat", "Veenavanka Gram", "Shankarapatnam Panchayat"],
      "Nizamabad": ["Armoor Gram", "Bodhan Panchayat", "Bheemgal Gram", "Dharpally Panchayat", "Varni Gram", "Balkonda Panchayat", "Makloor Gram", "Kotagiri Panchayat"],
      "Khammam": ["Madhira Gram", "Sathupally Panchayat", "Wyra Gram", "Kallur Panchayat", "Nelakondapally Gram", "Kusumanchi Panchayat", "Enkoor Gram", "Penuballi Panchayat"],
      "Mahabubnagar": ["Jadcherla Gram", "Devarkadra Panchayat", "Bhoothpur Gram", "Nawabpet Panchayat", "Koilkonda Gram", "Midjil Panchayat", "Hanwada Gram", "Balanagar Mahabubnagar Panchayat"],
      "Nalgonda": ["Miryalaguda Gram", "Devarakonda Panchayat", "Nakrekal Gram", "Narketpally Panchayat", "Munugode Gram", "Chityal Panchayat", "Huzurnagar Gram", "Kodad Panchayat", "Nidamanoor Gram"],
      "Siddipet": ["Gajwel Gram", "Dubbak Panchayat", "Husnabad Gram", "Cherial Panchayat", "Bejjanki Gram", "Mulugu Siddipet Panchayat", "Chinnakodur Gram", "Kondapak Panchayat"],
      "Suryapet": ["Kodad Gram", "Huzurnagar Panchayat", "Thungathurthy Gram", "Mothey Panchayat", "Chivvemla Gram", "Garidepally Panchayat", "Neredcherla Gram", "Mellachervu Panchayat"],
      "Adilabad": ["Utnoor Gram", "Boath Panchayat", "Bela Adilabad Gram", "Indervelly Panchayat", "Gudihathnoor Gram", "Jainath Panchayat", "Narnoor Gram", "Tamsi Panchayat"],
      "Sangareddy": ["Zaheerabad Gram", "Narayankhed Panchayat", "Patancheru Gram", "Sadasivpet Panchayat", "Andole Gram", "Jogipet Panchayat", "Kandi Sangareddy Gram"],
      "Bhadradri Kothagudem": ["Bhadrachalam Gram", "Yellandu Panchayat", "Manuguru Gram", "Palwancha Panchayat", "Aswapuram Gram", "Burgampahad Panchayat", "Dammapeta Gram"],
      "Jagtial": ["Korutla Gram", "Metpally Panchayat", "Dharmapuri Jagtial Gram", "Raikal Panchayat", "Gollapally Gram", "Velgatoor Panchayat", "Pegadapally Gram"],
    }
  },
  "Uttar Pradesh": {
    districts: ["Lucknow", "Varanasi", "Kanpur Nagar", "Prayagraj (Allahabad)", "Agra", "Meerut", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Ayodhya (Faizabad)", "Jhansi", "Saharanpur", "Muzaffarnagar", "Mathura", "Firozabad", "Ghaziabad", "Gautam Buddha Nagar (Noida)", "Bulandshahr", "Budaun", "Shahjahanpur", "Pilibhit", "Lakhimpur Kheri", "Sitapur", "Hardoi", "Unnao", "Rae Bareli", "Amethi", "Sultanpur", "Barabanki", "Bahraich", "Shravasti", "Balrampur", "Gonda", "Siddharthnagar", "Basti", "Sant Kabir Nagar", "Maharajganj", "Kushinagar", "Deoria", "Azamgarh", "Mau", "Ballia", "Jaunpur", "Ghazipur", "Chandauli", "Mirzapur", "Sonbhadra", "Banda", "Chitrakoot", "Fatehpur", "Hamirpur UP", "Mahoba", "Lalitpur", "Jalaun (Orai)", "Etawah", "Mainpuri", "Kannauj", "Farrukhabad", "Etah", "Kasganj", "Hathras", "Baghpat", "Shamli", "Hapur", "Sambhal", "Amroha", "Bijnor", "Rampur"],
    cities: ["Lucknow", "Varanasi", "Kanpur", "Prayagraj", "Agra", "Meerut", "Bareilly", "Aligarh", "Moradabad", "Gorakhpur", "Ayodhya", "Jhansi", "Saharanpur", "Muzaffarnagar", "Mathura", "Firozabad", "Noida", "Ghaziabad", "Bulandshahr", "Sitapur", "Hardoi", "Unnao", "Rae Bareli", "Barabanki", "Bahraich", "Gonda", "Basti", "Deoria", "Azamgarh", "Jaunpur", "Mirzapur", "Orai", "Etawah", "Kannauj", "Farrukhabad", "Bijnor", "Rampur"],
    villages: {
      "Lucknow": ["Malihabad Gram", "Bakshi Ka Talab (BKT) Panchayat", "Mohanlalganj Gram", "Kakori Panchayat", "Sarojini Nagar Gram", "Chinhat Panchayat", "Gosainganj Gram", "Itaunja Panchayat", "Nagram Gram", "Amethi Lucknow Panchayat"],
      "Varanasi": ["Pindra Gram", "Shivpur Panchayat", "Raja Talab Gram", "Cholapur Panchayat", "Kashi Vidyapeeth Gram", "Araziline Panchayat", "Sevapuri Gram", "Baragaon Varanasi Panchayat", "Harahua Gram", "Chiraigaon Panchayat"],
      "Kanpur Nagar": ["Bilhaur Gram", "Ghatampur Panchayat", "Kalyanpur Kanpur Gram", "Chaubepur Panchayat", "Sarsaul Gram", "Bidhnu Panchayat", "Bhitargaon Gram", "Shivrajpur Panchayat", "Patara Gram", "Kakwan Panchayat"],
      "Prayagraj (Allahabad)": ["Phulpur Gram", "Koraon Panchayat", "Handia Gram", "Soraon Panchayat", "Karchana Gram", "Meja Panchayat", "Mauaima Gram", "Shankargarh Panchayat", "Holagarh Gram", "Jasra Panchayat", "Bahria Gram", "Pratappur UP Panchayat"],
      "Ayodhya (Faizabad)": ["Bikapur Gram", "Rudauli Panchayat", "Sohawal Gram", "Milkipur Panchayat", "Pura Bazar Gram", "Masodha Panchayat", "Tarun Gram", "Maya Bazar Panchayat", "Amaniganj Gram", "Harrington Ganj Panchayat"],
      "Gorakhpur": ["Sahjanwa Gram", "Chauri Chaura Panchayat", "Campierganj Gram", "Bansgaon Panchayat", "Gola Gorakhpur Gram", "Pipraich Panchayat", "Khorabar Gram", "Bhalloti Panchayat", "Jangha Gram", "Sardarnagar Panchayat"],
      "Agra": ["Fatehabad Agra Gram", "Kheragarh Panchayat", "Bah Gram", "Etmadpur Panchayat", "Achhnera Gram", "Kiraoli Panchayat", "Barauli Ahir Gram", "Shamsabad Agra Panchayat", "Jagner Gram", "Fatehpur Sikri Rural Panchayat"],
      "Meerut": ["Sardhana Gram", "Mawana Panchayat", "Hastinapur Gram", "Daurala Panchayat", "Parikshitgarh Gram", "Rohta Panchayat", "Janichhur Gram", "Machhra Panchayat", "Sarurpur Khurd Gram"],
      "Bareilly": ["Aonla Gram", "Faridpur Bareilly Panchayat", "Baheri Gram", "Nawabganj Bareilly Panchayat", "Mirganj UP Gram", "Bhojipura Panchayat", "Bithri Chainpur Gram", "Fatehganj Paschimi Panchayat", "Kyak Gram"],
      "Aligarh": ["Atrauli Gram", "Iglas Panchayat", "Khair Gram", "Gabhana Panchayat", "Jawan Sikandarpur Gram", "Chandaus Panchayat", "Lodha Gram", "Dhanipur Panchayat", "Akrabad Gram"],
      "Moradabad": ["Kanth Gram", "Bilari Panchayat", "Thakurdwara Gram", "Kundarki Panchayat", "Chhajlet Gram", "Munda Pandey Panchayat", "Bhagatpur Tanda Gram", "Dilari Panchayat"],
      "Jhansi": ["Mauranipur Gram", "Babina Panchayat", "Garautha Gram", "Moth Panchayat", "Gursarai Gram", "Chirgaon Panchayat", "Bamaur Gram", "Baragaon Jhansi Panchayat", "Ranipur Jhansi Gram"],
      "Saharanpur": ["Deoband Gram", "Nakur Panchayat", "Behat Gram", "Rampur Maniharan Panchayat", "Gangoh Gram", "Nanauta Panchayat", "Sarsawa Gram", "Muzaffarabad UP Panchayat"],
      "Muzaffarnagar": ["Budhana Gram", "Khatauli Panchayat", "Jansath Gram", "Purqazi Panchayat", "Shahpur Muzaffarnagar Gram", "Charthawal Panchayat", "Baghra Gram", "Morna Panchayat"],
      "Barabanki": ["Fatehpur Barabanki Gram", "Ramnagar Barabanki Panchayat", "Haidergarh Gram", "Ramsanehighat Panchayat", "Sirauli Gauspur Gram", "Zaidpur Panchayat", "Dewa Sharif Gram", "Banka Panchayat", "Harakh Gram"],
      "Sitapur": ["Biswan Gram", "Mahmoodabad Panchayat", "Laharpur Gram", "Sidhauli Panchayat", "Misrikh Gram", "Khairabad Sitapur Panchayat", "Hargaon Gram", "Pisawan Panchayat", "Machhrehta Gram"],
      "Hardoi": ["Sandila Gram", "Shahabad Hardoi Panchayat", "Bilgram Gram", "Sandi Panchayat", "Mallawan Gram", "Madhoganj Panchayat", "Bawan Gram", "Tandiyawan Panchayat", "Sursa Gram"],
      "Rae Bareli": ["Lalganj Rae Bareli Gram", "Salon Panchayat", "Bachhrawan Gram", "Maharajganj Rae Bareli Panchayat", "Unchahar Gram", "Dalmau Panchayat", "Sareni Gram", "Harchandpur Panchayat"],
      "Basti": ["Harraiya Gram", "Rudhauli Panchayat", "Captainganj Gram", "Bhanpur Panchayat", "Bikramjot Gram", "Kaptanganj Basti Panchayat", "Saltaua Gopalpur Gram", "Gaur Basti Panchayat"],
      "Deoria": ["Salempur Gram", "Bhatpar Rani Panchayat", "Rudrapur Deoria Gram", "Barhaj Panchayat", "Bhatahi Gram", "Lar Panchayat", "Gauri Bazar Gram", "Pathardeva Panchayat", "Tarkulwa Gram"],
      "Azamgarh": ["Lalganj Azamgarh Gram", "Phoolpur Pawai Panchayat", "Sagri Gram", "Mehnagar Panchayat", "Mubarakpur Rural Gram", "Bilariyaganj Panchayat", "Atraulia Gram", "Jiyanpur Panchayat", "Martinganj Gram"],
      "Jaunpur": ["Shahganj Gram", "Machhlishahr Panchayat", "Mariahu Gram", "Kerakat Panchayat", "Badlapur Jaunpur Gram", "Mungra Badshahpur Panchayat", "Baksha Gram", "Sujanpur Jaunpur Panchayat", "Dharmapur Gram"],
      "Mirzapur": ["Chunar Gram", "Lalganj Mirzapur Panchayat", "Mariyahu Mirzapur Gram", "Kon Mirzapur Panchayat", "Majhawan Gram", "City Mirzapur Panchayat", "Pahari Mirzapur Gram", "Halalpur Mirzapur Gram"],
    }
  },
  "West Bengal": {
    districts: ["Kolkata", "North 24 Parganas (Barasat)", "South 24 Parganas (Alipore)", "Howrah", "Hooghly (Chinsurah)", "Purba Medinipur (Tamluk)", "Paschim Medinipur (Midnapore)", "Purba Bardhaman (Bardhaman)", "Paschim Bardhaman (Asansol)", "Murshidabad (Baharampur)", "Nadia (Krishnanagar)", "Malda (English Bazar)", "Darjeeling", "Jalpaiguri", "Alipurduar", "Cooch Behar", "Birbhum (Suri)", "Bankura", "Purulia", "Uttar Dinajpur (Raiganj)", "Dakshin Dinajpur (Balurghat)", "Jhargram", "Kalimpong"],
    cities: ["Kolkata", "Barasat", "Howrah", "Chinsurah", "Tamluk", "Midnapore", "Bardhaman", "Asansol", "Baharampur", "Krishnanagar", "English Bazar", "Darjeeling", "Siliguri", "Jalpaiguri", "Alipurduar", "Cooch Behar", "Suri", "Bankura", "Purulia", "Raiganj", "Balurghat", "Jhargram", "Kalimpong", "Durgapur", "Kharagpur", "Haldia", "Bangaon"],
    villages: {
      "Kolkata": ["Alipore Gram", "Behala Area", "Jadavpur Gram", "Dum Dum Rural", "Tollygunge Village", "Garia Gram", "Cossipore"],
      "North 24 Parganas (Barasat)": ["Habra Gram", "Bangaon Panchayat", "Basirhat Gram", "Deganga Panchayat", "Amdanga Gram", "Baduria Panchayat", "Minakhan Gram", "Haroa Panchayat", "Swarupnagar Gram", "Sandeshkhali Panchayat", "Gaighata Gram"],
      "South 24 Parganas (Alipore)": ["Baruipur Gram", "Canning Panchayat", "Diamond Harbour Gram", "Kakdwip Panchayat", "Joynagar Gram", "Bhangar Panchayat", "Gosaba Gram", "Budge Budge Panchayat", "Kultali Gram", "Namkhana Panchayat", "Basanti Gram"],
      "Howrah": ["Uluberia Gram", "Bagnan Panchayat", "Amta Gram", "Shyampur Howrah Panchayat", "Domjur Gram", "Jagatballavpur Panchayat", "Panchla Gram", "Udaynarayanpur Panchayat", "Sankrail Gram"],
      "Hooghly (Chinsurah)": ["Arambagh Gram", "Singur Panchayat", "Chandannagar Rural Gram", "Tarakeswar Panchayat", "Pandua Gram", "Dhaniakhali Panchayat", "Balagarh Gram", "Haripal Panchayat", "Jangipara Gram", "Khanakul Panchayat", "Polba Dadpur Gram"],
      "Purba Medinipur (Tamluk)": ["Contai (Kanthi) Gram", "Haldia Rural Panchayat", "Egra Gram", "Panskura Panchayat", "Nandigram Gram", "Mahisadal Panchayat", "Kolaghat Gram", "Ramnagar Purba Medinipur Panchayat", "Bhagabanpur Gram", "Khejuri Panchayat", "Moyna Gram"],
      "Paschim Medinipur (Midnapore)": ["Kharagpur Rural Gram", "Ghatal Panchayat", "Garhbeta Gram", "Salboni Panchayat", "Dantan Gram", "Debra Panchayat", "Keshpur Gram", "Chandrakona Panchayat", "Narayangarh Gram", "Pingla Panchayat", "Sabang Gram"],
      "Purba Bardhaman (Bardhaman)": ["Kalna Gram", "Katwa Panchayat", "Memari Gram", "Galsi Panchayat", "Bhatar Gram", "Raina Panchayat", "Jamalpur Bardhaman Gram", "Monteswar Panchayat", "Ausgram Gram", "Purbasthali Panchayat", "Khandaghosh Gram"],
      "Paschim Bardhaman (Asansol)": ["Raniganj Gram", "Durgapur Rural Panchayat", "Kulti Gram", "Andal Panchayat", "Jamuria Gram", "Pandabeswar Panchayat", "Barabani Gram", "Faridpur Durgapur Panchayat", "Salanpur Gram"],
      "Murshidabad (Baharampur)": ["Kandi Gram", "Jangipur Panchayat", "Lalgola Gram", "Domkal Panchayat", "Jiaganj (Azimganj) Gram", "Beldanga Panchayat", "Hariharpara Gram", "Raghunathganj Gram", "Bhagawangola Panchayat", "Nabagram Gram", "Suti Panchayat"],
      "Nadia (Krishnanagar)": ["Ranaghat Gram", "Kalyani Rural Panchayat", "Tehatta Gram", "Nabadwip Panchayat", "Santipur Gram", "Chakdaha Panchayat", "Karimpur Gram", "Chapra Nadia Panchayat", "Hanskhali Gram", "Nakashipara Panchayat", "Kaliganj Gram"],
      "Birbhum (Suri)": ["Bolpur (Santiniketan) Gram", "Rampurhat Panchayat", "Sainthia Gram", "Dubrajpur Panchayat", "Ilambazar Gram", "Nalhati Panchayat", "Mayureswar Gram", "Labpur Panchayat", "Nanoor Gram", "Murarai Panchayat"],
      "Bankura": ["Bishnupur Bankura Gram", "Khatra Panchayat", "Sonamukhi Gram", "Kotulpur Panchayat", "Taldangra Gram", "Onda Panchayat", "Barjora Gram", "Patrasayer Panchayat", "Indas Gram", "Raipur Bankura Panchayat", "Ranibandh Gram"],
      "Darjeeling": ["Kurseong Gram", "Mirik Panchayat", "Siliguri Rural (Matigara) Gram", "Naxalbari Panchayat", "Phansidewa Gram", "Kharibari Panchayat", "Bijanbari Gram", "Sukhiapokhri Panchayat"],
      "Jalpaiguri": ["Malbazar Gram", "Dhupguri Panchayat", "Maynaguri Gram", "Rajganj Panchayat", "Nagrakata Gram", "Matiali Panchayat", "Banarhat Gram"],
    }
  },
  "Uttarakhand": {
    districts: ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar (Rudrapur)", "Pauri Garhwal", "Tehri Garhwal", "Almora", "Pithoragarh", "Chamoli", "Uttarkashi", "Rudraprayag", "Bageshwar", "Champawat"],
    cities: ["Dehradun", "Haridwar", "Rishikesh", "Haldwani", "Rudrapur", "Kashipur", "Roorkee", "Nainital", "Srinagar Garhwal", "Almora", "Pithoragarh", "Kotdwar", "Uttarkashi", "Mussoorie", "Vikasnagar"],
    villages: {
      "Dehradun": ["Vikasnagar Gram", "Rishikesh Rural Panchayat", "Doiwala Gram", "Chakrata Panchayat", "Sahaspur Gram", "Kalsi Panchayat", "Raipur Dehradun Gram", "Herbertpur Panchayat", "Selaqui Gram", "Bhauwala Panchayat"],
      "Haridwar": ["Roorkee Rural Gram", "Laksar Panchayat", "Bhagwanpur Gram", "Bahadrabad Panchayat", "Khanpur Haridwar Gram", "Narsan Panchayat", "Jwalapur Rural Gram", "Sultanpur Haridwar Panchayat"],
      "Udham Singh Nagar (Rudrapur)": ["Kashipur Gram", "Kichha Panchayat", "Khatima Gram", "Sitarganj Panchayat", "Bazpur Gram", "Jaspur Panchayat", "Gadarpur Gram", "Mahakali Panchayat", "Nanakmatta Gram"],
      "Nainital": ["Haldwani Rural Gram", "Ramnagar Nainital Panchayat", "Lalkuan Gram", "Bhimtal Panchayat", "Kaladhungi Gram", "Mukteshwar Panchayat", "Dhari Nainital Gram", "Bhowali Panchayat", "Betalghat Gram"],
      "Pauri Garhwal": ["Kotdwar Gram", "Srinagar Garhwal Panchayat", "Lansdowne Gram", "Thalisain Panchayat", "Dhumakot Gram", "Yamkeshwar Panchayat", "Satpuli Gram", "Rikhnikhal Panchayat", "Ekeshwar Gram"],
      "Tehri Garhwal": ["Narendra Nagar Gram", "Chamba Tehri Panchayat", "New Tehri Gram", "Ghansali Panchayat", "Devprayag Gram", "Pratapnagar Panchayat", "Kirtinagar Gram", "Jakholidhar Panchayat"],
      "Almora": ["Ranikhet Gram", "Dwarahat Panchayat", "Chaukhutiya Gram", "Bhikiyasain Panchayat", "Someshwar Gram", "Hawalbagh Panchayat", "Bhaisiachhana Gram", "Tarikhet Panchayat", "Sult Almora Gram"],
      "Chamoli": ["Gopeshwar Gram", "Joshimath Panchayat", "Karnaprayag Gram", "Gairssain Panchayat", "Tharali Gram", "Pokhari Chamoli Panchayat", "Dewal Gram", "Narayanbagar Panchayat"],
      "Uttarkashi": ["Barkot Gram", "Purola Panchayat", "Bhatwari Gram", "Dunda Panchayat", "Mori Uttarkashi Gram", "Chinyalisaur Panchayat", "Naugaon Gram"],
      "Pithoragarh": ["Dharchula Gram", "Didihat Panchayat", "Berinag Gram", "Gangolihat Panchayat", "Munsyari Gram", "Kanalichhina Panchayat", "Munakot Gram"],
    }
  },
  "Jammu and Kashmir": {
    districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Pulwama", "Kupwara", "Kathua", "Budgam", "Ganderbal"],
    cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur", "Pulwama", "Kupwara", "Kathua", "Sopore", "Pahalgam"],
    villages: {
      "Srinagar": ["Shalteng Gram", "Harwan Panchayat", "Khonmoh Gram", "Pantha Chowk Panchayat", "Nowgam Gram"],
      "Jammu": ["RS Pura Gram", "Akhnoor Panchayat", "Bishnah Gram", "Nagrota Panchayat", "Marh Gram", "Dansal Panchayat"],
      "Anantnag": ["Bijbehara Gram", "Dooru Panchayat", "Kokernag Gram", "Shangus Panchayat", "Pahalgam Rural Gram", "Mattan Panchayat"],
      "Baramulla": ["Sopore Rural Gram", "Pattan Panchayat", "Uri Gram", "Tangmarg Panchayat", "Rafiabad Gram", "Kreeri Panchayat"],
      "Udhampur": ["Ramnagar Gram", "Chenani Panchayat", "Majalta Gram", "Tikri Panchayat", "Panchari Gram"],
    }
  },
  "Ladakh": {
    districts: ["Leh", "Kargil"],
    cities: ["Leh", "Kargil", "Diskit", "Drass", "Padum", "Nyoma", "Khalatse"],
    villages: {
      "Leh": ["Choglamsar Gram", "Thiksey Panchayat", "Shey Gram", "Diskit Nubra Panchayat", "Hunder Gram", "Khalatse Panchayat", "Alchi Gram"],
      "Kargil": ["Drass Gram", "Sankoo Panchayat", "Shakar Chiktan Gram", "Taisuru Panchayat", "Padum Zanskar Gram"],
    }
  },
  "Meghalaya": {
    districts: ["East Khasi Hills (Shillong)", "West Garo Hills (Tura)", "West Jaintia Hills (Jowai)", "Ri Bhoi (Nongpoh)", "South West Khasi Hills (Mawkyrwat)"],
    cities: ["Shillong", "Tura", "Jowai", "Nongpoh", "Cherrapunji (Sohra)", "Mairang", "Williamnagar"],
    villages: {
      "East Khasi Hills (Shillong)": ["Cherrapunji Sohra Gram", "Mawkynrew Panchayat", "Pynursla Gram", "Mawphlang Panchayat", "Mawsynram Gram", "Laitlyngkot Panchayat"],
      "West Garo Hills (Tura)": ["Rongram Gram", "Dalu Panchayat", "Selsella Gram", "Dadenggre Panchayat", "Tikrikilla Gram"],
      "Ri Bhoi (Nongpoh)": ["Umsning Gram", "Umling Panchayat", "Jirang Gram", "Bhoirymbong Panchayat"],
    }
  },
  "Tripura": {
    districts: ["West Tripura (Agartala)", "Gomati (Udaipur)", "North Tripura (Dharmanagar)", "South Tripura (Belonia)", "Dhalai (Ambassa)", "Khowai", "Sepahijala", "Unakoti"],
    cities: ["Agartala", "Udaipur", "Dharmanagar", "Belonia", "Ambassa", "Khowai", "Bishalgarh", "Kailashahar"],
    villages: {
      "West Tripura (Agartala)": ["Dukli Gram", "Mohanpur Panchayat", "Jirania Gram", "Mandwi Panchayat", "Lefunga Gram", "Hezamara Panchayat"],
      "Gomati (Udaipur)": ["Matabari Gram", "Kakraban Panchayat", "Killa Gram", "Ompi Panchayat", "Amarpur Gram"],
    }
  },
  "Manipur": {
    districts: ["Imphal West", "Imphal East", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Senapati", "Ukhrul"],
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Mayang Imphal", "Moirang", "Ukhrul"],
    villages: {
      "Imphal West": ["Wangoi Gram", "Lamsang Panchayat", "Patsoi Gram", "Sekmai Panchayat"],
      "Thoubal": ["Lilong Gram", "Yairipok Panchayat", "Wangjing Gram", "Heirok Panchayat"],
      "Churachandpur": ["Tuibong Gram", "Singngat Panchayat", "Samulamlan Gram", "Henglep Panchayat"],
    }
  },
  "Mizoram": {
    districts: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Mamit", "Lawngtlai", "Siaha"],
    cities: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Mamit", "Bairabi", "Saitual"],
    villages: {
      "Aizawl": ["Tlangnuam Gram", "Darlawn Panchayat", "Aibawk Gram", "Thingsulthliah Panchayat"],
      "Lunglei": ["Hnahthial Gram", "Lunglei Rural Panchayat", "Bunghmun Gram", "Lungsen Panchayat"],
    }
  },
  "Nagaland": {
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Phek", "Peren"],
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Mon", "Chumukedima"],
    villages: {
      "Kohima": ["Jakhama Gram", "Chiephobozou Panchayat", "Sechu Zubza Gram", "Tseminyu Panchayat"],
      "Dimapur": ["Medziphema Gram", "Dhansiripar Panchayat", "Niuland Gram", "Kuhuboto Panchayat"],
    }
  },
  "Arunachal Pradesh": {
    districts: ["Papum Pare (Itanagar)", "East Siang (Pasighat)", "West Kameng (Bomdila)", "Tawang", "Changlang", "Lower Subansiri (Ziro)", "Lohit (Tezu)"],
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Bomdila", "Tawang", "Ziro", "Tezu", "Roing", "Aalo"],
    villages: {
      "Papum Pare (Itanagar)": ["Doimukh Gram", "Banderdewa Panchayat", "Sagalee Gram", "Balijan Panchayat", "Mengio Gram"],
      "East Siang (Pasighat)": ["Ruksin Gram", "Mebo Panchayat", "Bilat Gram", "Sille-Oyan Panchayat"],
      "Tawang": ["Lumla Gram", "Jang Panchayat", "Mukto Gram", "Kitpi Panchayat"],
    }
  },
  "Sikkim": {
    districts: ["East Sikkim (Gangtok)", "South Sikkim (Namchi)", "West Sikkim (Geyzing)", "North Sikkim (Mangan)"],
    cities: ["Gangtok", "Namchi", "Geyzing", "Mangan", "Singtam", "Rangpo", "Jorethang", "Ravangla"],
    villages: {
      "East Sikkim (Gangtok)": ["Ranka Gram", "Khamdong Panchayat", "Pakyong Gram", "Rhenock Panchayat", "Martam Gram"],
      "South Sikkim (Namchi)": ["Jorethang Gram", "Ravangla Panchayat", "Temi Tarku Gram", "Melli Panchayat"],
    }
  },
  "Goa": {
    districts: ["North Goa (Panaji)", "South Goa (Margao)"],
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Pernem"],
    villages: {
      "North Goa (Panaji)": ["Tiswadi Gram", "Bardez Panchayat", "Pernem Gram", "Bicholim Panchayat", "Sattari Gram"],
      "South Goa (Margao)": ["Salcete Gram", "Mormugao Panchayat", "Ponda Rural Gram", "Quepem Panchayat", "Canacona Gram", "Sanguem Panchayat"],
    }
  },
  "Chandigarh": {
    districts: ["Chandigarh"],
    cities: ["Chandigarh Central", "Sector 17", "Manimajra", "Industrial Area", "Sarangpur"],
    villages: {
      "Chandigarh": ["Manimajra Gram", "Dhanas Panchayat", "Maloya Gram", "Khuda Alisher Panchayat", "Behlana Gram", "Kaimbwala Panchayat", "Dadu Majra Gram"],
    }
  },
  "Andaman and Nicobar": {
    districts: ["South Andaman (Port Blair)", "North and Middle Andaman (Mayabunder)", "Nicobar (Car Nicobar)"],
    cities: ["Port Blair", "Garacharma", "Bambooflat", "Mayabunder", "Diglipur", "Rangat", "Car Nicobar"],
    villages: {
      "South Andaman (Port Blair)": ["Ferrargunj Gram", "Prothrapur Panchayat", "Garacharma Gram", "Chouldhari Panchayat", "Havelock Island Gram", "Neil Island Panchayat"],
      "North and Middle Andaman (Mayabunder)": ["Diglipur Gram", "Rangat Panchayat", "Billiground Gram", "Kalighat Panchayat", "Kadamtala Gram"],
    }
  },
  "Lakshadweep": {
    districts: ["Lakshadweep (Kavaratti)"],
    cities: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy", "Kadmat", "Kalpeni"],
    villages: {
      "Lakshadweep (Kavaratti)": ["Kavaratti Island Gram", "Agatti Panchayat", "Minicoy Gram", "Andrott Panchayat", "Amini Island Gram", "Kadmat Panchayat"],
    }
  },
  "Puducherry": {
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    cities: ["Puducherry", "Oulgaret", "Karaikal", "Mahe", "Yanam", "Villianur"],
    villages: {
      "Puducherry": ["Villianur Gram", "Ariyankuppam Panchayat", "Bahour Gram", "Mannadipet Panchayat", "Nettapakkam Gram"],
      "Karaikal": ["Kottucherry Gram", "Nedungadu Panchayat", "Neravy Gram", "Thirunallar Panchayat"],
    }
  }
};


export const DEFAULT_DISTRICT_VILLAGES = [
  "Central Block Panchayat",
  "North Agrozone Gram",
  "South Canal Panchayat",
  "East Watershed Gram",
  "West Krishi Panchayat",
  "Model Farm Gram"
];

// Helper array of all searchable items across India
export const ALL_SEARCHABLE_LOCATIONS = Object.entries(INDIA_LOCATIONS).flatMap(([state, data]) => {
  const items = [];
  // Add state
  items.push({ name: state, type: 'state', state, district: '' });
  // Add districts
  (data.districts || []).forEach(d => {
    items.push({ name: d, type: 'district', state, district: d });
  });
  // Add cities
  (data.cities || []).forEach(c => {
    items.push({ name: c, type: 'city', state, district: '' });
  });
  // Add villages
  if (data.villages) {
    Object.entries(data.villages).forEach(([dist, vList]) => {
      vList.forEach(v => {
        items.push({ name: v, type: 'village', state, district: dist });
      });
    });
  }
  return items;
});

