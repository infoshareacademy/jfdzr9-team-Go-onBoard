import React, { useState, useEffect, useRef } from "react";
import { database } from "../../utils/firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";
import ConfirmActivity from "../button/ConfirmActivity";
import CommentActivity from "./Comment";
import Modal from 'react-modal';
import {
  DetailsWraper,
  LinkFetched,
  HeaderInfo,
  HeaderInfoButton,
} from "./Activities.styled";
import LinkFetchedHeader from "./LinkFetchedHeader";
import IconFetchedHeader from "./IconFetchedHeader";
import { Movie } from "tabler-icons-react";

interface Activity {
  id: string;
  name: string;
  description: string;
  type: string;
  comment?: string;
  link?: string;
  action?: string;
}

interface Props {
  detailProps: {
    activitiesId: string | null;
    etap_id: string;
    onActivityConfirmation: (newActivityId: string) => void;
  };
}

function ActivitiesDetail(props: Props) {
  const [activitiesDetail, setActivitiesDetail] = useState<Activity[]>([]);
  const [fetchedLink, setFetchedLink] = useState<string | null>(null);

  const confirmActivityProps = {
    activitiesId: props.detailProps.activitiesId,
    etap_id: props.detailProps.etap_id,
    onActivityConfirmation: props.detailProps.onActivityConfirmation,
  };

  useEffect(() => {
    const getActivities = async () => {
      const activitiesRef = collection(database, "activities");
      const activitiesData = await getDocs(activitiesRef);
      const activitiesArray = activitiesData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Activity[];
      setActivitiesDetail(activitiesArray);
    };
    getActivities();
  }, []);

  useEffect(() => {
    // fetch only the link from the activities, if link =-1 change state
    const activity = activitiesDetail.find(
      (activity) => activity.id === props.detailProps.activitiesId
    );
    if (activity && activity.link && activity.link !== "-1") {
      setFetchedLink(activity.link);
    } else {
      setFetchedLink(null);
    }
  }, [activitiesDetail, props.detailProps.activitiesId]);
  
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [iframe, setIframe] = useState<any>(null);

  function openModal(filteredEtap:any) {
    setIsOpen(true);
    setIframe(
      <div>
        <iframe
          src={filteredEtap.movie}
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    );
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.

  }

  function closeModal() {
    setIsOpen(false);

  }

  return (
    <DetailsWraper>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
     
       
        contentLabel="Modal"
        // overlayClassName="modal-overlay"
        // className="modal-content"
      >{iframe}
      <button onClick={closeModal} >X</button>
      </Modal>
      {activitiesDetail
        .filter((detail) => detail.id === props.detailProps.activitiesId)
        .map((filteredEtap) => {
          return (
            <div
              className="detailsContent"
              key={filteredEtap.id}>
              <h3>{filteredEtap.name}</h3>
              <span>{filteredEtap.description}</span>
              <LinkFetched>
                <HeaderInfo>
                  <IconFetchedHeader iconName={filteredEtap.type || ""} />
                  <LinkFetchedHeader text={filteredEtap.action || ""} />
                </HeaderInfo>
                <HeaderInfoButton>
                  {fetchedLink && ( // render the button if in activities is link
                    <button onClick={()=> openModal(filteredEtap)} className="confirmButton"> Przejdz do strony </button>
                      
                    
                  )}
                </HeaderInfoButton>
              </LinkFetched>
              {filteredEtap.comment && (
                <CommentActivity
                  activitiesId={props.detailProps.activitiesId}
                />
              )}
              <ConfirmActivity confirmActivityProps={confirmActivityProps} />
            </div>
          );
        })}
    </DetailsWraper>
  );
}

export default ActivitiesDetail;
