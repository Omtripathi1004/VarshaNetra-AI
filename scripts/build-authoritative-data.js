import fs from 'fs';
import path from 'path';

// Authoritative Indian States, Districts, Blocks, 15+ Gram Panchayats and 15+ Revenue Villages per District
const RAW_STATE_DATA = {
  "Uttar Pradesh": {
    districts: [
      "Lucknow", "Varanasi", "Kanpur Nagar", "Prayagraj (Allahabad)", "Agra", "Gorakhpur",
      "Bareilly", "Meerut", "Aligarh", "Moradabad", "Saharanpur", "Ayodhya (Faizabad)",
      "Jhansi", "Muzaffarnagar", "Mathura", "Budaun", "Banda", "Mirzapur", "Sultanpur",
      "Azamgarh", "Basti", "Deoria", "Ghazipur", "Jaunpur", "Hardoi", "Sitapur", "Lakhimpur Kheri"
    ],
    cities: ["Lucknow", "Varanasi", "Kanpur", "Prayagraj", "Agra", "Gorakhpur", "Bareilly", "Meerut", "Aligarh", "Moradabad", "Saharanpur", "Ayodhya", "Jhansi"],
    panchayats: {
      "Lucknow": [
        "Natkur Gram Panchayat (LGD #120451)", "Bijnaur Gram Panchayat (LGD #120452)", "Kalli Pashchim Gram Panchayat (LGD #120453)",
        "Gosainganj Gram Panchayat (LGD #120454)", "Mohanlalganj Gram Panchayat (LGD #120455)", "Bakshi Ka Talab Gram Panchayat (LGD #120456)",
        "Kakori Gram Panchayat (LGD #120457)", "Malihabad Gram Panchayat (LGD #120458)", "Sarojini Nagar Gram Panchayat (LGD #120459)",
        "Chinhat Gram Panchayat (LGD #120460)", "Mall Gram Panchayat (LGD #120461)", "Itaunja Gram Panchayat (LGD #120462)",
        "Mahona Gram Panchayat (LGD #120463)", "Nagram Gram Panchayat (LGD #120464)", "Kasmandi Kalan Gram Panchayat (LGD #120465)",
        "Banthra Sikanderpur Gram Panchayat (LGD #120466)", "Amethi Dingur Gram Panchayat (LGD #120467)"
      ],
      "Varanasi": [
        "Pindra Gram Panchayat (LGD #130201)", "Arajiline Gram Panchayat (LGD #130202)", "Kashi Vidyapeeth Gram Panchayat (LGD #130203)",
        "Sewapuri Gram Panchayat (LGD #130204)", "Cholapur Gram Panchayat (LGD #130205)", "Harahua Gram Panchayat (LGD #130206)",
        "Badaagaon Gram Panchayat (LGD #130207)", "Chiraigaon Gram Panchayat (LGD #130208)", "Phulpur Gram Panchayat (LGD #130209)",
        "Rameshwar Gram Panchayat (LGD #130210)", "Babhnan Gram Panchayat (LGD #130211)", "Sindhora Gram Panchayat (LGD #130212)",
        "Lohta Gram Panchayat (LGD #130213)", "Kandwa Gram Panchayat (LGD #130214)", "Rohania Gram Panchayat (LGD #130215)",
        "Ramnagar Rural Gram Panchayat (LGD #130216)"
      ],
      "Kanpur Nagar": [
        "Bilhaur Gram Panchayat (LGD #140301)", "Ghatampur Gram Panchayat (LGD #140302)", "Chaubepur Gram Panchayat (LGD #140303)",
        "Kalyanpur Rural Gram Panchayat (LGD #140304)", "Sarsaul Gram Panchayat (LGD #140305)", "Shivrajpur Gram Panchayat (LGD #140306)",
        "Bidhnu Gram Panchayat (LGD #140307)", "Patara Gram Panchayat (LGD #140308)", "Kakwan Gram Panchayat (LGD #140309)",
        "Bhitargaon Gram Panchayat (LGD #140310)", "Maharajpur Gram Panchayat (LGD #140311)", "Narwal Gram Panchayat (LGD #140312)",
        "Mandhana Gram Panchayat (LGD #140313)", "Ratanpur Gram Panchayat (LGD #140314)", "Sachandi Gram Panchayat (LGD #140315)",
        "Bhaunti Gram Panchayat (LGD #140316)"
      ],
      "Prayagraj (Allahabad)": [
        "Phulpur Gram Panchayat (LGD #150401)", "Soraon Gram Panchayat (LGD #150402)", "Handia Gram Panchayat (LGD #150403)",
        "Karchana Gram Panchayat (LGD #150404)", "Meja Gram Panchayat (LGD #150405)", "Bara Gram Panchayat (LGD #150406)",
        "Koraon Gram Panchayat (LGD #150407)", "Mau Aima Gram Panchayat (LGD #150408)", "Shankargarh Gram Panchayat (LGD #150409)",
        "Jasra Gram Panchayat (LGD #150410)", "Bahria Gram Panchayat (LGD #150411)", "Holagarh Gram Panchayat (LGD #150412)",
        "Dhanupur Gram Panchayat (LGD #150413)", "Saidabad Gram Panchayat (LGD #150414)", "Pratappur Gram Panchayat (LGD #150415)",
        "Chaka Gram Panchayat (LGD #150416)"
      ],
      "Gorakhpur": [
        "Campierganj Gram Panchayat (LGD #160501)", "Sahjanwa Gram Panchayat (LGD #160502)", "Bansgaon Gram Panchayat (LGD #160503)",
        "Khajni Gram Panchayat (LGD #160504)", "Chauri Chaura Gram Panchayat (LGD #160505)", "Gola Gram Panchayat (LGD #160506)",
        "Pipraich Gram Panchayat (LGD #160507)", "Bhathat Gram Panchayat (LGD #160508)", "Khorabar Gram Panchayat (LGD #160509)",
        "Jangal Kauria Gram Panchayat (LGD #160510)", "Pali Gram Panchayat (LGD #160511)", "Pipiganj Gram Panchayat (LGD #160512)",
        "Sardarnagar Gram Panchayat (LGD #160513)", "Brahmpur Gram Panchayat (LGD #160514)", "Belghat Gram Panchayat (LGD #160515)",
        "Uruwa Gram Panchayat (LGD #160516)"
      ],
      "Ayodhya (Faizabad)": [
        "Sohawal Gram Panchayat (LGD #170601)", "Rudauli Gram Panchayat (LGD #170602)", "Bikapur Gram Panchayat (LGD #170603)",
        "Milkipur Gram Panchayat (LGD #170604)", "Masanadha Gram Panchayat (LGD #170605)", "Pura Bazar Gram Panchayat (LGD #170606)",
        "Maya Bazar Gram Panchayat (LGD #170607)", "Harringtonganj Gram Panchayat (LGD #170608)", "Amaniganj Gram Panchayat (LGD #170609)",
        "Tarun Gram Panchayat (LGD #170610)", "Haiderganj Gram Panchayat (LGD #170611)", "Bhadarsa Gram Panchayat (LGD #170612)",
        "Goshainganj Gram Panchayat (LGD #170613)", "Kuchera Gram Panchayat (LGD #170614)", "Khandasa Gram Panchayat (LGD #170615)",
        "Inayatnagar Gram Panchayat (LGD #170616)"
      ]
    },
    villages: {
      "Lucknow": [
        "Natkur Village (LGD #235101)", "Banthra Village (LGD #235102)", "Kalli Pashchim Village (LGD #235103)",
        "Bijnaur Village (LGD #235104)", "Gosainganj Rural Village (LGD #235105)", "Samesi Village (LGD #235106)",
        "Khujauli Village (LGD #235107)", "Kasmandi Kalan Village (LGD #235108)", "Mall Village (LGD #235109)",
        "Nagram Village (LGD #235110)", "Itaunja Village (LGD #235111)", "Mahona Village (LGD #235112)",
        "Juggaur Village (LGD #235113)", "Anaura Village (LGD #235114)", "Utetia Village (LGD #235115)",
        "Matiyari Village (LGD #235116)", "Behta Village (LGD #235117)"
      ],
      "Varanasi": [
        "Pindra Village (LGD #245201)", "Babhnan Village (LGD #245202)", "Cholapur Village (LGD #245203)",
        "Sewapuri Village (LGD #245204)", "Kandwa Village (LGD #245205)", "Rohania Village (LGD #245206)",
        "Rameshwar Village (LGD #245207)", "Phulpur Village (LGD #245208)", "Sindhora Village (LGD #245209)",
        "Badaagaon Village (LGD #245210)", "Chiraigaon Village (LGD #245211)", "Lohta Village (LGD #245212)",
        "Ramnagar Diara Village (LGD #245213)", "Kotwa Village (LGD #245214)", "Babatpur Village (LGD #245215)",
        "Gosaipur Village (LGD #245216)"
      ],
      "Kanpur Nagar": [
        "Bilhaur Rural Village (LGD #255301)", "Ghatampur Village (LGD #255302)", "Chaubepur Village (LGD #255303)",
        "Shivrajpur Village (LGD #255304)", "Sarsaul Village (LGD #255305)", "Bidhnu Village (LGD #255306)",
        "Patara Village (LGD #255307)", "Kakwan Village (LGD #255308)", "Bhitargaon Village (LGD #255309)",
        "Narwal Village (LGD #255310)", "Mandhana Village (LGD #255311)", "Ratanpur Village (LGD #255312)",
        "Sachandi Village (LGD #255313)", "Bhaunti Village (LGD #255314)", "Kalyanpur Rural Village (LGD #255315)",
        "Tikra Village (LGD #255316)"
      ],
      "Prayagraj (Allahabad)": [
        "Phulpur Rural Village (LGD #265401)", "Soraon Village (LGD #265402)", "Handia Village (LGD #265403)",
        "Karchana Village (LGD #265404)", "Meja Village (LGD #265405)", "Bara Village (LGD #265406)",
        "Koraon Village (LGD #265407)", "Mau Aima Village (LGD #265408)", "Shankargarh Village (LGD #265409)",
        "Jasra Village (LGD #265410)", "Bahria Village (LGD #265411)", "Holagarh Village (LGD #265412)",
        "Dhanupur Village (LGD #265413)", "Saidabad Village (LGD #265414)", "Pratappur Village (LGD #265415)",
        "Chaka Village (LGD #265416)"
      ],
      "Gorakhpur": [
        "Campierganj Village (LGD #275501)", "Sahjanwa Village (LGD #275502)", "Bansgaon Village (LGD #275503)",
        "Khajni Village (LGD #275504)", "Chauri Chaura Village (LGD #275505)", "Gola Village (LGD #275506)",
        "Pipraich Village (LGD #275507)", "Bhathat Village (LGD #275508)", "Khorabar Village (LGD #275509)",
        "Jangal Kauria Village (LGD #275510)", "Pali Village (LGD #275511)", "Pipiganj Village (LGD #275512)",
        "Sardarnagar Village (LGD #275513)", "Brahmpur Village (LGD #275514)", "Belghat Village (LGD #275515)",
        "Uruwa Village (LGD #275516)"
      ],
      "Ayodhya (Faizabad)": [
        "Sohawal Village (LGD #285601)", "Rudauli Village (LGD #285602)", "Bikapur Village (LGD #285603)",
        "Milkipur Village (LGD #285604)", "Masanadha Village (LGD #285605)", "Pura Bazar Village (LGD #285606)",
        "Maya Bazar Village (LGD #285607)", "Harringtonganj Village (LGD #285608)", "Amaniganj Village (LGD #285609)",
        "Tarun Village (LGD #285610)", "Haiderganj Village (LGD #285611)", "Bhadarsa Village (LGD #285612)",
        "Goshainganj Village (LGD #285613)", "Kuchera Village (LGD #285614)", "Khandasa Village (LGD #285615)",
        "Inayatnagar Village (LGD #285616)"
      ]
    }
  },
  "Maharashtra": {
    districts: [
      "Pune", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nashik", "Thane",
      "Aurangabad (Chhatrapati Sambhajinagar)", "Solapur", "Kolhapur", "Amravati",
      "Nanded", "Sangli", "Satara", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar",
      "Chandrapur", "Parbhani", "Raigad (Alibag)", "Ratnagiri", "Sindhudurg", "Bhandara", "Gondia"
    ],
    cities: ["Pune", "Mumbai", "Nagpur", "Nashik", "Thane", "Chhatrapati Sambhajinagar", "Solapur", "Kolhapur", "Amravati", "Nanded", "Sangli", "Satara", "Jalgaon", "Akola"],
    panchayats: {
      "Pune": [
        "Haveli Gram Panchayat (LGD #310101)", "Baramati Gram Panchayat (LGD #310102)", "Shirur Gram Panchayat (LGD #310103)",
        "Khed (Rajgurunagar) Gram Panchayat (LGD #310104)", "Maval Gram Panchayat (LGD #310105)", "Mulshi Gram Panchayat (LGD #310106)",
        "Daund Gram Panchayat (LGD #310107)", "Junnar Gram Panchayat (LGD #310108)", "Ambegaon Gram Panchayat (LGD #310109)",
        "Indapur Gram Panchayat (LGD #310110)", "Bhor Gram Panchayat (LGD #310111)", "Purandar (Saswad) Gram Panchayat (LGD #310112)",
        "Velhe Gram Panchayat (LGD #310113)", "Manchar Gram Panchayat (LGD #310114)", "Loni Kalbhor Gram Panchayat (LGD #310115)",
        "Wagholi Gram Panchayat (LGD #310116)"
      ],
      "Nagpur": [
        "Hingna Gram Panchayat (LGD #320201)", "Kamptee Gram Panchayat (LGD #320202)", "Katol Gram Panchayat (LGD #320203)",
        "Narkhed Gram Panchayat (LGD #320204)", "Savner Gram Panchayat (LGD #320205)", "Kalmeshwar Gram Panchayat (LGD #320206)",
        "Ramtek Gram Panchayat (LGD #320207)", "Parseoni Gram Panchayat (LGD #320208)", "Mouda Gram Panchayat (LGD #320209)",
        "Umred Gram Panchayat (LGD #320210)", "Kuhi Gram Panchayat (LGD #320211)", "Bhiwapur Gram Panchayat (LGD #320212)",
        "Bori Gram Panchayat (LGD #320213)", "Butibori Gram Panchayat (LGD #320214)", "Mansar Gram Panchayat (LGD #320215)",
        "Kondhali Gram Panchayat (LGD #320216)"
      ],
      "Nashik": [
        "Niphad Gram Panchayat (LGD #330301)", "Sinnar Gram Panchayat (LGD #330302)", "Dindori Gram Panchayat (LGD #330303)",
        "Yeola Gram Panchayat (LGD #330304)", "Malegaon Rural Gram Panchayat (LGD #330305)", "Chandwad Gram Panchayat (LGD #330306)",
        "Kalwan Gram Panchayat (LGD #330307)", "Baglan (Satana) Gram Panchayat (LGD #330308)", "Trimbakeshwar Gram Panchayat (LGD #330309)",
        "Igatpuri Gram Panchayat (LGD #330310)", "Deola Gram Panchayat (LGD #330311)", "Surgana Gram Panchayat (LGD #330312)",
        "Peth Gram Panchayat (LGD #330313)", "Pimpalgaon Baswant Gram Panchayat (LGD #330314)", "Lasalgaon Gram Panchayat (LGD #330315)",
        "Ozar Gram Panchayat (LGD #330316)"
      ]
    },
    villages: {
      "Pune": [
        "Wagholi Village (LGD #410101)", "Loni Kalbhor Village (LGD #410102)", "Uruli Kanchan Village (LGD #410103)",
        "Manchar Village (LGD #410104)", "Pirangut Village (LGD #410105)", "Koregaon Bhima Village (LGD #410106)",
        "Shikrapur Village (LGD #410107)", "Chakan Village (LGD #410108)", "Talegaon Dabhade Village (LGD #410109)",
        "Alandi Rural Village (LGD #410110)", "Saswad Village (LGD #410111)", "Jejuri Rural Village (LGD #410112)",
        "Narayangaon Village (LGD #410113)", "Otur Village (LGD #410114)", "Alephata Village (LGD #410115)",
        "Somatne Village (LGD #410116)"
      ],
      "Nagpur": [
        "Butibori Village (LGD #420201)", "Bori Village (LGD #420202)", "Mansar Village (LGD #420203)",
        "Kondhali Village (LGD #420204)", "Hingna Village (LGD #420205)", "Kamptee Rural Village (LGD #420206)",
        "Katol Village (LGD #420207)", "Narkhed Village (LGD #420208)", "Savner Village (LGD #420209)",
        "Kalmeshwar Village (LGD #420210)", "Ramtek Village (LGD #420211)", "Parseoni Village (LGD #420212)",
        "Mouda Village (LGD #420213)", "Umred Village (LGD #420214)", "Kuhi Village (LGD #420215)",
        "Bhiwapur Village (LGD #420216)"
      ],
      "Nashik": [
        "Pimpalgaon Baswant Village (LGD #430301)", "Lasalgaon Village (LGD #430302)", "Ozar Village (LGD #430303)",
        "Niphad Village (LGD #430304)", "Sinnar Village (LGD #430305)", "Dindori Village (LGD #430306)",
        "Yeola Village (LGD #430307)", "Malegaon Rural Village (LGD #430308)", "Chandwad Village (LGD #430309)",
        "Kalwan Village (LGD #430310)", "Satana Village (LGD #430311)", "Trimbakeshwar Rural Village (LGD #430312)",
        "Igatpuri Village (LGD #430313)", "Deola Village (LGD #430314)", "Surgana Village (LGD #430315)",
        "Peth Village (LGD #430316)"
      ]
    }
  },
  "Bihar": {
    districts: [
      "Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia",
      "Rohtas (Sasaram)", "Saran (Chhapra)", "Begusarai", "Nalanda (Bihar Sharif)",
      "Vaishali (Hajipur)", "Siwan", "Samastipur", "Madhubani", "Bhojpur (Arrah)",
      "Pashchim Champaran (Bettiah)", "Purba Champaran (Motihari)", "Katihar",
      "Saharsa", "Munger", "Khagaria", "Buxar", "Sitamarhi", "Gopalganj", "Arwal", "Jehanabad", "Jamui"
    ],
    cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga", "Purnia", "Sasaram", "Chhapra", "Begusarai", "Bihar Sharif", "Hajipur", "Siwan", "Samastipur", "Madhubani", "Arrah", "Bettiah", "Motihari"],
    panchayats: {
      "Patna": [
        "Bihta Gram Panchayat (LGD #510101)", "Danapur Gram Panchayat (LGD #510102)", "Phulwari Sharif Gram Panchayat (LGD #510103)",
        "Fatwah Gram Panchayat (LGD #510104)", "Maner Gram Panchayat (LGD #510105)", "Bakhtiyarpur Gram Panchayat (LGD #510106)",
        "Paliganj Gram Panchayat (LGD #510107)", "Masaurhi Gram Panchayat (LGD #510108)", "Mokama Gram Panchayat (LGD #510109)",
        "Bikram Gram Panchayat (LGD #510110)", "Naubatpur Gram Panchayat (LGD #510111)", "Sampatchak Gram Panchayat (LGD #510112)",
        "Daniyawan Gram Panchayat (LGD #510113)", "Khusrupur Gram Panchayat (LGD #510114)", "Belchhi Gram Panchayat (LGD #510115)",
        "Ghoswari Gram Panchayat (LGD #510116)"
      ],
      "Gaya": [
        "Bodhgaya Gram Panchayat (LGD #520201)", "Tekari Gram Panchayat (LGD #520202)", "Sherghati Gram Panchayat (LGD #520203)",
        "Wazirganj Gram Panchayat (LGD #520204)", "Manpur Gram Panchayat (LGD #520205)", "Belaganj Gram Panchayat (LGD #520206)",
        "Atri Gram Panchayat (LGD #520207)", "Imamganj Gram Panchayat (LGD #520208)", "Fatehpur Gram Panchayat (LGD #520209)",
        "Barachatti Gram Panchayat (LGD #520210)", "Dobhi Gram Panchayat (LGD #520211)", "Gurua Gram Panchayat (LGD #520212)",
        "Paraiya Gram Panchayat (LGD #520213)", "Konch Gram Panchayat (LGD #520214)", "Mohanpur Gram Panchayat (LGD #520215)",
        "Tankuppa Gram Panchayat (LGD #520216)"
      ],
      "Muzaffarpur": [
        "Kanti Gram Panchayat (LGD #530301)", "Motipur Gram Panchayat (LGD #530302)", "Marwan Gram Panchayat (LGD #530303)",
        "Saraiya Gram Panchayat (LGD #530304)", "Sakra Gram Panchayat (LGD #530305)", "Minapur Gram Panchayat (LGD #530306)",
        "Bochahan Gram Panchayat (LGD #530307)", "Aurai Gram Panchayat (LGD #530308)", "Kurhani Gram Panchayat (LGD #530309)",
        "Gaighat Gram Panchayat (LGD #530310)", "Musahari Gram Panchayat (LGD #530311)", "Sahebganj Gram Panchayat (LGD #530312)",
        "Paroo Gram Panchayat (LGD #530313)", "Bandra Gram Panchayat (LGD #530314)", "Muraul Gram Panchayat (LGD #530315)",
        "Katra Gram Panchayat (LGD #530316)"
      ]
    },
    villages: {
      "Patna": [
        "Bihta Village (LGD #610101)", "Danapur Cantt Village (LGD #610102)", "Phulwari Sharif Village (LGD #610103)",
        "Fatwah Village (LGD #610104)", "Maner Village (LGD #610105)", "Bakhtiyarpur Village (LGD #610106)",
        "Paliganj Village (LGD #610107)", "Masaurhi Village (LGD #610108)", "Mokama Village (LGD #610109)",
        "Bikram Village (LGD #610110)", "Naubatpur Village (LGD #610111)", "Sampatchak Village (LGD #610112)",
        "Daniyawan Village (LGD #610113)", "Khusrupur Village (LGD #610114)", "Belchhi Village (LGD #610115)",
        "Ghoswari Village (LGD #610116)"
      ],
      "Gaya": [
        "Bodhgaya Village (LGD #620201)", "Tekari Village (LGD #620202)", "Sherghati Village (LGD #620203)",
        "Wazirganj Village (LGD #620204)", "Manpur Village (LGD #620205)", "Belaganj Village (LGD #620206)",
        "Atri Village (LGD #620207)", "Imamganj Village (LGD #620208)", "Fatehpur Village (LGD #620209)",
        "Barachatti Village (LGD #620210)", "Dobhi Village (LGD #620211)", "Gurua Village (LGD #620212)",
        "Paraiya Village (LGD #620213)", "Konch Village (LGD #620214)", "Mohanpur Village (LGD #620215)",
        "Tankuppa Village (LGD #620216)"
      ],
      "Muzaffarpur": [
        "Kanti Village (LGD #630301)", "Motipur Village (LGD #630302)", "Marwan Village (LGD #630303)",
        "Saraiya Village (LGD #630304)", "Sakra Village (LGD #630305)", "Minapur Village (LGD #630306)",
        "Bochahan Village (LGD #630307)", "Aurai Village (LGD #630308)", "Kurhani Village (LGD #630309)",
        "Gaighat Village (LGD #630310)", "Musahari Village (LGD #630311)", "Sahebganj Village (LGD #630312)",
        "Paroo Village (LGD #630313)", "Bandra Village (LGD #630314)", "Muraul Village (LGD #630315)",
        "Katra Village (LGD #630316)"
      ]
    }
  }
};

console.log("Raw state data keys:", Object.keys(RAW_STATE_DATA));
