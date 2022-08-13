var sheet = SpreadsheetApp.getActiveSheet();

/**
 * 画像データを描画する
 */
function drawImage()
{
  // いったんすべての画像消去
  destroyAllImage();

  var cell = sheet.getActiveCell();
  getImage(cell.getValue());
}

/**
 * 画像データを取得する
 */
function getImage(cardName)
{
  let imageUrl;

  imageUrl = getImageUrl(cardName);

  if(imageUrl == null)   
  {
    console.log("null"); return;
  }
  sheet.insertImage(imageUrl,1,1);
}

/**
 * 画像のURLを取得
 */
function getImageUrl(cardName)
{
  let combinedUrl = "https://api.magicthegathering.io/v1/cards?name=" + cardName;
  let response = UrlFetchApp.fetch(combinedUrl).getContentText();
  let json = JSON.parse(response);

  let imageUrl;

  for(let i=0;i<Object.keys(json["cards"]).length;i++)
  {
    if(json["cards"][i]["set"] == "MP2")
    {
      imageUrl = json["cards"][i]["imageUrl"];
      break;
    }
  }
  
  return imageUrl;
}

/**
 * スプレッドシート上のすべての画像を消す
 */
function destroyAllImage()
{
  let images = sheet.getImages();
  for(var i=0;i<images.length;i++)
  {
    images[i].remove();
  }
}
