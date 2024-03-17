/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls, PanelColorSettings} from '@wordpress/block-editor';
import { RangeControl, PanelBody, SelectControl } from '@wordpress/components';
import NumberControl from './components/number-control';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const { columnCount, columnWidth, columnGap, columnRuleWidth, columnRuleStyle, columnRuleColor } = attributes;
	const columnStyles = { columnCount, columnWidth, columnGap, columnRuleWidth, columnRuleStyle, columnRuleColor };
	const content = attributes.content;

	const onChangeContent = ( val ) => {
        setAttributes( { content: val } );
    };

    const onChangeColumnCount = ( val ) => {
        setAttributes( { columnCount: val } );
    };

	const onChangeColumnWidth = ( val ) => {
		setAttributes( { columnWidth: Number( val ) } );
	};

	const onChangecolumnGap = ( val )  => {
		setAttributes( {columnGap: Number( val )} );
	}

	const onChangeColumnRuleWidth = ( val )  => {
		setAttributes( {columnRuleWidth:  Number( val ) } );
	}

	const onChangeColumnRuleStyle = ( val )  => {
		setAttributes( {columnRuleStyle:  val } );
	}

	const onChangeColumnRuleColor = ( val )  => {
		setAttributes( {columnRuleColor:  val } );
	}


	return (
		<>

		<InspectorControls>
			<PanelBody title='Column Settings'>
				<RangeControl
					label="Columns"
					value={ columnCount }
					onChange={ onChangeColumnCount }
					min={ 2 }
					max={ 6 }
				/>

				<NumberControl
                    label="Width"
                    value={ columnWidth }
                    onChange={ onChangeColumnWidth }
                    min={ 120 }
                    max={ 500 }
                    step={ 10 }
                />

				<NumberControl
                    label="Gap"
                    value={ columnGap }
                    onChange={ onChangecolumnGap }
                    min={ 10 }
                    max={ 100 }
                />

			</PanelBody>
			<PanelBody title="Column Separator" initialOpen={false}>
				<SelectControl
					label="Separator Style"
					onChange={ onChangeColumnRuleStyle }
					value={ columnRuleStyle }
					options={ [
						{
							label: 'None',
							value: 'none',
						},
						{
							label: 'Solid',
							value: 'solid',
						},
						{
							label: 'Dotted',
							value: 'dotted',
						},
						{
							label: 'Dashed',
							value: 'dashed',
						},
						{
							label: 'Double',
							value: 'double',
						},
						{
							label: 'Groove',
							value: 'groove',
						},
						{
							label: 'Ridge',
							value: 'ridge',
						},
					] }
				/>
				<NumberControl
					label="Width"
					onChange={ onChangeColumnRuleWidth }
					value={ columnRuleWidth }
					min={ 1 }
					max={ 8 }
    			/>
			</PanelBody>
			<PanelColorSettings
				title="Colour settings"
				colorSettings={ [
					{
						label: 'Separator colour',
						value: columnRuleColor,
						onChange: onChangeColumnRuleColor,
					},
				] }
    		></PanelColorSettings>
		</InspectorControls>

			<RichText 
			{ ...useBlockProps({ style: columnStyles }) }
			tagName='p'
			onChange={ onChangeContent }
			value={content}
			placeholder='Enter large paragraph here'
			/>

		</>
	);
}
