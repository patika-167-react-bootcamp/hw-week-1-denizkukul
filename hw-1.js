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

// Iterate trough folders array and get file, file index, parent folder id and index
function getFileData(fileID) {
  let fileData = {};

  let fileExists = folders.some((folder, folderIndex) => {  // Iterate trough folders until target is found
    return folder.files && folder.files.some((file, fileIndex) => {  // Iterate trough files until target is found
      if (file.id === fileID) {
        fileData.file = { ...file };
        fileData.fileIndex = fileIndex;
        fileData.folderID = folder.id;
        fileData.folderIndex = folderIndex;
        return true;
      }
      else return false;
    })
  })

  return fileExists ? fileData : false;
}

// Managing ids
// Check every id used and get largest number
const id = { current: 0 };
folders.forEach(folder => {
  if (folder.id > id.current) id.current = folder.id;
  folder.files && folder.files.forEach(file => {
    if (file.id > id.current) id.current = file.id;
  })
})

// Move file to target folder
function move(fileID, folderID) {
  // Get file data
  let fileData = getFileData(fileID);
  // Check if file exists
  if (!fileData) return console.log(`File(id:${fileID}) not found!`);

  // Get target folder index
  let targetFolderIndex = folders.findIndex(folder => folder.id === folderID);
  // Check if target folder exists
  if (targetFolderIndex < 0) return console.log(`Folder(id:${folderID}) not found!`);

  // Check if files array exists in target folder
  if (!folders[targetFolderIndex].files) folders[targetFolderIndex].files = [];
  // Add file to target folder
  folders[targetFolderIndex].files.push(fileData.file);
  // Remove file from source folder
  folders[fileData.folderIndex].files.splice(fileData.fileIndex, 1);
  console.log(`File(id:${fileID}) moved to folder(id:${folderID})`);
}

// Copy folder to target folder
function copy(fileID, folderID) {
  // Get file data
  let fileData = getFileData(fileID);
  // Check if file exists
  if (!fileData) return console.log(`File(id:${fileID}) not found!`);

  // Get target folder index
  let targetFolderIndex = folders.findIndex(folder => folder.id === folderID);
  // Return if target folder does not exist
  if (targetFolderIndex < 0) return console.log(`Folder(id:${folderID}) not found!`);

  // Give new id to file and update id counter
  fileData.file.id = id.current + 1;
  id.current++;
  // Create files array if it does not exist
  if (!folders[targetFolderIndex].files) folders[targetFolderIndex].files = [];
  // Add file to target folder
  folders[targetFolderIndex].files.push(fileData.file);
  console.log(`File(id:${fileID}) copied to folder(id:${folderID}) as file(id:${id.current})`);
}

// Remove file
function remove(fileID) {
  // Get file data
  let fileData = getFileData(fileID);
  // Check if file exists
  if (!fileData) return console.log(`File(id:${fileID}) not found!`);

  // Remove file
  folders[fileData.folderIndex].files.splice(fileData.fileIndex, 1);
  console.log(`File(id:${fileID}) removed from folder(id:${fileData.folderID})`);
}

// Remove folder and all files inside
function removeFolder(folderID) {
  // Get target folder index
  let targetFolderIndex = folders.findIndex(folder => folder.id === folderID);
  // Check if target folder exists
  if (targetFolderIndex < 0) return console.log(`Folder(id:${folderID}) not found!`);

  // Remove folder
  folders.splice(targetFolderIndex, 1);
  console.log(`Folder(id:${folderID}) removed`);
}

// Find parent folder of file
function parentFolderOf(fileID) {
  // Get file data
  let fileData = getFileData(fileID);
  // Check if file exists
  if (!fileData) return console.log(`File(id:${fileID}) not found!`);

  console.log(`Parent of file(id:${fileID}) is folder(id:${fileData.folderID})`);
  return fileData.folderID;
}