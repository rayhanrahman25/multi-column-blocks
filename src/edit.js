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
import { useBlockProps, RichText, InspectorControls} from '@wordpress/block-editor';
import { RangeControl, PanelBody } from '@wordpress/components';
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
	const { columnCount, columnWidth, ColumnGap } = attributes;
	const columnStyles = { columnCount, columnWidth, ColumnGap };
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

	const onChangeColumnGap = ( val )  => {
		setAttributes( {ColumnGap: Number( val )} );
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
                    value={ ColumnGap }
                    onChange={ onChangeColumnGap }
                    min={ 10 }
                    max={ 100 }
                />

			</PanelBody>
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
