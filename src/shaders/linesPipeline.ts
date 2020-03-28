import "phaser";

export class LinesPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline {
  constructor(game: Phaser.Game) {
    let config = {
      game: game,
      renderer: game.renderer,
      fragShader: `
        precision mediump float;
        uniform float     time;
        uniform vec2      resolution;
        uniform sampler2D uMainSampler;
        varying vec2 outTexCoord;
        
        void main( void ) {
          vec2 uv = outTexCoord;
          // uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);
          uv.y += (sin((uv.x + (time * 0.5)) * 10.0) * 0.1) + (sin((uv.x + (time * 0.2)) * 32.0) * 0.01);
          uv = fract(uv);
          vec4 texColor = texture2D(uMainSampler, uv);
          gl_FragColor = texColor;
        }
      `
    };
    super(config);
  }
}