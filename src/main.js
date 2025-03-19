import "./style.css";
import { Map, View } from "ol";
import VectorTile from "ol/layer/VectorTile";
import { PMTilesVectorSource } from "ol-pmtiles";
import { Style, Stroke, Fill } from "ol/style";
import { useGeographic } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

// 国土地理院最適化ベクトルタイル（https://github.com/gsi-cyberjapan/optimal_bvmap）
const tiles =
  "https://cyberjapandata.gsi.go.jp/xyz/optimal_bvmap-v1/optimal_bvmap-v1.pmtiles";

// ol-pmtilesを使ったPMTilesレイヤ定義
const gsiOlPmtilesLayer = new VectorTile({
  declutter: true,
  source: new PMTilesVectorSource({
    url: tiles,
    attributions: [
      "<a href='https://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院最適化ベクトルタイル</a>",
    ],
  }),
  style: new Style({
    stroke: new Stroke({
      color: "gray",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(20,20,20,0.9)",
    }),
  }),
});
gsiOlPmtilesLayer.setVisible(true);

// 地理院地図タイルのレイヤ定義
const gsiLayer = new TileLayer({
  source: new XYZ({
    url: "https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",
    attributions: [
      "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>",
    ],
  }),
});
gsiLayer.setVisible(false);

// 地図定義
useGeographic();
const map = new Map({
  target: "map",
  layers: [gsiLayer, gsiOlPmtilesLayer],
  view: new View({
    center: [135, 35],
    zoom: 10,
  }),
});

// レイヤ切り替え
document
  .getElementById("toggleGsiVectolLayer")
  .addEventListener("change", (event) => {
    if (event.target.checked) {
      gsiLayer.setVisible(false);
      gsiOlPmtilesLayer.setVisible(true);
    }
  });
document
  .getElementById("toggleGsiLayer")
  .addEventListener("change", (event) => {
    if (event.target.checked) {
      gsiLayer.setVisible(true);
      gsiOlPmtilesLayer.setVisible(false);
    }
  });
