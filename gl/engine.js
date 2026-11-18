/* RF · Motor de transiciones WebGL2 (prueba).
   10 logos y 10 transiciones calculadas en la tarjeta gráfica. Si no hay WebGL2 o el usuario
   prefiere movimiento reducido, no hace nada y la página conserva sus animaciones CSS. */
(function () {
  "use strict";
  var NAMES = ["Original", "Vidrio líquido", "Cristal facetado", "Galaxia", "Oro", "Fuego", "Neón", "Holográfico", "Pintura líquida", "Lava", "Código ASCII", "Piedra", "Mármol", "Metal hielo", "Pinceladas", "Glitch RGB", "Selva", "Cromo afilado", "Píxel 8-bit", "Esténcil urbano", "Sello", "Líneas", "Plano técnico", "Collage de papel", "Naïf a mano", "Geométrica", "Risografía", "Retro 70s", "Manuscrita", "Espacio negativo"];
  var NIBPATH = [248.0,318.0,0.0,251.6,308.8,0.0023,255.1,299.3,0.0046,258.6,289.6,0.007,262.1,279.8,0.0093,265.6,270.3,0.0117,269.2,261.0,0.0139,272.9,252.3,0.0161,276.9,244.3,0.0181,281.2,237.2,0.0201,287.7,228.8,0.0225,295.4,221.2,0.025,303.6,214.9,0.0274,311.9,209.6,0.0296,319.9,205.2,0.0317,327.2,201.4,0.0336,337.0,196.7,0.0361,348.5,193.0,0.0388,357.1,193.4,0.0409,360.7,198.1,0.0423,360.5,204.6,0.0438,358.4,213.3,0.0458,355.4,224.3,0.0484,352.5,237.3,0.0515,351.0,246.0,0.0535,349.8,254.1,0.0554,348.5,262.8,0.0574,347.1,272.1,0.0596,345.6,281.8,0.0618,344.1,291.9,0.0642,342.5,302.2,0.0666,340.8,312.8,0.069,339.1,323.4,0.0715,337.4,333.2,0.0738,335.9,342.1,0.0758,334.3,351.2,0.0779,332.7,360.5,0.0801,331.0,369.9,0.0823,329.3,379.5,0.0845,327.5,389.2,0.0868,325.7,398.9,0.089,323.9,408.7,0.0913,322.1,418.4,0.0936,320.3,428.1,0.0958,318.5,437.6,0.0981,316.6,447.2,0.1003,314.8,456.8,0.1025,313.0,466.6,0.1048,311.1,476.5,0.1071,309.3,486.3,0.1094,307.4,496.1,0.1117,305.5,505.9,0.114,303.6,515.4,0.1162,301.6,524.8,0.1184,299.7,533.8,0.1205,297.7,542.6,0.1226,295.7,551.4,0.1247,293.1,562.1,0.1272,290.6,572.6,0.1297,288.0,582.8,0.1321,285.4,592.6,0.1344,282.8,602.0,0.1366,280.1,610.9,0.1388,277.3,619.2,0.1408,274.3,626.8,0.1426,270.6,634.9,0.1447,264.6,645.2,0.1474,258.3,653.6,0.1498,251.7,660.2,0.152,245.0,665.2,0.1539,237.6,669.0,0.1558,227.3,670.4,0.1582,217.0,668.7,0.1606,208.2,665.2,0.1628,201.5,659.4,0.1648,197.6,650.2,0.1671,194.3,640.6,0.1695,336.0,214.0,0.1816,344.7,209.9,0.1838,353.3,205.6,0.186,361.8,201.1,0.1882,370.3,196.7,0.1904,378.9,192.3,0.1926,387.5,188.1,0.1948,396.3,184.2,0.197,405.4,180.6,0.1993,414.6,177.5,0.2015,423.9,175.0,0.2037,433.2,172.9,0.2059,442.9,171.0,0.2082,452.9,169.3,0.2105,463.1,167.9,0.2128,473.2,166.8,0.2152,483.3,165.9,0.2175,493.1,165.4,0.2197,502.6,165.2,0.2219,511.6,165.4,0.224,520.0,166.0,0.2259,531.0,167.4,0.2284,541.6,169.6,0.2309,551.7,172.4,0.2333,561.1,175.8,0.2356,569.9,179.8,0.2378,577.7,184.2,0.2399,584.6,189.1,0.2418,591.1,195.1,0.2439,597.1,203.0,0.2461,601.6,211.9,0.2484,604.7,221.5,0.2507,606.4,231.5,0.2531,606.4,241.6,0.2554,605.2,250.5,0.2575,603.1,259.0,0.2595,600.1,267.8,0.2616,596.1,276.8,0.2638,591.2,285.8,0.2662,585.5,294.5,0.2686,578.9,302.8,0.271,571.6,310.4,0.2734,565.2,315.9,0.2754,558.0,321.3,0.2774,550.1,326.6,0.2796,541.6,331.7,0.2819,532.8,336.5,0.2842,523.7,341.2,0.2865,514.5,345.6,0.2889,505.3,349.7,0.2912,496.1,353.5,0.2934,487.2,357.1,0.2957,477.9,360.4,0.2979,468.2,363.4,0.3002,458.3,366.1,0.3026,448.3,368.6,0.3049,438.4,370.8,0.3073,428.8,372.8,0.3095,419.4,374.6,0.3117,410.6,376.2,0.3138,402.4,377.6,0.3157,391.8,379.2,0.3181,381.3,380.0,0.3206,371.8,380.3,0.3227,363.0,380.1,0.3247,354.3,379.9,0.3267,345.2,380.0,0.3288,372.0,372.0,0.3411,380.1,377.0,0.3433,388.3,381.7,0.3454,396.5,386.2,0.3476,404.7,391.0,0.3498,412.8,396.1,0.352,420.8,401.9,0.3542,428.6,408.6,0.3566,434.9,415.0,0.3586,440.9,421.7,0.3607,446.8,428.8,0.3628,452.7,436.4,0.365,458.5,444.2,0.3673,464.2,452.4,0.3695,469.8,460.8,0.3718,475.3,469.3,0.3742,480.7,477.8,0.3765,485.5,486.0,0.3787,490.2,494.3,0.3808,494.7,502.9,0.3831,499.2,511.7,0.3853,503.5,520.7,0.3876,507.8,529.7,0.3899,512.1,538.6,0.3922,516.3,547.3,0.3944,520.5,555.7,0.3965,524.7,563.6,0.3986,529.6,572.5,0.4009,534.6,581.9,0.4034,539.5,591.1,0.4057,544.4,599.9,0.4081,549.2,608.4,0.4103,554.1,616.3,0.4124,559.1,623.6,0.4145,564.3,630.1,0.4164,571.4,637.5,0.4187,579.4,644.5,0.4212,587.7,650.3,0.4235,596.1,654.8,0.4257,604.6,658.1,0.4277,613.2,660.2,0.4298,622.8,660.7,0.432,632.7,659.4,0.4343,642.6,656.9,0.4366,651.9,653.5,0.4389,660.6,649.7,0.4411,668.9,644.7,0.4433,676.3,638.6,0.4455,683.3,631.9,0.4477,690.3,625.2,0.4499,700.0,258.0,0.463,701.9,248.3,0.4653,703.1,238.2,0.4676,704.8,228.4,0.4699,708.0,219.6,0.4721,713.4,212.6,0.4741,719.7,207.6,0.476,727.2,203.4,0.4779,735.9,200.0,0.4801,746.1,197.1,0.4825,757.9,194.7,0.4853,767.2,193.3,0.4874,775.4,192.5,0.4893,784.4,192.0,0.4914,793.9,191.6,0.4935,803.8,191.4,0.4958,814.0,191.3,0.4982,824.3,191.2,0.5005,834.7,191.0,0.5029,845.0,190.8,0.5053,855.1,190.3,0.5076,864.8,189.7,0.5098,874.5,189.0,0.512,884.4,188.2,0.5143,894.4,187.5,0.5166,904.3,186.6,0.5189,914.3,185.7,0.5212,924.1,184.8,0.5235,933.7,183.7,0.5257,943.0,182.6,0.5278,952.0,181.3,0.5299,960.7,179.9,0.5319,971.5,177.8,0.5344,981.9,175.6,0.5369,992.0,173.1,0.5393,1001.6,170.5,0.5415,1010.8,167.8,0.5437,1019.4,165.1,0.5458,1027.5,162.3,0.5478,1035.5,159.4,0.5497,1045.8,154.9,0.5523,1054.2,150.3,0.5545,1061.6,145.6,0.5565,1069.0,140.9,0.5585,890.0,192.0,0.5718,888.1,201.4,0.574,886.2,210.7,0.5762,884.3,220.0,0.5784,882.5,229.3,0.5806,880.6,238.6,0.5827,878.7,247.9,0.5849,876.8,257.2,0.5871,874.9,266.7,0.5893,873.0,276.2,0.5915,871.0,285.8,0.5938,868.9,295.7,0.5961,866.9,305.1,0.5983,865.0,314.1,0.6004,863.1,323.3,0.6026,861.1,332.7,0.6047,859.2,342.1,0.6069,857.1,351.5,0.6092,855.1,361.0,0.6114,853.1,370.6,0.6136,851.0,380.2,0.6159,848.9,389.7,0.6181,846.7,399.3,0.6204,844.6,408.8,0.6226,842.4,418.2,0.6248,840.2,427.6,0.627,838.0,437.2,0.6293,835.7,446.9,0.6316,833.4,456.6,0.6339,831.1,466.4,0.6362,828.7,476.2,0.6385,826.4,485.9,0.6408,824.0,495.4,0.643,821.6,504.8,0.6452,819.2,513.9,0.6474,816.8,522.8,0.6495,814.5,531.3,0.6515,812.1,539.5,0.6535,809.0,550.2,0.656,805.8,560.7,0.6586,802.6,570.9,0.661,799.4,580.6,0.6633,796.3,589.8,0.6656,793.0,598.6,0.6677,789.8,606.9,0.6698,786.5,614.7,0.6717,783.1,621.9,0.6735,777.9,631.4,0.676,771.9,640.9,0.6786,765.8,648.8,0.6809,759.5,655.3,0.6829,753.0,660.7,0.6849,745.7,665.2,0.6869,735.8,668.7,0.6893,725.4,670.0,0.6917,715.5,669.5,0.6939,706.8,667.6,0.696,698.8,662.6,0.6982,692.2,655.3,0.7004,685.7,647.7,0.7027,770.0,430.0,0.7153,779.3,427.7,0.7175,788.5,425.3,0.7196,797.6,422.9,0.7218,806.9,420.6,0.724,816.4,418.5,0.7262,826.2,416.6,0.7285,835.7,415.2,0.7307,845.3,414.0,0.7329,855.2,412.9,0.7352,865.3,412.0,0.7375,875.3,411.3,0.7398,885.0,410.7,0.7421,894.2,410.2,0.7442,903.5,409.9,0.7463,914.1,409.9,0.7487,923.7,410.3,0.7509,932.8,410.9,0.753,941.8,411.6,0.7551,176.0,712.0,0.769,185.4,710.2,0.7712,194.6,708.3,0.7733,203.8,706.5,0.7755,213.0,704.7,0.7776,222.0,702.8,0.7797,231.0,701.0,0.7818,240.1,699.2,0.784,249.1,697.4,0.7861,258.1,695.6,0.7882,267.1,693.7,0.7903,276.2,691.9,0.7924,285.4,690.1,0.7945,294.6,688.2,0.7967,303.9,686.4,0.7989,313.4,684.5,0.8011,322.9,682.7,0.8033,332.7,680.8,0.8056,342.6,678.9,0.8079,352.6,677.0,0.8102,362.9,675.1,0.8126,373.3,673.2,0.8151,383.2,671.4,0.8174,391.8,669.9,0.8194,400.5,668.3,0.8214,409.3,666.7,0.8235,418.3,665.1,0.8255,427.4,663.5,0.8277,436.6,661.9,0.8298,445.9,660.2,0.832,455.2,658.6,0.8341,464.7,657.0,0.8363,474.2,655.3,0.8386,483.8,653.6,0.8408,493.5,652.0,0.843,503.2,650.3,0.8453,512.9,648.7,0.8476,522.7,647.0,0.8498,532.5,645.4,0.8521,542.3,643.7,0.8544,552.1,642.1,0.8567,561.9,640.5,0.8589,571.7,638.9,0.8612,581.5,637.3,0.8635,591.2,635.7,0.8658,601.0,634.1,0.868,610.7,632.6,0.8703,620.3,631.1,0.8725,629.9,629.6,0.8747,639.4,628.1,0.8769,648.9,626.6,0.8791,658.5,625.2,0.8814,668.2,623.7,0.8836,677.8,622.3,0.8858,687.5,620.9,0.8881,697.3,619.5,0.8903,707.0,618.0,0.8926,716.8,616.7,0.8949,726.5,615.3,0.8971,736.3,613.9,0.8994,746.0,612.5,0.9016,755.8,611.2,0.9039,765.5,609.8,0.9061,775.2,608.5,0.9084,784.9,607.2,0.9106,794.6,605.9,0.9128,804.2,604.6,0.9151,813.7,603.3,0.9173,823.2,602.0,0.9195,832.7,600.8,0.9217,842.1,599.5,0.9238,851.4,598.3,0.926,860.6,597.1,0.9281,869.8,595.9,0.9302,878.8,594.7,0.9323,887.8,593.6,0.9344,896.7,592.4,0.9365,906.5,591.2,0.9387,916.7,589.9,0.9411,926.8,588.6,0.9434,936.8,587.4,0.9457,946.7,586.1,0.948,956.4,585.0,0.9503,966.1,583.8,0.9525,975.7,582.7,0.9547,985.2,581.5,0.9569,994.6,580.4,0.9591,1004.0,579.4,0.9612,1013.4,578.3,0.9634,1022.7,577.2,0.9655,1032.0,576.1,0.9677,1041.2,575.1,0.9698,1050.5,574.0,0.972,1059.7,573.0,0.9741,1069.0,571.9,0.9762,1078.3,570.9,0.9784,1087.6,569.8,0.9805,1096.9,568.7,0.9827,1106.4,567.6,0.9849,1115.8,566.5,0.987];   // x, y, orden de escritura de la pluma (Manuscrita)
  var ORDER = [0, 28, 29, 25, 23, 24, 27, 22, 18, 16, 19, 20, 10, 13, 14, 15, 1, 2, 3, 5, 6, 7, 8, 9];   // retirados: Risografía, Líneas, Cromo afilado, Piedra, Mármol, Oro   // orden del ciclo (los nuevos primero, para revisarlos)
  var TR = 1.45;                       // duración de cada transición (s)
  var POOL = { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1, 9: 1, 10: 1, 11: 1, 12: 1, 13: 1, 14: 1, 15: 1, 16: 1, 17: 1, 18: 1, 19: 1, 20: 1, 21: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 28: 1, 29: 1 };  // todas las transiciones usan el charco
  var TRP = 2.3;
  var LAYER = [1300, 800];             // espacio de trabajo (igual que en el video)
  var TAP = [800, 440];                // punto de toque en la capa
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var btn = document.getElementById("logo-btn");
  var stage = document.getElementById("logo-stage");
  if (!btn || !stage) return;

  var canvas = document.createElement("canvas");
  canvas.className = "gl-stage";
  canvas.setAttribute("aria-hidden", "true");
  var gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: true });
  if (!gl) return;

  // ---------------------------------------------------------------- shaders
  var COMMON = [
    "#version 300 es",
    "precision highp float; precision highp int;",
    "uniform sampler2D A; uniform sampler2D B;",
    "uniform float p; uniform float time; uniform float tapT; uniform int mode;",
    "const vec2 S = vec2(1300.0, 800.0);",
    "const vec2 TAP = vec2(" + TAP[0].toFixed(1) + "," + TAP[1].toFixed(1) + ");",
    "const float PI = 3.14159265;",
    "const float TR = 1.45;",
    "float sat(float x){return clamp(x,0.0,1.0);}",
    "float ss(float x){x=sat(x);return x*x*(3.0-2.0*x);}",
    "float seg(float x,float a,float b){return sat((x-a)/(b-a));}",
    "float eio(float x){x=sat(x);return x<0.5?4.0*x*x*x:1.0-pow(-2.0*x+2.0,3.0)/2.0;}",
    "float eo(float x){x=sat(x);return 1.0-pow(1.0-x,3.0);}",
    "float hash(vec2 q){q=fract(q*vec2(123.34,456.21));q+=dot(q,q+45.32);return fract(q.x*q.y);}",
    "float vnoise(vec2 x){vec2 i=floor(x),f=fract(x);f=f*f*(3.0-2.0*f);",
    " return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}",
    "float fbm(vec2 x){float v=0.0,a=0.5;for(int k=0;k<5;k++){v+=a*vnoise(x);x*=2.03;a*=0.5;}return v/0.97;}",
    "vec4 tx(sampler2D s,vec2 P){vec2 u=P/S;if(u.x<0.0||u.y<0.0||u.x>1.0||u.y>1.0)return vec4(0);return textureLod(s,u,0.0);}",
    "vec4 txl(sampler2D s,vec2 P,float l){vec2 u=P/S;if(u.x<-0.05||u.y<-0.05||u.x>1.05||u.y>1.05)return vec4(0);return textureLod(s,u,l);}",
    "float winF(vec2 P){vec2 u=P/vec2(1300.0,1000.0);return ss(min(u.x,1.0-u.x)/0.08)*ss(min(u.y,1.0-u.y)/0.08);}",
    "float win(vec2 P){vec2 u=P/S;return ss(min(u.x,1.0-u.x)/0.1)*ss(min(u.y,1.0-u.y)/0.14);}",
    "vec4 flowc(sampler2D s,vec2 P,vec2 fl,vec4 a){vec4 d=tx(s,P+fl); vec3 col=d.a>0.03?d.rgb/d.a:(a.a>0.0?a.rgb/a.a:vec3(0)); return vec4(mix(a.rgb/max(a.a,1e-3),col,ss(d.a/0.3))*a.a,a.a);}",
    "float glints(vec2 P,float t,float cs,float th,float m){vec2 cell=floor(P/cs); float h=hash(cell); if(h<th||m<0.3) return 0.0;",
    " vec2 c=(cell+0.5)*cs; vec2 d=abs(P-c); float tw=pow(max(0.0,sin(t*2.2+h*61.0)),24.0);",
    " float star=exp(-dot(d,d)/2.5)+exp(-d.y*d.y/0.8)*exp(-d.x/(cs*0.35))+exp(-d.x*d.x/0.8)*exp(-d.y/(cs*0.35)); return star*tw*m;}",
    "vec4 flowSample(sampler2D s,vec2 P,vec2 dir,float t,float sp,float amp){float p1=fract(t*sp),p2=fract(t*sp+0.5);",
    " vec4 a1=tx(s,P-dir*p1*amp), a2=tx(s,P-dir*p2*amp); return mix(a1,a2,abs(1.0-2.0*p1));}",
    "uniform vec2 DRIP[3]; uniform int SA;",
    "vec3 voro(vec2 x){vec2 n=floor(x),f=fract(x); float md=8.0,md2=8.0; vec2 mc=n;",
    " for(int j=-1;j<=1;j++)for(int i=-1;i<=1;i++){vec2 g=vec2(float(i),float(j)); vec2 o=vec2(hash(n+g),hash(n+g+19.1)); vec2 r=g+o-f; float d=dot(r,r);",
    "  if(d<md){md2=md;md=d;mc=n+g;}else if(d<md2)md2=d;} return vec3(mc,sqrt(md2)-sqrt(md));}",
    "vec3 hueRot(vec3 c,float a){const vec3 k=vec3(0.57735); float ca=cos(a); return c*ca+cross(k,c)*sin(a)+k*dot(k,c)*(1.0-ca);}",
    "vec3 rainbow(float x){return 0.5+0.5*cos(6.2831*(x+vec3(0.0,0.33,0.67)));}",
    "vec3 embersIdle(sampler2D s,vec2 P,float t,vec3 col){ vec3 acc=vec3(0); for(int k=0;k<10;k++){",
    "  vec2 cell=floor(P/18.0)+vec2(0.0,float(k)); float h=hash(cell*1.31); if(h<0.88) continue;",
    "  vec2 base=(cell+0.5)*18.0; if(txl(s,base,1.0).a<0.5) continue; float l=fract(t*0.55+h*7.0);",
    "  vec2 e=base+vec2(sin(t*2.0+h*30.0)*9.0,-l*170.0); vec2 d=P-e; acc+=col*exp(-dot(d,d)/2.6)*(1.0-l)*2.2; } return acc;}",
    "vec3 halo(sampler2D s,vec2 P){return (txl(s,P,3.0).rgb*0.7+txl(s,P,4.5).rgb*0.3)*win(P);}",
    // --- recursos de la tanda 1 ---
    "uniform sampler2D O; uniform sampler2D G;",
    "const vec2 CELL=vec2(18.0,26.0);",
    "float luma(vec4 c){return dot(c.rgb,vec3(0.3,0.5,0.2));}",
    "float glyph(vec2 uv,float g){ if(uv.x<0.0||uv.x>=1.0||uv.y<0.0||uv.y>=1.0) return 0.0; return textureLod(G,vec2((g+uv.x)/16.0,uv.y),0.0).a; }",
    "vec4 ocell(vec2 cell){ return txl(O,(cell+0.5)*CELL,1.0); }",
    "float gidx(vec2 cell,float ep){ return floor(hash(cell*1.13+vec2(ep*1.37,ep*0.71))*12.999); }",
    "vec3 ocol(vec4 o,vec2 cell){ float h=hash(cell*1.7+0.3); return o.rgb/max(o.a,1e-3)*(h<0.25?0.45:1.0); }",
    "float gIdle(vec2 cell,float t){ float h=hash(cell*2.3); return gidx(cell,floor(t*0.7+h*9.0)); }",
    // código que cae (derretido del ASCII)
    "vec4 asciiFall(vec2 P,float q,float t,float surf,out vec3 trail){ trail=vec3(0); vec4 res=vec4(0); float cx=floor(P.x/CELL.x); float ux=fract(P.x/CELL.x);",
    " for(int r=0;r<32;r++){ vec2 cell=vec2(cx,float(r)); vec4 o=ocell(cell); if(o.a<0.5) continue; float h=hash(cell*3.7);",
    "  float rel=(1.0-float(r)/31.0)*0.36+h*0.12; float f=max(q-rel,0.0); float off=f*f*3200.0; float y0=cell.y*CELL.y+off; if(y0>surf+4.0) continue;",
    "  float dy=P.y-y0; vec3 col=ocol(o,cell)*(1.0+min(off/160.0,1.0)*0.7);",
    "  if(dy>=0.0&&dy<CELL.y){ float g=off>0.5?gidx(cell,floor(t*18.0)+3.0):gIdle(cell,t); float cov=glyph(vec2(ux,dy/CELL.y),g); res+=(1.0-res.a)*vec4(col*cov,cov); }",
    "  float len=230.0*f; if(off>0.5&&dy<0.0&&dy>-len) trail+=col*exp(-pow((ux-0.5)/0.1,2.0))*(1.0+dy/len)*0.55;",
    " } return res; }",
    // código que sube y se fija (emergencia del ASCII)
    "vec4 asciiRise(vec2 P,float q,float t,float surf,out vec3 glow){ glow=vec3(0); vec4 res=vec4(0); float cx=floor(P.x/CELL.x); float ux=fract(P.x/CELL.x);",
    " for(int r=0;r<32;r++){ vec2 cell=vec2(cx,float(r)); vec4 o=ocell(cell); if(o.a<0.5) continue; float h=hash(cell*3.7);",
    "  float arr=0.22+(1.0-float(r)/31.0)*0.6+h*0.1; float dur=0.26; float k=(q-(arr-dur))/dur; if(k<=0.0) continue;",
    "  float y0=mix(surf-CELL.y,cell.y*CELL.y,eo(min(k,1.0))); float dy=P.y-y0; bool lk=k>=1.0;",
    "  float fl=lk?exp(-(q-arr)*16.0):0.55; vec3 col=ocol(o,cell)*(1.0+fl*1.3);",
    "  if(dy>=0.0&&dy<CELL.y){ float g=lk?gIdle(cell,t):gidx(cell,floor(t*24.0)+5.0); float cov=glyph(vec2(ux,dy/CELL.y),g); res+=(1.0-res.a)*vec4(col*cov,cov); glow+=col*cov*fl*0.8; }",
    "  float len=160.0*(1.0-min(k,1.0)); if(!lk&&dy>CELL.y&&dy<CELL.y+len) glow+=col*exp(-pow((ux-0.5)/0.1,2.0))*(1.0-(dy-CELL.y)/len)*0.5;",
    " } return res; }",
    // piedra: trozos que caen o suben (búsqueda exacta por desplazamiento)
    "vec4 chunks(sampler2D s,vec2 P,float q,int rise,out float seam,out float heat){ seam=0.0; heat=0.0; float mx=rise==1?760.0:q*q*2600.0+8.0;",
    " for(int k=0;k<52;k++){ float o=float(k)*16.0; if(o>mx) break; vec2 Ps=P-vec2(0.0,o); if(Ps.y<30.0) break;",
    "  vec3 vo=voro(Ps/62.0); vec2 id=vo.xy; vec2 cc=(id+0.5)*62.0; float h=hash(id*1.9); float off; float hv=0.0;",
    "  if(rise==0){ float rel=(1.0-sat((cc.y-90.0)/620.0))*0.42+h*0.2; float f=max(q-rel,0.0); off=f*f*2600.0; hv=ss(q/0.18)*(0.6+0.4*h); }",
    "  else { float arr=0.32+(1.0-sat((cc.y-90.0)/620.0))*0.45+h*0.15; float kk=sat((q-(arr-0.3))/0.3); off=kk<=0.0?5000.0:(1.0-eo(kk))*(800.0-cc.y); hv=kk<1.0?1.0:1.0-sat((q-arr)/0.3); }",
    "  if(abs(off-o)<8.0){ vec2 P2=P-vec2(0.0,off); vec3 v2=voro(P2/62.0); if(v2.xy==id){ vec4 a=tx(s,P2); if(a.a>0.02){ seam=1.0-ss(v2.z/0.07); heat=hv; return a; } } }",
    " } return vec4(0); }",
    "vec3 hotEmbers(sampler2D s,vec2 P,float t){ vec3 acc=vec3(0); for(int k=0;k<10;k++){",
    "  vec2 cell=floor(P/16.0)+vec2(0.0,float(k)); float h=hash(cell*1.71); if(h<0.86) continue;",
    "  vec2 base=(cell+0.5)*16.0; vec4 b=txl(s,base,1.0); vec3 bc=b.rgb/max(b.a,0.02); if(b.a<0.5||bc.r-bc.b<0.35) continue; float l=fract(t*0.5+h*7.0);",
    "  vec2 e=base+vec2(sin(t*2.0+h*30.0)*8.0,-l*130.0); vec2 d=P-e; acc+=vec3(1.0,0.5,0.15)*exp(-dot(d,d)/2.4)*(1.0-l)*2.2; } return acc;}",
    // píxel 8-bit
    "const float PX=20.0;",
    "float pbox(vec2 uv){ vec2 q=uv*PX; return sat(q.x-1.5)*sat(18.5-q.x)*sat(q.y-1.5)*sat(18.5-q.y); }",
    "vec4 pcell(vec2 cell){ return txl(O,(cell+0.5)*PX,2.0); }",
    "float bevel(vec2 uv){ return (uv.x<0.25||uv.y<0.25)?1.22:((uv.x>0.8||uv.y>0.8)?0.8:1.0); }",
    "vec4 pixFall(vec2 P,float q,float surf){ vec4 res=vec4(0); float cx=floor(P.x/PX); float ux=fract(P.x/PX);",
    " for(int r=0;r<40;r++){ vec2 cell=vec2(cx,float(r)); vec4 o=pcell(cell); if(o.a<0.5) continue; float h=hash(cell*3.3);",
    "  float rel=(1.0-float(r)/39.0)*0.36+h*0.12; float f=max(q-rel,0.0); float off=floor(f*f*3000.0/PX)*PX; float y0=cell.y*PX+off; if(y0>surf) continue;",
    "  float dy=P.y-y0; if(dy>=0.0&&dy<PX){ vec2 uv=vec2(ux,dy/PX); float cov=pbox(uv); vec3 col=o.rgb/o.a*bevel(uv)*(1.0+step(0.5,off)*0.25); res+=(1.0-res.a)*vec4(col*cov,cov); }",
    " } return res; }",
    "vec4 pixRise(vec2 P,float q,float surf,out vec3 glow){ glow=vec3(0); vec4 res=vec4(0); float cx=floor(P.x/PX); float ux=fract(P.x/PX);",
    " for(int r=0;r<40;r++){ vec2 cell=vec2(cx,float(r)); vec4 o=pcell(cell); if(o.a<0.5) continue; float h=hash(cell*3.3);",
    "  float arr=0.24+(1.0-float(r)/39.0)*0.6+h*0.08; float dur=0.22; float k=(q-(arr-dur))/dur; if(k<=0.0) continue;",
    "  float ty=cell.y*PX; float y0=ty+floor((surf-PX-ty)*(1.0-eo(min(k,1.0)))/PX)*PX; bool lk=k>=1.0;",
    "  float dy=P.y-y0; if(dy>=0.0&&dy<PX){ vec2 uv=vec2(ux,dy/PX); float cov=pbox(uv); float fl=lk?exp(-(q-arr)*18.0):0.35;",
    "   vec3 col=mix(o.rgb/o.a*bevel(uv),vec3(1.0),fl*0.6); res+=(1.0-res.a)*vec4(col*cov,cov); glow+=col*cov*fl*0.6; }",
    " } return res; }",
    // selva: hojas que caen girando
    "vec3 leafFall(sampler2D s,vec2 P,float q,float t){ vec3 acc=vec3(0); if(q<=0.0) return acc; for(int k=0;k<6;k++){",
    "  vec2 cell=floor(P/vec2(46.0,46.0))-vec2(0.0,float(k)); float h=hash(cell*1.9+4.0); if(h<0.8) continue;",
    "  vec2 base=(cell+0.5)*46.0; vec4 b=txl(s,base,1.5); if(b.a<0.6) continue; float rel=(1.0-sat((base.y-90.0)/620.0))*0.4+h*0.3; float f=max(q-rel,0.0); if(f<=0.0) continue;",
    "  vec2 e=base+vec2(sin(f*9.0+h*30.0)*26.0,f*f*900.0); if(e.y>800.0) continue; float an=f*8.0+h*6.0; vec2 d=P-e; d=vec2(d.x*cos(an)-d.y*sin(an),d.x*sin(an)+d.y*cos(an));",
    "  float lf=ss(1.0-length(d/vec2(9.0,4.0))); vec3 col=mix(b.rgb/b.a,vec3(0.7,0.42,0.12)*1.2,ss(f*3.0)); acc+=col*lf*(1.0-ss((e.y-760.0)/30.0)); } return acc; }",
    "vec3 fireflies(vec2 P,float t,sampler2D s){ vec3 acc=vec3(0); for(int k=0;k<4;k++){ vec2 cell=floor(P/70.0)+vec2(float(k%2),float(k/2))-0.5; float h=hash(cell*2.7);",
    "  if(h<0.55) continue; vec2 cc=(cell+0.5)*70.0; if(txl(s,cc,4.5).a<0.08) continue; vec2 e=cc+vec2(sin(t*0.6+h*20.0),cos(t*0.45+h*13.0))*30.0;",
    "  float bl=pow(0.5+0.5*sin(t*1.8+h*40.0),6.0); vec2 d=P-e; acc+=vec3(0.75,1.0,0.35)*(exp(-dot(d,d)/5.0)*1.6+exp(-dot(d,d)/90.0)*0.25)*bl; } return acc; }",
    "vec3 env(vec3 r,float t){ float y=r.y; vec3 c=mix(vec3(0.95,0.55,0.25),vec3(0.18,0.12,0.45),ss(y*0.8+0.5)); c+=vec3(1.0)*exp(-pow(r.x*1.6+sin(t*0.4)*0.9,2.0)/0.012)*1.3; c+=vec3(0.8,0.85,1.0)*exp(-pow(y+0.15,2.0)/0.004)*0.8; return c; }",
    // ---- tanda 4 ----
    "float jag(float y){ return (vnoise(vec2(y/7.0,0.0))-0.5)*10.0+(vnoise(vec2(y/3.0,5.0))-0.5)*3.0; }",
    // ---- tanda 5 ----
    "uniform sampler2D WO; uniform vec2 NIBP; uniform float NIBON;",
    "float wOrd(vec2 P){ float o=2.0; for(int k=0;k<5;k++){ vec2 q=P+(k==0?vec2(0):k==1?vec2(1.5,0.0):k==2?vec2(-1.5,0.0):k==3?vec2(0.0,1.5):vec2(0.0,-1.5));",
    "  vec4 w=tx(WO,q); if(w.b>0.5) o=min(o,(w.r*65280.0+w.g*255.0)/65535.0); } return o; }",
    "float tileSd(vec2 P){ vec2 q=abs(P-vec2(649.5,400.0))-vec2(356.5,300.0)+87.5; return length(max(q,0.0))+min(max(q.x,q.y),0.0)-87.5; }",
    "vec3 negGrad(vec2 P,float sh){ float u=clamp(((P.x-293.0)/712.0+(P.y-100.0)/600.0)*0.5+sh,0.0,1.0); vec3 a=vec3(0.247,0.129,0.973), b=vec3(0.541,0.169,0.918), c=vec3(0.992,0.478,0.267); return u<0.55?mix(a,b,u/0.55):mix(b,c,(u-0.55)/0.45); }",
    "vec3 spaceWorld(vec2 P,float t){ vec2 q=P+vec2(t*9.0,-t*4.0); float n=fbm(q/140.0+vec2(0.0,t*0.02));",
    " vec3 neb=mix(vec3(0.03,0.02,0.10),vec3(0.35,0.12,0.6),ss((n-0.35)/0.4))+vec3(0.9,0.4,0.2)*ss((fbm(q/90.0+5.0)-0.62)/0.15)*0.35;",
    " vec2 cell=floor(q/18.0); float h=hash(cell); vec2 sp=(cell+vec2(hash(cell+3.1),hash(cell+7.7)))*18.0;",
    " float st=step(0.82,h)*exp(-dot(q-sp,q-sp)/(1.2+2.0*hash(cell+1.0)))*(0.55+0.45*sin(t*3.0+h*40.0)); return neb+vec3(st)*1.4; }",
    "vec4 negTile(sampler2D s,vec2 P,float t,float sc){ vec2 C=vec2(649.5,400.0); float aa=tx(s,C+(P-C)/sc).a; float inT=sat(0.5-tileSd(P)); float hole=inT*(1.0-aa); float tile=inT-hole;",
    " float sdw=txl(s,C+(P+vec2(-7.0,-9.0)-C)/sc,2.0).a; vec3 wc=spaceWorld(P,t)*(1.0-0.65*sdw); vec3 g=negGrad(P,0.12*sin(t*0.45));",
    " return vec4(g*tile+wc*hole*0.95,tile+hole*0.95); }",
    "vec2 rot2(vec2 p,float a){ float c=cos(a), s=sin(a); return vec2(c*p.x-s*p.y,s*p.x+c*p.y); }",
    "float eback(float x){ float u=x-1.0; return 1.0+2.70158*u*u*u+1.70158*u*u; }",
    "float sdBox(vec2 p,vec2 b,float r){ vec2 q=abs(p)-b+r; return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r; }",
    // risografía: trama de puntos rotada + tinta rosa con desregistro
    "vec4 riso(vec2 P,vec2 offB,float st,float rad,float mP,float mB){",
    " float aP=txl(O,P,0.5).a*mP; float aB=txl(O,P-offB,0.5).a*mB; vec2 Pd=vec2(P.x,P.y/st);",
    " vec2 R=vec2(0.7071*Pd.x-0.7071*Pd.y,0.7071*Pd.x+0.7071*Pd.y)/13.0; vec2 g=(fract(R)-0.5)*13.0; float dm=sat(rad-length(g)+0.5)*aB;",
    " float gr=0.86+0.14*hash(floor(P/1.5)); vec3 pink=vec3(0.95,0.36,0.72)*gr; vec3 dc=mix(vec3(0.24,0.21,0.91),vec3(0.36,0.18,0.72),aP);",
    " return vec4(pink*aP*(1.0-dm)+dc*dm,aP+dm*(1.0-aP)); }",
    // naïf: hervor de línea de dibujo animado (cambia a saltos, 8 veces por segundo)
    "vec2 boil(vec2 P,float t){ float tb=floor(t*8.0); return (vec2(vnoise(P/22.0+tb*7.3),vnoise(P/22.0+tb*3.1+9.0))-0.5)*5.0; }",
    "float star4(vec2 p,float r){ p=abs(p); return (pow(p.x,0.6)+pow(p.y,0.6))-pow(r,0.6); }",
    "vec4 doodles(vec2 P,float t,sampler2D s){ vec4 acc=vec4(0); for(int k=0;k<4;k++){ vec2 cell=floor(P/130.0)+vec2(float(k%2),float(k/2))-0.5; float h=hash(cell*3.9);",
    "  if(h<0.45) continue; vec2 cc=(cell+0.5)*130.0+(vec2(hash(cell+1.0),hash(cell+2.0))-0.5)*60.0; float m=txl(s,cc,4.0).a; if(m<0.04||txl(s,cc,1.0).a>0.3) continue;",
    "  float ph=fract(t/2.6+h*5.0); float life=ss(ph/0.08)*(1.0-ss((ph-0.55)/0.1)); if(life<=0.0) continue; vec2 p=P-cc+boil(P,t)*0.6;",
    "  float r=15.0+h*10.0; float d=star4(p,r*life); vec3 col=h>0.75?vec3(1.0,0.54,0.3):h>0.6?vec3(0.36,0.42,1.0):vec3(0.94,0.42,0.63);",
    "  float fill=sat(0.6-d*1.2); acc=acc*(1.0-fill)+vec4(col*fill,fill); } return acc; }",
    "vec3 flecks(sampler2D s,vec2 P,float t){ vec3 acc=vec3(0); for(int k=0;k<8;k++){",
    "  vec2 cell=floor(P/22.0)+vec2(float(k),float(k)*0.4); float h=hash(cell*2.31); if(h<0.9) continue;",
    "  vec2 base=(cell+0.5)*22.0; vec4 b=txl(s,base,1.5); if(b.a<0.6) continue; float l=fract(t*0.32+h*5.0);",
    "  vec2 e=base+vec2(-l*150.0,-l*40.0+l*l*90.0); vec2 d=P-e; acc+=b.rgb/b.a*exp(-dot(d,d)/(2.0+h*3.0))*(1.0-l)*1.6; } return acc;}"
  ].join("\n");

  var VS_QUAD = "#version 300 es\nin vec2 pos; out vec2 P; void main(){P=vec2(pos.x*0.5+0.5,0.5-pos.y*0.5)*vec2(1300.0,1000.0);gl_Position=vec4(pos,0,1);}";

  var FS_QUAD = COMMON + "\nin vec2 P; out vec4 o;\n" + [
    "vec4 outc(vec4 c, vec3 E){ c.rgb+=E*winF(P); c.a=max(c.a, sat(max(E.r,max(E.g,E.b)))*winF(P)); return c; }",
    "void main(){",
    " vec4 c=vec4(0); vec3 E=vec3(0);",
    " float r=length(P-TAP)+1e-3;",
    " if(mode==-1){ c=tx(A,P); E=halo(A,P)*0.5; }",
    // 0 · líquido
    " else if(mode==0){",
    "  float amp=38.0*pow(sin(PI*p),1.1); float w=amp*sin(r/24.0-p*24.0)*exp(-r/760.0);",
    "  vec2 d=w*(P-TAP)/r; float R=-120.0+1650.0*eio(p); float m=ss((R-r)/190.0);",
    "  vec4 a=vec4(tx(A,P+d*1.45).r, tx(A,P+d).g, tx(A,P+d*0.55).b, tx(A,P+d).a);",
    "  vec2 d2=-d*(1.0-p);",
    "  vec4 b=vec4(tx(B,P+d2*1.45).r, tx(B,P+d2).g, tx(B,P+d2*0.55).b, tx(B,P+d2).a);",
    "  c=mix(a,b,m); float edge=exp(-pow((r-R)/60.0,2.0))*sin(PI*p);",
    "  E=edge*(max(a.a,b.a)*1.1+0.05)*vec3(0.55,0.78,1.0) + mix(halo(A,P),halo(B,P),m)*0.5;",
    " }",
    // 3 · haz de luz
    " else if(mode==3){",
    "  float an=radians(-22.0); vec2 dir=vec2(cos(an),sin(an));",
    "  float s0=dot(vec2(150,100),dir), s1=dot(vec2(1150,700),dir), s2=dot(vec2(150,700),dir), s3=dot(vec2(1150,100),dir);",
    "  float mn=min(min(s0,s1),min(s2,s3)), mx=max(max(s0,s1),max(s2,s3));",
    "  float s=(dot(P,dir)-mn)/(mx-mn); float b=-0.12+1.24*eio(p); float m=ss((b-s)/0.03);",
    "  vec4 a=tx(A,P), bb=tx(B,P); c=mix(a,bb,m); float u=max(a.a,bb.a);",
    "  float beam=exp(-pow((s-b)/0.016,2.0)), glow=exp(-pow((s-b)/0.08,2.0));",
    "  E=((beam*2.0+glow*0.35)*u+glow*0.04)*vec3(1.0,0.88,0.62)*sqrt(sin(PI*min(1.0,p*1.05)));",
    "  float st=sin(PI*p); st*=st; float dy=abs(P.y-400.0);",
    "  E+=(exp(-dy*dy/9.0)*1.3+exp(-dy*dy/500.0)*0.25)*exp(-pow((P.x-650.0)/560.0,2.0))*st*vec3(1.0,0.85,0.6);",
    "  E+=mix(halo(A,P),halo(B,P),m)*0.5;",
    " }",
    // 4 · combustión
    " else if(mode==4){",
    "  float n2=sat((fbm(P/150.0)*0.62+fbm(P/38.0)*0.18+r/1500.0*0.5-0.30)/0.62);",
    "  float th=-0.06+1.12*seg(p,0.0,0.66);",
    "  vec4 a=tx(A,P); float keep=ss((n2-th)/0.02); float ch=1.0-0.75*exp(-pow((n2-th)/0.07,2.0));",
    "  vec4 ak=vec4(a.rgb*keep*ch, a.a*keep);",
    "  float edge=exp(-pow((n2-th)/0.022,2.0))*a.a*step(th,1.02);",
    "  E=edge*vec3(1.0,0.5,0.12)*2.4+pow(edge,3.0)*vec3(1.0,0.92,0.65)*1.6;",
    "  for(int k=0;k<3;k++){ float fk=float(k); vec2 Q=P+vec2(sin(P.y*0.02+fk*2.0+p*9.0)*8.0, p*TR*(180.0+fk*90.0));",
    "   vec2 cell=floor(Q/(7.0+fk*3.0)); float h=hash(cell+fk*17.0);",
    "   if(h>0.93){ vec2 cc=(cell+0.5)*(7.0+fk*3.0); float dd=length(Q-cc);",
    "    float n3=sat((fbm(cc/150.0)*0.62+fbm(cc/38.0)*0.18+length(cc-TAP)/1500.0*0.5-0.30)/0.62);",
    "    float burnt=ss((th-n3)/0.05)*(1.0-ss((th-n3-0.25)/0.1)); float src=txl(A,cc,2.0).a;",
    "    E+=vec3(1.0,0.55,0.16)*2.0*exp(-dd*dd/3.0)*burnt*src; } }",
    "  float k=ss((p-0.46)/0.44); vec2 Pb=P+vec2(0.0,-(1.0-eo(seg(p,0.46,0.95)))*50.0);",
    "  vec4 bb=txl(B,Pb,(1.0-k)*3.0)*k; E+=bb.rgb*(1.0-k)*1.2*vec3(1.0,0.6,0.3)+halo(B,Pb)*k*0.5+halo(A,P)*keep*0.4;",
    "  c=bb*(1.0-ak.a)+ak;",
    " }",
    // 5 · humo y neón
    " else if(mode==5){",
    "  float q=seg(p,0.0,0.62); float nb=fbm(P/120.0+vec2(0.0,time*0.3)), na=fbm(P/160.0+3.1);",
    "  vec2 Pa=P+vec2((na-0.5)*q*150.0, q*(90.0+120.0*nb));",
    "  vec4 a=txl(A,Pa,q*4.0); float g=dot(a.rgb,vec3(0.33));",
    "  a.rgb=mix(a.rgb, vec3(g)*vec3(0.8,0.75,1.0), q*0.8); a*=1.0-ss(q);",
    "  float lv=0.06*ss((p-0.42)/0.06);",
    "  if(p>=0.50&&p<0.52)lv=max(lv,0.55); if(p>=0.555&&p<0.565)lv=max(lv,0.2);",
    "  if(p>=0.60&&p<0.635)lv=max(lv,0.85); if(p>=0.66&&p<0.672)lv=max(lv,0.3);",
    "  if(p>=0.70)lv=1.0+0.35*exp(-(p-0.70)*14.0);",
    "  vec4 b=tx(B,P)*min(1.0,lv); E=tx(B,P).rgb*lv*0.55+halo(B,P)*lv*1.1+halo(A,Pa)*(1.0-q)*0.3;",
    "  c=b*(1.0-a.a)+a;",
    " }",
    // 6 · glitch
    " else if(mode==6){",
    "  float g=pow(sin(PI*p),0.6); float sd=floor(time*20.0);",
    "  float pb=ss((p-0.22)/0.5); float bi=floor(P.y/800.0*14.0+hash(vec2(sd,1.0))*3.0);",
    "  float h1=hash(vec2(bi,sd)), h2=hash(vec2(bi+7.0,sd)), h3=hash(vec2(bi+3.0,sd*1.3));",
    "  float sh=(h1-0.5)*170.0*g*step(h3,0.55); vec2 Q=P+vec2(sh,0.0); float s=16.0*g;",
    "  bool useB=h2<pb;",
    "  vec4 m0=useB?tx(B,Q):tx(A,Q); vec4 mr=useB?tx(B,Q-vec2(s,0)):tx(A,Q-vec2(s,0)); vec4 mb=useB?tx(B,Q+vec2(s,0)):tx(A,Q+vec2(s,0));",
    "  c=vec4(mr.r,m0.g,mb.b,max(m0.a,max(mr.a,mb.a)));",
    "  vec2 cell=floor(P/vec2(150.0,32.0)); if(hash(cell+sd)>1.0-0.09*g){ vec4 t2=(hash(cell*1.7+sd)<0.5?tx(A,P+vec2((hash(cell+3.0)-0.5)*180.0,0)):tx(B,P+vec2((hash(cell+5.0)-0.5)*180.0,0))); c=vec4(t2.b,t2.r,t2.g,t2.a);}",
    "  c*=1.0-0.3*g*step(mod(P.y,3.0),1.0);",
    "  float line=step(0.985,hash(vec2(floor(P.y/2.0),sd)))*g; E=vec3(0.7,0.9,1.0)*line*0.6*(c.a*0.6+0.15)+mix(halo(A,P),halo(B,P),pb)*0.45;",
    " }",
    // 7 · tinta
    " else if(mode==7){",
    "  float na=fbm(P/150.0), nf=fbm(P/40.0+9.0), nb=fbm(P/140.0+4.0);",
    "  float f=r/900.0+0.42*(na-0.5)+0.14*(nf-0.5); float th=-0.3+1.75*eio(p);",
    "  float m=ss((th-f)/0.016); float nr=exp(-pow((th-f)/0.09,2.0)); float thin=exp(-pow((th-f)/0.012,2.0));",
    "  vec4 a=tx(A,P+vec2((nb-0.5)*80.0*nr,(na-0.5)*80.0*nr)); vec4 b=tx(B,P);",
    "  c=mix(a,b,m); float u=max(a.a,b.a); c.rgb*=1.0-0.6*nr*u;",
    "  float hue=sin(atan(P.y-TAP.y,P.x-TAP.x)*2.0+p*4.0)*0.5+0.5;",
    "  E=thin*(u*1.6+0.12)*mix(vec3(0.45,0.25,1.0),vec3(1.0,0.5,0.25),hue)*pow(sin(PI*p),0.4)+mix(halo(A,P),halo(B,P),m)*0.5;",
    " }",
    // 8 · calor
    " else if(mode==8){",
    "  float amp=20.0*sin(PI*min(1.0,p*1.2));",
    "  vec2 d=vec2(fbm(P/90.0+vec2(0.0,time*1.6))-0.5, (fbm(P/120.0+vec2(5.0,time*0.9))-0.5)*0.6)*amp;",
    "  float q=seg(p,0.0,0.5); vec4 a=tx(A,P+d); a.rgb*=vec3(1.0+0.7*q,1.0-0.25*q,1.0-0.55*q);",
    "  float nC=sat((fbm(P/38.0)*0.45+fbm(P/150.0+2.0)*0.55-0.22)/0.56); float th=-0.08+1.2*seg(p,0.28,0.8);",
    "  float kA=ss((nC-th)/0.025); vec4 b=tx(B,P+d*(1.0-seg(p,0.5,1.0)));",
    "  c=mix(b,a,kA); float cr=exp(-pow((nC-th)/0.02,2.0))*max(a.a,b.a)*step(0.0,th)*step(th,1.05);",
    "  E=cr*vec3(1.0,0.35,0.08)*2.6+pow(cr,3.0)*vec3(1.0,0.85,0.5)*1.4+mix(halo(B,P),halo(A,P),kA)*0.55;",
    " }",
    // 2 · base del vórtice
    " else if(mode==12){",
    "  c=tx(A,P)*(1.0-ss(p/0.16))+tx(B,P)*ss((p-0.82)/0.18);",
    "  float rc=length(P-vec2(650.0,400.0)); float sg=12.0+26.0*sin(PI*p);",
    "  E=exp(-rc*rc/(2.0*sg*sg))*pow(sin(PI*p),2.0)*0.55*vec3(0.7,0.55,1.0)+halo(B,P)*ss((p-0.82)/0.18)*0.5;",
    " }",
    // 9 · base de la implosión
    " else if(mode==19){",
    "  float q=seg(p,0.0,0.48); vec4 a=tx(A,P)*(1.0-ss(p/0.12));",
    "  float rc=length(P-vec2(650.0,400.0)); float core=pow(ss(q),2.0)*(1.0-ss((p-0.5)/0.12));",
    "  E=exp(-rc*rc/(2.0*pow(10.0+40.0*q,2.0)))*3.5*core*vec3(1.0,0.9,1.0);",
    "  float tb=(p-0.5)*TR_;",
    "  if(tb>0.0){",
    "   float s=0.12+0.88*(1.0-exp(-5.5*tb)*cos(12.0*tb)); vec2 Pb=vec2(650.0,400.0)+(P-vec2(650.0,400.0))/s;",
    "   vec4 b=tx(B,Pb)*ss(tb/0.06); E+=b.rgb*exp(-tb*6.0)*1.6+halo(B,Pb)*0.6;",
    "   c=b*(1.0-a.a)+a;",
    "   float R=eo(tb/1.1)*1100.0, sk=1.0-ss(tb/1.1); E+=exp(-pow((rc-R)/9.0,2.0))*sk*0.9*vec3(0.8,0.7,1.0)+exp(-pow((rc-R)/50.0,2.0))*sk*0.15*vec3(0.6,0.5,1.0);",
    "   E+=exp(-rc*rc/(2.0*260.0*260.0))*0.9*exp(-tb*9.0)*vec3(0.95,0.92,1.0);",
    "  } else c=a;",
    " }",
    // toque (onda) — se suma en todos los modos
    // ===== reposo vivo: cada logo con su propia animación =====
    " else if(mode>=100&&mode<200){ int id=mode-100; vec4 a=tx(A,P); float t=time; vec2 C=vec2(650.0,400.0);",
    "  c=a; E=halo(A,P)*0.5;",
    "  if(id==0){",
    "   vec2 dir=normalize(vec2(1.0,0.45)); float s=dot(P,dir)/1400.0; float b=fract(t*0.16)*2.2-0.6;",
    "   float sh=exp(-pow((s-b)/0.035,2.0))+0.35*exp(-pow((s-b+0.06)/0.02,2.0));",
    "   c.rgb*=1.0+0.07*sin(t*1.1+P.x/260.0); E+=sh*a.a*vec3(1.0,0.97,1.0)*0.5;",
    "  } else if(id==1){",
    "   vec2 wob=vec2(fbm(P/320.0+vec2(t*0.22,0.0))-0.5, fbm(P/320.0+vec2(9.0,-t*0.18))-0.5)*14.0;",
    "   vec4 ab=tx(A,P+wob);",
    "   vec2 dir=vec2(cos(fbm(P/280.0+t*0.04)*9.0), sin(fbm(P/280.0+t*0.04)*9.0));",
    "   vec4 fl=flowSample(A,P+wob,dir,t,0.2,26.0); vec3 col=fl.a>0.03?fl.rgb/fl.a:ab.rgb/max(ab.a,1e-3);",
    "   c=vec4(mix(ab.rgb/max(ab.a,1e-3),col,ss(fl.a/0.3))*ab.a,ab.a);",
    "   vec2 q=P/68.0; q+=vec2(sin(q.y*1.7+t*1.2),cos(q.x*1.3-t*1.0))*0.9;",
    "   float v=abs(sin(q.x*2.0+t*1.1)+sin(q.y*2.3-t*1.3)+sin((q.x+q.y)*1.5+t*0.8));",
    "   float caust=pow(sat(1.0-v*0.5),5.0);",
    "   float edge=sat((ab.a-txl(A,P+wob,2.6).a)*3.0);",
    "   float rim=pow(0.5+0.5*sin(P.x/110.0+P.y/190.0-t*2.4),8.0);",
    "   float bub=0.0; for(int k=0;k<2;k++){ float cs=26.0+float(k)*14.0; vec2 Q=P+vec2(0.0,t*(42.0+float(k)*25.0));",
    "    vec2 cell=floor(Q/cs); float h=hash(cell+float(k)*31.0); if(h>0.9){ vec2 cc=(cell+0.5)*cs+vec2(sin(t*2.0+h*40.0)*4.0,0.0);",
    "     float rr=2.5+h*5.0; float d=length(Q-cc); bub+=exp(-pow((d-rr)/0.9,2.0))*0.9+exp(-dot(Q-cc-vec2(-rr*0.35,-rr*0.35),Q-cc-vec2(-rr*0.35,-rr*0.35))/1.2)*0.8; } }",
    "   float m=ss((ab.a-0.4)/0.4);",
    "   E=halo(A,P+wob)*0.55+caust*m*vec3(0.75,0.92,1.0)*0.95+edge*rim*vec3(0.85,0.95,1.0)*1.6+edge*0.18*vec3(0.6,0.8,1.0)+bub*m*vec3(0.85,0.95,1.0)*0.8;",
    "  } else if(id==2){",
    "   float f=hash(floor(P/58.0)); c.rgb*=1.0+0.22*sin(t*0.9+f*6.28);",
    "   E+=glints(P,t,24.0,0.86,a.a)*vec3(0.85,0.92,1.0)*1.3;",
    "  } else if(id==3){",
    "   float an=0.06*sin(t*0.22); vec2 q=P-C; vec2 rp=C+vec2(q.x*cos(an)-q.y*sin(an),q.x*sin(an)+q.y*cos(an));",
    "   vec2 fl=rp-P+vec2(fbm(P/120.0+t*0.05)-0.5,fbm(P/120.0+7.0-t*0.05)-0.5)*12.0; c=flowc(A,P,fl,a);",
    "   E+=glints(P,t*1.6,11.0,0.93,a.a)*vec3(1.0)*1.1;",
    "   float u=fract(t/4.6); vec2 st=vec2(220.0,180.0)+vec2(1.0,0.42)*u*1150.0; vec2 dv=normalize(vec2(1.0,0.42));",
    "   vec2 rel=P-st; float al=dot(rel,dv); float pe=length(rel-dv*al);",
    "   float tail=exp(-pe*pe/3.0)*step(-160.0,al)*step(al,0.0)*(1.0+al/160.0)*step(u,0.55);",
    "   E+=tail*vec3(1.0,0.95,1.0)*1.6*max(a.a,0.15);",
    "  } else if(id==4){",
    "   vec2 dir=normalize(vec2(1.0,-0.3)); float s=dot(P,dir)/1400.0+0.3; float b=fract(t/3.2)*2.0-0.5;",
    "   float sh=exp(-pow((s-b)/0.05,2.0))*1.1+exp(-pow((s-b)/0.012,2.0))*0.8;",
    "   E+=sh*a.a*vec3(1.0,0.9,0.6)*0.75+glints(P,t*0.8,30.0,0.95,a.a)*vec3(1.0,0.92,0.7)*1.1;",
    "  } else if(id==5){",
    "   vec2 fl=vec2((fbm(P/70.0+vec2(0.0,t*1.4))-0.5)*14.0,(fbm(P/55.0+vec2(3.0,t*1.9))-0.5)*24.0+6.0);",
    "   vec4 fd=tx(A,P+fl); c=vec4(fd.rgb, fd.a); c.rgb*=1.0+0.18*sin(t*7.0+P.y/30.0);",
    "   E+=embersIdle(A,P,t,vec3(1.0,0.55,0.18))+halo(A,P)*0.25*(0.8+0.4*sin(t*5.0));",
    "  } else if(id==6){",
    "   float fl=1.0+0.035*sin(t*61.0)+0.025*sin(t*37.0); float ph=fract(t*0.23);",
    "   if(ph<0.035) fl*=0.35+0.65*step(0.5,fract(ph*140.0)); if(fract(t*0.11+0.4)<0.012) fl*=0.6;",
    "   c=vec4(a.rgb*fl,a.a); E=(a.rgb*0.35+halo(A,P)*(0.9+0.35*sin(t*2.1)))*fl;",
    "  } else if(id==7){",
    "   float h=sin(t*0.7+P.x/380.0-P.y/520.0)*1.4; c.rgb=hueRot(a.rgb,h);",
    "   vec2 dir=normalize(vec2(1.0,0.6)); float s=dot(P,dir)/900.0-t*0.18;",
    "   E+=rainbow(fract(s))*a.a*0.28*(0.6+0.4*sin(t*1.3));",
    "  } else if(id==8){",
    "   vec2 wob=vec2(fbm(P/240.0+vec2(t*0.3,0.0))-0.5, fbm(P/240.0+vec2(6.0,-t*0.26))-0.5)*9.0;",
    "   vec4 ab=tx(A,P+wob);",
    "   float ang=fbm(P/300.0+vec2(t*0.035,-t*0.02))*10.0; vec2 dir=vec2(cos(ang),sin(ang));",
    "   vec3 base=ab.rgb/max(ab.a,1e-3);",
    "   vec4 f0=flowSample(A,P+wob,dir,t,0.22,48.0);",
    "   vec4 fx1=flowSample(A,P+wob+vec2(3,0),dir,t,0.22,48.0), fy1=flowSample(A,P+wob+vec2(0,3),dir,t,0.22,48.0);",
    "   vec3 col=f0.a>0.03?f0.rgb/f0.a:base; col=mix(base,col,ss(f0.a/0.3));",
    "   float l0=dot(col,vec3(0.3,0.5,0.2)), lx=dot(fx1.rgb/max(fx1.a,0.03),vec3(0.3,0.5,0.2)), ly=dot(fy1.rgb/max(fy1.a,0.03),vec3(0.3,0.5,0.2));",
    "   vec3 n=normalize(vec3((l0-lx)*6.0,(l0-ly)*6.0,1.0)); vec3 L=normalize(vec3(cos(t*0.6)*0.7,-0.6+sin(t*0.45)*0.3,0.8));",
    "   float spec=pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.0),26.0);",
    "   c=vec4(col*ab.a*(0.92+0.16*n.z),ab.a);",
    "   for(int k=0;k<3;k++){ vec2 tip=DRIP[k]; float per=2.4+float(k)*0.45; float ph=fract(t/per+float(k)*0.37);",
    "    vec3 dc=tx(A,tip-vec2(0.0,6.0)).rgb/max(tx(A,tip-vec2(0.0,6.0)).a,0.05);",
    "    float grow=ss(ph/0.45); float fall=sat((ph-0.45)/0.55); vec2 dp=tip+vec2(0.0,3.0+grow*7.0+fall*fall*135.0);",
    "    vec2 d=(P-dp)/vec2(1.0,1.0+fall*1.6); float rr=(4.0+grow*8.0)*(1.0-fall*0.3);",
    "    float da=ss((rr-length(d))/1.5)*(1.0-ss((fall-0.7)/0.3));",
    "    float neck=ss((3.5*(1.0-fall*2.0)-abs(P.x-tip.x))/1.0)*step(tip.y-2.0,P.y)*step(P.y,dp.y)*step(fall,0.5)*grow;",
    "    da=max(da,neck); c=c*(1.0-da)+vec4(dc*da,da); spec+=da*0.4*exp(-dot(P-dp+vec2(rr*0.4,rr*0.4),P-dp+vec2(rr*0.4,rr*0.4))/3.0); }",
    "   E=halo(A,P+wob)*0.5+spec*vec3(1.0,0.97,0.95)*0.85*max(ab.a,0.0);",
    "  } else if(id==9){",
    "   float hot=ss((a.r/max(a.a,0.02)-0.55)/0.35)*ss((0.5-a.b/max(a.a,0.02))/0.4);",
    "   float pulse=0.5+0.5*sin(t*2.3+fbm(P/45.0)*7.0);",
    "   vec2 fl=vec2((fbm(P/90.0+vec2(0.0,t*1.1))-0.5)*5.0,(fbm(P/110.0+vec2(4.0,t*0.8))-0.5)*4.0); c=flowc(A,P,fl,a);",
    "   E+=c.rgb*hot*pulse*1.1+embersIdle(A,P,t*0.8,vec3(1.0,0.42,0.1))*0.8+halo(A,P)*0.2*pulse;",
    // 10 · código ASCII: los caracteres mutan, un barrido refresca las filas, desgarros de línea
    "  } else if(id==10){",
    "   float row=floor(P.y/CELL.y); float tq=floor(t*5.0); float tear=step(0.965,hash(vec2(row,tq)))*floor((hash(vec2(row+5.0,tq))-0.5)*6.0);",
    "   vec2 Pt=P-vec2(tear*CELL.x,0.0); vec2 cell=floor(Pt/CELL), uv=fract(Pt/CELL); vec4 o=ocell(cell); float on=step(0.5,o.a);",
    "   float scanY=fract(t*0.11)*1300.0-250.0; float dsc=(cell.y+0.5)*CELL.y-scanY;",
    "   float inS=step(0.0,dsc)*step(dsc,CELL.y*2.2);",
    "   float g=inS>0.5?gidx(cell,floor(t*24.0)+77.0):gIdle(cell,t);",
    "   float lock=step(dsc,0.0)*exp(dsc/70.0);",
    "   vec3 col=ocol(o,cell)*1.15*(0.92+0.08*sin(t*2.0+cell.x*0.4+cell.y*0.7))*(1.0+lock*0.9+inS*0.5);",
    "   float cov=glyph(uv,g)*on; c=vec4(col*cov,cov); c.rgb*=0.9+0.1*step(1.0,mod(P.y,3.0));",
    "   E=halo(A,P)*0.4+col*cov*(0.16+lock*0.5)+exp(-pow((P.y-scanY)/2.5,2.0))*0.35*vec3(0.65,0.75,1.0)*ss(txl(O,P,3.0).a/0.25);",
    // 11 · piedra: luz rasante que recorre el relieve, magma que respira en las vetas, chispas
    "  } else if(id==11){",
    "   float l0=luma(a), lx=luma(tx(A,P+vec2(2.0,0.0))), ly=luma(tx(A,P+vec2(0.0,2.0)));",
    "   vec3 n=normalize(vec3((l0-lx)*5.0,(l0-ly)*5.0,1.0)); vec3 L=normalize(vec3(cos(t*0.45)*0.9,sin(t*0.45)*0.5-0.3,0.75));",
    "   vec3 col=a.rgb/max(a.a,0.02); float hot=ss((col.r-col.b-0.3)/0.3)*a.a;",
    "   c.rgb=a.rgb*mix(0.6+0.42*dot(n,L),1.0,hot*0.6);",
    "   float flow=fbm(P/26.0+vec2(t*0.25,-t*0.4)); float pulse=0.55+0.45*sin(t*1.7+flow*6.0);",
    "   E=halo(A,P)*0.25+hot*col*(0.25+1.0*flow*pulse)+hotEmbers(A,P,t)*0.9;",
    // 12 · mármol: las vetas fluyen despacio y un reflejo pulido cruza la superficie
    "  } else if(id==12){",
    "   float l0=luma(txl(A,P,1.5)), lx=luma(txl(A,P+vec2(4.0,0.0),1.5)), ly=luma(txl(A,P+vec2(0.0,4.0),1.5));",
    "   vec2 gr=vec2(lx-l0,ly-l0); vec2 dir=normalize(vec2(-gr.y,gr.x)+vec2(1e-4,0.0));",
    "   vec4 fl=flowSample(A,P,dir,t,0.08,24.0); vec3 base=a.rgb/max(a.a,1e-3); vec3 cf=fl.a>0.03?fl.rgb/fl.a:base;",
    "   c=vec4(mix(base,cf,ss(fl.a/0.3))*a.a,a.a);",
    "   float s=dot(P,normalize(vec2(1.0,-0.6)))/1500.0-t*0.06; float sheen=pow(0.5+0.5*sin(fract(s)*6.2832),22.0)+0.5*pow(0.5+0.5*sin(fract(s+0.08)*6.2832),60.0);",
    "   vec3 n=normalize(vec3(gr*14.0,1.0)); float sp=pow(max(dot(n,normalize(vec3(0.3,-0.4,1.0))),0.0),40.0);",
    "   E=halo(A,P)*0.2+(sheen*0.4+sp*0.2)*a.a*vec3(1.0,0.99,0.97);",
    // 13 · metal hielo: niebla interna, escarcha que crece en los bordes, vaho frío que cae
    "  } else if(id==13){",
    "   float f=fbm(P/70.0+vec2(t*0.15,t*0.05)); c.rgb=a.rgb*(0.82+0.38*f);",
    "   float edge=sat((a.a-txl(A,P,2.5).a)*3.0); float gw=0.5+0.5*sin(t*0.5);",
    "   float fr=ss((fbm(P/7.0+11.0)-0.62+0.12*gw)/0.07)*edge;",
    "   float m=fbm(vec2(P.x/80.0,P.y/55.0-t*0.35)); float below=txl(A,P-vec2(0.0,55.0),4.5).a;",
    "   E=halo(A,P)*(0.45+0.15*gw)+fr*vec3(0.9,0.97,1.0)*1.1+m*m*below*(1.0-a.a)*0.5*vec3(0.6,0.8,1.0)+glints(P,t,22.0,0.9,a.a)*vec3(0.85,0.95,1.0)*1.3;",
    // 14 · pinceladas: las cerdas corren a lo largo del trazo, brillo húmedo, salpicaduras
    "  } else if(id==14){",
    "   float l0=luma(txl(A,P,1.0)), lx=luma(txl(A,P+vec2(3.0,0.0),1.0)), ly=luma(txl(A,P+vec2(0.0,3.0),1.0));",
    "   vec2 gr=vec2(lx-l0,ly-l0); vec2 dir=normalize(vec2(-gr.y,gr.x)+vec2(1e-4,0.0)); if(dir.x<0.0) dir=-dir;",
    "   vec4 fl=flowSample(A,P,dir,t,0.14,18.0); vec3 base=a.rgb/max(a.a,1e-3); vec3 cf=fl.a>0.03?fl.rgb/fl.a:base;",
    "   c=vec4(mix(base,cf,ss(fl.a/0.3))*a.a,a.a);",
    "   vec3 n=normalize(vec3(gr*10.0,1.0)); vec3 L=normalize(vec3(cos(t*0.6)*0.7,-0.6+sin(t*0.45)*0.3,0.8));",
    "   float spec=pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.0),30.0);",
    "   E=halo(A,P)*0.5+spec*a.a*0.7*vec3(1.0,0.98,0.96)+flecks(A,P,t);",
    // 15 · glitch RGB: estable con ráfagas de corrupción, separación de canales y barra de barrido
    "  } else if(id==15){",
    "   float sd=floor(t*14.0); float burst=min(1.0,step(fract(t/1.9),0.12)+step(0.985,hash(vec2(sd,3.0))));",
    "   float split=1.5+burst*13.0+sin(t*3.0)*1.0;",
    "   float bh=10.0+20.0*hash(vec2(sd,9.0)); float bi=floor(P.y/bh); float sh=(hash(vec2(bi,sd))-0.5)*90.0*burst*step(0.6,hash(vec2(bi+3.0,sd)));",
    "   vec2 Q=P+vec2(sh,0.0); vec4 r0=tx(A,Q-vec2(split,0.0)), g0=tx(A,Q), b0=tx(A,Q+vec2(split,0.0));",
    "   c=vec4(r0.r,g0.g,b0.b,max(g0.a,max(r0.a,b0.a)));",
    "   vec2 cl=floor(P/vec2(80.0,18.0)); if(burst>0.5&&hash(cl+sd)>0.93){ vec4 t2=tx(A,P+vec2((hash(cl+3.0)-0.5)*160.0,0.0)); c=vec4(t2.b,t2.r,t2.g,t2.a); }",
    "   c.rgb*=0.88+0.12*step(1.0,mod(P.y,3.0));",
    "   float bar=exp(-pow((P.y-mod(t*170.0,1150.0)+150.0)/26.0,2.0));",
    "   E=halo(A,P)*0.5+bar*0.18*c.a*vec3(0.7,0.9,1.0)+step(0.985,hash(vec2(floor(P.y/2.0),sd)))*burst*0.5*vec3(0.7,0.9,1.0)*(c.a*0.6+0.1);",
    // 16 · selva: viento entre las hojas, luz moteada que se mueve, luciérnagas
    "  } else if(id==16){",
    "   float gust=0.6+0.4*sin(t*0.4); vec2 wd=vec2(sin(t*1.3+P.y/90.0+fbm(P/200.0)*4.0),cos(t*1.1+P.x/120.0)*0.4)*3.5*gust;",
    "   c=flowc(A,P,wd,a); float lt=fbm(P/90.0+vec2(t*0.08,t*0.03)); c.rgb*=0.8+0.45*ss((lt-0.45)/0.2);",
    "   E=halo(A,P)*0.35+fireflies(P,t,A)+glints(P,t*0.7,26.0,0.95,a.a)*vec3(0.9,1.0,0.85)*0.9;",
    // 17 · cromo afilado: reflejos del entorno en movimiento, destello que corta, filo naranja que respira
    "  } else if(id==17){",
    "   float l0=luma(txl(A,P,1.0)), lx=luma(txl(A,P+vec2(3.0,0.0),1.0)), ly=luma(txl(A,P+vec2(0.0,3.0),1.0));",
    "   vec3 n=normalize(vec3((l0-lx)*7.0,(l0-ly)*7.0,1.0)); vec3 rr=reflect(vec3(0.0,0.0,-1.0),n);",
    "   vec3 col=a.rgb/max(a.a,0.02); float hot=ss((col.r-col.b-0.25)/0.3)*a.a; float br=ss((l0/max(a.a,0.02)-0.35)/0.4);",
    "   vec2 dir=normalize(vec2(1.0,-0.35)); float s=dot(P,dir)/1400.0+0.3; float b=fract(t/3.4)*2.2-0.6;",
    "   float sh=exp(-pow((s-b)/0.03,2.0))*1.2+exp(-pow((s-b)/0.006,2.0))*1.4;",
    "   E=halo(A,P)*0.3+env(rr,t)*a.a*0.32*br+sh*a.a*br*vec3(1.0,0.98,1.0)*0.8+hot*col*(0.4+0.6*pow(0.5+0.5*sin(t*2.2),2.0))+glints(P,t*0.9,28.0,0.93,a.a*br)*1.4;",
    // 18 · píxel 8-bit: pantalla LED con onda de brillo, píxeles que titilan, relieve de cada cuadro
    "  } else if(id==18){",
    "   vec2 cell=floor(P/PX), uv=fract(P/PX); vec4 o=pcell(cell); float on=step(0.5,o.a); float cov=pbox(uv)*on;",
    "   float wave=pow(0.5+0.5*sin((cell.x+cell.y)*0.35-t*3.0),4.0); float tw=step(0.988,hash(cell+floor(t*6.0)));",
    "   vec3 col=o.rgb/max(o.a,1e-3)*bevel(uv)*(0.85+0.35*wave); col=mix(col,vec3(1.0),tw*0.7);",
    "   c=vec4(col*cov,cov); E=halo(A,P)*0.4+col*cov*(0.15+0.3*wave+tw);",
    // 19 · esténcil urbano: gotas frescas de pintura que escurren, rocío de aerosol que titila
    "  } else if(id==19){",
    "   float ring=sat(txl(A,P,2.5).a-a.a); float sp=step(0.965,hash(floor(P/2.0)))*ring*(0.6+0.4*step(0.5,hash(floor(P/2.0)+floor(t*3.0))));",
    "   vec3 sc=txl(A,P,2.5).rgb/max(txl(A,P,2.5).a,0.05); c=a+vec4(sc*sp*0.8,sp*0.8)*(1.0-a.a);",
    "   for(int k=0;k<3;k++){ vec2 tip=DRIP[k]; float per=3.2+float(k)*0.7; float ph=fract(t/per+float(k)*0.31);",
    "    vec3 dc=tx(A,tip-vec2(0.0,5.0)).rgb/max(tx(A,tip-vec2(0.0,5.0)).a,0.05); float L=ss(ph/0.7)*70.0; float fade=1.0-ss((ph-0.75)/0.25);",
    "    float line=ss((2.2-abs(P.x-tip.x))/1.0)*step(tip.y-3.0,P.y)*step(P.y,tip.y+L); vec2 bd=P-vec2(tip.x,tip.y+L); float bulb=ss((4.0-length(bd))/1.2);",
    "    float da=max(line,bulb)*fade; c=c*(1.0-da)+vec4(dc*da,da); }",
    "   float s=dot(P,normalize(vec2(1.0,0.5)))/1400.0-t*0.12; E=halo(A,P)*0.35+pow(0.5+0.5*sin(fract(s)*6.2832),30.0)*a.a*0.25;",
    // 20 · sello: el anillo de texto gira, una chispa recorre el círculo interior
    "  } else if(id==20){",
    "   vec2 C0=vec2(650.0,400.0); vec2 d=P-C0; float r0=length(d); float an=t*0.16*step(192.0,r0);",
    "   vec2 Pr=C0+vec2(d.x*cos(an)-d.y*sin(an),d.x*sin(an)+d.y*cos(an)); vec4 ar=tx(A,Pr); c=ar;",
    "   float th=atan(d.y,d.x); float arc=exp(-pow((r0-186.0)/3.0,2.0))*pow(0.5+0.5*cos(th-t*1.4),24.0);",
    "   vec2 dir=normalize(vec2(1.0,0.45)); float s=dot(P,dir)/700.0; float b=fract(t*0.2)*2.4-0.7; float sh=exp(-pow((s-b)/0.03,2.0))*step(r0,180.0);",
    "   E=halo(A,P)*0.3+arc*vec3(0.75,0.65,1.0)*1.8+sh*a.a*0.6+exp(-pow((r0-186.0)/14.0,2.0))*0.08*vec3(0.6,0.5,1.0)*(0.7+0.3*sin(t*1.7));",
    // 21 · líneas: corriente de luz que recorre los contornos de neón, parpadeo de tubo
    "  } else if(id==21){",
    "   vec2 dir=normalize(vec2(1.0,-0.55)); float s=dot(P-vec2(150.0,700.0),dir)/1300.0;",
    "   float ph=fract(t*0.26)*1.6-0.3; float cur=exp(-pow((s-ph)/0.05,2.0)); float cur2=exp(-pow((s-(fract(t*0.26+0.5)*1.6-0.3))/0.1,2.0))*0.45;",
    "   float lm=ss((a.a-0.35)/0.3); vec2 rg=floor(P/90.0); float fl=1.0-0.35*step(0.93,hash(rg+floor(t*2.5)))*step(0.5,fract(t*23.0+hash(rg)*3.0));",
    "   c.rgb=a.rgb*fl*(1.0+0.7*cur*lm);",
    "   E=halo(A,P)*(0.5+0.4*cur)*fl+a.rgb*lm*(cur*1.3+cur2)*fl;",
    // 22 · plano técnico: láser de trazado que barre, rejilla que late, círculo de construcción que gira
    "  } else if(id==22){",
    "   vec3 col=a.rgb/max(a.a,0.02); float w=ss((min(col.r,min(col.g,col.b))-0.6)/0.2)*a.a;",
    "   vec2 C1=vec2(510.3,306.9); vec2 dc=P-C1; float rc=length(dc); float th=atan(dc.y,dc.x);",
    "   float dash=exp(-pow((rc-155.2)/2.2,2.0))*step(0.55,fract(th*24.0/6.2832-t*0.6));",
    "   float rp=fract(length(P-vec2(650.0,400.0))/460.0-t*0.22); float grid=(1.0-w)*a.a*exp(-pow((rp-0.5)/0.04,2.0));",
    "   float sx=mod(t*240.0,1750.0)-220.0; float lz=exp(-pow((P.x-sx)/2.0,2.0))*ss(a.a/0.15);",
    "   float hit=w*exp(-pow((P.x-sx)/14.0,2.0));",
    "   E=halo(A,P)*0.3+w*0.12+grid*vec3(0.35,0.6,1.0)*0.45+dash*vec3(0.75,0.9,1.0)*0.8*ss(a.a/0.1)+lz*vec3(0.35,0.85,1.0)*0.55+hit*vec3(0.75,0.95,1.0)*1.4;",
    // 23 · collage: brisa que levanta el papel, luz rasante sobre la fibra, brillo en la cinta
    "  } else if(id==23){",
    "   vec2 wd=vec2(0.0,sin(P.x/90.0+t*1.7)*2.2+sin(P.x/37.0-t*2.3)*0.8)*(0.6+0.4*sin(t*0.5)); c=tx(A,P+wd);",
    "   float fib=fbm(P/3.0+11.0); float lt=0.5+0.5*sin(dot(P,vec2(0.004,0.003))*6.0-t*0.8); c.rgb*=0.93+0.1*fib*lt;",
    "   vec3 col=c.rgb/max(c.a,0.02); float tape=ss((0.15-abs(col.r-col.g))/0.1)*ss((col.r-col.b-0.08)/0.1)*ss((col.r-0.65)/0.1)*c.a;",
    "   float sh=dot(P,normalize(vec2(1.0,-0.4)))/1400.0; float b=fract(t/4.0)*2.0-0.5; float gl=exp(-pow((sh-b)/0.02,2.0));",
    "   E=halo(A,P)*0.3+tape*(0.15+gl*1.4)*vec3(1.0,0.97,0.9)+c.a*(1.0-tape)*gl*0.06;",
    // 24 · naïf: línea que hierve como dibujo animado y garabatos de estrellitas que aparecen
    "  } else if(id==24){",
    "   vec2 bd=boil(P,t); c=tx(A,P+bd); vec4 dd=doodles(P,t,A); c=c+dd*(1.0-c.a);",
    "   E=halo(A,P)*0.35+dd.rgb*0.25;",
    // 26 · risografía: el desregistro de la impresora se mueve, la trama respira, pasa el rodillo
    "  } else if(id==26){",
    "   vec2 offB=vec2(-9.0,7.0)+vec2(sin(t*0.6),cos(t*0.45))*3.0; float rad=3.6+0.9*sin(dot(P,vec2(0.012,0.008))-t*1.6);",
    "   c=riso(P,offB,1.0,rad,1.0,1.0); float roll=mod(t*150.0,1200.0)-200.0; float rb=exp(-pow((P.y-roll)/35.0,2.0));",
    "   E=halo(A,P)*0.35+rb*c.a*vec3(1.0,0.6,0.85)*0.18;",
    // 27 · retro 70s: rayos de sol que giran detrás, ondulación groovy, brillo
    "  } else if(id==27){",
    "   vec2 d=P-vec2(650.0,430.0); float th=atan(d.y,d.x); float r=length(d); float rays=step(0.5,fract(th*16.0/6.2832+t*0.025));",
    "   float rm=ss(1.0-r/640.0)*ss((r-80.0)/120.0)*(0.75+0.25*sin(t*1.2)); vec3 rc=mix(vec3(0.99,0.5,0.16),vec3(0.98,0.78,0.32),rays); float ra=0.13*rm*(0.4+0.6*rays);",
    "   vec2 Q=P+vec2(sin(P.y/48.0+t*1.6)*3.0,0.0); vec4 a2=tx(A,Q); a2.rgb*=0.9; c=a2+vec4(rc*ra,ra)*(1.0-a2.a);",
    "   float s=dot(P,normalize(vec2(1.0,-0.5)))/1300.0-t*0.09; E=halo(A,P)*0.1+pow(0.5+0.5*sin(fract(s)*6.2832),26.0)*a2.a*vec3(1.0,0.95,0.85)*0.2;",
    // 25 · geométrica (versión ligera): todo quieto salvo la pelotita, que rebota y se aplasta al caer, sin sombra
    "  } else if(id==25){",
    "   vec2 dc=vec2(1100.5,638.6); float R=47.4; float er=1.0-ss((length(P-dc)-R-1.0)/2.0); c=a*(1.0-er);",
    // rayitas de la F: se deslizan como pistones (se copia cada barra desplazada, sin cálculo extra)
    "   float sl=sin(t*1.5)*22.0;",
    "   if(P.y>90.0&&P.y<245.0&&P.x>745.0&&P.x<1165.0){ vec2 Q=P-vec2(sl,0.0); float m=step(775.0,Q.x)*step(Q.x,1133.0)*step(96.0,Q.y)*step(Q.y,239.0); c=tx(A,Q)*m; }",
    "   if(P.y>297.0&&P.y<451.0&&P.x>745.0&&P.x<1055.0){ vec2 Q=P+vec2(sl,0.0); float m=step(775.0,Q.x)*step(Q.x,1024.0)*step(302.0,Q.y)*step(Q.y,445.0); c=tx(A,Q)*m; }",
    // ojo de la R: el hueco mira alrededor y parpadea
    "   vec2 hc=vec2(442.4,270.5); float hr=66.9; if(length(P-hc)<hr+32.0){",
    "    float fillm=1.0-ss((length(P-hc)-hr)/1.5); c=mix(c,vec4(0.396,0.118,0.969,1.0)*max(c.a,fillm),fillm);",
    "    vec2 eye=vec2(cos(t*0.9)*19.0,sin(t*1.3)*12.0); float bl=fract(t/4.3); float blink=max(1.0-0.95*exp(-pow((bl-0.5)/0.025,2.0)),0.05);",
    "    vec2 e=P-hc-eye; e.y/=blink; float hole=sat(0.5-(length(e)-hr)*blink); c*=1.0-hole; }",
    "   float u=fract(t/1.2); float hgt=4.0*u*(1.0-u)*95.0; float sq=exp(-pow(min(u,1.0-u)*12.0,2.0))*0.28;",
    "   vec2 q=(P-vec2(dc.x,dc.y+R-hgt))/vec2(1.0+sq,1.0-sq); float al=sat(0.5-(length(q-vec2(0.0,-R))-R));",
    "   c=c*(1.0-al)+vec4(vec3(0.941,0.925,0.953)*al,al); E=halo(A,P)*0.4*ss((length(P-dc)-R-6.0)/60.0);",
    // 28 · manuscrita: una luz recorre la escritura en el mismo orden en que la pluma la trazó
    "  } else if(id==28){",
    "   float o=wOrd(P); float ph=fract(t*0.11)*1.35-0.15; float tr=exp(-pow((o-ph)/0.014,2.0))*step(o,1.5);",
    "   float gl=exp(-pow((o-ph+0.03)/0.05,2.0))*step(o,1.5)*0.35;",
    "   E=halo(A,P)*0.35+txl(A,P,4.0).a*vec3(0.4,0.12,0.97)*0.3+(tr*1.6+gl)*mix(vec3(0.9,0.82,1.0),a.rgb/max(a.a,0.05),0.4)*ss(a.a/0.3)+glints(P,t*0.8,20.0,0.95,a.a)*0.8;",
    // 29 · espacio negativo: el degradado fluye y a través del recorte se ve otro mundo: el espacio
    "  } else if(id==29){",
    "   c=negTile(A,P,t,1.0); float rim=sat((txl(A,P,1.5).a-a.a)*2.0)*sat(0.5-tileSd(P));",
    "   float s=dot(P,normalize(vec2(1.0,-0.7)))/1300.0; float b2=fract(t/4.5)*2.2-0.6; float sh=exp(-pow((s-b2)/0.03,2.0));",
    "   E=halo(A,P)*0.35+rim*vec3(1.0,0.6,0.95)*0.45+sh*a.a*0.4;",
    "  }",
    " }",
    // ===== charco universal: cada material se va y nace a su manera =====
    " else if(mode>=200){ int sb=mode-200; int sa=SA; float t=time;",
    "  vec2 PC=vec2(650.0,812.0); vec2 RAD=vec2(330.0,48.0);",
    "  vec4 mA=textureLod(A,vec2(0.5),20.0), mB=textureLod(B,vec2(0.5),20.0);",
    "  vec3 cA=mA.rgb/max(mA.a,1e-3), cB=mB.rgb/max(mB.a,1e-3); cA/=max(max(cA.r,max(cA.g,cA.b)),0.3); cB/=max(max(cB.r,max(cB.g,cB.b)),0.3);",
    // ---------- acto 1: el material se va ----------
    "  float q1=seg(p,0.0,0.44);",
    "  vec2 CS=vec2(650.0,400.0); vec2 dS=P-CS; float rS=length(dS); float anS=(sa==20&&rS>192.0)?(t*0.16+q1*q1*7.0):(sa==20?q1*q1*1.5:0.0);",
    "  vec2 Pz=sa==20?CS+vec2(dS.x*cos(anS)-dS.y*sin(anS),dS.x*sin(anS)+dS.y*cos(anS)):P;",
    "  float bsz=sa==15?mix(1.0,16.0,ss(q1/0.6)):1.0; vec2 Pg=sa==15?floor(P/bsz)*bsz+bsz*0.5:P;",
    "  float v=sat((Pg.y-90.0)/620.0); float dl=(1.0-v)*0.38; float qq=sat((q1-dl)/0.62);",
    "  float coln=fbm(vec2(Pg.x/120.0,1.7)); float fing=pow(fbm(vec2(Pg.x/34.0,4.2)),2.4);",
    "  float dy=qq*qq*(560.0+260.0*coln)+qq*qq*fing*240.0; float kx=0.55*q1*q1;",
    "  if(sa==5) dy*=0.4; if(sa==3) dy*=0.15;",
    "  if(sa==10||sa==11||sa==18||sa==23) dy=0.0;",
    "  if(sa==21) dy+=qq*qq*pow(fbm(vec2(Pg.x/5.0,3.0)),3.0)*520.0;",
    "  if(sa==19) dy+=qq*qq*pow(fbm(vec2(Pg.x/4.0,9.0)),4.0)*620.0;",
    "  if(sa==14) dy+=qq*qq*pow(fbm(vec2(Pg.x/7.0,2.0)),3.0)*420.0;",
    "  vec2 S1=vec2(650.0+(Pg.x-650.0)*(1.0+kx),Pg.y-dy);",
    "  if(sa==12){ float sw=fbm(P/140.0+2.0)*6.0; S1+=vec2(sin(P.y/37.0+sw),cos(P.x/41.0+sw))*28.0*qq; }",
    "  if(sa==13) S1+=vec2(sin(P.y/16.0+t*4.0),cos(P.x/19.0-t*3.0))*4.0*qq;",
    "  if(sa==15){ float rr=floor(P.y/12.0), tt=floor(t*15.0); S1.x+=(hash(vec2(rr,tt))-0.5)*90.0*qq*step(0.7,hash(vec2(rr+4.0,tt))); }",
    "  if(sa==5) S1.x+=(fbm(P/28.0+vec2(0.0,t*4.0))-0.5)*36.0*q1;",
    "  if(sa==1) S1+=vec2(sin(P.y/18.0+t*5.0),cos(P.x/22.0-t*4.0))*5.0*qq;",
    "  if(sa==20){ vec2 dz=S1-CS; float an3=length(dz)>192.0?(t*0.16+q1*q1*4.0):q1*q1*0.8; S1=CS+vec2(dz.x*cos(an3)-dz.y*sin(an3),dz.x*sin(an3)+dz.y*cos(an3)); }",
    "  vec4 am=tx(A,S1); vec4 below=tx(A,S1+vec2(0.0,8.0));",
    "  if(sa==14){ am=(am+tx(A,S1-vec2(0.0,9.0*qq))+tx(A,S1-vec2(0.0,18.0*qq)))/3.0; }",
    "  if(sa==28){ vec4 bl=txl(A,S1,1.5+qq*2.5); am=mix(am,vec4(bl.rgb*vec3(0.85,0.75,1.0),bl.a),qq*0.7); below=mix(below,bl,qq*0.7); }",
    "  if(sa==15){ vec4 ar=tx(A,S1-vec2(14.0*qq,0.0)), ab=tx(A,S1+vec2(14.0*qq,0.0)); am=vec4(ar.r,am.g,ab.b,max(am.a,max(ar.a,ab.a))); }",
    "  vec3 trl=vec3(0); float seamA=0.0, heatA=0.0;",
    "  if(sa==10){ am=asciiFall(P,q1,t,PC.y-RAD.y*0.3,trl); below=am; }",
    "  if(sa==11){ am=chunks(A,P,q1,0,seamA,heatA); below=am; }",
    "  if(sa==24) S1+=boil(P,t)*(1.0+qq*2.0);",
    "  if(sa==28) S1+=vec2(fbm(P/30.0+t),fbm(P/30.0-t))*14.0*qq-7.0*qq;",
    "  if(sa==27) S1.x+=sin(S1.y/38.0+t*3.0)*26.0*qq;",
    "  if(sa==22){ vec4 bl=txl(A,S1,2.0+qq*2.5); vec3 cc=am.rgb/max(am.a,0.02); float w=ss((min(cc.r,min(cc.g,cc.b))-0.6)/0.2); am=mix(am,vec4(mix(bl.rgb,bl.a*vec3(0.25,0.5,1.0),w*0.6),bl.a),ss(qq*1.5)*0.85); }",
    "  if(sa==26){ am=riso(S1,vec2(-9.0,7.0)*(1.0+qq*2.0),1.0+qq*3.5,3.6,1.0,1.0); below=riso(S1+vec2(0.0,8.0),vec2(-9.0,7.0),1.0,3.6,1.0,1.0); }",
    "  float tornE=0.0; if(sa==23){ float idd=floor((P.x+jag(P.y))/34.0); float f,off,sx; vec2 Ps;",
    "   for(int it=0;it<2;it++){ float rel=0.04+hash(vec2(idd,3.0))*0.3+(1.0-sat((idd*34.0-150.0)/1000.0))*0.08; f=max(q1-rel,0.0); off=f*f*2400.0; sx=sin(f*8.0+idd)*14.0*f;",
    "    Ps=vec2(P.x-sx,P.y-off); if(it==0) idd=floor((Ps.x+jag(Ps.y))/34.0); }",
    "   float u=Ps.x+jag(Ps.y)-idd*34.0;",
    "   float inS=step(0.0,u)*step(u,34.0); am=tx(A,Ps)*inS; below=am; float ed=min(u,34.0-u); tornE=step(0.5,off)*(1.0-ss(ed/2.5))*am.a; am.rgb=mix(am.rgb,am.a*vec3(0.96,0.93,0.86),tornE*0.9); }",
    "  if(sa==18){ am=pixFall(P,q1,PC.y-RAD.y*0.3); below=am; }",
    "  if(sa==16){ float wl=ss(qq*1.6); vec3 cc=am.rgb/max(am.a,0.02); float l=dot(cc,vec3(0.3,0.5,0.2)); am.rgb=mix(am.rgb,am.a*mix(vec3(l),vec3(0.62,0.42,0.15)*l*1.6,0.8),wl*0.85); }",
    "  if(sa==17){ vec3 cc=am.rgb/max(am.a,0.02); float l=dot(cc,vec3(0.3,0.5,0.2)); am.rgb=mix(am.rgb,am.a*vec3(l*1.1),qq*0.6); }",
    "  float lead=sat(am.a-below.a)*step(0.02,qq); float fm=1.0;",
    "  if(sa==1){ am*=0.88; }",
    "  if(sa==5){ am.rgb*=mix(1.0,0.22,ss(q1/0.8)); fm*=1.0-ss((q1-0.45)/0.45); }",
    "  if(sa==3){ float dn=fbm(P/16.0+3.0); fm*=ss((dn-(q1*1.5-0.2))/0.06); }",
    "  if(sa==13){ am.rgb=mix(am.rgb,am.a*vec3(0.72,0.88,1.0)*0.85,qq*0.6); am*=1.0-0.45*qq; }",
    "  float surf=PC.y-RAD.y*0.3; float hit=ss((surf-P.y)/14.0); fm*=1.0-ss((q1-0.88)/0.12); am*=hit*fm; lead*=fm*step(0.05,am.a+0.04);",
    "  vec3 Em=am.rgb*pow(q1,1.4)*0.22;",
    "  Em+=lead*hit*(sa==4?vec3(1.0,0.86,0.55)*1.3:(sa==9?vec3(1.0,0.55,0.2)*1.6:vec3(1.0)*0.7));",
    "  if(sa==6) Em+=am.rgb*(0.9+0.3*sin(t*40.0));",
    "  if(sa==9) Em+=am.rgb*vec3(1.0,0.6,0.3)*(0.6+0.5*qq);",
    "  if(sa==4) Em+=am.a*pow(0.5+0.5*sin(P.y/40.0-t*6.0),10.0)*vec3(1.0,0.85,0.5)*0.6*qq;",
    "  if(sa==5) Em+=embersIdle(A,P,t,vec3(1.0,0.5,0.15))*(1.0-q1);",
    "  if(sa==3) Em+=glints(P,t*2.0,10.0,0.9,am.a)*1.2;",
    "  if(sa==10) Em+=trl*hit*fm+am.rgb*0.25;",
    "  if(sa==21) Em+=am.rgb*0.55*(1.0-q1*0.5);",
    "  if(sa==28) Em+=am.a*vec3(0.45,0.2,0.95)*0.35*qq;",
    "  if(sa==27){ vec2 d=P-vec2(650.0,430.0); float rays=step(0.5,fract(atan(d.y,d.x)*16.0/6.2832+t*0.025+q1*0.6)); Em+=mix(vec3(0.99,0.5,0.16),vec3(0.98,0.78,0.32),rays)*0.13*ss(1.0-length(d)/640.0)*ss((length(d)-80.0)/120.0)*(0.4+0.6*rays)*(1.0-ss(q1/0.5)); }",
    "  if(sa==22) Em+=am.a*vec3(0.3,0.6,1.0)*0.25*qq+exp(-pow((P.y-(700.0-q1*500.0))/3.0,2.0))*sat(txl(A,S1,1.5).a)*vec3(0.4,0.85,1.0)*0.6*(1.0-q1);",
    "  if(sa==16) Em+=leafFall(A,P,q1,t)*1.1;",
    "  if(sa==17) Em+=am.a*pow(0.5+0.5*sin(P.y/22.0-t*9.0+P.x/70.0+fbm(P/60.0)*5.0),14.0)*0.7*qq+am.a*env(normalize(vec3(sin(P.x/80.0+t),cos(P.y/60.0-t*2.0),1.0)),t)*0.22*qq;",
    "  if(sa==19) Em+=step(0.96,hash(floor(P/2.0)+floor(t*24.0)))*sat(txl(A,S1,2.5).a-am.a)*qq*0.6*cA;",
    "  if(sa==11) Em+=seamA*heatA*am.a*vec3(1.0,0.45,0.1)*2.4;",
    "  if(sa==12) Em+=am.a*pow(0.5+0.5*sin(dot(P,vec2(0.6,-0.4))/60.0-t*2.0),16.0)*0.3*(1.0-q1);",
    "  if(sa==13){ Em+=glints(P,t*2.0,12.0,0.9,am.a)*0.9; float va=txl(A,P+vec2(0.0,70.0),4.0).a; Em+=pow(fbm(vec2(P.x/60.0,P.y/50.0+t*0.8)),2.0)*va*sin(PI*q1)*0.5*vec3(0.7,0.85,1.0)*winF(P); }",
    "  if(sa==15) Em+=step(0.985,hash(vec2(floor(P.y/2.0),floor(t*20.0))))*qq*0.5*vec3(0.7,0.9,1.0)*(am.a*0.6+0.1);",
    "  E+=Em;",
    // ---------- el pozo ----------
    "  float grow=ss(seg(p,0.08,0.42)), shrink=1.0-ss(seg(p,0.82,1.0)); float R=grow*shrink*(1.0+0.04*sin(t*5.0));",
    "  float e=length((P-PC)/RAD); float pm=ss((R-e)/0.07)*step(0.02,R);",
    "  float ang=t*0.7; vec2 lc=(P-PC)/RAD/max(R,0.08); lc=vec2(lc.x*cos(ang)-lc.y*sin(ang),lc.x*sin(ang)+lc.y*cos(ang));",
    "  vec2 Pm=vec2(650.0,400.0)+vec2(lc.x*470.0,lc.y*270.0);",
    "  vec4 sA1=txl(A,Pm,1.0), sA4=txl(A,Pm,4.0), sB1=txl(B,Pm,1.0), sB4=txl(B,Pm,4.0);",
    "  vec3 fA=mix(sA4.rgb/max(sA4.a,0.02),sA1.rgb/max(sA1.a,0.02),sA1.a); fA=mix(cA,fA,ss(sA4.a/0.2));",
    "  vec3 fB=mix(sB4.rgb/max(sB4.a,0.02),sB1.rgb/max(sB1.a,0.02),sB1.a); fB=mix(cB,fB,ss(sB4.a/0.2));",
    "  float mm=ss(seg(p,0.34,0.58)); vec3 sc=mix(fA,fB,mm);",
    "  float sl=dot(sc,vec3(0.3,0.5,0.2)); sc*=mix(1.0,0.55,ss((sl-0.5)/0.4));",
    "  float rip=0.5+0.5*sin(e*26.0-t*8.0); sc*=(0.62+0.38*(1.0-e*e))*(0.85+0.15*rip);",
    "  vec2 sp=(P-PC-vec2(-90.0,-20.0))/vec2(120.0,10.0); float spec=exp(-dot(sp,sp));",
    "  vec4 pool=vec4(sc*pm,pm); E+=spec*pm*0.55*vec3(1.0)+sc*pm*0.25+exp(-e*e/(max(R,0.05)*2.2))*R*0.22*sc;",
    "  float drop=0.0; for(int k=0;k<3;k++){ float rk=fract(q1*2.2+float(k)*0.33); drop+=exp(-pow((e-rk*1.1)/0.04,2.0))*(1.0-rk); }",
    "  E+=drop*pm*sin(PI*seg(p,0.12,0.5))*0.45*cA;",
    "  if(mm>0.0){ float k=mm*pm;",
    "   if(sb==0) E+=exp(-pow((lc.x*0.5+lc.y*0.2-fract(t*0.7)*3.0+1.5)/0.12,2.0))*k*0.5;",
    "   if(sb==1){ vec2 q=lc*3.2; q+=vec2(sin(q.y*1.7+t*1.6),cos(q.x*1.3-t*1.3))*0.8; float vv=abs(sin(q.x*2.0+t*1.4)+sin(q.y*2.3-t*1.6)+sin((q.x+q.y)*1.5+t)); E+=pow(sat(1.0-vv*0.5),5.0)*k*vec3(0.8,0.95,1.0)*0.9; }",
    "   if(sb==2) E+=glints(P,t*1.4,14.0,0.82,pm)*mm*1.6*vec3(0.9,0.95,1.0);",
    "   if(sb==3) E+=glints(P,t*1.7,8.0,0.86,pm)*mm*1.4*vec3(0.9,0.95,1.0);",
    "   if(sb==4) E+=exp(-pow((lc.x-fract(t*0.5)*3.0+1.5)/0.15,2.0))*k*vec3(1.0,0.85,0.5)*0.8;",
    "   if(sb==5) E+=sc*k*(0.5+0.35*sin(t*9.0+P.x/22.0));",
    "   if(sb==6){ float arc=pow(sat(1.0-abs(lc.y*3.0-(fbm(vec2(lc.x*3.0,t*3.0))-0.5)*4.0)),18.0); E+=arc*k*cB*1.6+sc*k*0.25*(0.7+0.3*sin(t*30.0)); }",
    "   if(sb==7) E+=rainbow(e*1.5-t*0.4+lc.x*0.3)*k*0.35;",
    "   if(sb==8) E+=pow(max(0.0,sin(e*9.0-t*3.0+lc.x*3.0)),12.0)*k*0.6;",
    "   if(sb==9){ float bub=ss((fbm(lc*3.0+vec2(t*0.6,-t*0.4))-0.62)/0.08); E+=bub*k*vec3(1.0,0.55,0.15)*1.6+sc*k*0.3; }",
    "   if(sb==10){ vec2 pc=floor(P/vec2(9.0,13.0)); float gg=gidx(pc,floor(t*10.0)+hash(pc)*9.0); E+=glyph(fract(P/vec2(9.0,13.0)),gg)*k*cB*1.3*step(0.45,hash(pc*1.3)); }",
    "   if(sb==11){ vec3 vv=voro(lc*4.0+3.0); E+=(1.0-ss(vv.z/0.06))*k*vec3(1.0,0.45,0.1)*1.5*(0.7+0.3*sin(t*3.0+vv.x)); }",
    "   if(sb==12){ float vn=abs(sin((fbm(lc*1.6+t*0.05)*6.0+lc.x*2.0)*3.0)); E+=pow(1.0-vn,14.0)*k*0.7; }",
    "   if(sb==13){ vec3 vv=voro(lc*6.0); E+=(1.0-ss(vv.z/0.04))*k*vec3(0.85,0.95,1.0)*0.9+glints(P,t*1.5,10.0,0.86,pm)*mm*1.2; }",
    "   if(sb==14) E+=pow(fbm(vec2(lc.x*1.5-t*0.4,lc.y*14.0)),3.0)*k*fB*1.4;",
    "   if(sb==28) E+=pow(fbm(lc*3.0+vec2(t*0.2,-t*0.1)),3.0)*k*vec3(0.6,0.3,1.0)*1.4;",
    "   if(sb==29) E+=step(0.97,hash(floor(P/4.0)))*k*(0.5+0.5*sin(t*4.0+hash(floor(P/4.0))*30.0))*1.3;",
    "   if(sb==23) E+=ss((fbm(lc*5.0+t*0.1)-0.62)/0.05)*k*vec3(0.95,0.9,0.8)*0.5;",
    "   if(sb==24) E+=pow(0.5+0.5*sin(dot(lc,vec2(9.0,5.0))*6.0+fbm(lc*3.0+floor(t*8.0))*6.0),14.0)*k*cB*0.9;",
    "   if(sb==25) E+=step(0.85,fract(e*5.0-t*0.6))*k*vec3(0.95,0.93,0.96)*0.5;",
    "   if(sb==26){ vec2 R=vec2(0.7071*P.x-0.7071*P.y,0.7071*P.x+0.7071*P.y)/11.0; E+=sat(2.8-length((fract(R)-0.5)*11.0)+0.5)*k*vec3(0.95,0.36,0.72)*0.8; }",
    "   if(sb==27) E+=step(0.5,fract(e*6.0-t*0.5))*k*mix(vec3(1.0,0.55,0.2),vec3(0.98,0.8,0.35),step(0.5,fract(e*3.0)))*0.5;",
    "   if(sb==21) E+=pow(0.5+0.5*sin(e*40.0-t*3.0),30.0)*k*cB*1.3;",
    "   if(sb==22) E+=(ss((fract(lc.x*6.0)-0.9)/0.05)+ss((fract(lc.y*3.0)-0.9)/0.05))*k*vec3(0.35,0.6,1.0)*0.6;",
    "   if(sb==16) E+=ss((fbm(lc*4.0+vec2(t*0.2,0.0))-0.6)/0.1)*k*vec3(0.3,0.8,0.3)*0.9;",
    "   if(sb==17) E+=pow(0.5+0.5*sin(lc.x*4.0+t*2.0),20.0)*k*1.0+glints(P,t*1.4,12.0,0.88,pm)*mm;",
    "   if(sb==18) E+=step(0.7,hash(floor(P/10.0)+floor(t*8.0)))*k*cB*0.6;",
    "   if(sb==19) E+=step(0.93,hash(floor(P/3.0)+floor(t*20.0)))*k*cB*0.9;",
    "   if(sb==20) E+=pow(0.5+0.5*sin(e*30.0),20.0)*step(0.5,fract(atan(lc.y,lc.x)*3.0/3.1416+t*0.4))*k*0.7*vec3(0.8,0.75,1.0);",
    "   if(sb==15){ E+=step(0.5,fract(P.y/4.0))*k*0.15*cB+exp(-pow((lc.y-(fract(t*1.3)*2.0-1.0))/0.05,2.0))*k*vec3(1.0,0.2,0.8)*0.8; }",
    "  }",
    // ---------- acto 3: nace el nuevo material ----------
    "  float q3=seg(p,0.46,0.97); float fy=mix(PC.y-8.0,60.0,pow(eo(q3),1.3)); float fyn=fy;",
    "  if(sb==0) fyn=fy+sin(P.x/85.0+t*3.0)*14.0;",
    "  if(sb==1) fyn=fy+sin(P.x/60.0-t*4.0)*9.0+sin(P.x/23.0+t*7.0)*3.0;",
    "  if(sb==4) fyn=fy+(fbm(vec2(P.x/90.0,t*0.4))-0.5)*60.0;",
    "  if(sb==5) fyn=fy+(fbm(P/36.0+vec2(0.0,t*3.2))-0.5)*110.0;",
    "  if(sb==7) fyn=fy+sin(P.x/70.0+t*2.5)*24.0;",
    "  if(sb==8) fyn=fy+(fbm(vec2(P.x/64.0,t*0.6))-0.5)*130.0;",
    "  if(sb==9) fyn=fy+(fbm(vec2(P.x/55.0,t*0.5))-0.5)*95.0;",
    "  if(sb==16) fyn=fy-pow(fbm(vec2(P.x/16.0,5.0)),3.0)*230.0+sin(P.y/24.0+P.x/40.0+t*2.0)*6.0;",
    "  if(sb==17) fyn=fy+sin(P.x/90.0-t*4.0)*12.0+sin(P.x/31.0+t*6.0)*4.0;",
    "  if(sb==12) fyn=fy+sin(P.x/110.0+t*1.5)*20.0+(fbm(vec2(P.x/70.0,t*0.3))-0.5)*50.0;",
    "  if(sb==13) fyn=fy-pow(fbm(vec2(P.x/13.0,3.0)),2.5)*150.0-(fbm(vec2(P.x/60.0,7.0))-0.5)*40.0;",
    "  if(sb==14) fyn=fy+pow(fbm(vec2(P.x/6.0,7.0)),2.0)*190.0-50.0;",
    "  if(sb==15) fyn=fy+step(1.0,mod(floor(P.y/4.0),2.0))*70.0+(hash(vec2(floor(P.y/14.0),floor(t*12.0)))-0.5)*60.0;",
    "  float band=exp(-pow((P.y-fyn)/70.0,2.0)); float rev=ss((P.y-fyn)/16.0)*step(0.0001,q3);",
    "  float pull=sb==14?50.0:sb==8?55.0:(sb==5?35.0:(sb==4?42.0:(sb==9?30.0:(sb==1?26.0:22.0))));",
    "  vec2 Sb=P+vec2(0.0,pull*band*(1.0-q3));",
    "  vec2 CS2=vec2(650.0,400.0); vec2 dS2=P-CS2; float rS2=length(dS2);",
    "  if(sb==20){ float an2=(rS2>192.0?(1.0-q3)*(1.0-q3)*6.0:(1.0-q3)*(1.0-q3)*1.2)+(rS2>192.0?t*0.16:0.0); Sb=CS2+vec2(dS2.x*cos(an2)-dS2.y*sin(an2),dS2.x*sin(an2)+dS2.y*cos(an2))+vec2(0.0,pull*band*(1.0-q3)); }",
    "  if(sb==12){ float sw=fbm(P/140.0+5.0)*6.0+t*0.5; float a2=exp(-max(P.y-fyn,0.0)/130.0)*(1.0-q3); Sb+=vec2(sin(P.y/37.0+sw),cos(P.x/41.0+sw))*80.0*a2; }",
    "  if(sb==15){ float bs2=2.0+14.0*exp(-max(P.y-fyn,0.0)/90.0)*(1.0-q3); Sb=floor(Sb/bs2)*bs2+bs2*0.5; }",
    "  if(sb==5) Sb+=vec2((fbm(P/30.0+vec2(0.0,t*4.0))-0.5)*18.0*band,0.0);",
    "  if(sb==1) Sb+=vec2(sin(P.y/14.0+t*6.0)*7.0*band,0.0);",
    "  vec4 b=tx(B,Sb); float fr=exp(-pow((P.y-fyn)/12.0,2.0))*b.a*step(0.0001,q3)*(1.0-ss((q3-0.85)/0.15));",
    "  if(sb==2){ vec3 vo=voro(P/40.0); float cy=(vo.y+0.5)*40.0; float hg=sat((cy-60.0)/660.0);",
    "   float at=(1.0-hg)*0.62+hash(vo.xy)*0.28; rev=ss((q3-at)/0.05)*step(0.0001,q3);",
    "   float fl=exp(-pow((q3-at-0.04)/0.045,2.0)); float ln=1.0-ss(vo.z/0.06);",
    "   E+=(ln*1.8+0.6)*fl*b.a*vec3(0.85,0.93,1.0); fr=0.0; }",
    "  if(sb==3){ rev=ss((p-0.8)/0.17); fr=0.0; }",
    "  if(sb==6){ vec2 rg=floor(P/vec2(95.0,70.0)); float vv2=sat((P.y-90.0)/620.0);",
    "   float ft=sat((q3-(1.0-vv2)*0.55-hash(rg)*0.18)/0.22); float on=ft>=1.0?1.0:ft*(0.25+0.75*step(0.45,hash(rg+floor(t*22.0))));",
    "   rev=on*step(0.0001,q3); fr=exp(-pow((ft-0.05)/0.06,2.0))*b.a*step(0.0001,q3)*step(0.001,ft); }",
    "  if(sb==15){ float spl=(1.0-q3)*28.0*exp(-max(P.y-fyn,0.0)/200.0)+1.5; vec4 br=tx(B,Sb-vec2(spl,0.0)), bb2=tx(B,Sb+vec2(spl,0.0)); b=vec4(br.r,b.g,bb2.b,max(b.a,max(br.a,bb2.a))); }",
    "  vec4 cb=b*rev;",
    "  vec3 rg=vec3(0); float seamB=0.0, heatB=0.0;",
    "  if(sb==10){ cb=q3>0.0?asciiRise(P,q3,t,PC.y-RAD.y*0.3,rg):vec4(0); fr=0.0; E+=rg; }",
    "  if(sb==11){ cb=q3>0.0?chunks(B,P,q3,1,seamB,heatB):vec4(0); fr=0.0; E+=seamB*heatB*cb.a*vec3(1.0,0.45,0.1)*2.4+cb.rgb*heatB*0.35*vec3(1.0,0.55,0.25); }",
    "  if(sb==27){ Sb.x+=sin(P.y/38.0+t*3.0)*26.0*(1.0-q3)*exp(-max(P.y-fyn,0.0)/220.0); }",
    "  if(sb==24) Sb+=boil(P,t);",
    "  if(sb==21){ float nb=P.y-fyn; float stut=nb<130.0?step(0.35,hash(floor(P/vec2(80.0,40.0))+floor(t*24.0))):1.0; cb*=mix(1.0,stut,1.0-ss(nb/130.0)); E+=cb.rgb*0.5*(1.0-q3*0.5); }",
    "  if(sb==22){ vec3 cc=b.rgb/max(b.a,0.02); float w=ss((min(cc.r,min(cc.g,cc.b))-0.6)/0.2); float px=mix(60.0,1260.0,ss(seg(q3,0.3,0.92)));",
    "   float drawn=ss((px-P.x-(fbm(vec2(P.y/40.0,2.0))-0.5)*60.0)/10.0); if(q3>0.97) drawn=1.0;",
    "   cb.rgb=mix(cb.rgb,cb.a*vec3(0.12,0.3,0.6),w*(1.0-drawn)); cb.a*=mix(1.0,0.6,w*(1.0-drawn));",
    "   float act=step(0.3,q3)*(1.0-ss((q3-0.9)/0.05)); E+=exp(-pow((P.x-px)/2.0,2.0))*ss(b.a/0.15)*rev*vec3(0.35,0.85,1.0)*0.7*act+w*rev*exp(-pow((P.x-px)/10.0,2.0))*vec3(0.8,0.95,1.0)*2.0*act; }",
    "  if(sb==28){ float prog=sat((q3-0.18)/0.74); float o=wOrd(P); float vis=ss((prog-o)/0.004)*step(0.0001,q3); if(q3>0.97) vis=1.0;",
    "   cb=b*vis; fr=0.0; E+=b.rgb*exp(-max(prog-o,0.0)/0.025)*vis*0.9*(1.0-ss((q3-0.9)/0.07));",
    "   vec2 dn=P-NIBP; E+=NIBON*(exp(-dot(dn,dn)/16.0)*1.8+exp(-dot(dn,dn)/700.0)*0.35)*vec3(0.85,0.75,1.0);",
    "   vec2 A0=vec2(650.0,PC.y-10.0); vec2 Cc=mix(A0,NIBP,0.5)+vec2(sin(t*3.0)*60.0,40.0); float dd=1e4; vec2 pv=A0;",
    "   for(int k=1;k<=10;k++){ float u=float(k)/10.0; vec2 pt=mix(mix(A0,Cc,u),mix(Cc,NIBP,u),u); vec2 e=pt-pv; vec2 w=P-pv; float hh=clamp(dot(w,e)/dot(e,e),0.0,1.0); dd=min(dd,length(w-e*hh)); pv=pt; }",
    "   E+=NIBON*exp(-dd*dd/5.0)*vec3(0.55,0.3,1.0)*0.9+NIBON*exp(-dd*dd/120.0)*vec3(0.4,0.15,0.9)*0.15; }",
    "  if(sb==29){ float pk=ss(seg(q3,0.66,0.9)); float sc=max(eback(pk),0.02); vec4 nt=negTile(B,P,t,sc);",
    "   float inT=sat(0.5-tileSd(P)); float holeOpen=step(0.001,pk); if(holeOpen<0.5) nt=vec4(negGrad(P,0.12*sin(t*0.45))*inT,inT);",
    "   cb=nt*rev; vec2 C=vec2(649.5,400.0); float edge=sat((txl(B,C+(P-C)/sc,1.5).a-tx(B,C+(P-C)/sc).a)*2.0)*inT;",
    "   E+=edge*pk*(1.0-pk)*4.0*vec3(1.0,0.8,1.0)*holeOpen; }",
    "  if(sb==26){ float fyB=fyn-90.0; float mB=ss((P.y-fyB)/16.0)*step(0.0001,q3); float mP=ss((P.y-fyn-20.0)/16.0)*step(0.0001,q3); if(q3>0.97){mB=1.0;mP=1.0;}",
    "   cb=riso(P,vec2(-9.0,7.0)*(1.0+(1.0-q3)*4.0),1.0,3.6,mP,mB); fr=0.0; float span=ss((txl(O,P,4.5).a-0.02)/0.1)*(1.0-ss((q3-0.9)/0.07));",
    "   E+=(exp(-pow((P.y-fyB)/3.0,2.0))*vec3(0.5,0.5,1.0)+exp(-pow((P.y-fyn-20.0)/3.0,2.0))*vec3(1.0,0.55,0.85))*span*0.9; }",
    "  if(sb==23){ float idd=floor((P.x+jag(P.y))/34.0); float off; vec2 Ps;",
    "   for(int it=0;it<2;it++){ float arr=0.3+sat((idd*34.0-150.0)/1000.0)*0.45+hash(vec2(idd,5.0))*0.08; float kk=sat((q3-(arr-0.3))/0.3); off=kk<=0.0?3000.0:(1.0-eback(kk))*700.0;",
    "    Ps=vec2(P.x,P.y-off); if(it==0) idd=floor((Ps.x+jag(Ps.y))/34.0); }",
    "   float u=Ps.x+jag(Ps.y)-idd*34.0; float inS=step(0.0,u)*step(u,34.0);",
    "   cb=tx(B,Ps)*inS*(1.0-ss((P.y-(PC.y-RAD.y*0.3))/6.0)); if(q3>0.97) cb=b; float ed=min(u,34.0-u); float te=step(0.5,abs(off))*(1.0-ss(ed/2.5))*cb.a; cb.rgb=mix(cb.rgb,cb.a*vec3(0.96,0.93,0.86),te*0.9); fr=0.0; }",
    "  if(sb==24){ vec3 cc=b.rgb/max(b.a,0.02); float ol=ss((0.3-max(cc.r,max(cc.g,cc.b)))/0.1); float nb=P.y-fyn;",
    "   float hz=abs(fract(dot(P,normalize(vec2(1.0,0.9)))/11.0+fbm(P/40.0)*0.6)*2.0-1.0); float prog=sat((nb-20.0)/170.0+q3*0.35);",
    "   float fill=ss((prog-hz)/0.08); if(q3>0.96) fill=1.0; cb=b*rev*mix(fill,1.0,ol); }",
    "  if(sb==27&&q3>0.75){ vec2 d=P-vec2(650.0,430.0); float rays=step(0.5,fract(atan(d.y,d.x)*16.0/6.2832+t*0.025)); float gr=ss((q3-0.75)/0.2);",
    "   float rm=ss(1.0-length(d)/(640.0*gr+1.0))*ss((length(d)-80.0)/120.0); E+=mix(vec3(0.99,0.5,0.16),vec3(0.98,0.78,0.32),rays)*0.13*rm*(0.4+0.6*rays)*(1.0-cb.a); }",
    "  if(sb==18){ cb=q3>0.0?pixRise(P,q3,PC.y-RAD.y*0.3,rg):vec4(0); fr=0.0; E+=rg; }",
    "  if(sb==17){ float liq=exp(-max(P.y-fyn,0.0)/110.0)*(1.0-q3)*rev; float rp=pow(0.5+0.5*sin(P.y/14.0-t*10.0+fbm(P/50.0)*6.0),10.0);",
    "   cb.rgb=mix(cb.rgb,cb.a*(env(normalize(vec3(sin(P.x/70.0+t*2.0),cos(P.y/50.0-t*3.0),1.0)),t)*0.7+rp*0.8),liq); }",
    "  if(sb==19){ float NR=7.0; float pos=q3*1.08*NR; float rk=floor(pos); float fx=fract(pos); float rowc=(740.0-P.y)/100.0;",
    "   float nzx=mix(140.0,1160.0,mod(rk,2.0)<0.5?fx:1.0-fx); float nzy=740.0-(rk+0.5)*100.0;",
    "   float own=floor(rowc); float cv=own<rk?1.0:(own>rk?0.0:(mod(rk,2.0)<0.5?ss((nzx-P.x)/50.0):ss((P.x-nzx)/50.0)));",
    "   float below2=sat(rk-rowc+0.5); cv=max(cv,ss((rk+0.0-rowc+0.6)/0.4)); cv=max(cv,below2); cv*=step(0.0001,q3);",
    "   float gr=hash(floor(P/2.0))*0.7+fbm(P/14.0)*0.3; float spk=ss((cv*1.25-gr)/0.08); if(q3>0.97) spk=1.0;",
    "   cb=b*spk; fr=0.0; vec2 nd=P-vec2(nzx,nzy); float act=step(0.0001,q3)*(1.0-ss((q3-0.9)/0.06));",
    "   E+=exp(-dot(nd,nd)/(2.0*40.0*40.0))*0.35*cB*act+exp(-dot(nd,nd)/30.0)*act*0.9;",
    "   vec2 ax=vec2(nzx,nzy)-PC; float al=sat(dot(P-PC,ax)/dot(ax,ax)); float wdt=6.0+al*28.0; float dd=length(P-PC-ax*al);",
    "   E+=step(0.8,hash(floor(P/2.0)+floor(t*30.0)))*exp(-dd*dd/(wdt*wdt))*act*cB*0.9*step(P.y,PC.y); }",
    "  if(sb==20&&q3>0.8){ float R3=300.0+(q3-0.86)*1400.0; E+=exp(-pow((rS2-R3)/6.0,2.0))*(1.0-ss((q3-0.86)/0.11))*step(0.86,q3)*vec3(0.75,0.65,1.0)*1.4; }",
    "  if(sb==13){ float frost=exp(-max(P.y-fyn,0.0)/90.0)*(1.0-q3*0.4)*rev; cb.rgb=mix(cb.rgb,cb.a*vec3(0.92,0.97,1.0),frost*0.75); E+=exp(-pow((P.y-fyn+30.0)/38.0,2.0))*fbm(P/40.0+t)*0.35*vec3(0.7,0.85,1.0)*(1.0-q3)*txl(B,P,4.0).a; }",
    "  if(sb==7) cb.rgb=hueRot(cb.rgb,(1.0-q3)*3.5);",
    "  vec3 fc=sb==29?negGrad(P,0.0):sb==27?vec3(1.0,0.6,0.2):sb==24?vec3(1.0,0.96,0.88):sb==21?b.rgb/max(b.a,0.05):sb==22?vec3(0.4,0.75,1.0):sb==16?vec3(0.55,1.0,0.45):sb==17?vec3(1.0):sb==20?vec3(0.75,0.65,1.0):sb==12?vec3(1.0,0.98,0.95):sb==13?vec3(0.85,0.95,1.0):sb==14?b.rgb/max(b.a,0.05):sb==15?mix(vec3(0.0,1.0,1.0),vec3(1.0,0.1,0.9),step(0.5,fract(P.x/46.0))):sb==5?vec3(1.0,0.5,0.12):sb==8?vec3(1.0,0.97,0.95):sb==4?vec3(1.0,0.82,0.42):sb==9?vec3(1.0,0.4,0.1):sb==1?vec3(0.8,0.95,1.0):sb==6?cB:vec3(0.85,0.8,1.0);",
    "  float fk=sb==29?1.4:sb==27?1.6:sb==24?1.2:sb==21?2.2:sb==22?1.5:sb==16?1.6:sb==17?2.0:sb==20?1.4:sb==13?2.0:sb==14?1.4:sb==15?1.8:sb==12?1.2:sb==5?2.2:(sb==4?1.9:(sb==9?2.4:(sb==6?2.0:(sb==0?1.4:1.0))));",
    "  E+=fr*fc*fk; if(sb==7) E+=fr*rainbow(P.x/420.0-t*0.6)*1.6;",
    "  if(sb==4||sb==9) E+=b.rgb*rev*exp(-max(P.y-fyn,0.0)/140.0)*(1.0-q3)*(sb==9?vec3(1.3,0.6,0.3):vec3(0.9,0.75,0.5));",
    "  if(sb==5||sb==9) E+=embersIdle(B,P,t,sb==9?vec3(1.0,0.42,0.1):vec3(1.0,0.55,0.18))*q3;",
    "  float prof=txl(B,vec2(P.x,655.0),2.5).a; float strm=0.0;",
    "  if(sb!=2&&sb!=3&&sb!=10&&sb!=11&&sb!=14&&sb!=15&&sb!=18&&sb!=19&&sb!=20&&sb!=21&&sb!=22&&sb!=23&&sb!=25&&sb!=26&&sb!=27&&sb!=28){ strm=ss((prof-0.35)/0.3)*step(640.0,P.y)*step(P.y,PC.y-6.0)*step(fyn,P.y+1.0);",
    "   strm*=sin(PI*seg(p,0.5,0.82))*(0.6+0.4*fbm(vec2(P.x/20.0,P.y/40.0-t*3.0))); if(sb==6) strm*=0.6; if(sb==1) strm*=0.7; }",
    "  vec3 strc=sb==5?vec3(1.0,0.55,0.15):(sb==8?fB:(sb==9?vec3(1.0,0.45,0.12):cB)); vec4 sv=vec4(strc*strm,strm);",
    "  if(sb==6||sb==9||sb==5) E+=strc*strm*0.8;",
    "  float hr=(sb==28)?ss(seg(q3,0.5,0.97)):(sb==10||sb==11||sb==18||sb==19||sb==23||sb==26)?ss(seg(q3,0.3,0.95)):sb==6?ss(seg(p,0.55,0.95))*0.9:(sb==2?ss(seg(p,0.5,0.95)):rev); E+=halo(B,Sb)*hr*0.45+halo(A,S1)*(1.0-q1)*0.4*fm*hit*((sa==10||sa==11||sa==18||sa==23)?1.0-ss(q1/0.3):sa==27?0.35:1.0);",
    "  c=pool; c=sv+c*(1.0-sv.a); c=cb+c*(1.0-cb.a); c=am+c*(1.0-am.a);",
    " }",
    " if(tapT>=0.0&&tapT<0.6){ for(int k=0;k<2;k++){ float dl=float(k)*0.06; float t2=tapT-dl; if(t2>0.0){",
    "   float R2=24.0+(k==0?520.0:380.0)*eo(t2/0.45); float a2=(1.0-ss(t2/0.42))*0.4;",
    "   E+=exp(-pow((r-R2)/(k==0?3.0:2.0),2.0))*a2*vec3(0.75,0.68,1.0); } } }",
    " o=outc(c,E);",
    "}"
  ].join("\n").replace(/TR_/g, TR.toFixed(3));

  // fragmentos de cristal (geometría real en la GPU)
  var VS_SHARD = COMMON + "\n" + [
    "in vec2 vp; in vec2 cen; in vec2 dir; in vec4 prm; in vec3 bary;",   // prm: velocidad, giro, retraso, escala
    "uniform int phase; out vec2 P; out vec3 vb; out float fade;",
    "void main(){",
    " float q = phase==0 ? sat((p-0.09-prm.z*0.12)/0.42) : 1.0-sat((p-0.42-(1.0-prm.z)*0.1)/0.42);",
    " float dist=prm.x*pow(q,1.5); vec2 t=dir*dist+vec2(0.0,260.0*q*q);",
    " float an=radians(prm.y*q), sc=1.0-prm.w*q; vec2 rel=(vp-cen)*sc;",
    " vec2 rp=vec2(rel.x*cos(an)-rel.y*sin(an), rel.x*sin(an)+rel.y*cos(an));",
    " vec2 w=cen+rp+t; P=vp; vb=bary; fade=1.0-ss((q-0.35)/0.65);",
    " gl_Position=vec4(w.x/650.0-1.0, 1.0-w.y/500.0, 0, 1);",
    "}"
  ].join("\n");
  var FS_SHARD = COMMON + "\n" + [
    "in vec2 P; in vec3 vb; in float fade; uniform int phase; out vec4 o;",
    "void main(){",
    " vec4 c = phase==0 ? tx(A,P) : tx(B,P);",
    " vec3 fw=fwidth(vb); vec3 e3=smoothstep(vec3(0.0),fw*1.6,vb); float edge=1.0-min(e3.x,min(e3.y,e3.z));",
    " float crack=ss(p/0.07)*(1.0-ss((p-0.12)/0.1)); float seam=ss((p-0.7)/0.12)*(1.0-ss((p-0.86)/0.14));",
    " float k = phase==0 ? crack*2.6 : seam*1.2;",
    " vec3 E=edge*k*c.a*vec3(0.8,0.9,1.0) + (phase==0?halo(A,P):halo(B,P))*0.35*c.a;",
    " c*=fade; c.rgb+=E*fade; o=c;",
    "}"
  ].join("\n");

  // partículas (vórtice e implosión)
  var VS_PART = COMMON + "\n" + [
    "in vec2 pa; in vec2 pb; in float ph; out vec3 col; out float lum;",
    "void main(){",
    " vec2 C=vec2(650.0,400.0); vec4 ca=texture(A,pa/S); vec4 cb=texture(B,pb/S);",
    " vec3 colA=ca.rgb/max(ca.a,0.02), colB=cb.rgb/max(cb.a,0.02);",
    " vec2 da=pa-C, db=pb-C; float ra=length(da), ta=atan(da.y,da.x), rb=length(db), tb=atan(db.y,db.x);",
    " vec2 w; float br;",
    " if(mode==2){",
    "  if(tb<ta) tb+=2.0*PI; float e=eio(p); float cont=1.0-0.66*pow(sin(PI*e),1.25);",
    "  float rr=(ra+(rb-ra)*e)*(cont+(1.0-cont)*0.15*ph); float th=ta+(tb-ta)*e+2.0*PI*1.35*e+1.6*sin(PI*e)*ph;",
    "  w=C+vec2(cos(th),sin(th)*0.92)*rr; col=mix(colA,colB,ss((p-0.35)/0.35));",
    "  br=(0.5+0.35*sin(PI*p))*(1.0-0.5*sin(PI*p))*ss(p/0.1)*(1.0-ss((p-0.86)/0.14));",
    " } else if(mode==21){",
    "  float qq=sat((seg(p,0.0,0.46)-(ph-0.6)*0.3)/0.62); float fall=qq*qq*(820.0-pa.y+40.0);",
    "  float yy=pa.y+fall; w=vec2(pa.x+sin(qq*6.0+ph*20.0)*14.0+(pa.x-650.0)*(-0.25)*qq, min(yy,796.0));",
    "  col=colA*1.3+vec3(0.2); br=0.85*ss(qq/0.05)*step(0.0001,qq)*(1.0-ss((yy-770.0)/26.0))*(1.0-step(0.999,qq));",
    " } else if(mode==20){",
    "  float q=sat((p-0.36-(ph-0.6)*0.16)/0.46); float e=eio(q);",
    "  vec2 mid=mix(pa,pb,0.5)+vec2(sin(ph*17.0)*140.0,-120.0-ph*60.0);",
    "  w=mix(mix(pa,mid,e),mix(mid,pb,e),e)+vec2(sin(e*7.0+ph*20.0)*28.0*(1.0-e),0.0);",
    "  col=colB*1.2+vec3(0.15); br=0.75*ss(q/0.06)*(1.0-ss((q-0.9)/0.1))*step(0.0001,q)+0.0;",
    " } else {",
    "  float q=seg(p,0.0,0.48); float e=pow(q*q*q,0.8); float rr=ra*pow(1.0-e,1.3); float th=ta+5.0*e*ph;",
    "  w=C+vec2(cos(th),sin(th))*rr; col=colA*(1.0+2.5*e); br=0.6*ss(q/0.08)*(1.0-step(1.0,q));",
    " }",
    " lum=br; gl_PointSize=PSIZE; gl_Position=vec4(w.x/650.0-1.0, 1.0-w.y/500.0, 0, 1);",
    "}"
  ].join("\n");
  var FS_PART = "#version 300 es\nprecision highp float; in vec3 col; in float lum; out vec4 o;\n" +
    "void main(){ vec2 d=gl_PointCoord-0.5; float k=exp(-dot(d,d)*10.0); o=vec4(col*lum*k*0.9, 0.0); }";

  function sh(type, src) {
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  function prog(vs, fs) {
    var a = sh(gl.VERTEX_SHADER, vs), b = sh(gl.FRAGMENT_SHADER, fs); if (!a || !b) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, a); gl.attachShader(pr, b); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { console.warn(gl.getProgramInfoLog(pr)); return null; }
    return pr;
  }
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var PQ = prog(VS_QUAD, FS_QUAD);
  var PS = prog(VS_SHARD, FS_SHARD);
  var PP = prog(VS_PART.replace("PSIZE", (2.2 * dpr).toFixed(2) + "*(1.0)"), FS_PART);
  if (!PQ || !PS || !PP) return;

  // ---------------------------------------------------------------- geometría
  var quad = gl.createVertexArray(); gl.bindVertexArray(quad);
  var qb = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, qb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  var lq = gl.getAttribLocation(PQ, "pos"); gl.enableVertexAttribArray(lq); gl.vertexAttribPointer(lq, 2, gl.FLOAT, false, 0, 0);

  function rnd(seed) { var s = seed; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }

  // malla de fragmentos: rejilla irregular sobre la caja del logo, 2 triángulos por celda
  var shardVAO = gl.createVertexArray(), shardCount = 0;
  (function buildShards() {
    var R = rnd(5), gx = 9, gy = 6, x0 = 140, x1 = 1160, y0 = 90, y1 = 710, pts = [];
    for (var j = 0; j <= gy; j++) { pts.push([]); for (var i = 0; i <= gx; i++) {
      var jx = (i > 0 && i < gx) ? (R() - 0.5) * 70 : 0, jy = (j > 0 && j < gy) ? (R() - 0.5) * 60 : 0;
      pts[j].push([x0 + (x1 - x0) * i / gx + jx, y0 + (y1 - y0) * j / gy + jy]); } }
    var data = [];
    function tri(a, b, c) {
      var cx = (a[0] + b[0] + c[0]) / 3, cy = (a[1] + b[1] + c[1]) / 3;
      var vx = cx - TAP[0], vy = cy - TAP[1], dd = Math.hypot(vx, vy) + 1e-3; vx /= dd; vy /= dd;
      vx = vx * 0.8 + (R() - 0.5) * 0.7; vy = vy * 0.8 + (R() - 0.5) * 0.7;
      var prm = [420 + R() * 560, (R() - 0.5) * 520, Math.min(1, dd / 700), 0.35 + R() * 0.45];
      var B3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
      [a, b, c].forEach(function (v, k) { data.push(v[0], v[1], cx, cy, vx, vy, prm[0], prm[1], prm[2], prm[3], B3[k][0], B3[k][1], B3[k][2]); });
    }
    for (var j2 = 0; j2 < gy; j2++) for (var i2 = 0; i2 < gx; i2++) {
      var a = pts[j2][i2], b = pts[j2][i2 + 1], c = pts[j2 + 1][i2], d = pts[j2 + 1][i2 + 1];
      if (R() < 0.5) { tri(a, b, d); tri(a, d, c); } else { tri(a, b, c); tri(b, d, c); }
    }
    shardCount = data.length / 13;
    gl.bindVertexArray(shardVAO);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    var st = 13 * 4, off = 0;
    [["vp", 2], ["cen", 2], ["dir", 2], ["prm", 4], ["bary", 3]].forEach(function (a) {
      var l = gl.getAttribLocation(PS, a[0]); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, a[1], gl.FLOAT, false, st, off); off += a[1] * 4;
    });
  })();

  // partículas: posiciones tomadas de los píxeles visibles de cada logo
  var partVAO = gl.createVertexArray(), partBuf = gl.createBuffer(), NPART = 0, partKey = "";
  var alphaMaps = [];
  function alphaMap(img) {
    var w = 325, h = 200, cv = document.createElement("canvas"); cv.width = w; cv.height = h;
    var cx = cv.getContext("2d"); cx.drawImage(img, 0, 0, w, h);
    var d = cx.getImageData(0, 0, w, h).data, list = [];
    for (var i = 0; i < w * h; i++) if (d[i * 4 + 3] > 60) list.push(i);
    return { w: w, list: list };
  }
  function samplePts(m, n, seed) {
    var R = rnd(seed), out = new Float32Array(n * 2);
    for (var k = 0; k < n; k++) { var idx = m.list[Math.floor(R() * m.list.length)];
      out[k * 2] = ((idx % m.w) + R()) * 4; out[k * 2 + 1] = (Math.floor(idx / m.w) + R()) * 4; }
    return out;
  }
  function buildParticles(ia, ib) {
    var key = ia + "-" + ib; if (key === partKey) return; partKey = key;
    var small = window.innerWidth < 700;
    NPART = small ? 9000 : 18000;
    var A = samplePts(alphaMaps[ia], NPART, 3 + ia), B = samplePts(alphaMaps[ib], NPART, 4 + ib);
    function order(a) { var ix = []; for (var k = 0; k < NPART; k++) ix.push(k);
      ix.sort(function (u, v) { return Math.atan2(a[u * 2 + 1] - 400, a[u * 2] - 650) - Math.atan2(a[v * 2 + 1] - 400, a[v * 2] - 650); }); return ix; }
    var oa = order(A), ob = order(B), R = rnd(9), data = new Float32Array(NPART * 5);
    for (var k = 0; k < NPART; k++) { data[k * 5] = A[oa[k] * 2]; data[k * 5 + 1] = A[oa[k] * 2 + 1];
      data[k * 5 + 2] = B[ob[k] * 2]; data[k * 5 + 3] = B[ob[k] * 2 + 1]; data[k * 5 + 4] = 0.6 + R() * 0.8; }
    gl.bindVertexArray(partVAO); gl.bindBuffer(gl.ARRAY_BUFFER, partBuf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    var st = 20; [["pa", 2, 0], ["pb", 2, 8], ["ph", 1, 16]].forEach(function (a) {
      var l = gl.getAttribLocation(PP, a[0]); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, a[1], gl.FLOAT, false, st, a[2]); });
  }

  function buildPoolParticles(ib) {
    var key = "pool-" + ib; if (key === partKey) return; partKey = key;
    NPART = window.innerWidth < 700 ? 9000 : 16000;
    var B = samplePts(alphaMaps[ib], NPART, 40 + ib), R = rnd(77), data = new Float32Array(NPART * 5);
    for (var k = 0; k < NPART; k++) { var a = R() * 6.2832, r = Math.sqrt(R());
      data[k * 5] = 650 + Math.cos(a) * r * 300; data[k * 5 + 1] = 812 + Math.sin(a) * r * 42;
      data[k * 5 + 2] = B[k * 2]; data[k * 5 + 3] = B[k * 2 + 1]; data[k * 5 + 4] = 0.6 + R() * 0.8; }
    gl.bindVertexArray(partVAO); gl.bindBuffer(gl.ARRAY_BUFFER, partBuf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    [["pa", 2, 0], ["pb", 2, 8], ["ph", 1, 16]].forEach(function (a) {
      var l = gl.getAttribLocation(PP, a[0]); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, a[1], gl.FLOAT, false, 20, a[2]); });
  }

  function buildRainParticles(ia) {
    var key = "rain-" + ia; if (key === partKey) return; partKey = key;
    NPART = window.innerWidth < 700 ? 8000 : 14000;
    var A = samplePts(alphaMaps[ia], NPART, 60 + ia), R = rnd(88), data = new Float32Array(NPART * 5);
    for (var k = 0; k < NPART; k++) { data[k * 5] = A[k * 2]; data[k * 5 + 1] = A[k * 2 + 1]; data[k * 5 + 2] = A[k * 2]; data[k * 5 + 3] = A[k * 2 + 1]; data[k * 5 + 4] = 0.6 + R() * 0.8; }
    gl.bindVertexArray(partVAO); gl.bindBuffer(gl.ARRAY_BUFFER, partBuf); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    [["pa", 2, 0], ["pb", 2, 8], ["ph", 1, 16]].forEach(function (a) {
      var l = gl.getAttribLocation(PP, a[0]); gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, a[1], gl.FLOAT, false, 20, a[2]); });
  }

  // ---------------------------------------------------------------- texturas
  var tex = [], imgs = [], loaded = 0;
  var base = (document.currentScript && document.currentScript.src) ? document.currentScript.src.replace(/[^\/]*$/, "") : "gl/";
  NAMES.forEach(function (_, i) {
    if (ORDER.indexOf(i) < 0) return;   // los estilos retirados ni se descargan
    var im = new Image(); im.decoding = "async";
    im.onload = function () {
      var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t);
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      tex[i] = t; imgs[i] = im; alphaMaps[i] = alphaMap(im);
      if (++loaded === ORDER.length + 2) start();
    };
    im.src = base + i + ".webp";
  });
  var woTex = null, nibP = [0, 0], nibOn = 0;   // orden de escritura de la Manuscrita (16 bits, sin premultiplicar)
  (function () { var im = new Image(); im.onload = function () {
    woTex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, woTex);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    if (++loaded === ORDER.length + 2) start(); }; im.src = base + "28w.png"; })();
  function nibAt(pr) { var n = NIBPATH.length / 3, k = 0; while (k < n - 1 && NIBPATH[k * 3 + 2] < pr) k++; return [NIBPATH[k * 3], NIBPATH[k * 3 + 1]]; }
  var atlas = null;   // atlas de caracteres para el logo ASCII vivo
  (function () { var im = new Image(); im.onload = function () {
    atlas = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, atlas);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, im);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    if (++loaded === ORDER.length + 2) start(); }; im.src = base + "ascii.png"; })();

  // ---------------------------------------------------------------- estado y dibujo
  var cur = 0, anim = null, tapAt = -10, running = false, settle = 0, visible = true;
  var hint = document.getElementById("logo-hint"), phrase = document.getElementById("logo-phrase"), live = document.getElementById("logo-live");
  var touched = false;

  function resize() {
    var r = canvas.getBoundingClientRect();
    var w = Math.max(2, Math.round(r.width * dpr)), h = Math.max(2, Math.round(r.height * dpr));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  var dripPts = [650, 700, 650, 700, 650, 700], dripCache = {};
  function dripsFor(i) { if (!dripCache[i]) { findDrips(i); dripCache[i] = dripPts; } return dripCache[i]; }
  function findDrips(ix) {
    var m = alphaMaps[ix === undefined ? 8 : ix]; if (!m) return; var w = m.w, h = 200, low = [[-1, 0], [-1, 0], [-1, 0]];
    var set = {}; m.list.forEach(function (i) { set[i] = 1; });
    for (var x = 0; x < w; x++) { for (var y = h - 1; y >= 0; y--) { if (set[y * w + x]) { var third = Math.min(2, Math.floor(x / (w / 3)));
          if (y > low[third][0]) low[third] = [y, x]; break; } } }
    dripPts = []; low.forEach(function (l) { dripPts.push(l[1] * 4 + 2, l[0] * 4 - 4); });
  }
  function setU(pr, a, b, pp, t, tapT, mode) {
    gl.useProgram(pr);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex[a]); gl.uniform1i(gl.getUniformLocation(pr, "A"), 0);
    gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, tex[b]); gl.uniform1i(gl.getUniformLocation(pr, "B"), 1);
    gl.uniform1f(gl.getUniformLocation(pr, "p"), pp); gl.uniform1f(gl.getUniformLocation(pr, "time"), t);
    gl.uniform1f(gl.getUniformLocation(pr, "tapT"), tapT); gl.uniform1i(gl.getUniformLocation(pr, "mode"), mode);
    var ld = gl.getUniformLocation(pr, "DRIP"); if (ld) gl.uniform2fv(ld, dripsFor(a));
    var lsa = gl.getUniformLocation(pr, "SA"); if (lsa) gl.uniform1i(lsa, a);
    var lo = gl.getUniformLocation(pr, "O"); if (lo) { gl.activeTexture(gl.TEXTURE2); gl.bindTexture(gl.TEXTURE_2D, tex[0]); gl.uniform1i(lo, 2); }
    var lw = gl.getUniformLocation(pr, "WO"); if (lw && woTex) { gl.activeTexture(gl.TEXTURE4); gl.bindTexture(gl.TEXTURE_2D, woTex); gl.uniform1i(lw, 4); }
    var ln = gl.getUniformLocation(pr, "NIBP"); if (ln) gl.uniform2f(ln, nibP[0], nibP[1]);
    var lno = gl.getUniformLocation(pr, "NIBON"); if (lno) gl.uniform1f(lno, nibOn);
    var lg = gl.getUniformLocation(pr, "G"); if (lg) { gl.activeTexture(gl.TEXTURE3); gl.bindTexture(gl.TEXTURE_2D, atlas); gl.uniform1i(lg, 3); }
  }
  function clock() { return window.__rfT !== undefined ? window.__rfT : performance.now() / 1000; }
  window.__rfKick = function () { kick(); };
  function draw() {
    var t = clock(); resize();
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    var tapT = t - tapAt;
    if (!anim) {
      setU(PQ, cur, cur, 0, t, tapT, 100 + cur); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      var pp = Math.min(1, (t - anim.t0) / anim.dur), a = anim.a, b = anim.b, m = a;   // modo = índice del logo de salida
      if (POOL[a] !== undefined) {
        nibOn = 0;
        if (b === 28) { var q3 = Math.min(1, Math.max(0, (pp - 0.46) / 0.51)), pr = Math.min(1, Math.max(0, (q3 - 0.18) / 0.74));
          if (pr > 0 && pr < 1) { nibP = nibAt(pr); nibOn = Math.min(1, pr / 0.02, (1 - pr) / 0.03); } }
        setU(PQ, a, b, pp, t, tapT, 200 + b); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6);
        if (b === 3 || a === 3) { if (b === 3) buildPoolParticles(b); else buildRainParticles(a);
          gl.blendFunc(gl.ONE, gl.ONE);
          setU(PP, a, b, pp, t, tapT, b === 3 ? 20 : 21); gl.bindVertexArray(partVAO); gl.drawArrays(gl.POINTS, 0, NPART);
          gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); }
      } else if (m === 1) {          // cristal: fragmentos
        gl.bindVertexArray(shardVAO);
        if (pp < 0.98) { setU(PS, a, b, pp, t, tapT, 1); gl.uniform1i(gl.getUniformLocation(PS, "phase"), 1); gl.drawArrays(gl.TRIANGLES, 0, shardCount); }
        if (pp < 0.72) { setU(PS, a, b, pp, t, tapT, 1); gl.uniform1i(gl.getUniformLocation(PS, "phase"), 0); gl.drawArrays(gl.TRIANGLES, 0, shardCount); }
        if (pp >= 0.98) { setU(PQ, b, b, 0, t, tapT, -1); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6); }
        else { setU(PQ, a, b, pp, t, tapT, 99); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6); }   // solo la onda del toque
      } else if (m === 2 || m === 9) {    // vórtice / implosión: base + partículas
        setU(PQ, a, b, pp, t, tapT, m === 2 ? 12 : 19); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6);
        buildParticles(a, b);
        gl.blendFunc(gl.ONE, gl.ONE);
        setU(PP, a, b, pp, t, tapT, m); gl.bindVertexArray(partVAO); gl.drawArrays(gl.POINTS, 0, NPART);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      } else {
        setU(PQ, a, b, pp, t, tapT, m); gl.bindVertexArray(quad); gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      if (pp >= 1) { cur = b; anim = null; settle = 3; }
    }
    if (anim || tapT < 0.7 || settle-- > 0 || (visible && !document.hidden)) { requestAnimationFrame(draw); } else { running = false; }
  }
  function kick() { if (!running) { running = true; requestAnimationFrame(draw); } }

  function start() {
    stage.classList.add("gl-on"); stage.appendChild(canvas);
    window.addEventListener("resize", function () { kick(); });
    if ("IntersectionObserver" in window) new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) kick(); }).observe(canvas);
    document.addEventListener("visibilitychange", function () { if (!document.hidden) kick(); });
    kick();
    // el clic lo maneja este motor (se ejecuta antes que el de las animaciones CSS)
    btn.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      if (anim) return;
      var t = clock();
      if (!touched) { touched = true; if (hint) hint.classList.add("gone"); setTimeout(function () { if (phrase) phrase.classList.add("show"); }, 250); }
      else if (phrase) { phrase.classList.remove("beat"); void phrase.offsetWidth; phrase.classList.add("beat"); }
      var nx = ORDER[(ORDER.indexOf(cur) + 1) % ORDER.length];
      anim = { a: cur, b: nx, t0: t, dur: POOL[cur] !== undefined ? TRP : TR }; tapAt = t;
      if (POOL[cur] !== undefined && phrase) { phrase.style.transition = 'opacity .35s'; phrase.style.opacity = '0'; setTimeout(function () { phrase.style.opacity = ''; }, TRP * 1000 + 150); }
      if (live) live.textContent = "Versión del logo: " + NAMES[nx];
      kick();
    }, true);
  }
})();
