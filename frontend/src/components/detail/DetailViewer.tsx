interface DetailViewerProps {

    children: React.ReactNode;

}

export default function DetailViewer({

    children,

}: DetailViewerProps) {

    return (

        <div className="schedule-detail-viewer">

            {children}

        </div>

    );

}