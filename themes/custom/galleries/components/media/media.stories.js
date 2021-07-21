export default { title: 'Atom/Media' };

const stockSrc = ({ width: w = 600, height: h = 450 }) => 'https://place-hold.it/' + w + 'x' + h;

import img_template from './image.twig';
const image = args => img_template({
  src: args.src || stockSrc(args),
  alt: args.alt || 'Placeholder alt text',
});
image.args = {
  width: 400,
  height: 300,
};

import picture_template from './picture.twig';
export const picture = args => picture_template({
  sources: [
    {
      srcset_path: args.src || stockSrc(args),
      other_attributes: 'media="(min-width: 300px)"'
    },
    {
      srcset_path: args.src || stockSrc(args),
      other_attributes: 'media="(min-width: 600px)"'
    }
  ],
  image: args.image || image(args)
});
picture.args = {
  width: 400,
  height: 300
};

import video from './video.twig';
export { video };
video.args = {
  url: 'http://www.youtube.com/watch?v=BPXO3bVPQxQ',
  picture: picture({ src: stockSrc('400', '300')  }),
  title: `Kean Galleries: A University for the Future`,
};
video.argTypes = picture.argTypes;

import audio from './audio.twig';
export { audio };
audio.args = {
  audio_url: 'https://www.computerhope.com/jargon/m/example.mp3',
  thumbnail: picture({ src: stockSrc('400', '300')  }),
  audio_type: `audio/mpeg`,
};

import figure_template from './figure.twig';
export const figure = args => figure_template({
  ...args,
  media: args.media || (
    (args.type === 'video') ? (args.video || video({
      picture: args.picture || picture({ src: args.src || 'maxresdefault.jpg' }),
      url: args.url || 'http://www.youtube.com/watch?v=BPXO3bVPQxQ',
      title: args.title || `Kean Galleries: A University for the Future`
    })) : picture({ src: args.src })
  ),
});
figure.args = {
  type: 'picture',
  caption: 'Optional caption for above image or video. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.',
  credit: 'Courtesy and credit line.',
};
figure.argTypes = {
  type: {
    control: {
      type: 'inline-radio',
      options: ['picture', 'video']
    }
  },
  ...picture.argTypes
};