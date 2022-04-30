// CSV Combiner program
// Timothy Lieu
// Javascript file to take csv files as inputs and combining them to output one "combined.csv" file


// Array holding command line arguments
var commandLineArgs = process.argv;

// array to hold fileDirectories
var fileDirectories = [];

// Looping through commandLineArgs and adding to fileDirectories to store
for (let i = 2; i < commandLineArgs.length; i++) {
    fileDirectories[i-2] = commandLineArgs[i];
}


const fileEditor = require('fs');


function readcsvfile(curFileDirectory) {

    // Temporary variable to hold contents of csvfile
    var curFileContents
    // array to hold each entry
    var entries = []
    // string for just filename (substring(11) to remove "./fixtures" which is included for every file)
    var filename = curFileDirectory.substring(11)
    
    // reading the csv file as a text
    try {
        curFileContents = fileEditor.readFileSync(curFileDirectory, 'utf8');
    } catch (err) {
        console.log("Error in reading file: " + curFileDirectory);
    }


    // Variable to keep track of index for start of every entry
    var entryStartIndex = 0
    // For loop of each char in string to get each entry for the content of the csv file
    for (let i = 0; i < curFileContents.length; i++) {
        
        if(curFileContents[i] == '\n') {
            // content of entry (i-1 because substring was including newline char)
            var entry = curFileContents.substring(entryStartIndex, i-1);
            // filename needed to add to entry
            var directoryEntry =  ",\"" + filename + "\"";

            // add the entry along with the filename the entry comes from to entries array
            entries.push(entry + directoryEntry);

            // i is currently on newline char so the next entry starts at i+1
            entryStartIndex = i + 1
        }
    }

    // Start at 1 because we don't need to repeat the header entry from every file
    for (let i = 1; i < entries.length; i++) {
        /// This was written under the assumption I was writing specifically to a file ///
        // fileEditor.appendFile('combined.csv', "\n" + entries[i], err => {
        //     if(err) {
        //         console.log("Error")
        //     }
        // })

        console.log(entries[i]);

    }
    
};

/// This was under the assumption I was writing specifically to a file ///
// Create output file
// fileEditor.appendFile('combined.csv', "\"email_hash\",\"category\",\"filename\"", err => {
//     if(err) {
//         console.log("Error");
//     }
// })

// Output header columns of the combined.csv file
console.log("\"email_hash\",\"category\",\"filename\"")

// for the amount of arguments in command line add the data
for (let i = 0; i < fileDirectories.length; i++) {
    readcsvfile(fileDirectories[i])
}
