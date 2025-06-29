const colors = [
  '#911800',
    '#965704',
    '#05b2af',
    '#006312',
    '#0b3577',
    '#007f55',
    '#005263',
    '#635d00',
    '#240356',
    '#562400',
    '#191615',
    // '#4a0256',
    '#006312',
    '#D6CE1E',
    '#46AF28',
    '#b66868',
    // '#664bb6'
    '#DC862F'
  ]

const labelInfo = {
  'Punjab': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e7/Kings_XI_Punjab_logo.svg/200px-Kings_XI_Punjab_logo.svg.png'},
  'Delhi': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Delhi_Capitals_Logo.svg/200px-Delhi_Capitals_Logo.svg.png'},
  'Deccan': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/HyderabadDeccanChargers.png/200px-HyderabadDeccanChargers.png'},
  'Chennai': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2b/Chennai_Super_Kings_Logo.svg/200px-Chennai_Super_Kings_Logo.svg.png'},
  'Mumbai': {img: 'https://upload.wikimedia.org/wikipedia/en/c/cd/Mumbai_Indians_Logo.svg'},
  'Rajasthan': {},
  'Bangalore': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Royal_Challengers_Bangalore_Logo_2016.svg/200px-Royal_Challengers_Bangalore_Logo_2016.svg.png'},
  'Kolkata': {},
  'Pune': {},
  'Pune Warriors': {},
  'Kochi': {},
  'Hyderabad': {},
  'Gujarat': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Gujarat_Lions.png/200px-Gujarat_Lions.png'},
  'New Zealand': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Flag_of_New_Zealand.svg/2000px-Flag_of_New_Zealand.svg.png', color: '#0D0F0D'},
  'England': {img: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/be/Flag_of_England.svg/1920px-Flag_of_England.svg.png', color: '#2BBFDD'},
  'Pakistan': {img: 'data:image/png;base64,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', color: '#287113'},
  // 'Australia': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png', color: '#0b3577'},
  'Australia': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Flag_of_Australia_%28converted%29.svg/1920px-Flag_of_Australia_%28converted%29.svg.png', color: '#CFD123'},
  // 'Sri Lanka': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1920px-Flag_of_Sri_Lanka.svg.png', color: '#911800'},
  'Sri Lanka': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1920px-Flag_of_Sri_Lanka.svg.png', color: '#5A1593'},
  'West Indies': {img: 'http://www.superhdfx.com/wp-content/uploads/2016/09/West-Indies-Flag-HD-Photo.jpg', color: '#A72B25'},
  // 'South Africa': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1920px-Flag_of_South_Africa.svg.png', color: '#191615'},
  'South Africa': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Flag_of_South_Africa.svg/1920px-Flag_of_South_Africa.svg.png', color: '#46AF28'},
  'Zimbabwe': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Flag_of_Zimbabwe.svg/1920px-Flag_of_Zimbabwe.svg.png', color: '#b66868'},
  'Kenya': {img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/1920px-Flag_of_Kenya.svg.png', color: '#664bb6'},
  // 'India': {img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAllBMVEX/mTMSiAf///8AgQD/lycAAIgAAIUAAH4AAIIAAHMAAHzi4u+kpMvz8/kAAHjg4O/n5/Lt7fV/f7eZmcX6+v65uddSUqTLy+FERJzIyOJiYqna2uogIJCAgLqxsdNUVKU+PpoYGJCGhrsnJ5KTk8IQEIx2drRpaaxKSp+QkMCqqs8zM5dfX6i/v9qiosstLZQ7O5goKJnFqDfbAAAErElEQVR4nO3bbXOiSBSG4WzP9Iu8gwgoQhSTUTGa7P//c3saEqc2JzOT/bB0qnyuqjhq/NDeAw1i5+4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/+g7v3Ql4D004NOHQhEMTDk24r9AkWRxXm63cblbHReJ6MOILNPGPO22MUlJKpYzR66PvekiOm5SFNopiSKW1Hu5Iow+l20E5bZIU2kZQTz+8Q1qnB+/HkzK0vejC6S7kssnFbhnGzEUozqmoRXqme3NjNxw9dzguh03uDb33rD+lYthXFvamFOmp76iVuXc3MGdNwjVtDpWf2/utvQmu93K/ot+tQ1dDc9UkfKRtgfaQpX2wjOnmSD/x+FDMNW1Dj66iOGqS01Zi+iYVeU+Pwge6eaKfB5uhz0Xa9BRlnbsZnKMmBSU5D/cu9hBT0M/z67/JZXj+TFEKN4Nz02RupGnFGMVOpisKIynH6vUxJREtvcbN0cdJE1/TEacbpxAR0N4T0JvXlIrm2X6Ya+k39uijnZzTOmlyUOrwkNKdvZ0xZCjqtci9XKxrEdLmInL7fPpgX+ZieC6aLLXU44lqeKJJtT2IPErDKEyjXBxa++w4uSb0Ohen+S6abJTq8uGoK1JJe4daiF1ATYKdWCjas2Q6/G6Zd0pVDsbnoEms7QQr+n544NWi1SLbpFG6yYRuRe3Zs5VhXqFpVsfTD9BBk46Ow/a/PylslXJ2FnK/9OIo9pZ7Kc4zu7u0hZ1dKzr0dNMP0EGTRzrGjqeoF0nby2LWl7NE16bWyazsZ/S5ZyHHc5SUjtnb6Qc4fRM6EMu3+2ElFyKYnbOuK7dl1zXn2YWKbNK3F0gXh+Ppm7RG7cNluxw3ldZT5Tnyd3XQBPXOj87lozd8EBR52ZbhXpl28hFO3yRTqqF/4mOxCmo66O5nmb/zm+qlauJdnM1W9Fzd74tjTa9qlMomH+H0Te6V9MazjmS+jnbZMul28cFeSDIHf5clZXeKHh/GPab0pJr+Qsr0TZ6VKq5XAdLLi6e7ujHSMk191N7L5XrlMSyUep58hNM3obd+TZKHYRrXZVCpoYmqLmUdp2F4vUgQmp8T8mScNEnqRTDfn6T2vCiKzLZ5kaOXbm3omcjT8u/7Y9CW8c00wXbyzh/nk9PtzSc/jzs+jjuvsvGU49PnJ93kI8R5LIfPO5yDz8Vb+lw8vml8Ln7Tmc9eP9nczPUTXGf7QIXrsUz5yev2/g1dt79+v5OvfvX9jri173fwPeBH8H3xB+y6gmFhEtYVXI3rT7Jfrj/JbnD9CdYpfSRc09uuYqxn+5dx3WPA1z1mt7ruUfx+fezF4biwjprDensOf5fBOW8ihr/f2Q9/v7M/LtI/v/x/9xWafDVowqEJhyYcmnBowt19g/fu/oL30IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NuH8Az4kkIcXXSpAAAAAASUVORK5CYII=', color: '#965704'}
  'India': {img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAllBMVEX/mTMSiAf///8AgQD/lycAAIgAAIUAAH4AAIIAAHMAAHzi4u+kpMvz8/kAAHjg4O/n5/Lt7fV/f7eZmcX6+v65uddSUqTLy+FERJzIyOJiYqna2uogIJCAgLqxsdNUVKU+PpoYGJCGhrsnJ5KTk8IQEIx2drRpaaxKSp+QkMCqqs8zM5dfX6i/v9qiosstLZQ7O5goKJnFqDfbAAAErElEQVR4nO3bbXOiSBSG4WzP9Iu8gwgoQhSTUTGa7P//c3saEqc2JzOT/bB0qnyuqjhq/NDeAw1i5+4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOA/+g7v3Ql4D004NOHQhEMTDk24r9AkWRxXm63cblbHReJ6MOILNPGPO22MUlJKpYzR66PvekiOm5SFNopiSKW1Hu5Iow+l20E5bZIU2kZQTz+8Q1qnB+/HkzK0vejC6S7kssnFbhnGzEUozqmoRXqme3NjNxw9dzguh03uDb33rD+lYthXFvamFOmp76iVuXc3MGdNwjVtDpWf2/utvQmu93K/ot+tQ1dDc9UkfKRtgfaQpX2wjOnmSD/x+FDMNW1Dj66iOGqS01Zi+iYVeU+Pwge6eaKfB5uhz0Xa9BRlnbsZnKMmBSU5D/cu9hBT0M/z67/JZXj+TFEKN4Nz02RupGnFGMVOpisKIynH6vUxJREtvcbN0cdJE1/TEacbpxAR0N4T0JvXlIrm2X6Ya+k39uijnZzTOmlyUOrwkNKdvZ0xZCjqtci9XKxrEdLmInL7fPpgX+ZieC6aLLXU44lqeKJJtT2IPErDKEyjXBxa++w4uSb0Ohen+S6abJTq8uGoK1JJe4daiF1ATYKdWCjas2Q6/G6Zd0pVDsbnoEms7QQr+n544NWi1SLbpFG6yYRuRe3Zs5VhXqFpVsfTD9BBk46Ow/a/PylslXJ2FnK/9OIo9pZ7Kc4zu7u0hZ1dKzr0dNMP0EGTRzrGjqeoF0nby2LWl7NE16bWyazsZ/S5ZyHHc5SUjtnb6Qc4fRM6EMu3+2ElFyKYnbOuK7dl1zXn2YWKbNK3F0gXh+Ppm7RG7cNluxw3ldZT5Tnyd3XQBPXOj87lozd8EBR52ZbhXpl28hFO3yRTqqF/4mOxCmo66O5nmb/zm+qlauJdnM1W9Fzd74tjTa9qlMomH+H0Te6V9MazjmS+jnbZMul28cFeSDIHf5clZXeKHh/GPab0pJr+Qsr0TZ6VKq5XAdLLi6e7ujHSMk191N7L5XrlMSyUep58hNM3obd+TZKHYRrXZVCpoYmqLmUdp2F4vUgQmp8T8mScNEnqRTDfn6T2vCiKzLZ5kaOXbm3omcjT8u/7Y9CW8c00wXbyzh/nk9PtzSc/jzs+jjuvsvGU49PnJ93kI8R5LIfPO5yDz8Vb+lw8vml8Ln7Tmc9eP9nczPUTXGf7QIXrsUz5yev2/g1dt79+v5OvfvX9jri173fwPeBH8H3xB+y6gmFhEtYVXI3rT7Jfrj/JbnD9CdYpfSRc09uuYqxn+5dx3WPA1z1mt7ruUfx+fezF4biwjprDensOf5fBOW8ihr/f2Q9/v7M/LtI/v/x/9xWafDVowqEJhyYcmnBowt19g/fu/oL30IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NODTh0IRDEw5NuH8Az4kkIcXXSpAAAAAASUVORK5CYII=', color: '#cf9940'},
  'Afghanistan ': {img: '', color: '#2539C9'},
  'Bangladesh': {img: '', color: '#44643D'},

  'Anil Kumble': {img: 'https://i.ibb.co/YdGtr01/Anil-Kumble.png'},
  'Bishen Bedi': {img: 'https://i.ibb.co/Vwk5s3g/Bishen-Bedi.png'},
  'Javagal Srinath': {img: 'https://i.ibb.co/Ld3y29m/Javagal-Srinath.png'},
  'Kapil Dev': {img: 'https://i.ibb.co/JFj6zBw/Kapil-Dev.png'},
  'Mohinder Amarnath': {img: 'https://i.ibb.co/Khff0nC/Mohinder-Amarnath.png'},
  'Sharma Madan Lal': {img: 'https://i.ibb.co/mCJLwRG/Sharma-Madan-Lal.png'}
}

let i = 0
for (const key in labelInfo) {
  // console.log(labelInfo[key].color)
  if (!labelInfo[key].color) {
    labelInfo[key].color = colors[(i++) % colors.length]
    // console.log((i++) % colors.length, colors[(i++) % colors.length])
  }
}

export default labelInfo