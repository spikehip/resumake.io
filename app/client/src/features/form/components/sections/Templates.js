/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Lightbox from 'react-image-lightbox'
import { Section, Button } from '../../../ui/components'
import { selectTemplate } from '../../actions'
import type { State as ReduxState } from '../../../../shared/types'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin: 20px 0;

  @media screen and (max-width: 768px) {
    grid-template-columns: 100%;
  }
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  position: relative;
  border-radius: 1px;
  color: #fff;
  max-width: 100%;
  transform: translateY(0);
  transition: all 0.4s ease-out;
  opacity: ${props => (props.active ? '1' : '0.65')};

  &:hover {
    opacity: ${props => (props.active ? '1' : '0.9')};
    transform: translateY(-3px);
    cursor: zoom-in;
  }
`

const TemplateButton = Button.extend`
  border-color: ${props => (props.active ? 'white' : 'silver')};
  color: ${props => (props.active ? 'white' : 'silver')};
  transition: all 0.4s ease;
  padding: 10px 20px;

  &:hover {
    background: white;
    color: black;
  }
`

type Props = {
  selectedTemplate: number,
  selectTemplate: (templateId: number) => void
}

type State = {
  isLightboxOpen: boolean,
  lightboxImageIndex?: number
}

const ctx = require.context('../../assets/img', true)
const images = ctx.keys().map(ctx)

class Templates extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      isLightboxOpen: false
    }
  }

  showLightbox = (lightboxImageIndex: number) => {
    this.setState(prevState => ({
      isLightboxOpen: true,
      lightboxImageIndex
    }))
  }

  hideLightbox = () => {
    this.setState(prevState => ({
      isLightboxOpen: false
    }))
  }

  render() {
    const { selectedTemplate, selectTemplate } = this.props
    const { isLightboxOpen, lightboxImageIndex } = this.state

    return (
      <Section heading="Choose a Template">
        <Grid>
          {images.map((src, i) => (
            <Div key={i}>
              <Image
                active={i + 1 === selectedTemplate}
                src={src}
                onClick={() => this.showLightbox(i)}
              />
              <TemplateButton
                active={i + 1 === selectedTemplate}
                type="button"
                onClick={() => selectTemplate(i + 1)}
              >
                Template {i + 1}
              </TemplateButton>
            </Div>
          ))}
        </Grid>
        {isLightboxOpen && (
          <Lightbox
            imageCaption={`Template ${lightboxImageIndex + 1}`}
            mainSrc={images[lightboxImageIndex]}
            onCloseRequest={this.hideLightbox}
          />
        )}
      </Section>
    )
  }
}

function mapState(state: ReduxState) {
  return {
    selectedTemplate: state.form.resume.values.selectedTemplate
  }
}

const mapActions = {
  selectTemplate
}

export default connect(mapState, mapActions)(Templates)
