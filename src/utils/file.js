export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], { type: mime });

  return new File([blob], 'default-user.png');
}

export const InitDefaultFile = cb => {
  var request = new XMLHttpRequest();
  request.open(
    'GET',
    window.location.origin + '/images/default-user.png',
    true
  );
  request.responseType = 'blob';
  request.onload = function() {
    var reader = new FileReader();
    reader.readAsDataURL(request.response);
    reader.onload = function(e) {
      cb(e);
    };
  };
  request.send();
};
