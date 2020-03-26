/**
 * BLOCK: hw-block
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { RichText, PlainText, MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { SelectControl } = wp.components;


/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'hw-block/block-hw-block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'HW Block' ), // Block title.
	icon: 'book-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'hw-block' ),
	],
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.project-title',
		},
		description: {
			type: 'string',
			source: 'html',
			selector: '.project-description',
		},
		link: {
			type: 'string',
			source: 'html',
			selector: '.project-link',
		},
		imgUrl: {
			type: 'string',
			default: 'https://placehold.it/100'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		let { attributes: { title, description, link, imgUrl }, setAttributes, className } = props;

		function changeTitle(value){
			setAttributes( { title: value } );
		}
		function changeDescription(value){
			setAttributes( { description: value } );
		}
		function changeLink(value){
			setAttributes( { link: value } );
		}
		function selectImage(value){
			setAttributes( { imgUrl: value.sizes.medium.url } );
		}

		// Creates a <p class='wp-block-cgb-block-hw-block'></p>.
		return (
			<div className={props.className}>
				<div className="text">
					<p className="project-titles">Project Title</p>
					<PlainText
						className="project-title"
						value={title}
						onChange={changeTitle}
						placeholder="Project Title"
					/>
				</div>
				<p className="project-titles">Project Description</p>
				<RichText
					className="project-description"
					tagName="div"
					onChange={changeDescription}
					value={description}
					placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias accusantium, quidem earum expedita dignissimos dicta numquam suscipit, porro illum atque error obcaecati tempore? Qui, natus."
				/>
				<div className="photo-link">
					<div className="photo">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={selectImage}
								render={({ open }) => <img src={imgUrl} onClick={open} />}
							/>
						</MediaUploadCheck>
					</div>
					<p className="project-titles">Project Link</p>
					<PlainText
						className="project-link"
						value={link}
						onChange={changeLink}
						placeholder="Project Link"
					/>
				</div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div className={props.className}>
				<div className="text">
					<h3>{ props.attributes.title }</h3>
				</div>
				<RichText.Content
					className="project-description"
					tagName="div"
					value={ props.attributes.description }
					
				/>
				<div className="photo-link">
					<div className="photo">
						<img src={ props.attributes.imgUrl } />
					</div>
					<div className="project-link-container">
						<a href={ props.attributes.link } target="blank_" className="project-link-button">Project Link</a>
					</div>
				</div>
			</div>
		);
	},
} );
