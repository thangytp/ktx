import React from 'react';
import ReactDom from 'react-dom';
import ImageAction from '../../../actions/admin/image/ImageAction';
import ImageStore from '../../../stores/admin/image/ImageStore';
import DropzoneComponent from 'react-dropzone-component';
import ListImageAction from '../../../actions/admin/image/ListImageAction';

import ListImage from './ListImage';

class Images extends React.Component {
	constructor(props)
	{
		super(props);
		// this.state = ImageStore.getState();
		this.onChange = this.onChange.bind(this);
		this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/api/imageupload'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = () => console.log('Hello!');

        this.success = file => [ListImageAction.get(), this.dropzone = null];

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;

        this.reset = true;
	}
	componentDidMount() {
		// ImageStore.listen(this.onChange);
		
	}

	componentWillUnmount() {
		// ImageStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);  
	}

	render(){
		const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile,
            reset: this.reset
        }
		return(
			<div className="body-content animated fadeIn no-overflow">
				<div className="row">
					<div className="col-md-12">
						<DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
						<div className="row">
							<div className="col-md-12">
								<ListImage />
							</div>
						</div>
					</div>
				</div>
			</div>
			);
	}
}
export default Images;