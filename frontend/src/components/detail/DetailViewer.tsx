interface DetailViewerProps {

    children: React.ReactNode;

}

export default function DetailViewer({

    children,

}: DetailViewerProps) {

    return (

        <div

            style={{

                marginTop: 24,

                border: "1px solid #ccc",

                borderRadius: 10,

                padding: 20,

                minHeight: 280,

            }}

        >

            {children}

        </div>

    );

}