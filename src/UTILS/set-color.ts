// export default (labelString: string) => {
//   if (labelString) {
//     const string = labelString.replace(/ /g, '');
//     let hash = 0;
//     let i;

//     /* eslint-disable no-bitwise */
//     for (i = 0; i < string.length; i += 1) {
//       hash = string.charCodeAt(i) + ((hash << 5) - hash);
//     }

//     let colour = '';

//     for (i = 0; i < 3; i += 1) {
//       const value = (hash >> (i * 8)) & 0xff;
//       colour += `00${value.toString(16)}`.substr(-2);
//     }
//     /* eslint-enable no-bitwise */

//     if (parseInt(colour, 40) > 15658734) return '#eeeeee';
//     return `#${colour}`;
//   }
// };

export default (str: string) => {
  var s = 70;
  var l = 50;
  if (!str) {
    return '#eeeeee';
  }
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var h = hash % 360;
  return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
};
