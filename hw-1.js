const folders = [
  {
    id: 5,
    name: 'Klasör 1',
    files: [
      { id: 17, name: 'profil.jpg' },
      { id: 18, name: 'manzara.jpg' },
    ],
  },
  {
    id: 6,
    name: 'Klasör 2',
    files: [
      { id: 21, name: 'foto.png' },
      { id: 22, name: 'dosya.xls' },
    ],
  },
  {
    id: 7,
    name: 'Klasör 3',
  },
]

// Move file to target folder
function move(fileID, targetFolderID) {
  // Validate ids
  if (typeof fileID !== "number") return console.log('File id must be a number!');
  if (typeof targetFolderID !== "number") return console.log('Folder id must be a number!')

  // Create object to store iteration results
  const results = { file: null, fileIndex: null, sourceFolderID: null, sourceFolderIndex: null, targetFolderIndex: null };

  // Iterate trough folders array
  folders.some((folder, folderIndex) => {
    // Check for targetFolderID
    if (folder.id === targetFolderID) {
      // If target folder is found save index to results object
      results.targetFolderIndex = folderIndex;
    }

    // If file is not already found, iterate files array inside current folder
    if (results.file === null && folder.files) {
      folder.files.some((file, fileIndex) => {
        // If file is found, save data to results object
        if (file.id === fileID) {
          results.file = { ...file }; // Take a duplicate of file object
          results.fileIndex = fileIndex;
          results.sourceFolderID = folder.id;
          results.sourceFolderIndex = folderIndex;
          // Stop iterating files array
          return true;
        }
        else return false;
      })
    }

    // If both file position and target folder position are found, stop iterating folders array
    if (results.file && results.targetFolderIndex !== null) return true;
    // Else continue iterating folders array
    else return false
  })

  // If file or targetFolder is not found return log
  if (results.file === null) return console.log(`File(id:${fileID}) not found!`);
  if (results.targetFolderIndex === null) return console.log(`Folder(id:${targetFolderID}) not found!`);
  if (results.sourceFolderID === targetFolderID) return console.log(`File(id:${fileID}) is already in folder(id:${targetFolderID})`)

  // Create files array if it does not exist
  if (!folders[results.targetFolderIndex].files) folders[results.targetFolderIndex].files = [];
  // Add file to files array in target folder
  folders[results.targetFolderIndex].files.push(results.file);
  // Remove file from source folder
  folders[results.sourceFolderIndex].files.splice(results.fileIndex, 1);
  console.log(`File(id:${fileID}) moved to folder(id:${targetFolderID})`);
}

// Copy folder to target folder
function copy(fileID, targetFolderID) {
  // Validate ids
  if (typeof fileID !== "number") return console.log('File id must be a number!');
  if (typeof targetFolderID !== "number") return console.log('Folder id must be a number!')

  // Create object to store iteration results
  const results = { file: null, fileIndex: null, sourceFolderID: null, sourceFolderIndex: null, targetFolderIndex: null };

  // Iterate trough folders array
  folders.some((folder, folderIndex) => {
    // Check for targetFolderID
    if (folder.id === targetFolderID) {
      // If target folder is found save index to results object
      results.targetFolderIndex = folderIndex;
    }

    // If file is not already found, iterate files array inside current folder
    if (results.file === null && folder.files) {
      folder.files.some((file, fileIndex) => {
        // If file is found, save data to results object
        if (file.id === fileID) {
          results.file = { ...file }; // Take a duplicate of file object
          results.fileIndex = fileIndex;
          results.sourceFolderID = folder.id;
          results.sourceFolderIndex = folderIndex;
          // Stop iterating files array
          return true;
        }
        else return false;
      })
    }

    // If both file position and target folder position are found, stop iterating folders array
    if (results.file && results.targetFolderIndex !== null) return true;
    // Else continue iterating folders array
    else return false
  })

  // If file or targetFolder is not found return log
  if (results.file === null) return console.log(`File(id:${fileID}) not found!`);
  if (results.targetFolderIndex === null) return console.log(`Folder(id:${targetFolderID}) not found!`);

  // Give new id to file and update id counter
  results.file.id = id.current + 1;
  id.current++;
  // Create files array if it does not exist
  if (!folders[results.targetFolderIndex].files) folders[results.targetFolderIndex].files = [];
  // Add file to files array in target folder
  folders[results.targetFolderIndex].files.push(results.file);
  console.log(`File(id:${fileID}) copied to folder(id:${targetFolderID}) as file(id:${id.current})`);
}

// Remove file
function remove(fileID) {
  // Validate id
  if (typeof fileID !== "number") return console.log('File id must be a number!');

  // Create object to store iteration results
  const results = { fileIndex: null, parentFolderID: null, parentFolderIndex: null };

  // Iterate trough folders array
  folders.some((folder, folderIndex) => {
    // Iterate trough files array
    return folder.files.some((file, fileIndex) => {
      // If file is found, save data to results object
      if (file.id === fileID) {
        results.fileIndex = fileIndex;
        results.parentFolderID = folder.id;
        results.parentFolderIndex = folderIndex;
        // Stop iterating
        return true;
      }
      else return false;
    })
  })

  // If file is not found return log
  if (results.fileIndex === null) return console.log(`File(id:${fileID}) not found!`);

  // Remove file
  folders[results.parentFolderIndex].files.splice(results.fileIndex, 1);
  console.log(`File(id:${fileID}) removed from folder(id:${results.parentFolderID})`);
}

// Remove folder and all files inside
function removeFolder(folderID) {
  // Validate id
  if (typeof folderID !== "number") return console.log('Folder id must be a number!');
  let folderIndex = null;

  // Iterate trough folders array
  folders.some((folder, index) => {
    if (folder.id === folderID) {
      folderIndex = index
      // Stop iterating
      return true
    }
    // Continue iterating
    else return false;
  })

  // If folder is not found return log
  if (folderIndex === null) return console.log(`Folder(id:${folderID}) not found!`);

  // Remove folder
  folders.splice(folderIndex, 1);
  console.log(`Folder(id:${folderID}) removed`);
}

// Find parent folder of file
function parentFolderOf(fileID) {
  // Validate id
  if (typeof fileID !== "number") return console.log('File id must be a number!');

  let parentFolderID = null;

  // Iterate trough folders array
  folders.some((folder) => {
    // Iterate trough files array
    return folder.files && folder.files.some((file) => {
      // If file is found, save data to results object
      if (file.id === fileID) {
        parentFolderID = folder.id;
        // Stop iterating
        return true;
      }
      else return false;
    })
  })

  // If file is not found return log
  if (parentFolderID === null) return console.log(`File(id:${fileID}) not found!`);
  console.log(`Parent of file(id:${fileID}) is folder(id:${parentFolderID})`);
  return parentFolderID;
}

// Managing IDs
// Check every id used and get largest number
const id = { current: 0 };
folders.forEach(folder => {
  if (folder.id > id.current) id.current = folder.id;
  folder.files && folder.files.forEach(file => {
    if (file.id > id.current) id.current = file.id;
  })
})