declare global {
	declare type BannerName = 'FL' | 'KFL';

	declare type BreakpointDevice =
		| 'phone'
		| 'tablet-portrait'
		| 'tablet-landscape'
		| 'desktop'
		| 'desktop-max';
	declare type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'max';
	declare type BreakpointWidth = 320 | 600 | 900 | 1200 | 1300;
	declare type Queries =
		| 'mq_for_phone_up'
		| 'mq_for_below_phone'
		| 'mq_for_tablet_portrait_up'
		| 'mq_for_below_tablet_portrait'
		| 'mq_for_tablet_landscape_up'
		| 'mq_for_below_tablet_landscape'
		| 'mq_for_desktop_up'
		| 'mq_for_below_desktop'
		| 'mq_for_desktop_max_up'
		| 'mq_for_below_desktop_max';
	declare type QueryName =
		| 'mq_for_phone_up'
		| 'mq_for_below_phone'
		| 'mq_for_tablet_portrait_up'
		| 'mq_for_below_tablet_portrait'
		| 'mq_for_tablet_landscape_up'
		| 'mq_for_below_tablet_landscape'
		| 'mq_for_desktop_up'
		| 'mq_for_below_desktop'
		| 'mq_for_desktop_max_up'
		| 'mq_for_below_desktop_max';

	declare type ColorName =
		| 'crimson'
		| 'my_crimson_is_better_than_yours'
		| 'torch_red'
		| 'tamarillo'
		| 'brighter_monza'
		| 'monza'
		| 'flush_mahogany'
		| 'victory'
		| 'tabasco'
		| 'guardsman_red'
		| 'shiraz'
		| 'cinnabar'
		| 'burnt_orange'
		| 'ecstasy'
		| 'barberry'
		| 'corn_field'
		| 'gold_sand'
		| 'ronchi'
		| 'saffron'
		| 'buttercup'
		| 'selective_yellow'
		| 'eastbay_yellow'
		| 'sunglow'
		| 'gold'
		| 'sage_green'
		| 'jade'
		| 'persian_green'
		| 'salem'
		| 'killarney'
		| 'goblin'
		| 'atlantis'
		| 'inch_worm'
		| 'loyalty_green'
		| 'astral'
		| 'big_stone'
		| 'lily_white'
		| 'onahau'
		| 'light_blue'
		| 'lochmara'
		| 'deep_cerulean'
		| 'dodger_blue'
		| 'curious_blue'
		| 'venice_blue'
		| 'regal_blue'
		| 'navy_blue'
		| 'science_blue'
		| 'cornflower_blue'
		| 'kashmir'
		| 'torea_bay'
		| 'loyalty_blue'
		| 'eminence'
		| 'black'
		| 'woodsmoke'
		| 'cod_gray'
		| 'mineshaft_dark'
		| 'mineshaft_light'
		| 'mineshaft'
		| 'anthracite'
		| 'tundora'
		| 'emperor'
		| 'dove_gray'
		| 'boulder'
		| 'gray'
		| 'dusty_gray'
		| 'heather'
		| 'silver_dark'
		| 'silver'
		| 'alto_dark'
		| 'alto'
		| 'mercury'
		| 'gallery'
		| 'seashell'
		| 'wild_sand'
		| 'athens_gray'
		| 'athena'
		| 'white'
		| 'alabaster'
		| 'link_water';

	declare type ColumnSize =
		| 'auto'
		| 'even'
		| 'shrink'
		| 'full'
		| 'half'
		| 'third'
		| 'quarter'
		| 'fifth'
		| 'sixth'
		| 'seventh'
		| 'eighth'
		| 'ninth'
		| 'tenth';

	declare type ContentName =
		| 'xsmall'
		| 'small'
		| 'medium'
		| 'large'
		| 'xlarge'
		| 'fullWidth';

	declare type FontFamily =
		| 'Oswald'
		| 'Poppins'
		| 'Roboto'
		| 'RobotoCondensed'
		| 'RobotoMono';
	declare type FontName =
		| 'heading-1'
		| 'heading-2'
		| 'heading-3'
		| 'heading-4'
		| 'heading-5'
		| 'heading-6'
		| 'body-1'
		| 'body-2'
		| 'body-small'
		| 'cta-1'
		| 'cta-2'
		| 'input-text'
		| 'input-helper'
		| 'label'
		| 'label-small'
		| 'caption'
		| 'number'
		| 'monospace';
	declare type FontWeight = 'light' | 'medium' | 'bold';
	declare type LetterSpacing = 'none' | 'some';
	declare type TextTransform =
		| 'none'
		| 'capitalize'
		| 'lowercase'
		| 'uppercase';

	declare type SpacingSize =
		| 0
		| 0.25
		| 0.5
		| 0.75
		| 1
		| 1.25
		| 1.5
		| 1.75
		| 2
		| 2.5
		| 3
		| 3.5
		| 4
		| 5
		| 6;

	declare type Theme = 'light' | 'dark';
}
export const theme: Theme;
export {};
