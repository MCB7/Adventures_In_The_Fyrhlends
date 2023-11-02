export const GenerateEvents = () => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      
      return 1;
    case 2:
      
      return 2; 
    case 3:
  
      return 3;
    default:
      return null;
  }
};