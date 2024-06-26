// Renders the breed selection menu based on the selected type of pet. Either cat or dog.
function handlePetTypeChange(srcHTML) {
  const petType = document.getElementById('type').value;
  const breedDiv = document.getElementById('breed-div');
  let breedInput = '<option value="">Select</option>';
  // Have a doesn't Matter option only if the function is called from find.html. Otherwise, show a mixed breed option
  breedInput +=
    srcHTML == 'find'
      ? '<option value="any">Doesn\'t Matter</option>'
      : '<option value="Mixed">Mixed</option>';
  const puppyKittenOption = document.getElementById('puppy-kitten');
  if (petType == 'Cat') {
    breedDiv.hidden = false;
    puppyKittenOption.innerHTML = 'Kitten';
    catBreeds.forEach(
      (cat) =>
        (breedInput += `<option value="${cat}">
        ${cat}
        </option>`)
    );
  } else if (petType == 'Dog') {
    breedDiv.hidden = false;
    puppyKittenOption.innerHTML = 'Puppy';
    dogBreeds.forEach(
      (dog) =>
        (breedInput += `<option value="${dog}">
          ${dog}
          </option>`)
    );
  } else {
    breedDiv.hidden = true;
    puppyKittenOption.innerHTML = 'Puppy/Kitten';
  }
  document.getElementById('breed').innerHTML = breedInput;
}

// List of cats and dogs breeds generated by OpenAI's ChatGPT
const dogBreeds = [
  'Affenpinscher',
  'Afghan Hound',
  'Airedale Terrier',
  'Akita',
  'Alaskan Malamute',
  'American Bulldog',
  'American Cocker Spaniel',
  'American Eskimo Dog',
  'American Foxhound',
  'American Pit Bull Terrier',
  'American Staffordshire Terrier',
  'American Water Spaniel',
  'Anatolian Shepherd Dog',
  'Australian Cattle Dog',
  'Australian Shepherd',
  'Australian Terrier',
  'Basenji',
  'Basset Hound',
  'Beagle',
  'Bearded Collie',
  'Bedlington Terrier',
  'Belgian Malinois',
  'Belgian Sheepdog',
  'Belgian Tervuren',
  'Bernese Mountain Dog',
  'Bichon Frise',
  'Black and Tan Coonhound',
  'Black Russian Terrier',
  'Bloodhound',
  'Border Collie',
  'Border Terrier',
  'Borzoi',
  'Boston Terrier',
  'Bouvier des Flandres',
  'Boxer',
  'Boykin Spaniel',
  'Briard',
  'Brittany',
  'Brussels Griffon',
  'Bull Terrier',
  'Bulldog',
  'Bullmastiff',
  'Cairn Terrier',
  'Canaan Dog',
  'Cane Corso',
  'Cardigan Welsh Corgi',
  'Cavalier King Charles Spaniel',
  'Chesapeake Bay Retriever',
  'Chihuahua',
  'Chinese Crested',
  'Chinese Shar-Pei',
  'Chow Chow',
  'Clumber Spaniel',
  'Cocker Spaniel',
  'Collie',
  'Coonhound',
  'Corgi',
  'Coton de Tulear',
  'Curly-Coated Retriever',
  'Dachshund',
  'Dalmatian',
  'Dandie Dinmont Terrier',
  'Doberman Pinscher',
  'Dogue de Bordeaux',
  'English Bulldog',
  'English Cocker Spaniel',
  'English Foxhound',
  'English Setter',
  'English Springer Spaniel',
  'English Toy Spaniel',
  'Entlebucher Mountain Dog',
  'Eskimo Dog',
  'Field Spaniel',
  'Finnish Lapphund',
  'Finnish Spitz',
  'Flat-Coated Retriever',
  'French Bulldog',
  'German Pinscher',
  'German Shepherd Dog',
  'German Shorthaired Pointer',
  'German Wirehaired Pointer',
  'Giant Schnauzer',
  'Glen of Imaal Terrier',
  'Golden Retriever',
  'Gordon Setter',
  'Great Dane',
  'Great Pyrenees',
  'Greater Swiss Mountain Dog',
  'Greyhound',
  'Harrier',
  'Havanese',
  'Ibizan Hound',
  'Icelandic Sheepdog',
  'Irish Setter',
  'Irish Terrier',
  'Irish Water Spaniel',
  'Irish Wolfhound',
  'Italian Greyhound',
  'Jack Russell Terrier',
  'Japanese Chin',
  'Japanese Spitz',
  'Japanese Terrier',
  'Kai Ken',
  'Karelian Bear Dog',
  'Keeshond',
  'Kerry Blue Terrier',
  'King Charles Spaniel',
  'Komondor',
  'Kuvasz',
  'Labrador Retriever',
  'Lakeland Terrier',
  'Lancashire Heeler',
  'Leonberger',
  'Lhasa Apso',
  'Lowchen',
  'Maltese',
  'Manchester Terrier',
  'Mastiff',
  'Miniature Bull Terrier',
  'Miniature Pinscher',
  'Miniature Schnauzer',
  'Neapolitan Mastiff',
  'Newfoundland',
  'Norfolk Terrier',
  'Norwegian Buhund',
  'Norwegian Elkhound',
  'Norwich Terrier',
  'Nova Scotia Duck Tolling Retriever',
  'Old English Sheepdog',
  'Otterhound',
  'Papillon',
  'Parson Russell Terrier',
  'Pekingese',
  'Pembroke Welsh Corgi',
  'Petit Basset Griffon Vendeen',
  'Pharaoh Hound',
  'Plott',
  'Pointer',
  'Polish Lowland Sheepdog',
  'Pomeranian',
  'Poodle',
  'Portuguese Water Dog',
  'Pug',
  'Puli',
  'Pumi',
  'Pyrenean Shepherd',
  'Rat Terrier',
  'Redbone Coonhound',
  'Rhodesian Ridgeback',
  'Rottweiler',
  'Saint Bernard',
  'Saluki',
  'Samoyed',
  'Schipperke',
  'Scottish Deerhound',
  'Scottish Terrier',
  'Sealyham Terrier',
  'Shetland Sheepdog',
  'Shiba Inu',
  'Shih Tzu',
  'Siberian Husky',
  'Silky Terrier',
  'Skye Terrier',
  'Sloughi',
  'Small Munsterlander Pointer',
  'Soft Coated Wheaten Terrier',
  'Spanish Water Dog',
  'Spinone Italiano',
  'Staffordshire Bull Terrier',
  'Standard Schnauzer',
  'Sussex Spaniel',
  'Swedish Vallhund',
  'Tibetan Mastiff',
  'Tibetan Spaniel',
  'Tibetan Terrier',
  'Toy Fox Terrier',
  'Treeing Walker Coonhound',
  'Vizsla',
  'Weimaraner',
  'Welsh Springer Spaniel',
  'Welsh Terrier',
  'West Highland White Terrier',
  'Whippet',
  'Wire Fox Terrier',
  'Wirehaired Pointing Griffon',
  'Wirehaired Vizsla',
  'Xoloitzcuintli',
  'Yorkshire Terrier',
];

const catBreeds = [
  'Abyssinian',
  'American Bobtail',
  'American Curl',
  'American Shorthair',
  'American Wirehair',
  'Balinese',
  'Bengal',
  'Birman',
  'Bombay',
  'British Shorthair',
  'Burmese',
  'Burmilla',
  'Chartreux',
  'Colorpoint Shorthair',
  'Cornish Rex',
  'Cymric',
  'Devon Rex',
  'Domestic Shorthair',
  'Egyptian Mau',
  'European Burmese',
  'Exotic Shorthair',
  'Havana Brown',
  'Himalayan',
  'Japanese Bobtail',
  'Javanese',
  'Korat',
  'LaPerm',
  'Maine Coon',
  'Manx',
  'Nebelung',
  'Norwegian Forest Cat',
  'Ocicat',
  'Oriental',
  'Persian',
  'Pixiebob',
  'Ragamuffin',
  'Ragdoll',
  'Russian Blue',
  'Savannah',
  'Scottish Fold',
  'Selkirk Rex',
  'Siamese',
  'Siberian',
  'Singapura',
  'Snowshoe',
  'Somali',
  'Sphynx',
  'Tonkinese',
  'Turkish Angora',
  'Turkish Van',
];
