import React from 'react';
// import {LayoutType} from 'types/components';
// import { bannerNames } from 'designTokens/banners';
// import { globalColors, bannerColorsFormatted } from 'designTokens/colors';
// import {StoryLabel, Swatch} from 'component-library/utils/StorybookHelper';
import {
	bannerColors,
	bannerNames,
	ColorSwatch,
	globalColors,
	// Heading,
	// Layout,
	// LayoutItem,
} from 'ui-library';
import StoryLabel from '../StorybookHelpers/StoryLabel';

export default {
	title: 'Design Tokens/Colors',
};

export const GlobalColors = (): JSX.Element => (
	<div style={{ display: 'flex', gap: '1rem' }}>
		{Object.entries(globalColors).map(([color, value]) => (
			<div key={color}>
				<ColorSwatch color={color} value={`${value}`} />
				<StoryLabel
					label={color}
					format={true}
					prepend="$"
					style={{ margin: '0.5em -0.25rem' }}
				/>
			</div>
		))}
	</div>
	// <Layout type={LayoutType.SWATCHES} gapVertical={3}>
	// 	{Object.entries(globalColors).map(([color, value]) => (
	// 		<LayoutItem key={color}>
	// 			<ColorSwatch color={color} value={`${value}`} />
	// 			<StoryLabel
	// 				label={color}
	// 				format={true}
	// 				prepend="$"
	// 				style={{ margin: '0.5em -0.25rem' }}
	// 			/>
	// 		</LayoutItem>
	// 	))}
	// </Layout>
);

// const BrandColors = ({ brandColors }: Record<string, unknown>): JSX.Element => (
// 	<Layout type={LayoutType.SWATCHES} gapVertical={3}>
// 		{Object.entries(brandColors).map(([color, alias]) => {
// 			const value = alias.replace('$', '');
// 			return (
// 				<LayoutItem key={color}>
// 					<ColorSwatch color={value} value={`${globalColors[value]}`} />
// 					<StoryLabel
// 						label={color}
// 						format={true}
// 						prepend="$"
// 						style={{ margin: '0.5em -0.25rem' }}
// 					/>
// 					{alias && (
// 						<>
// 							<hr style={{ margin: '0.35rem' }} />
// 							<StoryLabel
// 								label={`${alias}`}
// 								format={true}
// 								prepend="$"
// 								style={{ margin: '0.5em -0.25rem' }}
// 							/>
// 						</>
// 					)}
// 				</LayoutItem>
// 			);
// 		})}
// 	</Layout>
// );

export const allBannerColors = (): JSX.Element => (
	<>
		{Object.entries(bannerColors).map(([banner, colors], index) => {
			// const bannerName = bannerNames[banner];
			const bannerName = banner in bannerNames;
			return (
				<React.Fragment key={banner}>
					{!!index && <hr />}
					{/* <Heading level={2}>{bannerName}</Heading> */}
					<h2>{bannerName}</h2>
					{/* <BrandColors colors={colors} /> */}
					<div style={{ display: 'flex', gap: '1rem' }}>
						{Object.entries(colors).map(([type, name]) => (
							<div key={type}>
								<ColorSwatch color={type} value={name} />
								<StoryLabel
									label={type}
									format={true}
									prepend="$"
									style={{ margin: '0.5em -0.25rem' }}
								/>
								{name && (
									<>
										<hr style={{ margin: '0.35rem' }} />
										<StoryLabel
											label={`${name}`}
											format={true}
											prepend="$"
											style={{
												margin: '0.5em -0.25rem',
											}}
										/>
									</>
								)}
							</div>
						))}
					</div>
				</React.Fragment>
			);
		})}
	</>
);

// export const currentBannerColors = (
// 	_args: unknown,
// 	{ banner }: Record<string, string>
// ): JSX.Element => {
// 	const brandColors = bannerColors[banner];
// 	return (
// 		<>
// 			{/* <Heading level={2}>{bannerNames[banner]}</Heading> */}
// 			<h2>{bannerNames[banner]}</h2>
// 			<BrandColors {...{ brandColors }} />
// 		</>
// 	);
// };
