// Comprehensive dataset of Indian States, Districts, Major Cities, and State-Scoped Villages (4-5 per district)

export const INDIA_LOCATIONS = {
  "Andhra Pradesh": {
    districts: ["Visakhapatnam", "Krishna (Vijayawada)", "Guntur", "Kurnool", "Nellore", "Tirupati (Chittoor)", "Anantapur", "East Godavari (Kakinada)", "YSR Kadapa", "Prakasam"],
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Rajahmundry"],
    villages: {
      "Visakhapatnam": ["Anakapalle", "Bheemunipatnam", "Pendurthi Gram", "Chodavaram", "Padmanabham"],
      "Krishna (Vijayawada)": ["Gudivada", "Nuzvid Gram", "Gannavaram", "Vuyyuru", "Kanchikacherla"],
      "Guntur": ["Tenali Gram", "Narasaraopet", "Mangalagiri", "Sattenapalle", "Bapatla Gram"],
      "Kurnool": ["Nandyal Gram", "Adoni", "Yemmiganur", "Dhone", "Pattikonda"],
      "Tirupati (Chittoor)": ["Chandragiri", "Srikalahasti", "Puttur Gram", "Nagari", "Pileru"],
    }
  },
  "Assam": {
    districts: ["Kamrup (Guwahati)", "Dibrugarh", "Cachar (Silchar)", "Jorhat", "Nagaon", "Tinsukia", "Sonitpur (Tezpur)", "Barpeta"],
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Barpeta"],
    villages: {
      "Kamrup (Guwahati)": ["Hajo Gram", "Rangia Village", "Palashbari", "Boko Gram", "Chaygaon"],
      "Dibrugarh": ["Moran Gram", "Naharkatia", "Chabua Village", "Tingkhong", "Duliajan Gram"],
      "Jorhat": ["Titabor", "Mariani Village", "Teok Gram", "Majuli Ghat", "Dergaon"],
      "Cachar (Silchar)": ["Lakhipur Gram", "Sonai Village", "Katigorah", "Udarbond", "Borkhola"],
    }
  },
  "Bihar": {
    districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Rohtas (Sasaram)", "Saran (Chhapra)", "Begusarai", "Nalanda (Bihar Sharif)", "Vaishali (Hajipur)", "Siwan"],
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Sasaram", "Chhapra", "Begusarai", "Bihar Sharif", "Hajipur", "Siwan"],
    villages: {
      "Patna": ["Danapur Village", "Bihta Gram", "Phulwari Sharif", "Fatwah Gram", "Maner Village"],
      "Gaya": ["Bodhgaya Gram", "Tekari Village", "Sherghati", "Wazirganj Gram", "Manpur"],
      "Muzaffarpur": ["Kanti Gram", "Motipur Village", "Marwan", "Saraiya Gram", "Sakra"],
      "Bhagalpur": ["Kahalgaon", "Naugachia Gram", "Sultanganj", "Pirpainti", "Bihpur"],
      "Darbhanga": ["Benipur Gram", "Baheri Village", "Hayaghat", "Keoti", "Jale Gram"],
      "Rohtas (Sasaram)": ["Dehri Gram", "Nokha Village", "Bikramganj", "Kargahar", "Chenari"],
      "Vaishali (Hajipur)": ["Lalganj Gram", "Mahnar Village", "Bidupur", "Mahua Gram", "Jandaha"],
    }
  },
  "Chhattisgarh": {
    districts: ["Raipur", "Durg (Bhilai)", "Bilaspur", "Korba", "Rajnandgaon", "Bastar (Jagdalpur)", "Surguja (Ambikapur)", "Dhamtari", "Mahasamund"],
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund"],
    villages: {
      "Raipur": ["Abhanpur Gram", "Arang Village", "Tilda Neora", "Dharsiwa", "Mandir Hasaud"],
      "Durg (Bhilai)": ["Patan Gram", "Dhamdha Village", "Kumhari", "Utai Gram", "Bhilai 3"],
      "Bilaspur": ["Kota Gram", "Takhatpur Village", "Bilha", "Masturi", "Ratanpur Gram"],
      "Bastar (Jagdalpur)": ["Tokapal Gram", "Bastanar Village", "Lohandiguda", "Bakawand", "Darbha"],
    }
  },
  "Delhi (NCT)": {
    districts: ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "South West Delhi (Dwarka)", "North West Delhi (Rohini)"],
    cities: ["Connaught Place", "Rohini", "Dwarka", "Saket", "Karol Bagh", "Janakpuri", "Mayur Vihar", "Pitampura"],
    villages: {
      "New Delhi": ["Chanakyapuri Gram", "Barakhamba Area", "Sarojini Nagar Gram", "Lodhi Estate", "Bengali Market"],
      "South West Delhi (Dwarka)": ["Najafgarh Gram", "Kakrola Village", "Dhansa Gram", "Palam Village", "Matiala Gram"],
      "North West Delhi (Rohini)": ["Alipur Gram", "Narela Village", "Bawana Gram", "Kanjhawala", "Rithala Village"],
      "North Delhi": ["Burari Gram", "Timarpur Village", "Mukherjee Nagar Gram", "Jahangirpuri", "Bakhtawarpur"],
    }
  },
  "Gujarat": {
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Kutch (Bhuj)", "Bharuch", "Anand"],
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Bhuj", "Bharuch", "Anand"],
    villages: {
      "Ahmedabad": ["Sanand Village", "Bavla Gram", "Dholka Village", "Viramgam Gram", "Dhandhuka"],
      "Surat": ["Olpad Village", "Kamrej Gram", "Bardoli Village", "Mandvi Gram", "Palsana"],
      "Rajkot": ["Gondal Gram", "Jasdan Village", "Dhoraji Gram", "Jetpur Village", "Upleta"],
      "Vadodara": ["Padra Gram", "Dabhoi Village", "Karjan Gram", "Savli Village", "Waghodia"],
      "Kutch (Bhuj)": ["Anjar Gram", "Mandvi Kutch", "Mundra Village", "Nakhatrana", "Bhachau Gram"],
      "Mehsana": ["Kadi Gram", "Visnagar Village", "Unjha Gram", "Vadnagar Village", "Vijapur"],
    }
  },
  "Haryana": {
    districts: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani"],
    cities: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani"],
    villages: {
      "Gurugram": ["Sohna Gram", "Pataudi Village", "Farrukhnagar", "Manesar Gram", "Badshahpur"],
      "Karnal": ["Nilokheri Gram", "Gharaunda Village", "Indri Gram", "Assandh Village", "Taraori"],
      "Hisar": ["Hansi Gram", "Barwala Village", "Narnaund", "Adampur Gram", "Uklana"],
      "Panipat": ["Samalkha Gram", "Israna Village", "Bapoli Gram", "Madlauda", "Sanauli"],
      "Ambala": ["Naraingarh Gram", "Barara Village", "Saha Gram", "Shahzadpur", "Mullana"],
    }
  },
  "Himachal Pradesh": {
    districts: ["Shimla", "Kangra (Dharamshala)", "Mandi", "Solan", "Kullu (Manali)", "Chamba", "Sirmaur (Nahan)", "Una", "Bilaspur", "Hamirpur"],
    cities: ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali", "Chamba", "Nahan", "Una", "Palampur"],
    villages: {
      "Shimla": ["Theog Gram", "Rampur Bushahr", "Rohru Village", "Jubbal Gram", "Kotkhai"],
      "Kangra (Dharamshala)": ["Palampur Gram", "Nurpur Village", "Dehra Gopipur", "Jawali Gram", "Baijnath"],
      "Mandi": ["Sundarnagar Gram", "Sarkaghat", "Jogindernagar", "Karsog Gram", "Gohar"],
      "Kullu (Manali)": ["Naggar Village", "Banjar Gram", "Anni Village", "Nirmand", "Bhuntar Gram"],
    }
  },
  "Jharkhand": {
    districts: ["Ranchi", "East Singhbhum (Jamshedpur)", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Palamu (Daltonganj)", "Ramgarh"],
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Medininagar", "Ramgarh"],
    villages: {
      "Ranchi": ["Kanke Gram", "Ormanjhi Village", "Ratu Gram", "Namkum Village", "Bundu Gram"],
      "East Singhbhum (Jamshedpur)": ["Ghatshila Gram", "Potka Village", "Baharagora", "Patamda Gram", "Musabani"],
      "Dhanbad": ["Govindpur Gram", "Nirsa Village", "Baghmara", "Baliapur Gram", "Topchanchi"],
      "Deoghar": ["Madhupur Gram", "Sarath Village", "Mohanpur Deoghar", "Karon", "Devipur Gram"],
    }
  },
  "Karnataka": {
    districts: ["Bengaluru Urban", "Mysuru", "Belagavi", "Dharwad (Hubballi)", "Dakshina Kannada (Mangaluru)", "Kalaburagi", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", "Udupi", "Hassan"],
    cities: ["Bengaluru", "Mysuru", "Hubballi", "Belagavi", "Mangaluru", "Kalaburagi", "Davanagere", "Ballari", "Shivamogga", "Tumakuru", "Udupi", "Hassan"],
    villages: {
      "Bengaluru Urban": ["Anekal Gram", "Yelahanka Village", "Kengeri Gram", "Sarjapur Village", "Nelamangala"],
      "Mysuru": ["Nanjangud Gram", "Hunsur Village", "Piriyapatna", "T. Narasipura", "Krishnarajanagara"],
      "Belagavi": ["Gokak Gram", "Chikkodi Village", "Bailhongal", "Athani Gram", "Hukkeri"],
      "Dakshina Kannada (Mangaluru)": ["Bantwal Gram", "Puttur Village", "Belthangady", "Sullia Gram", "Moodabidri"],
      "Dharwad (Hubballi)": ["Kundgol Gram", "Navalgund Village", "Kalghatgi", "Alnavar", "Hebballi Gram"],
    }
  },
  "Kerala": {
    districts: ["Ernakulam (Kochi)", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Malappuram", "Palakkad", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Wayanad", "Idukki"],
    cities: ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur", "Malappuram", "Palakkad", "Kollam", "Kannur", "Alappuzha", "Kottayam", "Kalpetta"],
    villages: {
      "Ernakulam (Kochi)": ["Aluva Gram", "Paravur Village", "Kothamangalam", "Muvattupuzha", "Angamaly Gram"],
      "Wayanad": ["Mananthavady Gram", "Sulthan Bathery", "Vythiri Village", "Kalpetta Gram", "Meppadi Village"],
      "Palakkad": ["Ottapalam Gram", "Chittur Village", "Alathur Gram", "Mannarkkad", "Pattambi"],
      "Kozhikode": ["Vatakara Gram", "Koyilandy Village", "Thamarassery", "Kunnamangalam", "Balusseri"],
      "Alappuzha": ["Cherthala Gram", "Kayamkulam Village", "Mavelikkara", "Ambalappuzha", "Haripad Gram"],
    }
  },
  "Madhya Pradesh": {
    districts: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Khargone", "Hoshangabad", "Vidisha"],
    cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Khargone", "Hoshangabad", "Vidisha"],
    villages: {
      "Indore": ["Sanwer Gram", "Depalpur Village", "Mhow Gram", "Hatod Village", "Rau Gram"],
      "Bhopal": ["Berasia Gram", "Phanda Village", "Huzur Gram", "Kolar Village", "Misrod Gram"],
      "Ujjain": ["Nagda Gram", "Mahidpur Village", "Tarana Gram", "Khachrod", "Ghatiya Gram"],
      "Gwalior": ["Dabra Gram", "Bhitarwar Village", "Morar Gram", "Ghatigaon", "Chinore Village"],
      "Jabalpur": ["Sihora Gram", "Patan Jabalpur", "Panagar Village", "Shahpura Gram", "Kundam"],
    }
  },
  "Maharashtra": {
    districts: ["Pune", "Mumbai City", "Mumbai Suburban", "Nagpur", "Thane", "Nashik", "Aurangabad (Chhatrapati Sambhaji Nagar)", "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Satara", "Ahmednagar", "Latur", "Akola", "Chandrapur"],
    cities: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Nanded", "Sangli", "Jalgaon", "Satara", "Ahmednagar", "Latur"],
    villages: {
      "Pune": ["Haveli Gram", "Baramati Village", "Shirur Gram", "Junnar Village", "Maval Gram"],
      "Nagpur": ["Kamptee Gram", "Hingna Village", "Katol Gram", "Narkhed Village", "Ramtek Gram"],
      "Nashik": ["Dindori Gram", "Niphad Village", "Sinnar Gram", "Yeola Village", "Trimbak Gram"],
      "Mumbai Suburban": ["Andheri Gram", "Kurla Village", "Borivali Gram", "Malad Village", "Ghatkopar Gram"],
      "Thane": ["Kalyan Gramin", "Bhiwandi Gram", "Murbad Village", "Shahapur Gram", "Ambernath Gram"],
      "Aurangabad (Chhatrapati Sambhaji Nagar)": ["Paithan Gram", "Gangapur Village", "Vaijapur Gram", "Kannad Village", "Sillod Gram"],
      "Kolhapur": ["Karveer Gram", "Hatkanangle", "Shirol Village", "Radhanagari", "Panhala Gram"],
      "Solapur": ["Barshi Gram", "Pandharpur Village", "Mohol Gram", "Akkalkot Village", "Karmala"],
      "Ahmednagar": ["Rahuri Gram", "Sangamner Village", "Kopargaon", "Shrirampur Gram", "Parner"],
    }
  },
  "Odisha": {
    districts: ["Khordha (Bhubaneswar)", "Cuttack", "Sundargarh (Rourkela)", "Ganjam (Berhampur)", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Bolangir", "Koraput"],
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Bolangir", "Koraput"],
    villages: {
      "Khordha (Bhubaneswar)": ["Jatani Gram", "Balianta Village", "Balipatna", "Banapur Gram", "Begunia"],
      "Cuttack": ["Athagarh Gram", "Banki Village", "Salipur Gram", "Nischintakoili", "Mahanga"],
      "Puri": ["Pipili Gram", "Nimapada Village", "Satyabadi", "Brahmagiri Gram", "Kakatpur"],
      "Ganjam (Berhampur)": ["Chhatrapur Gram", "Hinjilicut", "Aska Village", "Bhanjanagar", "Polasara Gram"],
    }
  },
  "Punjab": {
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "SAS Nagar (Mohali)", "Hoshiarpur", "Pathankot", "Moga", "Sangrur", "Ferozepur", "Kapurthala"],
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Sangrur", "Ferozepur", "Kapurthala"],
    villages: {
      "Ludhiana": ["Jagraon Gram", "Khanna Village", "Raikot Gram", "Samrala Village", "Payal Gram"],
      "Amritsar": ["Ajnala Gram", "Majitha Village", "Attari Gram", "Jandiala Guru", "Baba Bakala"],
      "Patiala": ["Nabha Gram", "Samana Village", "Rajpura Gram", "Ghanaur Village", "Sanaur"],
      "Jalandhar": ["Phillaur Gram", "Nakodar Village", "Shahkot Gram", "Kartarpur", "Goraya Village"],
      "Bathinda": ["Talwandi Sabo", "Rampura Phul", "Maur Mandi", "Goniana Gram", "Bhucho Mandi"],
      "SAS Nagar (Mohali)": ["Kharar Gram", "Kurali Village", "Dera Bassi", "Lalru Gram", "Banur Village"],
    }
  },
  "Rajasthan": {
    districts: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Barmer"],
    cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Barmer"],
    villages: {
      "Jaipur": ["Sanganer Gram", "Chomu Village", "Bassi Gram", "Chaksu Village", "Phulera Gram"],
      "Jodhpur": ["Luni Gram", "Bilara Village", "Osian Gram", "Shergarh Village", "Phalodi Gram"],
      "Kota": ["Sangod Gram", "Pipalda Village", "Ramganj Mandi", "Digod Gram", "Itawa Village"],
      "Udaipur": ["Mavli Gram", "Vallabhnagar", "Salumber Village", "Girwa Gram", "Kherwara"],
      "Bikaner": ["Nokha Gram", "Lunkaransar Village", "Kolayat Gram", "Khajuwala", "Dungargarh"],
      "Alwar": ["Behror Gram", "Tijara Village", "Kishangarh Bas", "Rajgarh Gram", "Ramgarh Village"],
    }
  },
  "Tamil Nadu": {
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli (Trichy)", "Salem", "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Kanchipuram", "Kanyakumari", "Tirunelveli"],
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Kanchipuram", "Nagercoil", "Tirunelveli"],
    villages: {
      "Chennai": ["Tambaram Gram", "Avadi Village", "Ambattur Gram", "Poonamallee", "Madhavaram"],
      "Coimbatore": ["Pollachi Gram", "Mettupalayam", "Sulur Village", "Annur Gram", "Kinathukadavu"],
      "Madurai": ["Melur Gram", "Vadipatti Village", "Thirumangalam", "Usilampatti", "Sholavandan"],
      "Kanchipuram": ["Sriperumbudur", "Walajabad Gram", "Kundrathur", "Uthiramerur", "Chengalpattu Gram"],
      "Salem": ["Attur Gram", "Mettur Village", "Omalur Gram", "Sankari Village", "Edappadi"],
      "Thanjavur": ["Kumbakonam Gram", "Papanasam", "Pattukkottai", "Thiruvaiyaru", "Orathanadu"],
    }
  },
  "Telangana": {
    districts: ["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet"],
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet", "Ramagundam", "Suryapet"],
    villages: {
      "Hyderabad": ["Ghatkesar Gram", "Secunderabad Village", "Charminar Area", "Gachibowli Gram", "Kondapur Village"],
      "Rangareddy": ["Shamshabad Gram", "Ibrahimpatnam", "Maheshwaram", "Chevella Gram", "Rajendranagar"],
      "Medchal-Malkajgiri": ["Keesara Gram", "Shamirpet Village", "Medchal Gram", "Alwal Village", "Ghatkesar"],
      "Warangal": ["Narsampet Gram", "Parkal Village", "Wardhannapet", "Hanamkonda Gram", "Kazipet Village"],
      "Karimnagar": ["Huzurabad Gram", "Jammikunta Village", "Choppadandi", "Manakondur", "Thimmapur"],
    }
  },
  "Uttar Pradesh": {
    districts: ["Lucknow", "Varanasi", "Kanpur Nagar", "Prayagraj (Allahabad)", "Agra", "Meerut", "Gorakhpur", "Bareilly", "Aligarh", "Moradabad", "Ghaziabad", "Gautam Buddha Nagar (Noida)", "Ayodhya", "Jhansi", "Saharanpur", "Muzaffarnagar", "Mathura", "Mirzapur", "Azamgarh", "Banda"],
    cities: ["Lucknow", "Varanasi", "Kanpur", "Prayagraj", "Agra", "Meerut", "Gorakhpur", "Bareilly", "Aligarh", "Moradabad", "Ghaziabad", "Noida", "Ayodhya", "Jhansi", "Saharanpur"],
    villages: {
      "Lucknow": ["Sarojini Nagar", "Bakshi Ka Talab", "Mohanlalganj", "Malihabad", "Kakori"],
      "Varanasi": ["Rohania Gram", "Sewapuri Village", "Pindra Gram", "Harahua Village", "Arajiline"],
      "Kanpur Nagar": ["Bilhaur Gram", "Ghatampur Village", "Kalyanpur Gram", "Chaubepur", "Sarsaul"],
      "Prayagraj (Allahabad)": ["Phulpur Gram", "Soraon Village", "Handia Gram", "Karchana", "Bara Village"],
      "Agra": ["Fatehabad Gram", "Etmadpur Village", "Kheragarh", "Bah Gram", "Kiraoli Village"],
      "Gorakhpur": ["Sahjanwa Gram", "Chauri Chaura", "Pipraich Village", "Campierganj", "Bansgaon"],
      "Ayodhya": ["Bikapur Gram", "Rudauli Village", "Sohawal Gram", "Milkipur", "Masodha Village"],
      "Meerut": ["Sardhana Gram", "Mawana Village", "Hastinapur", "Daurala Gram", "Parikshitgarh"],
      "Bareilly": ["Faridpur Gram", "Aonla Village", "Baheri Gram", "Nawabganj", "Mirganj Village"],
    }
  },
  "Uttarakhand": {
    districts: ["Dehradun", "Haridwar", "Nainital (Haldwani)", "Udham Singh Nagar (Rudrapur)", "Almora", "Pauri Garhwal", "Tehri Garhwal", "Pithoragarh", "Chamoli"],
    cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Almora", "Mussoorie"],
    villages: {
      "Dehradun": ["Rishikesh Gram", "Vikasnagar Village", "Doiwala Gram", "Chakrata", "Kalsi Village"],
      "Haridwar": ["Roorkee Gram", "Laksar Village", "Bhagwanpur Gram", "Narsan", "Khanpur Village"],
      "Nainital (Haldwani)": ["Haldwani Gram", "Ramnagar Village", "Bhimtal Gram", "Kaladhungi", "Lalkuan"],
      "Udham Singh Nagar (Rudrapur)": ["Kashipur Gram", "Kichha Village", "Sitarganj", "Khatima Gram", "Bazpur"],
    }
  },
  "West Bengal": {
    districts: ["Kolkata", "North 24 Parganas", "South 24 Parganas", "Howrah", "Hooghly", "Paschim Bardhaman (Asansol/Durgapur)", "Purba Bardhaman", "Darjeeling (Siliguri)", "Nadia", "Murshidabad", "Malda", "Paschim Medinipur"],
    cities: ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Kharagpur", "Darjeeling"],
    villages: {
      "North 24 Parganas": ["Barasat Gram", "Habra Village", "Basirhat Gram", "Bongaon Village", "Barrackpore Gram"],
      "South 24 Parganas": ["Baruipur Gram", "Diamond Harbour", "Canning Village", "Kakdwip Gram", "Sonarpur"],
      "Howrah": ["Uluberia Gram", "Bagnan Village", "Amta Gram", "Shyampur", "Domjur Village"],
      "Hooghly": ["Singur Gram", "Tarakeswar Village", "Chandannagar Gram", "Arambagh", "Pandua Village"],
      "Purba Bardhaman": ["Kalna Gram", "Katwa Village", "Memari Gram", "Raina Village", "Galsi Gram"],
      "Darjeeling (Siliguri)": ["Matigara Gram", "Naxalbari Village", "Phansidewa", "Kurseong Gram", "Mirik Village"],
    }
  }
};

// Generic 4-5 default villages for unlisted districts
export const DEFAULT_DISTRICT_VILLAGES = [
  "Central Panchayat Block", "Kalyanpur Gram", "Mohanpur Village", "Shivpur Gram", "Rampur Village"
];

// Flattened list for instant autocomplete search-as-you-type with state scoping
export const ALL_SEARCHABLE_LOCATIONS = (() => {
  const list = [];
  for (const [state, data] of Object.entries(INDIA_LOCATIONS)) {
    // Add State entry
    list.push({ type: 'State', name: state, state, district: '', city: '', display: `${state} (State)` });
    // Add Districts
    for (const dist of data.districts || []) {
      list.push({ type: 'District', name: dist, state, district: dist, city: '', display: `${dist}, ${state}` });
    }
    // Add Cities
    for (const city of data.cities || []) {
      list.push({ type: 'City', name: city, state, district: '', city, display: `${city}, ${state}` });
    }
    // Add Villages
    for (const [dist, vilList] of Object.entries(data.villages || {})) {
      for (const vil of vilList) {
        list.push({ type: 'Village', name: vil, state, district: dist, city: dist, display: `${vil} (${dist}, ${state})` });
      }
    }
  }
  return list;
})();
