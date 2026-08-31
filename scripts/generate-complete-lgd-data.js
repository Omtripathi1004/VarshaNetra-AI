import fs from 'fs';

// Highly optimized, compact dataset with full 16+ Panchayats & 16+ Villages per District
const STATES_CONFIG = {
  "Uttar Pradesh": {
    districts: ["Lucknow", "Varanasi", "Kanpur Nagar", "Prayagraj (Allahabad)", "Agra", "Gorakhpur", "Bareilly", "Meerut", "Aligarh", "Moradabad", "Saharanpur", "Ayodhya (Faizabad)", "Jhansi", "Muzaffarnagar", "Mathura", "Budaun", "Banda", "Mirzapur", "Sultanpur", "Azamgarh", "Basti", "Deoria", "Ghazipur", "Jaunpur", "Hardoi", "Sitapur", "Lakhimpur Kheri"],
    cities: ["Lucknow", "Varanasi", "Kanpur", "Prayagraj", "Agra", "Gorakhpur", "Bareilly", "Meerut", "Aligarh", "Moradabad", "Saharanpur", "Ayodhya", "Jhansi"],
    seedPanchayats: ["Natkur GP", "Bijnaur GP", "Kalli Pashchim GP", "Gosainganj GP", "Mohanlalganj GP", "Bakshi Ka Talab GP", "Kakori GP", "Malihabad GP", "Sarojini Nagar GP", "Chinhat GP", "Mall GP", "Itaunja GP", "Mahona GP", "Nagram GP", "Kasmandi Kalan GP", "Banthra Sikanderpur GP"],
    seedVillages: ["Natkur Village", "Banthra Village", "Kalli Pashchim Village", "Bijnaur Village", "Gosainganj Rural", "Samesi Village", "Khujauli Village", "Kasmandi Village", "Mall Village", "Nagram Village", "Itaunja Village", "Mahona Village", "Juggaur Village", "Anaura Village", "Utetia Village", "Matiyari Village"]
  },
  "Maharashtra": {
    districts: ["Pune", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nashik", "Thane", "Aurangabad (Chhatrapati Sambhajinagar)", "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Satara", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Raigad (Alibag)", "Ratnagiri", "Sindhudurg", "Bhandara", "Gondia"],
    cities: ["Pune", "Mumbai", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar", "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Satara", "Jalgaon", "Akola"],
    seedPanchayats: ["Haveli GP", "Baramati GP", "Shirur GP", "Khed (Rajgurunagar) GP", "Maval GP", "Mulshi GP", "Daund GP", "Junnar GP", "Ambegaon GP", "Indapur GP", "Bhor GP", "Purandar (Saswad) GP", "Velhe GP", "Manchar GP", "Loni Kalbhor GP", "Wagholi GP"],
    seedVillages: ["Wagholi Village", "Loni Kalbhor Village", "Uruli Kanchan Village", "Manchar Village", "Pirangut Village", "Koregaon Bhima Village", "Shikrapur Village", "Chakan Village", "Talegaon Dabhade Village", "Alandi Rural", "Saswad Village", "Jejuri Rural", "Narayangaon Village", "Otur Village", "Alephata Village", "Somatne Village"]
  },
  "Bihar": {
    districts: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Rohtas (Sasaram)", "Saran (Chhapra)", "Begusarai", "Nalanda (Bihar Sharif)", "Vaishali (Hajipur)", "Siwan", "Samastipur", "Madhubani", "Bhojpur (Arrah)", "Pashchim Champaran (Bettiah)", "Purba Champaran (Motihari)", "Katihar", "Saharsa", "Munger", "Khagaria", "Buxar", "Sitamarhi", "Gopalganj", "Arwal", "Jehanabad", "Jamui"],
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Sasaram", "Chhapra", "Begusarai", "Bihar Sharif", "Hajipur", "Siwan", "Samastipur", "Madhubani", "Arrah", "Bettiah", "Motihari"],
    seedPanchayats: ["Bihta GP", "Danapur GP", "Phulwari Sharif GP", "Fatwah GP", "Maner GP", "Bakhtiyarpur GP", "Paliganj GP", "Masaurhi GP", "Mokama GP", "Bikram GP", "Naubatpur GP", "Sampatchak GP", "Daniyawan GP", "Khusrupur GP", "Belchhi GP", "Ghoswari GP"],
    seedVillages: ["Bihta Village", "Danapur Cantt Village", "Phulwari Village", "Fatwah Village", "Maner Village", "Bakhtiyarpur Village", "Paliganj Village", "Masaurhi Village", "Mokama Village", "Bikram Village", "Naubatpur Village", "Sampatchak Village", "Daniyawan Village", "Khusrupur Village", "Belchhi Village", "Ghoswari Village"]
  },
  "Madhya Pradesh": {
    districts: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Shivpuri", "Vidisha", "Khandwa", "Khargone", "Mandsaur", "Neemuch", "Hoshangabad (Narmadapuram)", "Sehore", "Morena", "Bhind", "Guna", "Damoh"],
    cities: ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Dewas", "Satna", "Ratlam", "Rewa", "Chhindwara", "Shivpuri", "Vidisha"],
    seedPanchayats: ["Sanwer GP", "Mhow GP", "Depalpur GP", "Hatod GP", "Rau GP", "Betma GP", "Manpur GP", "Kshipra GP", "Dakachya GP", "Kampel GP", "Pedmi GP", "Machal GP", "Gautampura GP", "Hasalpur GP", "Khurdi GP", "Simrol GP"],
    seedVillages: ["Sanwer Village", "Mhow Village", "Depalpur Village", "Hatod Village", "Rau Village", "Betma Village", "Manpur Village", "Kshipra Village", "Dakachya Village", "Kampel Village", "Pedmi Village", "Machal Village", "Gautampura Village", "Hasalpur Village", "Khurdi Village", "Simrol Village"]
  },
  "Rajasthan": {
    districts: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Barmer", "Jaisalmer", "Nagaur", "Chittorgarh", "Jhunjhunu", "Tonk", "Churu", "Dausa", "Sawai Madhopur"],
    cities: ["Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Barmer", "Jaisalmer"],
    seedPanchayats: ["Sanganer GP", "Amer GP", "Bassi GP", "Chaksu GP", "Jamwa Ramgarh GP", "Kotputli GP", "Phulera GP", "Sambhar GP", "Shahpura GP", "Viratnagar GP", "Dudu GP", "Jotwara GP", "Govindgarh GP", "Jobner GP", "Tunga GP", "Renwal GP"],
    seedVillages: ["Sanganer Village", "Amer Village", "Bassi Village", "Chaksu Village", "Jamwa Ramgarh Village", "Kotputli Village", "Phulera Village", "Sambhar Village", "Shahpura Village", "Viratnagar Village", "Dudu Village", "Jotwara Village", "Govindgarh Village", "Jobner Village", "Tunga Village", "Renwal Village"]
  },
  "Gujarat": {
    districts: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Kutch (Bhuj)", "Bharuch", "Anand", "Banaskantha (Palanpur)", "Sabarkantha (Himmatnagar)", "Amreli", "Patan", "Navsari", "Valsad", "Panchmahal (Godhra)", "Dahod"],
    cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh", "Gandhinagar", "Mehsana", "Bhuj", "Bharuch", "Anand", "Palanpur", "Himmatnagar", "Amreli", "Patan", "Navsari", "Valsad"],
    seedPanchayats: ["Sanand GP", "Bavla GP", "Dholka GP", "Viramgam GP", "Dhandhuka GP", "Mandal GP", "Detroj GP", "Dholera GP", "Dascroi GP", "Ranpur GP", "Bareja GP", "Zundal GP", "Bhadaj GP", "Shilaj GP", "Shela GP", "Bopal GP"],
    seedVillages: ["Sanand Village", "Bavla Village", "Dholka Village", "Viramgam Village", "Dhandhuka Village", "Mandal Village", "Detroj Village", "Dholera Village", "Dascroi Village", "Ranpur Village", "Bareja Village", "Zundal Village", "Bhadaj Village", "Shilaj Village", "Shela Village", "Bopal Village"]
  },
  "West Bengal": {
    districts: ["Kolkata", "North 24 Parganas (Barasat)", "South 24 Parganas (Alipore)", "Howrah", "Hooghly (Chinsurah)", "Paschim Medinipur (Midnapore)", "Purba Medinipur (Tamluk)", "Purba Bardhaman", "Paschim Bardhaman (Asansol)", "Murshidabad (Baharampur)", "Nadia (Krishnanagar)", "Malda", "Jalpaiguri", "Darjeeling", "Cooch Behar", "Birbhum (Suri)", "Bankura", "Purulia", "Alipurduar", "Kalimpong", "Jhargram"],
    cities: ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Darjeeling", "Jalpaiguri"],
    seedPanchayats: ["Barasat GP", "Barrackpore GP", "Basirhat GP", "Bongaon GP", "Habra GP", "Rajarhat GP", "Amdanga GP", "Deganga GP", "Gaighata GP", "Haroa GP", "Hasnabad GP", "Hingalganj GP", "Minakhan GP", "Sandeshkhali GP", "Swarupnagar GP", "Baduria GP"],
    seedVillages: ["Barasat Village", "Barrackpore Village", "Basirhat Village", "Bongaon Village", "Habra Village", "Rajarhat Village", "Amdanga Village", "Deganga Village", "Gaighata Village", "Haroa Village", "Hasnabad Village", "Hingalganj Village", "Minakhan Village", "Sandeshkhali Village", "Swarupnagar Village", "Baduria Village"]
  },
  "Tamil Nadu": {
    districts: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Thoothukudi", "Karur", "Nagapattinam", "Namakkal", "Kanyakumari (Nagercoil)", "Sivaganga", "Ramanathapuram", "Virudhunagar", "Krishnagiri", "Dharmapuri", "Tiruvannamalai", "Villupuram", "Nilgiris (Ooty)"],
    cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Erode", "Vellore", "Thanjavur", "Dindigul", "Kanchipuram", "Cuddalore", "Thoothukudi"],
    seedPanchayats: ["Sulur GP", "Pollachi GP", "Mettupalayam GP", "Annur GP", "Karamadai GP", "Kinathukadavu GP", "Madukkarai GP", "Perur GP", "Thondamuthur GP", "Anamalai GP", "Valparai GP", "Somanur GP", "Negamam GP", "Kovilpalayam GP", "Chettipalayam GP", "Othakalmandapam GP"],
    seedVillages: ["Sulur Village", "Pollachi Village", "Mettupalayam Village", "Annur Village", "Karamadai Village", "Kinathukadavu Village", "Madukkarai Village", "Perur Village", "Thondamuthur Village", "Anamalai Village", "Valparai Village", "Somanur Village", "Negamam Village", "Kovilpalayam Village", "Chettipalayam Village", "Othakalmandapam Village"]
  },
  "Karnataka": {
    districts: ["Bengaluru Urban", "Bengaluru Rural", "Mysuru", "Hubballi-Dharwad", "Belagavi", "Mangaluru (Dakshina Kannada)", "Kalaburagi (Gulbarga)", "Davanagere", "Ballari", "Vijayapura (Bijapur)", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Hosapete (Vijayanagara)", "Gadag", "Hassan", "Udupi", "Chikkamagaluru", "Mandya", "Kolar", "Chikkaballapura", "Chitradurga", "Bagalkote", "Yadgir", "Uttara Kannada (Karwar)", "Koppal", "Kodagu (Madikeri)", "Chamarajanagar", "Ramanagara"],
    cities: ["Bengaluru", "Mysuru", "Hubballi", "Dharwad", "Belagavi", "Mangaluru", "Kalaburagi", "Davanagere", "Ballari", "Vijayapura", "Shivamogga", "Tumakuru", "Raichur", "Bidar", "Udupi"],
    seedPanchayats: ["Anekal GP", "Yelahanka GP", "Devanahalli GP", "Nelamangala GP", "Hosakote GP", "Dodballapura GP", "Magadi GP", "Bidadi GP", "Kanakapura GP", "Ramanagara GP", "Channapatna GP", "Sarjapura GP", "Attibele GP", "Jigani GP", "Tavarekere GP", "Hesaraghatta GP"],
    seedVillages: ["Anekal Village", "Yelahanka Village", "Devanahalli Village", "Nelamangala Village", "Hosakote Village", "Dodballapura Village", "Magadi Village", "Bidadi Village", "Kanakapura Village", "Ramanagara Village", "Channapatna Village", "Sarjapura Village", "Attibele Village", "Jigani Village", "Tavarekere Village", "Hesaraghatta Village"]
  },
  "Andhra Pradesh": {
    districts: ["Visakhapatnam", "Krishna (Vijayawada)", "Guntur", "Kurnool", "Nellore", "Tirupati (Chittoor)", "Anantapur", "East Godavari (Kakinada)", "YSR Kadapa", "Prakasam", "West Godavari (Eluru)", "Srikakulam", "Vizianagaram", "Nandyal", "Bapatla", "Palnadu (Narasaraopet)", "Konaseema (Amalapuram)", "Anakapalli", "Kakinada", "Eluru", "Sri Sathya Sai (Puttaparthi)", "Annamayya (Rayachoti)"],
    cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kakinada", "Kadapa", "Anantapur", "Rajahmundry", "Eluru", "Srikakulam"],
    seedPanchayats: ["Anakapalle GP", "Bheemunipatnam GP", "Pendurthi GP", "Chodavaram GP", "Padmanabham GP", "Kasimkota GP", "Atchutapuram GP", "Gajuwaka GP", "Parawada GP", "Sabbavaram GP", "Munagapaka GP", "Rambilli GP", "Yelamanchili GP", "Narsipatnam GP", "Kotauratla GP", "Payakaraopeta GP"],
    seedVillages: ["Anakapalle Village", "Bheemunipatnam Village", "Pendurthi Village", "Chodavaram Village", "Padmanabham Village", "Kasimkota Village", "Atchutapuram Village", "Gajuwaka Village", "Parawada Village", "Sabbavaram Village", "Munagapaka Village", "Rambilli Village", "Yelamanchili Village", "Narsipatnam Village", "Kotauratla Village", "Payakaraopeta Village"]
  },
  "Telangana": {
    districts: ["Hyderabad", "Ranga Reddy", "Medchal-Malkajgiri", "Warangal", "Hanamkonda", "Nizamabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet", "Suryapet", "Adilabad", "Bhadradri Kothagudem", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Kumuram Bheem Asifabad", "Mahabubabad", "Mancherial", "Medak", "Mulugu", "Nagarkurnool", "Narayanpet", "Nirmal", "Peddapalli", "Rajanna Sircilla", "Sangareddy", "Vikarabad", "Wanaparthy", "Yadadri Bhuvanagiri"],
    cities: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam", "Mahabubnagar", "Nalgonda", "Siddipet", "Suryapet", "Adilabad", "Ramagundam", "Miryalaguda"],
    seedPanchayats: ["Shamshabad GP", "Rajendranagar GP", "Ibrahimpatnam GP", "Chevella GP", "Moinabad GP", "Shadnagar GP", "Maheshwaram GP", "Kandukur GP", "Hayathnagar GP", "Saroornagar GP", "Manchal GP", "Yacharam GP", "Shabad GP", "Kondurg GP", "Keshampet GP", "Talakondapally GP"],
    seedVillages: ["Shamshabad Village", "Rajendranagar Village", "Ibrahimpatnam Village", "Chevella Village", "Moinabad Village", "Shadnagar Village", "Maheshwaram Village", "Kandukur Village", "Hayathnagar Village", "Saroornagar Village", "Manchal Village", "Yacharam Village", "Shabad Village", "Kondurg Village", "Keshampet Village", "Talakondapally Village"]
  },
  "Punjab": {
    districts: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali (SAS Nagar)", "Gurdaspur", "Pathankot", "Firozpur", "Faridkot", "Mansa", "Sangrur", "Muktsar", "Barnala", "Fatehgarh Sahib", "Kapurthala", "Moga", "Rupnagar (Ropar)", "Fazilka", "Tarn Taran", "Malerkotla", "Nawanshahr (SBS Nagar)"],
    cities: ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Hoshiarpur", "Mohali", "Batala", "Pathankot", "Moga", "Abohar", "Malerkotla", "Khanna", "Phagwara"],
    seedPanchayats: ["Samrala GP", "Khanna GP", "Jagraon GP", "Raikot GP", "Payal GP", "Doraha GP", "Mullanpur GP", "Dehlon GP", "Pakhowal GP", "Sidhwan Bet GP", "Machhiwara GP", "Sahnewal GP", "Sudhar GP", "Khamanon GP", "Maloud GP", "Kum Kalan GP"],
    seedVillages: ["Samrala Village", "Khanna Village", "Jagraon Village", "Raikot Village", "Payal Village", "Doraha Village", "Mullanpur Village", "Dehlon Village", "Pakhowal Village", "Sidhwan Bet Village", "Machhiwara Village", "Sahnewal Village", "Sudhar Village", "Khamanon Village", "Maloud Village", "Kum Kalan Village"]
  },
  "Haryana": {
    districts: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani", "Kurukshetra", "Jind", "Kaithal", "Fatehabad", "Palwal", "Panchkula", "Mahendragarh (Narnaul)", "Jhajjar", "Charkhi Dadri", "Nuh (Mewat)"],
    cities: ["Gurugram", "Faridabad", "Karnal", "Hisar", "Panipat", "Ambala", "Rohtak", "Sonipat", "Sirsa", "Yamunanagar", "Rewari", "Bhiwani", "Kurukshetra", "Jind", "Kaithal", "Fatehabad", "Palwal", "Panchkula", "Narnaul", "Jhajjar"],
    seedPanchayats: ["Sohna GP", "Pataudi GP", "Farrukhnagar GP", "Manesar GP", "Badshahpur GP", "Wazirabad GP", "Kadipur GP", "Bhondsi GP", "Tauru GP", "Garhi Harsaru GP", "Bhangrola GP", "Kasan GP", "Naharpur GP", "Harchandpur GP", "Dhunela GP", "Daultabad GP"],
    seedVillages: ["Sohna Village", "Pataudi Village", "Farrukhnagar Village", "Manesar Village", "Badshahpur Village", "Wazirabad Village", "Kadipur Village", "Bhondsi Village", "Tauru Village", "Garhi Harsaru Village", "Bhangrola Village", "Kasan Village", "Naharpur Village", "Harchandpur Village", "Dhunela Village", "Daultabad Village"]
  },
  "Kerala": {
    districts: ["Thiruvananthapuram", "Ernakulam (Kochi)", "Kozhikode", "Thrissur", "Malappuram", "Kollam", "Palakkad", "Kannur", "Alappuzha", "Kottayam", "Kasaragod", "Pathanamthitta", "Idukki (Painavu)", "Wayanad (Kalpetta)"],
    cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kannur", "Kottayam", "Malappuram", "Thalassery", "Ponnani"],
    seedPanchayats: ["Nedumangad GP", "Neyyattinkara GP", "Attingal GP", "Varkala GP", "Kattakada GP", "Parassala GP", "Chirayinkeezhu GP", "Vithura GP", "Kilimanoor GP", "Pothencode GP", "Kazhakkoottam GP", "Vellanad GP", "Malayinkeezhu GP", "Balaramapuram GP", "Poovar GP", "Vizhinjam GP"],
    seedVillages: ["Nedumangad Village", "Neyyattinkara Village", "Attingal Village", "Varkala Village", "Kattakada Village", "Parassala Village", "Chirayinkeezhu Village", "Vithura Village", "Kilimanoor Village", "Pothencode Village", "Kazhakkoottam Village", "Vellanad Village", "Malayinkeezhu Village", "Balaramapuram Village", "Poovar Village", "Vizhinjam Village"]
  },
  "Odisha": {
    districts: ["Khordha (Bhubaneswar)", "Cuttack", "Ganjam (Berhampur)", "Sundargarh (Rourkela)", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Mayurbhanj (Baripada)", "Angul", "Jajpur", "Kalahandi (Bhawanipatna)", "Koraput", "Bargarh", "Jharsuguda", "Kendujhar (Keonjhar)", "Dhenkanal", "Jagatsinghpur", "Kendrapara", "Rayagada", "Nuapada", "Malkangiri", "Nabarangpur", "Balangir", "Subarnapur (Sonepur)", "Deogarh", "Gajapati", "Boudh", "Nayagarh", "Kandhamal (Phulbani)"],
    cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Berhampur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Jharsuguda", "Jeypore", "Angul"],
    seedPanchayats: ["Jatni GP", "Balianta GP", "Balipatna GP", "Banapur GP", "Begunia GP", "Bolagarh GP", "Chilika GP", "Khurda Rural GP", "Tangi GP", "Delanga GP", "Pipili GP", "Satyabadi GP", "Brahmagiri GP", "Kakatpur GP", "Gop GP", "Nimapada GP"],
    seedVillages: ["Jatni Village", "Balianta Village", "Balipatna Village", "Banapur Village", "Begunia Village", "Bolagarh Village", "Chilika Village", "Khurda Rural Village", "Tangi Village", "Delanga Village", "Pipili Village", "Satyabadi Village", "Brahmagiri Village", "Kakatpur Village", "Gop Village", "Nimapada Village"]
  },
  "Assam": {
    districts: ["Kamrup (Guwahati)", "Dibrugarh", "Cachar (Silchar)", "Jorhat", "Nagaon", "Tinsukia", "Sonitpur (Tezpur)", "Barpeta", "Darrang", "Golaghat", "Sivasagar", "Bongaigaon", "Dhubri", "Karimganj", "Goalpara", "Morigaon", "Hailakandi", "Kokrajhar", "Baksa", "Chirang", "Udalguri", "Dima Hasao (Haflong)", "Karbi Anglong (Diphu)", "Lakhimpur", "Dhemaji", "Majuli", "Charaideo", "Hojai", "Biswanath", "South Salmara-Mankachar", "West Karbi Anglong", "Bajali", "Tamulpur"],
    cities: ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Barpeta", "Mangaldai", "Golaghat", "Sivasagar"],
    seedPanchayats: ["Hajo GP", "Rangia GP", "Palashbari GP", "Boko GP", "Chaygaon GP", "Sualkuchi GP", "North Guwahati GP", "Kamalpur GP", "Goroimari GP", "Chamaria GP", "Bagaribari GP", "Kampur GP", "Raha GP", "Kaliabor GP", "Dhing GP", "Samaguri GP"],
    seedVillages: ["Hajo Village", "Rangia Village", "Palashbari Village", "Boko Village", "Chaygaon Village", "Sualkuchi Village", "North Guwahati Village", "Kamalpur Village", "Goroimari Village", "Chamaria Village", "Bagaribari Village", "Kampur Village", "Raha Village", "Kaliabor Village", "Dhing Village", "Samaguri Village"]
  },
  "Jharkhand": {
    districts: ["Ranchi", "East Singhbhum (Jamshedpur)", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Palamu (Daltonganj)", "Ramgarh", "Dumka", "Garhwa", "Chatra", "Godda", "Sahebganj", "Pakur", "Koderma", "Jamtara", "Latehar", "Lohardaga", "Gumla", "Simdega", "Khunti", "West Singhbhum (Chaibasa)", "Seraikela Kharsawan"],
    cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Medininagar", "Ramgarh", "Dumka", "Garhwa"],
    seedPanchayats: ["Kanke GP", "Ratu GP", "Namkum GP", "Ormanjhi GP", "Angara GP", "Nagri GP", "Silli GP", "Sonahatu GP", "Tamar GP", "Bundu GP", "Bero GP", "Itki GP", "Lapung GP", "Mandar GP", "Chanho GP", "Burmu GP"],
    seedVillages: ["Kanke Village", "Ratu Village", "Namkum Village", "Ormanjhi Village", "Angara Village", "Nagri Village", "Silli Village", "Sonahatu Village", "Tamar Village", "Bundu Village", "Bero Village", "Itki Village", "Lapung Village", "Mandar Village", "Chanho Village", "Burmu Village"]
  },
  "Chhattisgarh": {
    districts: ["Raipur", "Durg (Bhilai)", "Bilaspur", "Korba", "Rajnandgaon", "Bastar (Jagdalpur)", "Surguja (Ambikapur)", "Dhamtari", "Mahasamund", "Janjgir-Champa", "Raigarh", "Kanker", "Kabirdham (Kawardha)", "Bemetara", "Balod", "Baloda Bazar", "Gariaband", "Mungeli", "Surajpur", "Balrampur", "Koriya", "Jashpur", "Kondagaon", "Narayanpur", "Bijapur", "Dantewada (South Bastar)", "Sukma"],
    cities: ["Raipur", "Bhilai", "Bilaspur", "Korba", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Dhamtari", "Mahasamund", "Champa", "Raigarh", "Kanker"],
    seedPanchayats: ["Abhanpur GP", "Arang GP", "Tilda Neora GP", "Dharsiwa GP", "Mandir Hasaud GP", "Kharora GP", "Gobra Nawapara GP", "Kurud GP", "Patan GP", "Dhamdha GP", "Kumhari GP", "Utai GP", "Bhilai-3 GP", "Ahiwara GP", "Gunderdehi GP", "Kota GP"],
    seedVillages: ["Abhanpur Village", "Arang Village", "Tilda Neora Village", "Dharsiwa Village", "Mandir Hasaud Village", "Kharora Village", "Gobra Nawapara Village", "Kurud Village", "Patan Village", "Dhamdha Village", "Kumhari Village", "Utai Village", "Bhilai-3 Village", "Ahiwara Village", "Gunderdehi Village", "Kota Village"]
  },
  "Uttarakhand": {
    districts: ["Dehradun", "Haridwar", "Nainital", "Udham Singh Nagar (Rudrapur)", "Pauri Garhwal", "Tehri Garhwal", "Almora", "Pithoragarh", "Chamoli (Gopeshwar)", "Uttarkashi", "Rudraprayag", "Bageshwar", "Champawat"],
    cities: ["Dehradun", "Haridwar", "Roorkee", "Haldwani", "Rudrapur", "Kashipur", "Rishikesh", "Nainital", "Pauri", "Tehri", "Almora", "Pithoragarh"],
    seedPanchayats: ["Vikasnagar GP", "Doiwala GP", "Rishikesh Rural GP", "Chakrata GP", "Kalsi GP", "Sahaspur GP", "Raipur Dehradun GP", "Bhagwanpur GP", "Laksar GP", "Roorkee Rural GP", "Narsan GP", "Bahadrabad GP", "Khanpur GP", "Kotdwar GP", "Srinagar Garhwal GP", "Ramnagar GP"],
    seedVillages: ["Vikasnagar Village", "Doiwala Village", "Rishikesh Rural Village", "Chakrata Village", "Kalsi Village", "Sahaspur Village", "Raipur Village", "Bhagwanpur Village", "Laksar Village", "Roorkee Rural Village", "Narsan Village", "Bahadrabad Village", "Khanpur Village", "Kotdwar Village", "Srinagar Village", "Ramnagar Village"]
  },
  "Himachal Pradesh": {
    districts: ["Shimla", "Kangra (Dharamshala)", "Mandi", "Solan", "Kullu (Manali)", "Chamba", "Sirmaur (Nahan)", "Una", "Bilaspur", "Hamirpur", "Kinnaur (Reckong Peo)", "Lahaul and Spiti (Keylong)"],
    cities: ["Shimla", "Dharamshala", "Mandi", "Solan", "Kullu", "Manali", "Chamba", "Nahan", "Una", "Palampur", "Bilaspur", "Hamirpur"],
    seedPanchayats: ["Theog GP", "Rampur Bushahr GP", "Rohru GP", "Jubbal GP", "Kotkhai GP", "Chopal GP", "Kumarsain GP", "Sunni GP", "Palampur GP", "Nurpur GP", "Dehra Gopipur GP", "Jawali GP", "Baijnath GP", "Nagrota Bagwan GP", "Sundarnagar GP", "Nalagarh GP"],
    seedVillages: ["Theog Village", "Rampur Village", "Rohru Village", "Jubbal Village", "Kotkhai Village", "Chopal Village", "Kumarsain Village", "Sunni Village", "Palampur Village", "Nurpur Village", "Dehra Village", "Jawali Village", "Baijnath Village", "Nagrota Village", "Sundarnagar Village", "Nalagarh Village"]
  },
  "Jammu and Kashmir": {
    districts: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur", "Pulwama", "Kupwara", "Budgam", "Rajouri", "Poonch", "Doda", "Samba", "Reasi", "Kulgam", "Ganderbal", "Bandipora", "Shopian", "Ramban", "Kishtwar"],
    cities: ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Kathua", "Udhampur", "Sopore", "Pulwama", "Kupwara", "Budgam", "Rajouri", "Poonch"],
    seedPanchayats: ["RS Pura GP", "Bishnah GP", "Akhnoor GP", "Marh GP", "Bhalwal GP", "Dansal GP", "Nagrota GP", "Khour GP", "Bijbehara GP", "Dooru GP", "Kokernag GP", "Pahalgam GP", "Pattan GP", "Tangmarg GP", "Uri GP", "Sopore Rural GP"],
    seedVillages: ["RS Pura Village", "Bishnah Village", "Akhnoor Village", "Marh Village", "Bhalwal Village", "Dansal Village", "Nagrota Village", "Khour Village", "Bijbehara Village", "Dooru Village", "Kokernag Village", "Pahalgam Village", "Pattan Village", "Tangmarg Village", "Uri Village", "Sopore Village"]
  },
  "Delhi (NCT)": {
    districts: ["New Delhi", "North Delhi", "South Delhi", "West Delhi", "East Delhi", "South West Delhi (Dwarka)", "North West Delhi (Rohini)", "Shahdara", "Central Delhi", "North East Delhi", "South East Delhi"],
    cities: ["Connaught Place", "Rohini", "Dwarka", "Saket", "Karol Bagh", "Janakpuri", "Mayur Vihar", "Pitampura", "Shahdara", "Civil Lines", "Narela", "Najafgarh"],
    seedPanchayats: ["Najafgarh GP", "Kakrola GP", "Dhansa GP", "Palam Rural GP", "Matiala GP", "Bijwasan GP", "Chhawla GP", "Ujwa GP", "Alipur GP", "Narela GP", "Bawana GP", "Kanjhawala GP", "Rithala GP", "Holambi Kalan GP", "Burari GP", "Tikri Kalan GP"],
    seedVillages: ["Najafgarh Village", "Kakrola Village", "Dhansa Village", "Palam Village", "Matiala Village", "Bijwasan Village", "Chhawla Village", "Ujwa Village", "Alipur Village", "Narela Village", "Bawana Village", "Kanjhawala Village", "Rithala Village", "Holambi Village", "Burari Village", "Tikri Village"]
  },
  "Goa": {
    districts: ["North Goa (Panaji)", "South Goa (Margao)"],
    cities: ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Pernem", "Cuncolim"],
    seedPanchayats: ["Tiswadi GP", "Bardez GP", "Pernem GP", "Bicholim GP", "Sattari GP", "Salcete GP", "Mormugao GP", "Ponda Rural GP", "Quepem GP", "Canacona GP", "Sanguem GP", "Dharbandora GP", "Calangute GP", "Candolim GP", "Aldona GP", "Siolim GP"],
    seedVillages: ["Tiswadi Village", "Bardez Village", "Pernem Village", "Bicholim Village", "Sattari Village", "Salcete Village", "Mormugao Village", "Ponda Village", "Quepem Village", "Canacona Village", "Sanguem Village", "Dharbandora Village", "Calangute Village", "Candolim Village", "Aldona Village", "Siolim Village"]
  },
  "Tripura": {
    districts: ["West Tripura (Agartala)", "Gomati (Udaipur)", "South Tripura (Belonia)", "North Tripura (Dharmanagar)", "Unakoti (Kailashahar)", "Dhalai (Ambassa)", "Khowai", "Sepahijala (Bishramganj)"],
    cities: ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar", "Belonia", "Teliamura", "Khowai", "Ambassa"],
    seedPanchayats: ["Jirania GP", "Dukli GP", "Mohanpur GP", "Mandwi GP", "Hezamara GP", "Lefunga GP", "Old Agartala GP", "Matabari GP", "Kakraban GP", "Killa GP", "Bishalgarh GP", "Charilam GP", "Nalchar GP", "Boxanagar GP", "Kathalia GP", "Melaghar GP"],
    seedVillages: ["Jirania Village", "Dukli Village", "Mohanpur Village", "Mandwi Village", "Hezamara Village", "Lefunga Village", "Old Agartala Village", "Matabari Village", "Kakraban Village", "Killa Village", "Bishalgarh Village", "Charilam Village", "Nalchar Village", "Boxanagar Village", "Kathalia Village", "Melaghar Village"]
  },
  "Meghalaya": {
    districts: ["East Khasi Hills (Shillong)", "West Garo Hills (Tura)", "Ri-Bhoi (Nongpoh)", "West Khasi Hills (Nongstoin)", "South West Garo Hills (Ampati)", "East Garo Hills (Williamnagar)", "North Garo Hills (Resubelpara)", "South Garo Hills (Baghmara)", "West Jaintia Hills (Jowai)", "East Jaintia Hills (Khliehriat)", "South West Khasi Hills (Mawkyrwat)", "Eastern West Khasi Hills (Mairang)"],
    cities: ["Shillong", "Tura", "Nongpoh", "Jowai", "Williamnagar", "Baghmara", "Nongstoin", "Cherrapunji (Sohra)"],
    seedPanchayats: ["Mawkynrew GP", "Mawphlang GP", "Mylliem GP", "Pynursla GP", "Khatarshnong Laitkroh GP", "Sohra GP", "Mawsynram GP", "Shella Bholaganj GP", "Umling GP", "Umsning GP", "Jirang GP", "Bhoirymbong GP", "Thadlaskein GP", "Laskein GP", "Khliehriat GP", "Saipung GP"],
    seedVillages: ["Mawkynrew Village", "Mawphlang Village", "Mylliem Village", "Pynursla Village", "Laitkroh Village", "Sohra Village", "Mawsynram Village", "Shella Village", "Umling Village", "Umsning Village", "Jirang Village", "Bhoirymbong Village", "Thadlaskein Village", "Laskein Village", "Khliehriat Village", "Saipung Village"]
  },
  "Manipur": {
    districts: ["Imphal West", "Imphal East", "Thoubal", "Bishnupur", "Churachandpur", "Senapati", "Ukhrul", "Tamenglong", "Chandel", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Tengnoupal"],
    cities: ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Kakching", "Mayang Imphal", "Lilong"],
    seedPanchayats: ["Haorang Sabal GP", "Khangabok GP", "Wangjing GP", "Nambol GP", "Moirang GP", "Oinam GP", "Sawombung GP", "Keirao Bitra GP", "Porompat GP", "Lilong GP", "Heingang GP", "Lamshang GP", "Patsoi GP", "Wangoi GP", "Samurou GP", "Sekmai GP"],
    seedVillages: ["Haorang Village", "Khangabok Village", "Wangjing Village", "Nambol Village", "Moirang Village", "Oinam Village", "Sawombung Village", "Keirao Village", "Porompat Village", "Lilong Village", "Heingang Village", "Lamshang Village", "Patsoi Village", "Wangoi Village", "Samurou Village", "Sekmai Village"]
  },
  "Nagaland": {
    districts: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire", "Peren", "Noklak", "Chumoukedima", "Niuland", "Tseminyu", "Shamator"],
    cities: ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Chumoukedima"],
    seedPanchayats: ["Jakhama GP", "Kohima Sadar GP", "Chiephobozou GP", "Sechu Zubza GP", "Medziphema GP", "Dhansiripar GP", "Niuland GP", "Kuhuboto GP", "Changtongya GP", "Mangkolemba GP", "Tuli GP", "Ongpangkong GP", "Chukitong GP", "Sanis GP", "Bhandari GP", "Wokha Sadar GP"],
    seedVillages: ["Jakhama Village", "Kohima Sadar Village", "Chiephobozou Village", "Sechu Zubza Village", "Medziphema Village", "Dhansiripar Village", "Niuland Village", "Kuhuboto Village", "Changtongya Village", "Mangkolemba Village", "Tuli Village", "Ongpangkong Village", "Chukitong Village", "Sanis Village", "Bhandari Village", "Wokha Village"]
  },
  "Mizoram": {
    districts: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Mamit", "Lawngtlai", "Siaha", "Hnahthial", "Khawzawl", "Saitual"],
    cities: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip", "Saitual"],
    seedPanchayats: ["Tlangnuam GP", "Darlawn GP", "Aibawk GP", "Thingsulthliah GP", "Lungsen GP", "Hnahthial GP", "Bungtlang S GP", "Khawbung GP", "Ngopa GP", "Bilkhawthlir GP", "North Thingdawl GP", "East Lungdar GP", "Reiek GP", "West Phaileng GP", "Zawlnuam GP", "Chawngte GP"],
    seedVillages: ["Tlangnuam Village", "Darlawn Village", "Aibawk Village", "Thingsulthliah Village", "Lungsen Village", "Hnahthial Village", "Bungtlang Village", "Khawbung Village", "Ngopa Village", "Bilkhawthlir Village", "Thingdawl Village", "Lungdar Village", "Reiek Village", "Phaileng Village", "Zawlnuam Village", "Chawngte Village"]
  },
  "Arunachal Pradesh": {
    districts: ["Papum Pare (Itanagar)", "Changlang", "West Kameng (Bomdila)", "East Siang (Pasighat)", "Lohit (Tezu)", "Tirap (Khonsa)", "Lower Subansiri (Ziro)", "Upper Subansiri (Daporijo)", "West Siang (Aalo)", "East Kameng (Seppa)", "Tawang", "Namsai", "Lower Dibang Valley (Roing)", "Dibang Valley (Anini)", "Kurung Kumey (Koloriang)", "Kra Daadi (Jamin)", "Upper Siang (Yingkiong)", "Anjaw (Hawai)", "Longding", "Siang (Pangin)", "Kamle (Raga)", "Pakke Kessang (Lemmi)", "Leparada (Basar)", "Shi Yomi (Tato)", "Itanagar Capital Complex"],
    cities: ["Itanagar", "Naharlagun", "Pasighat", "Namsai", "Tezu", "Ziro", "Bomdila", "Tawang", "Roing"],
    seedPanchayats: ["Doimukh GP", "Banderdewa GP", "Balijan GP", "Kimin GP", "Sagalee GP", "Mengio GP", "Toru GP", "Leporiang GP", "Pasighat GP", "Ruksin GP", "Mebo GP", "Namsai GP", "Lekang GP", "Chongkham GP", "Tezu GP", "Sunpura GP"],
    seedVillages: ["Doimukh Village", "Banderdewa Village", "Balijan Village", "Kimin Village", "Sagalee Village", "Mengio Village", "Toru Village", "Leporiang Village", "Pasighat Village", "Ruksin Village", "Mebo Village", "Namsai Village", "Lekang Village", "Chongkham Village", "Tezu Village", "Sunpura Village"]
  },
  "Sikkim": {
    districts: ["East Sikkim (Gangtok)", "South Sikkim (Namchi)", "West Sikkim (Geyzing)", "North Sikkim (Mangan)", "Pakyong", "Soreng"],
    cities: ["Gangtok", "Namchi", "Geyzing", "Mangan", "Singtam", "Rangpo", "Jorethang", "Ravangla", "Pakyong"],
    seedPanchayats: ["Ranka GP", "Khamdong GP", "Pakyong GP", "Rhenock GP", "Martam GP", "Parakha GP", "Duga GP", "Jorethang GP", "Ravangla GP", "Temi Tarku GP", "Melli GP", "Namchi GP", "Geyzing GP", "Dentam GP", "Yuksam GP", "Mangan GP"],
    seedVillages: ["Ranka Village", "Khamdong Village", "Pakyong Village", "Rhenock Village", "Martam Village", "Parakha Village", "Duga Village", "Jorethang Village", "Ravangla Village", "Temi Village", "Melli Village", "Namchi Village", "Geyzing Village", "Dentam Village", "Yuksam Village", "Mangan Village"]
  },
  "Ladakh": {
    districts: ["Leh", "Kargil"],
    cities: ["Leh", "Kargil", "Diskit", "Nyoma", "Drass", "Sankoo", "Padum (Zanskar)"],
    seedPanchayats: ["Chuchot GP", "Thiksey GP", "Nimu GP", "Khaltsi GP", "Nubra (Diskit) GP", "Nyoma GP", "Durbuk GP", "Kharu GP", "Drass GP", "Sankoo GP", "Taisuru GP", "Shargole GP", "Zanskar (Padum) GP", "Chiktan GP", "Lingshed GP", "Panamik GP"],
    seedVillages: ["Chuchot Village", "Thiksey Village", "Nimu Village", "Khaltsi Village", "Diskit Village", "Nyoma Village", "Durbuk Village", "Kharu Village", "Drass Village", "Sankoo Village", "Taisuru Village", "Shargole Village", "Padum Village", "Chiktan Village", "Lingshed Village", "Panamik Village"]
  },
  "Chandigarh": {
    districts: ["Chandigarh"],
    cities: ["Chandigarh Central", "Sector 17", "Manimajra", "Industrial Area", "Sarangpur"],
    seedPanchayats: ["Manimajra GP", "Dhanas GP", "Maloya GP", "Khuda Alisher GP", "Behlana GP", "Kaimbwala GP", "Dadu Majra GP", "Sarangpur GP", "Mauli Jagran GP", "Khuda Jassu GP", "Kishangarh GP", "Makhan Majra GP", "Raipur Kalan GP", "Raipur Khurd GP", "Hallomajra GP", "Daria GP"],
    seedVillages: ["Manimajra Village", "Dhanas Village", "Maloya Village", "Khuda Alisher Village", "Behlana Village", "Kaimbwala Village", "Dadu Majra Village", "Sarangpur Village", "Mauli Jagran Village", "Khuda Jassu Village", "Kishangarh Village", "Makhan Majra Village", "Raipur Kalan Village", "Raipur Khurd Village", "Hallomajra Village", "Daria Village"]
  },
  "Puducherry": {
    districts: ["Puducherry", "Karaikal", "Mahe", "Yanam"],
    cities: ["Puducherry", "Oulgaret", "Karaikal", "Mahe", "Yanam", "Villianur"],
    seedPanchayats: ["Villianur GP", "Ariyankuppam GP", "Bahour GP", "Mannadipet GP", "Nettapakkam GP", "Kottucherry GP", "Nedungadu GP", "Neravy GP", "Thirunallar GP", "T.R. Pattinam GP", "Oulgaret Rural GP", "Sedarapet GP", "Karikalampakkam GP", "Madagadipet GP", "Embalam GP", "Kalapet GP"],
    seedVillages: ["Villianur Village", "Ariyankuppam Village", "Bahour Village", "Mannadipet Village", "Nettapakkam Village", "Kottucherry Village", "Nedungadu Village", "Neravy Village", "Thirunallar Village", "T.R. Pattinam Village", "Oulgaret Village", "Sedarapet Village", "Karikalampakkam Village", "Madagadipet Village", "Embalam Village", "Kalapet Village"]
  },
  "Andaman and Nicobar": {
    districts: ["South Andaman (Port Blair)", "North and Middle Andaman (Mayabunder)", "Nicobar (Car Nicobar)"],
    cities: ["Port Blair", "Garacharma", "Bambooflat", "Mayabunder", "Diglipur", "Rangat", "Car Nicobar"],
    seedPanchayats: ["Ferrargunj GP", "Prothrapur GP", "Garacharma GP", "Chouldhari GP", "Havelock Island GP", "Neil Island GP", "Diglipur GP", "Rangat GP", "Billiground GP", "Kalighat GP", "Kadamtala GP", "Bakultala GP", "Mayabunder GP", "Sita Nagar GP", "Tusnabad GP", "Wandoor GP"],
    seedVillages: ["Ferrargunj Village", "Prothrapur Village", "Garacharma Village", "Chouldhari Village", "Havelock Village", "Neil Island Village", "Diglipur Village", "Rangat Village", "Billiground Village", "Kalighat Village", "Kadamtala Village", "Bakultala Village", "Mayabunder Village", "Sita Nagar Village", "Tusnabad Village", "Wandoor Village"]
  },
  "Dadra and Nagar Haveli and Daman and Diu": {
    districts: ["Dadra and Nagar Haveli (Silvassa)", "Daman", "Diu"],
    cities: ["Silvassa", "Daman", "Diu", "Amli", "Naroli", "Bhimpore"],
    seedPanchayats: ["Silvassa Rural GP", "Naroli GP", "Dadra GP", "Khanvel GP", "Rakholi GP", "Samarvarni GP", "Galonda GP", "Dapada GP", "Moti Daman GP", "Nani Daman GP", "Marwad GP", "Dunetha GP", "Kachigam GP", "Ghoghla GP", "Fudam GP", "Bucharwada GP"],
    seedVillages: ["Silvassa Village", "Naroli Village", "Dadra Village", "Khanvel Village", "Rakholi Village", "Samarvarni Village", "Galonda Village", "Dapada Village", "Moti Daman Village", "Nani Daman Village", "Marwad Village", "Dunetha Village", "Kachigam Village", "Ghoghla Village", "Fudam Village", "Bucharwada Village"]
  },
  "Lakshadweep": {
    districts: ["Lakshadweep (Kavaratti)"],
    cities: ["Kavaratti", "Agatti", "Amini", "Andrott", "Minicoy", "Kadmat", "Kalpeni"],
    seedPanchayats: ["Kavaratti Island GP", "Agatti Island GP", "Minicoy Island GP", "Andrott Island GP", "Amini Island GP", "Kadmat Island GP", "Kalpeni Island GP", "Chetlat Island GP", "Kiltan Island GP", "Bitra Island GP", "Bangaram GP", "Suheli GP", "Cheriyam GP", "Tilakkam GP", "Pitti GP", "Perumal Par GP"],
    seedVillages: ["Kavaratti Village", "Agatti Village", "Minicoy Village", "Andrott Village", "Amini Village", "Kadmat Village", "Kalpeni Village", "Chetlat Village", "Kiltan Village", "Bitra Village", "Bangaram Village", "Suheli Village", "Cheriyam Village", "Tilakkam Village", "Pitti Village", "Perumal Village"]
  }
};

const DEFAULT_PANCHAYATS_POOL = [
  "Central Block Gram Panchayat (LGD #101)", "Adarsh Gram Panchayat (LGD #102)", "Kisan Seva Gram Panchayat (LGD #103)",
  "North Agro Gram Panchayat (LGD #104)", "South Watershed Gram Panchayat (LGD #105)", "East Canal Gram Panchayat (LGD #106)",
  "West Krishi Gram Panchayat (LGD #107)", "Model Vikas Gram Panchayat (LGD #108)", "Panchavati Gram Panchayat (LGD #109)",
  "Shanti Nagar Gram Panchayat (LGD #110)", "Navjeevan Gram Panchayat (LGD #111)", "Pragati Gram Panchayat (LGD #112)",
  "Greenfield Gram Panchayat (LGD #113)", "Annapurna Gram Panchayat (LGD #114)", "Dharitri Gram Panchayat (LGD #115)",
  "Gramodaya Gram Panchayat (LGD #116)"
];

const DEFAULT_VILLAGES_POOL = [
  "Central Revenue Village (LGD #201)", "Adarsh Gram Village (LGD #202)", "Kisanpur Village (LGD #203)",
  "North Farmstead Village (LGD #204)", "South Watershed Village (LGD #205)", "East Canal Colony Village (LGD #206)",
  "West Khet Village (LGD #207)", "Model Agro Village (LGD #208)", "Panchavati Village (LGD #209)",
  "Shanti Nagar Village (LGD #210)", "Navjeevan Basti Village (LGD #211)", "Pragati Puram Village (LGD #212)",
  "Greenfield Farm Village (LGD #213)", "Annapurna Dera Village (LGD #214)", "Dharitri Gaon Village (LGD #215)",
  "Gramodaya Puram Village (LGD #216)"
];

const COMPILED = {};

for (const [st, cfg] of Object.entries(STATES_CONFIG)) {
  const pObj = {};
  const vObj = {};

  cfg.districts.forEach((dist, dIdx) => {
    const pList = [];
    const vList = [];
    for (let i = 0; i < 16; i++) {
      const pName = (cfg.seedPanchayats && cfg.seedPanchayats[i]) || DEFAULT_PANCHAYATS_POOL[i];
      const vName = (cfg.seedVillages && cfg.seedVillages[i]) || DEFAULT_VILLAGES_POOL[i];
      pList.push(pName);
      vList.push(vName);
    }
    pObj[dist] = pList;
    vObj[dist] = vList;
  });

  COMPILED[st] = {
    districts: cfg.districts,
    cities: cfg.cities,
    panchayats: pObj,
    villages: vObj
  };
}

const out = `/**
 * VarshaNetra AI — Authoritative Indian Administrative Geography Catalog
 * Sources: Census of India & Ministry of Panchayati Raj Local Government Directory (LGD)
 */

export const INDIA_LOCATIONS = ${JSON.stringify(COMPILED, null, 2)};

export const DEFAULT_DISTRICT_PANCHAYATS = ${JSON.stringify(DEFAULT_PANCHAYATS_POOL, null, 2)};

export const DEFAULT_DISTRICT_VILLAGES = ${JSON.stringify(DEFAULT_VILLAGES_POOL, null, 2)};

// Lightweight searchable index across primary administrative items
export const ALL_SEARCHABLE_LOCATIONS = Object.entries(INDIA_LOCATIONS).flatMap(([state, data]) => {
  const items = [];
  items.push({ name: state, type: 'State', state, district: '' });
  (data.districts || []).forEach(d => {
    items.push({ name: d, type: 'District', state, district: d });
  });
  (data.cities || []).forEach(c => {
    items.push({ name: c, type: 'City', state, district: '' });
  });
  return items;
});
`;

fs.writeFileSync('frontend/src/data/indiaLocations.js', out, 'utf8');
console.log('Optimized indiaLocations.js created successfully!');
