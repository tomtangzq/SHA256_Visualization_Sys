interface DetailViewerProps {

    children: React.ReactNode;

}

export default function DetailViewer({

    children,

}: DetailViewerProps) {

    return (

        <div

            style={{

                marginTop: 15,

                border: "1px solid #ccc",

                borderRadius: 10,

                padding: 15,

                minHeight: 280,

            }}

        >

            {children}

        </div>

    );

}